<?php
namespace App\Http\Controllers;

use App\Models\Kelas;
use App\Models\PendaftaranKelas;
use App\Jobs\SendWhatsAppNotification;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class KelasController extends Controller
{
    public function index()
    {
        $kelas = Kelas::where('is_active', true)
                     ->where('tanggal', '>=', now()->toDateString())
                     ->orderBy('tanggal', 'asc')
                     ->get()
                     ->map(function ($item) {
                         return [
                             'id' => $item->id,
                             'nama' => $item->nama,
                             'deskripsi' => $item->deskripsi,
                             'gambar' => $item->gambar ? asset('storage/' . $item->gambar) : asset('images/default-class.jpg'),
                             'tanggal' => $item->tanggal_format,
                             'hari' => $item->hari,
                             'kategori' => $item->kategori,
                             'grup_wa' => $item->grup_wa,
                             'kapasitas' => $item->kapasitas,
                             'terdaftar' => $item->pendaftarans()->count(),
                             'is_available' => $item->is_available
                         ];
                     });

        return Inertia::render('Kelas/Index', [
            'kelas' => $kelas
        ]);
    }

    public function show($id)
    {
        $kelas = Kelas::findOrFail($id);
       
        return Inertia::render('Kelas/Show', [
            'kelas' => [
                'id' => $kelas->id,
                'nama' => $kelas->nama,
                'deskripsi' => $kelas->deskripsi,
                'gambar' => $kelas->gambar ? asset('storage/' . $kelas->gambar) : asset('images/default-class.jpg'),
                'tanggal' => $kelas->tanggal_format,
                'hari' => $kelas->hari,
                'kategori' => $kelas->kategori,
                'grup_wa' => $kelas->grup_wa,
                'kapasitas' => $kelas->kapasitas,
                'terdaftar' => $kelas->pendaftarans()->count(),
                'is_available' => $kelas->is_available
            ]
        ]);
    }

    public function daftar(Request $request, $id)
    {
        \Log::info('=== REGISTRATION STARTED ===', [
            'kelas_id' => $id,
            'request_data' => $request->all(),
            'whatsapp_enabled' => config('whatsapp.enabled'),
            'timestamp' => now()
        ]);

        // Validasi input
        $request->validate([
            'nama' => 'required|string|max:255',
            'alamat' => 'required|string',
            'no_telp' => 'required|string|max:20'
        ], [
            'nama.required' => 'Nama wajib diisi',
            'alamat.required' => 'Alamat wajib diisi',
            'no_telp.required' => 'Nomor telepon wajib diisi'
        ]);

        $kelas = Kelas::findOrFail($id);

        // Cek availability
        if (!$kelas->is_available) {
            \Log::warning('Registration failed: class not available', [
                'kelas_id' => $id,
                'is_available' => $kelas->is_available
            ]);
            return back()->with('error', 'Kelas tidak tersedia atau sudah penuh!');
        }

        // Cek duplikasi berdasarkan nomor telepon
        $existingRegistration = PendaftaranKelas::where('kelas_id', $id)
            ->where('no_telp', $request->no_telp)
            ->first();

        if ($existingRegistration) {
            \Log::warning('Registration failed: duplicate phone number', [
                'phone' => $request->no_telp,
                'existing_registration_id' => $existingRegistration->id
            ]);
            return back()->withErrors([
                'no_telp' => 'Nomor telepon ini sudah terdaftar untuk kelas ini.'
            ]);
        }

        try {
            // Simpan pendaftaran
            $pendaftaran = PendaftaranKelas::create([
                'kelas_id' => $id,
                'nama' => $request->nama,
                'alamat' => $request->alamat,
                'no_telp' => $request->no_telp
            ]);

            \Log::info('Registration saved successfully', [
                'registration_id' => $pendaftaran->id,
                'phone' => $request->no_telp,
                'name' => $request->nama,
                'class' => $kelas->nama
            ]);

            // Siapkan data untuk WhatsApp
            $whatsappData = [
                'nama' => $request->nama,
                'kelas_nama' => $kelas->nama,
                'tanggal' => Carbon::parse($kelas->tanggal)->format('d M Y'),
                'hari' => $kelas->hari,
                'kategori' => $kelas->kategori,
                'grup_wa' => $kelas->grup_wa
            ];

            \Log::info('WhatsApp data prepared', [
                'data' => $whatsappData,
                'phone' => $request->no_telp
            ]);

            // Kirim notifikasi WhatsApp
            if (config('whatsapp.enabled')) {
                \Log::info('Dispatching WhatsApp notification job');

                try {
                    // Dispatch job dengan delay 3 detik
                    SendWhatsAppNotification::dispatch($request->no_telp, $whatsappData)
                        ->delay(now()->addSeconds(3));
                    
                    \Log::info('WhatsApp job dispatched successfully', [
                        'phone' => $request->no_telp,
                        'delay' => '3 seconds'
                    ]);

                } catch (\Exception $jobError) {
                    \Log::error('Failed to dispatch WhatsApp job', [
                        'error' => $jobError->getMessage(),
                        'phone' => $request->no_telp
                    ]);

                    // Fallback: coba kirim langsung
                    \Log::info('Attempting direct WhatsApp send as fallback');
                    try {
                        $whatsappService = new \App\Services\WhatsAppService();
                        $result = $whatsappService->sendClassRegistrationMessage($request->no_telp, $whatsappData);
                        
                        \Log::info('Direct WhatsApp fallback result', [
                            'success' => $result['success'],
                            'error' => $result['success'] ? null : $result['error']
                        ]);

                    } catch (\Exception $directError) {
                        \Log::error('Direct WhatsApp fallback also failed', [
                            'error' => $directError->getMessage()
                        ]);
                    }
                }
            } else {
                \Log::warning('WhatsApp is disabled - notification not sent');
            }

            \Log::info('=== REGISTRATION COMPLETED ===');

            // Return dengan data grup untuk modal
            return redirect()->route('kelas.show', $id)
                ->with('success', 'Notifikasi WhatsApp akan segera dikirim ke nomor Anda.');

        } catch (\Exception $e) {
            \Log::error('=== REGISTRATION FAILED ===', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'kelas_id' => $id,
                'phone' => $request->no_telp
            ]);

            return back()->withErrors([
                'general' => 'Terjadi kesalahan saat mendaftar. Silakan coba lagi.'
            ]);
        }
    }
}
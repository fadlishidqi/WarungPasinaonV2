<?php
namespace App\Http\Controllers;

use App\Models\LibraryAttendance;
use App\Models\Participant;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;
use Illuminate\Validation\ValidationException;

class LibraryAttendanceController extends Controller
{
    public function index(): Response
    {
        $stats = $this->getStatsData();
        
        return Inertia::render('LibraryAttendance/Index', [
            'stats' => $stats
        ]);
    }

    public function store(Request $request)
    {
        // Validasi input dasar
        $validated = $request->validate([
            'type' => 'required|in:child,general',
            'visit_date' => 'required|date',
            'visit_time' => 'required',
            
            // Validasi untuk anak-anak
            'child_name' => 'required_if:type,child|string|max:255|nullable',
            'child_address' => 'required_if:type,child|string|nullable',
            
            // Validasi untuk umum
            'general_name' => 'required_if:type,general|string|max:255|nullable',
            'general_address' => 'required_if:type,general|string|nullable',
            'institution' => 'required_if:type,general|string|max:255|nullable',
            'notes' => 'nullable|string',
        ]);

        try {
            // Cek duplicate berdasarkan nama dan tanggal
            $name = $validated['type'] === 'child' 
                ? $validated['child_name'] 
                : $validated['general_name'];
            
            $visitDate = $validated['visit_date'];
            $type = $validated['type'];

            // Cek apakah sudah ada attendance dengan nama dan tanggal yang sama
            $existingAttendance = LibraryAttendance::byNameAndDate($name, $visitDate, $type)->first();
            
            if ($existingAttendance) {
                throw ValidationException::withMessages([
                    'duplicate' => 'Nama "' . strtoupper($name) . '" sudah tercatat pada tanggal ' . 
                                  Carbon::parse($visitDate)->format('d M Y') . '. ' .
                                  'Setiap orang hanya bisa mengisi daftar hadir sekali per hari.'
                ]);
            }

            // Buat participant baru (nama akan otomatis uppercase)
            $participant = Participant::create([
                'name' => $name,
                'type' => $type
            ]);

            // Format waktu dengan benar
            $visitTime = Carbon::createFromFormat('H:i', $validated['visit_time'])->format('H:i:s');

            // Buat library attendance (nama akan otomatis uppercase)
            $attendanceData = [
                'participant_id' => $participant->id,
                'visit_date' => $visitDate,
                'visit_time' => $visitTime,
            ];

            // Tambahkan field berdasarkan tipe
            if ($type === 'child') {
                $attendanceData['child_name'] = $validated['child_name'];
                $attendanceData['child_address'] = $validated['child_address'];
            } else {
                $attendanceData['general_name'] = $validated['general_name'];
                $attendanceData['general_address'] = $validated['general_address'];
                $attendanceData['institution'] = $validated['institution'];
                $attendanceData['notes'] = $validated['notes'] ?? null;
            }

            $attendance = LibraryAttendance::create($attendanceData);

            // Log untuk debugging
            \Log::info('Library attendance created:', [
                'participant_id' => $participant->id,
                'attendance_id' => $attendance->id,
                'type' => $type,
                'name' => strtoupper($name),
                'date' => $visitDate
            ]);

            return redirect()->route('library.attendance')->with([
                'success' => 'Terima kasih! Daftar hadir untuk ' . strtoupper($name) . ' telah tercatat.',
                'stats' => $this->getStatsData()
            ]);

        } catch (ValidationException $e) {
            return redirect()->back()
                ->withErrors($e->errors())
                ->withInput();
                
        } catch (\Exception $e) {
            \Log::error('Error creating library attendance: ' . $e->getMessage());
            
            return redirect()->back()->withErrors([
                'general' => 'Terjadi kesalahan saat menyimpan data. Silakan coba lagi.'
            ])->withInput();
        }
    }

    public function getStats()
    {
        try {
            $stats = $this->getStatsData();
            
            return response()->json($stats, 200, [
                'Content-Type' => 'application/json'
            ]);
        } catch (\Exception $e) {
            \Log::error('Error getting stats: ' . $e->getMessage());
            
            return response()->json([
                'error' => 'Unable to fetch stats',
                'today' => 0,
                'thisMonth' => 0,
                'childrenToday' => 0,
                'generalToday' => 0
            ], 500);
        }
    }

    private function getStatsData(): array
    {
        $today = LibraryAttendance::whereDate('visit_date', today())->count();
        $thisMonth = LibraryAttendance::whereMonth('visit_date', now()->month)
                                   ->whereYear('visit_date', now()->year)
                                   ->count();
        
        $childrenToday = LibraryAttendance::whereDate('visit_date', today())
                                        ->whereHas('participant', function($query) {
                                            $query->where('type', 'child');
                                        })->count();
        
        $generalToday = LibraryAttendance::whereDate('visit_date', today())
                                       ->whereHas('participant', function($query) {
                                           $query->where('type', 'general');
                                       })->count();

        return [
            'today' => $today,
            'thisMonth' => $thisMonth,
            'childrenToday' => $childrenToday,
            'generalToday' => $generalToday
        ];
    }
}
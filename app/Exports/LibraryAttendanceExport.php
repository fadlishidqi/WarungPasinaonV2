<?php
// app/Exports/LibraryAttendanceExport.php
namespace App\Exports;

use App\Models\LibraryAttendance;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use Maatwebsite\Excel\Concerns\WithTitle;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use Illuminate\Database\Eloquent\Builder;

class LibraryAttendanceExport implements FromQuery, WithHeadings, WithMapping, WithStyles, WithColumnWidths, WithTitle
{
    use Exportable;

    protected $filters;

    public function __construct($filters = [])
    {
        $this->filters = $filters;
    }

    public function query()
    {
        $query = LibraryAttendance::query()
            ->with(['participant'])
            ->orderBy('visit_date', 'desc')
            ->orderBy('visit_time', 'desc');

        // Apply filters jika ada
        if (!empty($this->filters)) {
            // Filter berdasarkan tanggal
            if (isset($this->filters['visit_date']) && $this->filters['visit_date']) {
                $query->whereDate('visit_date', $this->filters['visit_date']);
            }

            // Filter berdasarkan kategori
            if (isset($this->filters['participant_type']) && $this->filters['participant_type']) {
                $query->whereHas('participant', function (Builder $q) {
                    $q->where('type', $this->filters['participant_type']);
                });
            }

            // Filter berdasarkan range tanggal
            if (isset($this->filters['from_date']) && $this->filters['from_date']) {
                $query->whereDate('visit_date', '>=', $this->filters['from_date']);
            }

            if (isset($this->filters['to_date']) && $this->filters['to_date']) {
                $query->whereDate('visit_date', '<=', $this->filters['to_date']);
            }
        }

        return $query;
    }

    public function headings(): array
    {
        return [
            'No',
            'Tanggal Kunjungan',
            'Waktu Kunjungan',
            'Kategori Pengunjung',
            'Nama Pengunjung',
            'Alamat',
            'Institusi/Lembaga',
            'Keterangan',
            'Dicatat Pada',
        ];
    }

    public function map($attendance): array
    {
        static $no = 0;
        $no++;

        return [
            $no,
            $attendance->visit_date->format('d/m/Y'),
            $attendance->visit_time ? $attendance->visit_time->format('H:i') : '-',
            $attendance->participant->type === 'child' ? 'Anak-anak' : 'Umum',
            $attendance->visitor_name ?: '-',
            $attendance->visitor_address ?: '-',
            $attendance->institution ?: '-',
            $attendance->notes ?: '-',
            $attendance->created_at->format('d/m/Y H:i'),
        ];
    }

    public function styles(Worksheet $sheet)
    {
        return [
            // Style header
            1 => [
                'font' => [
                    'bold' => true,
                    'color' => ['rgb' => 'FFFFFF'],
                ],
                'fill' => [
                    'fillType' => Fill::FILL_SOLID,
                    'startColor' => ['rgb' => '4F46E5'], // Indigo
                ],
                'alignment' => [
                    'horizontal' => Alignment::HORIZONTAL_CENTER,
                    'vertical' => Alignment::VERTICAL_CENTER,
                ],
                'borders' => [
                    'allBorders' => [
                        'borderStyle' => Border::BORDER_THIN,
                        'color' => ['rgb' => '000000'],
                    ],
                ],
            ],
            // Style untuk semua data
            'A:I' => [
                'borders' => [
                    'allBorders' => [
                        'borderStyle' => Border::BORDER_THIN,
                        'color' => ['rgb' => 'CCCCCC'],
                    ],
                ],
                'alignment' => [
                    'vertical' => Alignment::VERTICAL_TOP,
                ],
            ],
            // Style khusus untuk kolom nomor
            'A:A' => [
                'alignment' => [
                    'horizontal' => Alignment::HORIZONTAL_CENTER,
                ],
            ],
            // Style khusus untuk kolom tanggal dan waktu
            'B:C' => [
                'alignment' => [
                    'horizontal' => Alignment::HORIZONTAL_CENTER,
                ],
            ],
        ];
    }

    public function columnWidths(): array
    {
        return [
            'A' => 8,   // No
            'B' => 18,  // Tanggal
            'C' => 12,  // Waktu
            'D' => 15,  // Kategori
            'E' => 25,  // Nama
            'F' => 35,  // Alamat
            'G' => 25,  // Institusi
            'H' => 30,  // Keterangan
            'I' => 20,  // Dicatat
        ];
    }

    public function title(): string
    {
        return 'Daftar Hadir Perpustakaan';
    }
}
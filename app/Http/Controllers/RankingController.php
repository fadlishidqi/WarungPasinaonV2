<?php
// app/Http/Controllers/RankingController.php
namespace App\Http\Controllers;

use App\Models\Participant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RankingController extends Controller
{
    public function index()
    {
        // Ambil ranking hanya untuk anak-anak yang memiliki poin
        $rankings = Participant::where('type', 'child')
            ->withSum('points', 'points')
            ->withCount('attendances')
            ->with(['attendances' => function($query) {
                $query->latest('visit_date')->limit(1);
            }])
            ->having('points_sum_points', '>', 0)
            ->orderByDesc('points_sum_points')
            ->take(50)
            ->get()
            ->map(function ($participant, $index) {
                $lastAttendance = $participant->attendances->first();
                
                return [
                    'rank' => $index + 1,
                    'name' => $participant->name,
                    'total_points' => $participant->points_sum_points ?? 0,
                    'last_visit' => $lastAttendance ? $lastAttendance->visit_date->format('d/m/Y') : null,
                    'total_visits' => $participant->attendances_count,
                ];
            });

        $stats = [
            'total_children' => Participant::where('type', 'child')->count(),
            'children_with_points' => Participant::where('type', 'child')
                ->withSum('points', 'points')
                ->having('points_sum_points', '>', 0)
                ->count(),
            'total_points_distributed' => \App\Models\ParticipantPoint::sum('points'),
            'avg_points' => round(\App\Models\ParticipantPoint::avg('points'), 1),
        ];

        return Inertia::render('Ranking/Index', [
            'rankings' => $rankings,
            'stats' => $stats,
        ]);
    }
}
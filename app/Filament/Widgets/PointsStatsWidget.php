<?php
// app/Filament/Widgets/PointsStatsWidget.php
namespace App\Filament\Widgets;

use App\Models\ParticipantPoint;
use App\Models\Participant;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class PointsStatsWidget extends BaseWidget
{
    protected function getStats(): array
    {
        $totalPoints = ParticipantPoint::sum('points');
        $totalChildren = Participant::where('type', 'child')->count();
        $childrenWithPoints = Participant::where('type', 'child')
            ->withSum('points', 'points')
            ->having('points_sum_points', '>', 0)
            ->count();
        $avgPoints = $childrenWithPoints > 0 ? round($totalPoints / $childrenWithPoints, 1) : 0;

        return [
            Stat::make('Total Poin Terdistribusi', number_format($totalPoints))
                ->description('Semua poin yang diberikan')
                ->descriptionIcon('heroicon-m-star')
                ->color('success'),

            Stat::make('Anak-anak Aktif', $childrenWithPoints . ' dari ' . $totalChildren)
                ->description('Yang memiliki poin')
                ->descriptionIcon('heroicon-m-user-group')
                ->color('info'),

            Stat::make('Rata-rata Poin', number_format($avgPoints, 1))
                ->description('Per anak aktif')
                ->descriptionIcon('heroicon-m-calculator')
                ->color('warning'),

            Stat::make('Poin Hari Ini', number_format(ParticipantPoint::whereDate('earned_date', today())->sum('points')))
                ->description('Diberikan hari ini')
                ->descriptionIcon('heroicon-m-calendar-days')
                ->color('primary'),
        ];
    }
}
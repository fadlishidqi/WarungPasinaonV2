<?php
// app/Filament/Widgets/TopPerformersWidget.php
namespace App\Filament\Widgets;

use App\Models\Participant;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

class TopPerformersWidget extends BaseWidget
{
    protected int | string | array $columnSpan = 'full';
    protected static ?string $heading = '🏆 Top 10 Anak Terbaik';

    public function table(Table $table): Table
    {
        return $table
            ->query(
                Participant::where('type', 'child')
                    ->withSum('points', 'points')
                    ->withCount('points as total_activities')
                    ->having('points_sum_points', '>', 0)
                    ->orderByDesc('points_sum_points')
                    ->limit(10)
            )
            ->columns([
                Tables\Columns\TextColumn::make('rank')
                    ->label('Peringkat')
                    ->state(function ($rowLoop) {
                        $rank = $rowLoop->iteration;
                        return match ($rank) {
                            1 => '🥇 #1',
                            2 => '🥈 #2', 
                            3 => '🥉 #3',
                            default => "#{$rank}"
                        };
                    })
                    ->size('sm')
                    ->weight('bold'),

                Tables\Columns\TextColumn::make('name')
                    ->label('Nama Anak')
                    ->searchable()
                    ->weight('bold'),

                Tables\Columns\TextColumn::make('points_sum_points')
                    ->label('Total Poin')
                    ->badge()
                    ->color('success')
                    ->formatStateUsing(fn ($state) => number_format($state) . ' poin'),

                Tables\Columns\TextColumn::make('total_activities')
                    ->label('Total Aktivitas')
                    ->badge()
                    ->color('info'),

                Tables\Columns\TextColumn::make('avg_points')
                    ->label('Rata-rata/Aktivitas')
                    ->state(function ($record) {
                        $total = $record->points_sum_points ?? 0;
                        $count = $record->total_activities ?? 1;
                        return round($total / $count, 1);
                    })
                    ->suffix(' poin'),
            ])
            ->paginated(false);
    }
}
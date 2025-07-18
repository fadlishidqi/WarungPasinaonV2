<?php
// app/Models/Participant.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Participant extends Model
{
    protected $fillable = [
        'name',
        'type'
    ];

    // Mutator untuk auto uppercase nama
    public function setNameAttribute($value)
    {
        $this->attributes['name'] = $value ? strtoupper($value) : null;
    }

    public function attendances(): HasMany
    {
        return $this->hasMany(LibraryAttendance::class);
    }

    public function isChild(): bool
    {
        return $this->type === 'child';
    }

    public function isGeneral(): bool
    {
        return $this->type === 'general';
    }

    public function points()
    {
        return $this->hasMany(ParticipantPoint::class);
    }

    public function getTotalPointsAttribute(): int
    {
        return $this->points()->sum('points');
    }

    public function addPoints(int $points, string $activityType = 'library_visit', string $description = null): void
    {
        $this->points()->create([
            'points' => $points,
            'activity_type' => $activityType,
            'description' => $description,
            'earned_date' => today(),
        ]);
    }
}
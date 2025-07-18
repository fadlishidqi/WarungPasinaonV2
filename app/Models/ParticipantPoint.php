<?php
// app/Models/ParticipantPoint.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ParticipantPoint extends Model
{
    use HasFactory;

    protected $fillable = [
        'participant_id',
        'points',
        'activity_type',
        'description',
        'earned_date'
    ];

    protected $casts = [
        'earned_date' => 'date',
    ];

    public function participant(): BelongsTo
    {
        return $this->belongsTo(Participant::class);
    }
}
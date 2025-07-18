<?php
// app/Models/Kegiatan.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Kegiatan extends Model
{
    protected $table = 'kegiatan';
    
    protected $fillable = [
        'title', 'slug', 'category', 'description', 'date', 'status',
        'image', 'content', 'meta_description', 'tags'
    ];

    protected $casts = [
        'date' => 'date',
        'tags' => 'array',
    ];

    // Scope methods - pastikan nama method benar
    public function scopePublished(Builder $query): Builder
    {
        return $query->where('status', 'published');
    }

    public function scopeByCategory(Builder $query, $category): Builder
    {
        return $query->where('category', $category);
    }

    // Accessor untuk memastikan tags selalu array
    public function getTagsAttribute($value)
    {
        if (is_string($value)) {
            return json_decode($value, true) ?: [];
        }
        
        if (is_array($value)) {
            return $value;
        }
        
        return [];
    }

    // Mutator untuk memastikan tags disimpan sebagai JSON
    public function setTagsAttribute($value)
    {
        if (is_array($value)) {
            $this->attributes['tags'] = json_encode($value);
        } elseif (is_string($value)) {
            $tags = array_map('trim', explode(',', $value));
            $this->attributes['tags'] = json_encode($tags);
        } else {
            $this->attributes['tags'] = json_encode([]);
        }
    }
}
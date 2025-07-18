<?php
// config/whatsapp.php
return [
    'base_url' => env('WHATSAPP_BASE_URL', 'https://waha-0vk1c9i1.wax.biz.id'),
    'session_name' => env('WHATSAPP_SESSION_NAME', 'default'),
    'enabled' => env('WHATSAPP_ENABLED', true),
    'api_key' => env('WHATSAPP_API_KEY'),
    
    // Anti-spam settings
    'typing_speed' => env('WHATSAPP_TYPING_SPEED', 200),
    'min_typing_time' => env('WHATSAPP_MIN_TYPING_TIME', 2),
    'max_typing_time' => env('WHATSAPP_MAX_TYPING_TIME', 15),
    
    // Retry settings
    'max_retries' => env('WHATSAPP_MAX_RETRIES', 3),
    'retry_delay' => env('WHATSAPP_RETRY_DELAY', 5),
];
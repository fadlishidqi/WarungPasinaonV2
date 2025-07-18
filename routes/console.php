<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use App\Services\WhatsAppService;
use GuzzleHttp\Client;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Test connection command
Artisan::command('waha:test-connection', function () {
    $baseUrl = config('whatsapp.base_url');
    $apiKey = config('whatsapp.api_key');
    
    $this->info("Testing connection to: {$baseUrl}");
    $this->line("API Key: " . substr($apiKey, 0, 8) . str_repeat('*', strlen($apiKey) - 8));
    $this->newLine();
    
    if (!$apiKey) {
        $this->error('❌ API Key not configured in .env file');
        return 1;
    }
    
    $client = new Client([
        'timeout' => 10,
        'headers' => [
            'X-Api-Key' => $apiKey,
            'Accept' => 'application/json',
            'Content-Type' => 'application/json',
        ]
    ]);
    
    try {
        // Test 1: Basic server connection
        $this->info('1️⃣ Testing server connection with API key...');
        $response = $client->get("{$baseUrl}/api/sessions");
        $this->line("✅ Server responded with status: " . $response->getStatusCode());
        
        // Test 2: Get all sessions
        $this->info('2️⃣ Getting all sessions...');
        $sessions = json_decode($response->getBody()->getContents(), true);
        $this->line("Sessions found: " . count($sessions));
        
        if (empty($sessions)) {
            $this->warn("⚠️ No sessions found. Creating session...");
            
            // Create session
            try {
                $createResponse = $client->post("{$baseUrl}/api/sessions", [
                    'json' => [
                        'name' => 'default',
                        'config' => []
                    ]
                ]);
                $this->info('✅ Session "default" created!');
            } catch (\Exception $e) {
                $this->error('❌ Failed to create session: ' . $e->getMessage());
            }
            
            return 0;
        }
        
        // Show sessions
        $headers = ['Session Name', 'Status'];
        $rows = array_map(function($session) {
            return [$session['name'], $session['status'] ?? 'Unknown'];
        }, $sessions);
        
        $this->table($headers, $rows);
        
        // Test 3: Check specific session
        $sessionName = config('whatsapp.session_name');
        $this->info("3️⃣ Checking session: {$sessionName}");
        
        try {
            $response = $client->get("{$baseUrl}/api/sessions/{$sessionName}");
            $session = json_decode($response->getBody()->getContents(), true);
            
            $this->table(['Property', 'Value'], [
                ['Session Name', $session['name'] ?? 'Unknown'],
                ['Status', $session['status'] ?? 'Unknown'],
                ['Connected As', $session['me']['user']['name'] ?? 'Not connected'],
                ['Phone', $session['me']['user']['id'] ?? 'Not available'],
            ]);
            
            if (($session['status'] ?? '') === 'WORKING') {
                $this->info('✅ Session is ready to send messages!');
            } else {
                $this->warn('⚠️ Session needs authentication. Use: php artisan whatsapp:qr');
            }
            
        } catch (\Exception $e) {
            if ($e->getCode() === 404) {
                $this->error("❌ Session '{$sessionName}' not found");
                $this->warn('Creating session...');
                
                try {
                    $client->post("{$baseUrl}/api/sessions", [
                        'json' => [
                            'name' => $sessionName,
                            'config' => []
                        ]
                    ]);
                    $this->info('✅ Session created! Use: php artisan whatsapp:qr');
                } catch (\Exception $createError) {
                    $this->error('❌ Failed to create session: ' . $createError->getMessage());
                }
            } else {
                $this->error("❌ Error: " . $e->getMessage());
            }
        }
        
    } catch (\Exception $e) {
        $this->error("❌ Connection failed: " . $e->getMessage());
        if ($e->getCode() === 401 || $e->getCode() === 403) {
            $this->error("❌ Authentication failed - check API key");
        }
        return 1;
    }
    
    $this->info("✅ Connection test completed!");
    return 0;
})->purpose('Test connection to WAHA server');

Artisan::command('whatsapp:test {phone} {--message=Test message from Warung Pasinaon}', function () {
    $phone = $this->argument('phone');
    $message = $this->option('message');
    
    $this->info('🔄 Testing WhatsApp message sending...');
    $this->line("Phone: {$phone}");
    $this->line("Message: {$message}");
    $this->newLine();
    
    try {
        $whatsappService = new App\Services\WhatsAppService();
        
        // Check session status first
        $this->line('1️⃣ Checking session status...');
        $status = $whatsappService->getSessionStatus();
        
        if (isset($status['error']) && $status['error']) {
            $this->error('❌ Session error: ' . $status['message']);
            return 1;
        }
        
        if (($status['status'] ?? '') !== 'WORKING') {
            $this->error('❌ Session not working. Status: ' . ($status['status'] ?? 'Unknown'));
            $this->warn('Run: php artisan whatsapp:qr to authenticate');
            return 1;
        }
        
        $this->line('✅ Session is working');
        $this->line('Connected as: ' . ($status['me']['user']['name'] ?? 'Unknown'));
        
        // Check if number exists (optional)
        $this->line('2️⃣ Checking if number exists on WhatsApp...');
        $numberCheck = $whatsappService->checkNumberExists($phone);
        if ($numberCheck && isset($numberCheck['exists']) && !$numberCheck['exists']) {
            $this->warn('⚠️ Number may not exist on WhatsApp');
        } else {
            $this->line('✅ Number check passed');
        }
        
        // Send message
        $this->line('3️⃣ Sending message with anti-spam protection...');
        $this->line('   - Sending seen status...');
        $this->line('   - Starting typing indicator...');
        $this->line('   - Waiting realistic typing time...');
        $this->line('   - Stopping typing indicator...');
        $this->line('   - Sending actual message...');
        
        $result = $whatsappService->sendMessage($phone, $message);
        
        if ($result['success']) {
            $this->info('✅ Message sent successfully!');
            if (isset($result['data']['id'])) {
                $this->line('Message ID: ' . $result['data']['id']);
            }
            return 0;
        } else {
            $this->error('❌ Failed to send message: ' . $result['error']);
            if (isset($result['response'])) {
                $this->line('Response: ' . $result['response']);
            }
            return 1;
        }
        
    } catch (\Exception $e) {
        $this->error('❌ Error: ' . $e->getMessage());
        return 1;
    }
})->purpose('Test send WhatsApp message');

// Test class registration message
Artisan::command('whatsapp:test-registration {phone}', function () {
    $phone = $this->argument('phone');
    
    $this->info('🔄 Testing class registration message...');
    
    try {
        $whatsappService = new App\Services\WhatsAppService();
        
        // Sample registration data
        $data = [
            'nama' => 'John Doe',
            'kelas_nama' => 'Kelas Masak Tradisional',
            'tanggal' => '25 Desember 2024',
            'hari' => 'Rabu',
            'kategori' => 'Masak',
            'grup_wa' => 'https://chat.whatsapp.com/sample123'
        ];
        
        $result = $whatsappService->sendClassRegistrationMessage($phone, $data);
        
        if ($result['success']) {
            $this->info('✅ Registration message sent successfully!');
            return 0;
        } else {
            $this->error('❌ Failed: ' . $result['error']);
            return 1;
        }
        
    } catch (\Exception $e) {
        $this->error('❌ Error: ' . $e->getMessage());
        return 1;
    }
})->purpose('Test class registration WhatsApp message');

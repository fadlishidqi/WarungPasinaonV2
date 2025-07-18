<?php
// app/Console/Commands/DebugWhatsApp.php
namespace App\Console\Commands;

use Illuminate\Console\Command;

class DebugWhatsApp extends Command
{
    protected $signature = 'whatsapp:debug';
    protected $description = 'Debug WhatsApp configuration';

    public function handle()
    {
        $this->info('WhatsApp Configuration Debug');
        $this->line('============================');
        
        $config = [
            'Base URL' => config('whatsapp.base_url'),
            'Session Name' => config('whatsapp.session_name'),
            'API Key' => config('whatsapp.api_key') ? 'Configured (' . substr(config('whatsapp.api_key'), 0, 8) . '...)' : 'NOT CONFIGURED',
            'Enabled' => config('whatsapp.enabled') ? 'Yes' : 'No',
        ];
        
        foreach ($config as $key => $value) {
            $this->line("{$key}: {$value}");
        }
        
        $this->newLine();
        
        // Test simple HTTP request
        try {
            $this->info('Testing basic HTTP connection...');
            
            $client = new \GuzzleHttp\Client(['timeout' => 10]);
            $response = $client->get('https://httpbin.org/get');
            $this->line('✅ Basic HTTP works: ' . $response->getStatusCode());
            
        } catch (\Exception $e) {
            $this->error('❌ Basic HTTP failed: ' . $e->getMessage());
        }
        
        // Test WAHA connection
        try {
            $this->info('Testing WAHA server connection...');
            
            $client = new \GuzzleHttp\Client([
                'timeout' => 10,
                'headers' => [
                    'X-Api-Key' => config('whatsapp.api_key'),
                    'Accept' => 'application/json',
                ]
            ]);
            
            $response = $client->get(config('whatsapp.base_url') . '/api/sessions');
            $this->line('✅ WAHA server responds: ' . $response->getStatusCode());
            
            $sessions = json_decode($response->getBody()->getContents(), true);
            $this->line('Sessions found: ' . count($sessions));
            
        } catch (\Exception $e) {
            $this->error('❌ WAHA connection failed: ' . $e->getMessage());
            if ($e->getResponse()) {
                $this->line('Response: ' . $e->getResponse()->getBody()->getContents());
            }
        }
        
        return Command::SUCCESS;
    }
}
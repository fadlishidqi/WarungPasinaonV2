<?php
// app/Console/Commands/WhatsAppStatus.php
namespace App\Console\Commands;

use App\Services\WhatsAppService;
use Illuminate\Console\Command;

class WhatsAppStatus extends Command
{
    protected $signature = 'whatsapp:status';
    protected $description = 'Check WhatsApp session status and health';

    public function handle()
    {
        $whatsappService = new WhatsAppService();
        
        $this->info('WhatsApp Session Status');
        $this->line('========================');
        
        $status = $whatsappService->getSessionStatus();
        
        if (!$status) {
            $this->error('❌ Could not retrieve session status');
            return Command::FAILURE;
        }
        
        $this->table(
            ['Property', 'Value'],
            [
                ['Session Name', config('whatsapp.session_name')],
                ['Status', $status['status'] ?? 'Unknown'],
                ['Base URL', config('whatsapp.base_url')],
                ['Connected As', $status['me']['user']['name'] ?? 'Unknown'],
                ['Phone', $status['me']['user']['id'] ?? 'Unknown'],
                ['Enabled', config('whatsapp.enabled') ? 'Yes' : 'No'],
            ]
        );
        
        if (($status['status'] ?? '') === 'WORKING') {
            $this->info('✅ WhatsApp session is working properly');
            return Command::SUCCESS;
        } else {
            $this->error('❌ WhatsApp session is not working');
            return Command::FAILURE;
        }
    }
}
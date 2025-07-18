<?php
// app/Jobs/SendWhatsAppNotification.php
namespace App\Jobs;

use App\Services\WhatsAppService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class SendWhatsAppNotification implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $phoneNumber;
    public $data;
    public $tries = 3;
    public $timeout = 60; // Increased timeout for anti-spam delays
    public $backoff = [30, 60, 120]; // Exponential backoff in seconds

    public function __construct($phoneNumber, $data)
    {
        $this->phoneNumber = $phoneNumber;
        $this->data = $data;
    }


    public function handle()
    {
        \Log::info('Processing WhatsApp notification job', [
            'phone' => $this->phoneNumber,
            'attempt' => $this->attempts(),
            'class' => $this->data['kelas_nama'] ?? 'Unknown'
        ]);

        if (!config('whatsapp.enabled')) {
            \Log::info('WhatsApp is disabled, skipping notification');
            return;
        }

        $whatsappService = new WhatsAppService();
        
        // Check if WhatsApp session is active
        $sessionStatus = $whatsappService->getSessionStatus();
        if (!$sessionStatus || !isset($sessionStatus['status']) || $sessionStatus['status'] !== 'WORKING') {
            \Log::error('WhatsApp session not active', [
                'session_status' => $sessionStatus,
                'phone' => $this->phoneNumber
            ]);
            
            throw new \Exception('WhatsApp session not active');
        }

        // Skip number check - send message directly
        \Log::info('Sending WhatsApp message (skipping number check)');
        
        $result = $whatsappService->sendClassRegistrationMessage($this->phoneNumber, $this->data);

        if (!$result['success']) {
            \Log::error('WhatsApp notification failed', [
                'phone' => $this->phoneNumber,
                'error' => $result['error'],
                'attempt' => $this->attempts()
            ]);
            
            throw new \Exception('WhatsApp notification failed: ' . $result['error']);
        }

        \Log::info('WhatsApp notification sent successfully', [
            'phone' => $this->phoneNumber,
            'class' => $this->data['kelas_nama'],
            'message_id' => $result['data']['id'] ?? null
        ]);
    }

    public function failed(\Throwable $exception)
    {
        Log::error('WhatsApp notification job failed permanently', [
            'phone' => $this->phoneNumber,
            'class' => $this->data['kelas_nama'] ?? 'Unknown',
            'error' => $exception->getMessage(),
            'attempts' => $this->attempts()
        ]);

    }

    /**
     * Calculate the number of seconds to wait before retrying the job.
     */
    public function backoff()
    {
        return $this->backoff;
    }
}
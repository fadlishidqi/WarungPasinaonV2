<?php
// app/Services/WhatsAppService.php
namespace App\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Support\Facades\Log;

class WhatsAppService
{
    private $client;
    private $baseUrl;
    private $sessionName;
    private $apiKey;

    public function __construct()
    {
        $this->baseUrl = config('whatsapp.base_url');
        $this->sessionName = config('whatsapp.session_name', 'default');
        $this->apiKey = config('whatsapp.api_key');
        
        if (!$this->apiKey) {
            throw new \Exception('WhatsApp API key must be configured');
        }
        
        $this->client = new Client([
            'timeout' => 30,
            'connect_timeout' => 10,
            'headers' => [
                'Accept' => 'application/json',
                'Content-Type' => 'application/json',
                'X-Api-Key' => $this->apiKey, // API Key authentication
            ]
        ]);
    }

    /**
     * Get default request options with API key
     */
    private function getRequestOptions($additionalOptions = [])
    {
        $defaultOptions = [
            'headers' => [
                'Accept' => 'application/json',
                'Content-Type' => 'application/json',
                'X-Api-Key' => $this->apiKey,
            ]
        ];
        
        return array_merge_recursive($defaultOptions, $additionalOptions);
    }

    /**
     * Kirim pesan WhatsApp dengan anti-spam protection
     */
    public function sendMessage($phoneNumber, $message)
    {
        try {
            // Format nomor telepon
            $formattedPhone = $this->formatPhoneNumber($phoneNumber);
            $chatId = $formattedPhone . '@c.us';
            
            Log::info('Starting WhatsApp message process', [
                'phone' => $formattedPhone,
                'message_length' => strlen($message)
            ]);

            // Step 1: Send seen
            $this->sendSeen($chatId);
            
            // Step 2: Start typing
            $this->startTyping($chatId);
            
            // Step 3: Wait random interval based on message length
            $this->waitTypingInterval($message);
            
            // Step 4: Stop typing
            $this->stopTyping($chatId);
            
            // Step 5: Send the actual message
            $result = $this->sendTextMessage($chatId, $message);

            if ($result['success']) {
                Log::info('WhatsApp message sent successfully', [
                    'phone' => $formattedPhone,
                    'message_id' => $result['data']['id'] ?? null
                ]);
            }

            return $result;

        } catch (\Exception $e) {
            Log::error('WhatsApp message process failed', [
                'phone' => $phoneNumber,
                'error' => $e->getMessage()
            ]);

            return [
                'success' => false,
                'error' => $e->getMessage()
            ];
        }
    }

    /**
     * Step 1: Send seen status
     */
    private function sendSeen($chatId)
    {
        try {
            $response = $this->client->post("{$this->baseUrl}/api/sendSeen", 
                $this->getRequestOptions([
                    'json' => [
                        'session' => $this->sessionName,
                        'chatId' => $chatId
                    ]
                ])
            );

            Log::debug('Sent seen status', ['chatId' => $chatId]);
            return true;

        } catch (RequestException $e) {
            Log::warning('Failed to send seen status', [
                'chatId' => $chatId,
                'error' => $e->getMessage(),
                'status_code' => $e->getResponse() ? $e->getResponse()->getStatusCode() : null,
                'response' => $e->getResponse() ? $e->getResponse()->getBody()->getContents() : null
            ]);
            return false;
        }
    }

    /**
     * Step 2: Start typing indicator
     */
    private function startTyping($chatId)
    {
        try {
            $response = $this->client->post("{$this->baseUrl}/api/startTyping", 
                $this->getRequestOptions([
                    'json' => [
                        'session' => $this->sessionName,
                        'chatId' => $chatId
                    ]
                ])
            );

            Log::debug('Started typing indicator', ['chatId' => $chatId]);
            return true;

        } catch (RequestException $e) {
            Log::warning('Failed to start typing', [
                'chatId' => $chatId,
                'error' => $e->getMessage(),
                'status_code' => $e->getResponse() ? $e->getResponse()->getStatusCode() : null,
                'response' => $e->getResponse() ? $e->getResponse()->getBody()->getContents() : null
            ]);
            return false;
        }
    }

    /**
     * Step 3: Wait with random interval based on message length
     */
    private function waitTypingInterval($message)
    {
        $messageLength = strlen($message);
        
        // Calculate typing time based on message length
        $baseTypingTime = ($messageLength / config('whatsapp.typing_speed', 200)) * 60;
        
        // Add random variation (50% to 150% of base time)
        $minTime = max(config('whatsapp.min_typing_time', 2), $baseTypingTime * 0.5);
        $maxTime = min(config('whatsapp.max_typing_time', 15), $baseTypingTime * 1.5);
        
        $typingTime = rand($minTime * 100, $maxTime * 100) / 100;
        
        Log::debug('Typing simulation', [
            'message_length' => $messageLength,
            'typing_time' => $typingTime . ' seconds'
        ]);
        
        usleep($typingTime * 1000000);
    }

    /**
     * Step 4: Stop typing indicator
     */
    private function stopTyping($chatId)
    {
        try {
            $response = $this->client->post("{$this->baseUrl}/api/stopTyping", 
                $this->getRequestOptions([
                    'json' => [
                        'session' => $this->sessionName,
                        'chatId' => $chatId
                    ]
                ])
            );

            Log::debug('Stopped typing indicator', ['chatId' => $chatId]);
            return true;

        } catch (RequestException $e) {
            Log::warning('Failed to stop typing', [
                'chatId' => $chatId,
                'error' => $e->getMessage(),
                'status_code' => $e->getResponse() ? $e->getResponse()->getStatusCode() : null,
                'response' => $e->getResponse() ? $e->getResponse()->getBody()->getContents() : null
            ]);
            return false;
        }
    }

    /**
     * Step 5: Send the actual text message
     */
    private function sendTextMessage($chatId, $message)
    {
        try {
            $response = $this->client->post("{$this->baseUrl}/api/sendText", 
                $this->getRequestOptions([
                    'json' => [
                        'session' => $this->sessionName,
                        'chatId' => $chatId,
                        'text' => $message
                    ]
                ])
            );

            $result = json_decode($response->getBody()->getContents(), true);
            
            return [
                'success' => true,
                'data' => $result
            ];

        } catch (RequestException $e) {
            $errorBody = $e->getResponse() ? $e->getResponse()->getBody()->getContents() : null;
            
            Log::error('Failed to send text message', [
                'chatId' => $chatId,
                'error' => $e->getMessage(),
                'status_code' => $e->getResponse() ? $e->getResponse()->getStatusCode() : null,
                'response' => $errorBody
            ]);

            return [
                'success' => false,
                'error' => $e->getMessage(),
                'status_code' => $e->getResponse() ? $e->getResponse()->getStatusCode() : null,
                'response' => $errorBody
            ];
        }
    }

    /**
     * Kirim pesan dengan template untuk pendaftaran kelas
     */
    public function sendClassRegistrationMessage($phoneNumber, $data)
    {
        $message = $this->buildClassRegistrationMessage($data);
        return $this->sendMessage($phoneNumber, $message);
    }

    /**
     * Format nomor telepon Indonesia
     */
    private function formatPhoneNumber($phoneNumber)
    {
        // Hapus semua karakter non-digit
        $phone = preg_replace('/[^0-9]/', '', $phoneNumber);
        
        // Jika dimulai dengan 0, ganti dengan 62
        if (substr($phone, 0, 1) === '0') {
            $phone = '62' . substr($phone, 1);
        }
        
        // Jika belum ada kode negara, tambahkan 62
        if (substr($phone, 0, 2) !== '62') {
            $phone = '62' . $phone;
        }
        
        return $phone;
    }

    /**
     * Build message template untuk pendaftaran kelas
     */
    private function buildClassRegistrationMessage($data)
    {
        $message = "🎉 *PENDAFTARAN BERHASIL!*\n\n";
        $message .= "Halo *{$data['nama']}*! 👋\n\n";
        $message .= "Selamat! Pendaftaran Anda untuk kelas *{$data['kelas_nama']}* telah berhasil!\n\n";
        $message .= "📋 *Detail Kelas:*\n";
        $message .= "🎯 Kelas: {$data['kelas_nama']}\n";
        $message .= "📅 Tanggal: {$data['tanggal']}\n";
        $message .= "📍 Hari: {$data['hari']}\n";
        $message .= "🏷️ Kategori: {$data['kategori']}\n\n";
        
        if (isset($data['grup_wa']) && $data['grup_wa']) {
            $message .= "💬 *Grup WhatsApp Kelas:*\n";
            $message .= "Silakan bergabung dengan grup WhatsApp kelas untuk mendapatkan informasi lebih lanjut:\n";
            $message .= "👉 {$data['grup_wa']}\n\n";
        }
        
        $message .= "📞 *Informasi Kontak:*\n";
        $message .= "Jika ada pertanyaan, silakan hubungi kami melalui WhatsApp ini.\n\n";
        $message .= "Terima kasih telah bergabung dengan *Warung Pasinaon*! 🙏\n\n";
        $message .= "Sampai jumpa di kelas! 📚✨\n\n";
        $message .= "_Pesan ini dikirim otomatis oleh sistem._";
        
        return $message;
    }

    /**
     * Cek status session WhatsApp
     */
    public function getSessionStatus()
    {
        try {
            Log::info('Getting WhatsApp session status', [
                'base_url' => $this->baseUrl,
                'session_name' => $this->sessionName
            ]);

            $response = $this->client->get("{$this->baseUrl}/api/sessions/{$this->sessionName}", 
                $this->getRequestOptions()
            );

            $result = json_decode($response->getBody()->getContents(), true);
            
            Log::info('WhatsApp session status retrieved successfully', [
                'status' => $result['status'] ?? 'Unknown',
                'session' => $this->sessionName
            ]);
            
            return $result;

        } catch (RequestException $e) {
            $statusCode = $e->getResponse() ? $e->getResponse()->getStatusCode() : 'No response';
            $responseBody = $e->getResponse() ? $e->getResponse()->getBody()->getContents() : 'No response body';
            
            Log::error('Failed to get WhatsApp session status', [
                'base_url' => $this->baseUrl,
                'session_name' => $this->sessionName,
                'status_code' => $statusCode,
                'error' => $e->getMessage(),
                'response' => $responseBody
            ]);
            
            return [
                'error' => true,
                'message' => $e->getMessage(),
                'status_code' => $statusCode,
                'response' => $responseBody
            ];
        } catch (\Exception $e) {
            Log::error('Unexpected error getting session status', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return [
                'error' => true,
                'message' => $e->getMessage()
            ];
        }
    }

    /**
     * Get all sessions
     */
    public function getAllSessions()
    {
        try {
            $response = $this->client->get("{$this->baseUrl}/api/sessions", 
                $this->getRequestOptions()
            );

            return json_decode($response->getBody()->getContents(), true);

        } catch (RequestException $e) {
            Log::error('Failed to get all sessions', [
                'error' => $e->getMessage(),
                'status_code' => $e->getResponse() ? $e->getResponse()->getStatusCode() : null,
                'response' => $e->getResponse() ? $e->getResponse()->getBody()->getContents() : null
            ]);
            return null;
        }
    }

    /**
     * Cek apakah nomor terdaftar di WhatsApp
     */
    public function checkNumberExists($phoneNumber)
    {
        try {
            $formattedPhone = $this->formatPhoneNumber($phoneNumber);
            
            $response = $this->client->post("{$this->baseUrl}/api/checkNumberStatus", 
                $this->getRequestOptions([
                    'json' => [
                        'session' => $this->sessionName,
                        'phone' => $formattedPhone
                    ]
                ])
            );

            $result = json_decode($response->getBody()->getContents(), true);
            return $result;

        } catch (RequestException $e) {
            Log::error('Failed to check number status', [
                'phone' => $phoneNumber,
                'error' => $e->getMessage(),
                'status_code' => $e->getResponse() ? $e->getResponse()->getStatusCode() : null,
                'response' => $e->getResponse() ? $e->getResponse()->getBody()->getContents() : null
            ]);
            return null;
        }
    }

    /**
     * Create new session
     */
    public function createSession($sessionName = null)
    {
        try {
            $sessionName = $sessionName ?: $this->sessionName;
            
            $response = $this->client->post("{$this->baseUrl}/api/sessions", 
                $this->getRequestOptions([
                    'json' => [
                        'name' => $sessionName,
                        'config' => [
                            'proxy' => null,
                            'webhooks' => []
                        ]
                    ]
                ])
            );
            
            return json_decode($response->getBody()->getContents(), true);

        } catch (RequestException $e) {
            Log::error('Failed to create session', [
                'session_name' => $sessionName,
                'error' => $e->getMessage(),
                'status_code' => $e->getResponse() ? $e->getResponse()->getStatusCode() : null,
                'response' => $e->getResponse() ? $e->getResponse()->getBody()->getContents() : null
            ]);
            return null;
        }
    }
}
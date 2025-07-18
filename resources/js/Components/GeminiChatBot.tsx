import React, { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
    role: "user" | "model";
    text: string;
    timestamp: Date;
    isComplete?: boolean;
}

interface GeminiChatBotProps {
    position?: "bottom-right" | "bottom-left";
}

const GeminiChatBot: React.FC<GeminiChatBotProps> = ({
    position = "bottom-right",
}) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "model",
            text: "Halo! Saya WarungPasinaonBot, pustakawan digital di TBM Warung Pasinaon. Ada yang bisa saya bantu?",
            timestamp: new Date(),
            isComplete: true,
        },
    ]);
    const [inputText, setInputText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const genAI = useRef<GoogleGenerativeAI | null>(null);
    const model = useRef<any>(null);

    useEffect(() => {
        if (apiKey) {
            genAI.current = new GoogleGenerativeAI(apiKey);
            model.current = genAI.current.getGenerativeModel({
                model: "gemini-2.0-flash-exp",
                systemInstruction: `Kamu adalah WarungPasinaonBot, pustakawan digital di TBM Warung Pasinaon. Tugasmu:
- Menjawab pertanyaan tentang koleksi buku
- Memberi rekomendasi bacaan sesuai umur dan minat
- Menjelaskan aturan peminjaman dan jam operasional
- Mendorong budaya literasi dengan ide kreatif

Gaya bahasa:
- Gunakan bahasa Indonesia santun dan mudah dipahami
- Sisipkan istilah Jawa ringan seperti "monggo" atau "nuwun sewu"
- Berikan respons lengkap dalam satu kali kirim`,
            });
        }
    }, [apiKey]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const generateResponse = async (userInput: string) => {
        if (!model.current) return;

        try {
            setIsLoading(true);
            setIsTyping(true);

            const chatHistory = messages
                .filter((msg) => msg.isComplete && msg !== messages[0])
                .map((msg) => ({
                    role: msg.role,
                    parts: [{ text: msg.text }],
                }));

            const chat = model.current.startChat({
                history: chatHistory,
                generationConfig: {
                    maxOutputTokens: 1000,
                    temperature: 0.7,
                },
            });

            const result = await chat.sendMessage(userInput);
            const responseText = result.response.text();

            setTimeout(() => {
                setIsTyping(false);
                const botMessage: Message = {
                    role: "model",
                    text: responseText,
                    timestamp: new Date(),
                    isComplete: true,
                };
                setMessages((prev) => [...prev, botMessage]);
            }, 1000);
        } catch (error) {
            console.error("Error generating response:", error);
            setTimeout(() => {
                setIsTyping(false);
                const errorMessage: Message = {
                    role: "model",
                    text: "Nuwun sewu, terjadi kesalahan. Monggo dicoba lagi nanti ya! 🙏",
                    timestamp: new Date(),
                    isComplete: true,
                };
                setMessages((prev) => [...prev, errorMessage]);
            }, 1000);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendMessage = async () => {
        if (!inputText.trim() || isLoading) return;

        const userMessage: Message = {
            role: "user",
            text: inputText,
            timestamp: new Date(),
            isComplete: true,
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputText("");

        await generateResponse(inputText);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    // Fixed positioning classes for mobile
    const positionClasses = {
        "bottom-right": "bottom-4 right-4 sm:bottom-6 sm:right-6",
        "bottom-left": "bottom-4 left-4 sm:bottom-6 sm:left-6",
    };

    if (!apiKey) {
        return null;
    }

    return (
        <div
            className={`fixed ${positionClasses[position]} z-[9999]`}
            style={{ zIndex: 9999 }}
        >
            <AnimatePresence>
                {!isOpen ? (
                    <motion.button
                        onClick={() => setIsOpen(true)}
                        className="
                            bg-gray-900 hover:bg-gray-800 text-white 
                            rounded-full p-3 sm:p-4 shadow-lg 
                            transition-colors duration-200
                            border-2 border-gray-700
                        "
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Buka chat bot"
                    >
                        <svg
                            className="w-5 h-5 sm:w-6 sm:h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                        </svg>
                    </motion.button>
                ) : (
                    <motion.div
                        className="
                            bg-white border border-gray-200 shadow-xl
                            rounded-lg overflow-hidden
                            fixed inset-x-4 bottom-4 top-4
                            sm:relative sm:inset-auto sm:w-80 sm:h-[500px]
                            flex flex-col
                        "
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        style={{ maxHeight: "calc(100vh - 2rem)" }}
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white p-4 flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                                    <span className="text-sm">🤖</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm sm:text-base">
                                        WarungPasinaon Bot
                                    </h3>
                                    <div className="flex items-center space-x-1">
                                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                        <span className="text-xs opacity-90">
                                            Online
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsOpen(false)}
                                className="hover:bg-gray-800 rounded-full p-2 transition-colors"
                                aria-label="Tutup chat"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`flex ${
                                        message.role === "user"
                                            ? "justify-end"
                                            : "justify-start"
                                    }`}
                                >
                                    <div
                                        className={`
                                            max-w-[85%] sm:max-w-xs px-3 py-2 sm:px-4 sm:py-3 rounded-2xl text-sm
                                            ${
                                                message.role === "user"
                                                    ? "bg-blue-600 text-white rounded-br-sm"
                                                    : "bg-white text-gray-800 border border-gray-200 rounded-bl-sm shadow-sm"
                                            }
                                        `}
                                    >
                                        <div className="leading-relaxed">
                                            {message.text}
                                        </div>
                                        <div
                                            className={`text-xs mt-1 opacity-70 ${
                                                message.role === "user"
                                                    ? "text-blue-100"
                                                    : "text-gray-500"
                                            }`}
                                        >
                                            {message.timestamp.toLocaleTimeString(
                                                "id-ID",
                                                {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                }
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Typing Indicator */}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white text-gray-800 border border-gray-200 rounded-2xl rounded-bl-sm shadow-sm max-w-xs px-4 py-3">
                                        <div className="flex space-x-1 items-center">
                                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                                            <div
                                                className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                                                style={{
                                                    animationDelay: "0.2s",
                                                }}
                                            />
                                            <div
                                                className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                                                style={{
                                                    animationDelay: "0.4s",
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-3 sm:p-4 border-t border-gray-200 bg-white">
                            <div className="flex space-x-3">
                                <input
                                    type="text"
                                    value={inputText}
                                    onChange={(e) =>
                                        setInputText(e.target.value)
                                    }
                                    onKeyPress={handleKeyPress}
                                    placeholder="Ketik pesan Anda..."
                                    className="
                                        flex-1 px-3 py-2 sm:px-4 sm:py-3 
                                        border border-gray-300 rounded-lg 
                                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                        bg-white text-gray-900 text-sm
                                        placeholder-gray-500
                                    "
                                    disabled={isLoading || isTyping}
                                />
                                <button
                                    onClick={handleSendMessage}
                                    disabled={
                                        !inputText.trim() ||
                                        isLoading ||
                                        isTyping
                                    }
                                    className="
                                        bg-blue-600 hover:bg-blue-700 text-white
                                        px-3 py-2 sm:px-4 sm:py-3 rounded-lg 
                                        transition-colors duration-200
                                        disabled:opacity-50 disabled:cursor-not-allowed
                                        flex items-center justify-center
                                        min-w-[44px] sm:min-w-[48px]
                                    "
                                >
                                    {isLoading ? (
                                        <svg
                                            className="w-4 h-4 sm:w-5 sm:h-5 animate-spin"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            className="w-4 h-4 sm:w-5 sm:h-5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default GeminiChatBot;

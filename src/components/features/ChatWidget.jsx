import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';

const INITIAL_MESSAGE = "Hello! How can I help you today?";

const NovaGuideWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, type: 'ai', text: INITIAL_MESSAGE, timestamp: new Date() }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Auto-scroll whenever messages or typing state changes
    useEffect(() => {
        if (isOpen) {
            // Small timeout ensures DOM updates before scrolling
            setTimeout(scrollToBottom, 50);
        }
    }, [messages, isTyping, isOpen]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const newUserMessage = {
            id: Date.now(),
            type: 'user',
            text: inputValue,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newUserMessage]);
        setInputValue('');
        setIsTyping(true);

        // Simulate AI thinking and responding based on Jobos/Salinas context
        setTimeout(() => {
            let aiResponse = "";
            const lowerInput = newUserMessage.text.toLowerCase();

            if (lowerInput.match(/\b(hi|hello|hey|greetings|howdy)\b/)) {
                aiResponse = "Hello Isaac! How are you doing today?";
            } else if (lowerInput.match(/\b(how are you|how you doing|whats up|what's up)\b/)) {
                aiResponse = "I'm doing great! How can I help you today?";
            } else if (lowerInput.includes('jobos')) {
                aiResponse = "For Jobos, we have active Change Notifications (e.g., CN-1 Full NTP, CN-77 SAFT container water issues) and cold commissioning blockers like the MV transformer radiator repair (CO#5).";
            } else if (lowerInput.includes('salinas')) {
                aiResponse = "Regarding Salinas, Fluence logistics and warranty extensions are hot priorities. I'm also tracking the Expansion 75MW logistics claim (CN-56/63).";
            } else if (lowerInput.includes('hugo') || lowerInput.includes('hitachi')) {
                aiResponse = "Based on the Hugo Briefing for the Hitachi J&S Call, he needs to approve CO#5 ASAP and decide on the MET integration into the PPC scope by mid-March.";
            } else {
                aiResponse = "I'm still learning! Try asking me about Jobos or Salinas, and I'll pull relevant signals from the vault.";
            }

            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                type: 'ai',
                text: aiResponse,
                timestamp: new Date()
            }]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100]">
            <AnimatePresence>
                {isOpen ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        // High contrast solid background: #111111 body, #1E1E1E header/footer
                        className="mb-4 w-[400px] h-[600px] max-w-[calc(100vw-3rem)] max-h-[calc(100vh-6rem)] rounded-xl border border-white/20 bg-[#111111] shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header - Solid Dark Grey */}
                        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#1A1A1A]">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-orange-500/10 border border-orange-500/50">
                                        <Bot className="w-5 h-5 text-orange-500" />
                                    </div>
                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#1A1A1A] rounded-full"></span>
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-white flex items-center gap-2 tracking-wide">
                                        NOVA GUIDE <Sparkles className="w-3 h-3 text-orange-400" />
                                    </h3>
                                    <p className="text-[11px] text-gray-400 font-medium">Assistant command center</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 rounded-md hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Chat Area */}
                        <div className="flex-1 overflow-y-auto p-5 pb-8 space-y-6 scrollbar-hide">
                            <div className="text-center pt-2 pb-4">
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-[#1A1A1A] px-3 py-1 rounded-md">
                                    Live Vault Connection
                                </span>
                            </div>

                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}
                                >
                                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1 ${msg.type === 'ai'
                                        ? 'bg-orange-500/10 text-orange-500'
                                        : 'bg-white/10 text-white'
                                        }`}>
                                        {msg.type === 'ai' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                                    </div>
                                    <div className={`flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'} max-w-[80%]`}>
                                        {msg.type === 'ai' && (
                                            <span className="text-[11px] font-bold text-gray-400 mb-1 ml-1">NOVA GUIDE</span>
                                        )}
                                        <div className={`px-4 py-3 text-[15px] leading-relaxed shadow-sm ${msg.type === 'user'
                                            ? 'bg-[#2A2A2A] text-white font-medium rounded-2xl rounded-tr-sm'
                                            : 'bg-transparent text-gray-200 border-l-2 border-orange-500/50 pl-4 py-1'
                                            }`}>
                                            <p>{msg.text}</p>
                                        </div>
                                        <span className={`text-[10px] mt-1.5 text-gray-500 ${msg.type === 'user' ? 'mr-1' : 'ml-1'}`}>
                                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1 bg-orange-500/10 text-orange-500">
                                        <Bot className="w-4 h-4" />
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <span className="text-[11px] font-bold text-gray-400 mb-1 ml-1">NOVA GUIDE</span>
                                        <div className="bg-[#1A1A1A] rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5 border border-white/5">
                                            <span className="w-1.5 h-1.5 bg-orange-500/70 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                            <span className="w-1.5 h-1.5 bg-orange-500/70 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                            <span className="w-1.5 h-1.5 bg-orange-500/70 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} className="h-1" />
                        </div>

                        {/* Input Area - Solid Dark Grey */}
                        <div className="p-4 border-t border-white/10 bg-[#1A1A1A]">
                            <form
                                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                className="relative flex items-center bg-[#222222] border border-white/10 rounded-xl focus-within:ring-1 focus-within:ring-orange-500/50 focus-within:border-orange-500/50 transition-all"
                            >
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Ask NOVA about assistant, blockers, vendors..."
                                    className="w-full bg-transparent pl-4 pr-12 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none"
                                />
                                <button
                                    type="submit"
                                    disabled={!inputValue.trim() || isTyping}
                                    className="absolute right-2 p-2 rounded-lg bg-orange-500/10 text-orange-500 hover:bg-orange-500 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Send className="w-4 h-4 ml-0.5" />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                ) : (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(true)}
                        className="w-14 h-14 rounded-full bg-[#111111] border border-orange-500/30 flex items-center justify-center shadow-2xl text-orange-500 relative group"
                    >
                        <div className="absolute inset-0 bg-orange-500/10 rounded-full group-hover:bg-orange-500/20 transition-colors"></div>
                        <MessageSquare className="w-6 h-6 relative z-10" />
                        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-[#111111] rounded-full z-20"></span>
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};

export default NovaGuideWidget;


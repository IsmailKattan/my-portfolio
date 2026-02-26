import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

export function Chatbot() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: t('chatbot.greeting'), sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user'
    };

    setMessages([...messages, userMessage]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: 'Thank you for your message! This is a demo chatbot. In a real application, I would provide helpful responses.',
        sender: 'bot'
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-[#00d4ff] text-[#0a0e27] rounded-full p-4 shadow-lg shadow-[#00d4ff]/50 hover:shadow-[#00d4ff]/70 transition-all"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100vw-3rem)] bg-white dark:bg-[#151933] rounded-lg shadow-2xl border border-gray-200 dark:border-[#00d4ff]/20 flex flex-col"
            style={{ height: '500px' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#00d4ff] to-[#0ea5e9] text-[#0a0e27] px-4 py-3 rounded-t-lg">
              <h3 className="font-semibold">{t('chatbot.title')}</h3>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-[#00d4ff] text-[#0a0e27]'
                        : 'bg-gray-100 dark:bg-[#1e2443] text-gray-900 dark:text-[#e4e7f1] border border-gray-200 dark:border-[#00d4ff]/10'
                    }`}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 dark:border-[#00d4ff]/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={t('chatbot.placeholder')}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-[#00d4ff]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00d4ff] bg-white dark:bg-[#1e2443] text-gray-900 dark:text-[#e4e7f1]"
                />
                <button
                  onClick={handleSend}
                  className="bg-[#00d4ff] text-[#0a0e27] px-4 py-2 rounded-lg hover:bg-[#0ea5e9] transition-colors flex items-center gap-2 shadow-lg shadow-[#00d4ff]/30"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Trash2, Info, Bot } from 'lucide-react';
import { useChat } from '../contexts/ChatContext';

const ChatbotPage: React.FC = () => {
  const { messages, loading, sendMessage, clearChat } = useChat();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const typingAudio = useRef<HTMLAudioElement | null>(null);
  const [shouldScroll, setShouldScroll] = useState(true);
  const [userScrolled, setUserScrolled] = useState(false);

  const scrollToBottom = () => {
    if (shouldScroll && !userScrolled && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (messages.length > 0 && !userScrolled) {
      scrollToBottom();
    }
  }, [messages, userScrolled]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 50;
    setUserScrolled(!isAtBottom);
    setShouldScroll(isAtBottom);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !loading) {
      sendMessage(input);
      setInput('');
      setShouldScroll(true);
      setUserScrolled(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    } else {
      if (typingAudio.current && e.key.length === 1) {
        typingAudio.current.currentTime = 0;
        typingAudio.current.play();
      }
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 rounded-t-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full mr-4 transition-colors duration-200">
                  <Bot size={24} className="text-blue-700 dark:text-blue-300" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-200">AI Disaster Assistant</h1>
                  <p className="text-gray-600 dark:text-gray-300 transition-colors duration-200">Powered by Groq + Steller</p>
                </div>
              </div>
              <button
                onClick={clearChat}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                aria-label="Clear chat"
              >
                <Trash2 size={20} />
              </button>
            </div>
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/50 p-4 rounded-lg flex items-start transition-colors duration-200">
              <Info size={20} className="text-blue-700 dark:text-blue-300 mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-blue-800 dark:text-blue-200 transition-colors duration-200">
                I can help with disaster preparedness, evacuation information, emergency contacts, 
                and real-time guidance during emergencies. What do you need assistance with?
              </p>
            </div>
          </div>

          {/* Messages */}
          <div 
            ref={chatContainerRef}
            onScroll={handleScroll}
            className="bg-gray-50 dark:bg-gray-900 border-l border-r border-gray-200 dark:border-gray-700 p-4 h-[400px] overflow-y-auto transition-colors duration-200 scroll-smooth"
          >
            <div className="space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 transition-colors duration-200 ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : message.isError
                        ? 'bg-red-50 dark:bg-red-900/50 text-red-700 dark:text-red-200 border border-red-200 dark:border-red-800'
                        : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </motion.div>
              ))}
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 max-w-[80%] rounded-2xl p-4 transition-colors duration-200">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-b-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 transition-colors duration-200">
            <div className="flex items-end space-x-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-12 max-h-32 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
                rows={1}
              />
              <button
                type="submit"
                className={`p-3 rounded-full transition-all duration-200 ${
                  loading || !input.trim()
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700 dark:hover:bg-blue-500'
                }`}
                disabled={loading || !input.trim()}
              >
                <Send size={20} />
              </button>
            </div>
          </form>

          {/* Example Queries */}
          <div className="mt-6">
            <h3 className="text-gray-700 dark:text-gray-300 font-medium mb-3 transition-colors duration-200">Try asking:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <ExampleQuery query="What should I do to prepare for a hurricane?" onClick={() => { setInput("What should I do to prepare for a hurricane?"); inputRef.current?.focus(); }} />
              <ExampleQuery query="Where can I find emergency shelters near me?" onClick={() => { setInput("Where can I find emergency shelters near me?"); inputRef.current?.focus(); }} />
              <ExampleQuery query="How do I create an emergency kit?" onClick={() => { setInput("How do I create an emergency kit?"); inputRef.current?.focus(); }} />
              <ExampleQuery query="What should I do during a flood?" onClick={() => { setInput("What should I do during a flood?"); inputRef.current?.focus(); }} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

interface ExampleQueryProps {
  query: string;
  onClick: () => void;
}

const ExampleQuery: React.FC<ExampleQueryProps> = ({ query, onClick }) => (
  <button
    onClick={onClick}
    className="text-left p-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 transition-colors duration-200"
  >
    {query}
  </button>
);

export default ChatbotPage;



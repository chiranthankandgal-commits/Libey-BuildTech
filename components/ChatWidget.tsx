
import React, { useState, useRef, useEffect } from 'react';
import { getGeminiResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hello. I am Libey, your digital planning assistant. How can I help you ensure cost certainty on your next project today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg = inputValue.trim();
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await getGeminiResponse(userMsg);
      setMessages(prev => [...prev, { role: 'model', text: response || "I'm having trouble connecting to our experts. Please try again or book a call directly." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Service temporarily unavailable. Please schedule a discovery call for expert advice." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      {isOpen ? (
        <div className="bg-white rounded-2xl shadow-2xl w-80 sm:w-96 flex flex-col overflow-hidden border border-slate-200 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-slate-800 p-4 flex justify-between items-center">
            <div className="flex items-center text-white">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                <i className="fa-solid fa-user-tie text-xs"></i>
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-tight">Libey AI Assistant</h3>
                <p className="text-[10px] text-slate-300 font-medium">BIM-Led Planning Support</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-300 hover:text-white transition-colors">
              <i className="fa-solid fa-minus text-sm"></i>
            </button>
          </div>
          
          <div ref={scrollRef} className="flex-grow p-4 space-y-4 max-h-[400px] overflow-y-auto bg-slate-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-200">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-75"></div>
                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-4 bg-white border-t border-slate-100 flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="How do you handle cost overruns?"
              className="flex-grow bg-slate-100 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none text-slate-800"
            />
            <button 
              onClick={handleSend}
              className="w-10 h-10 bg-slate-800 text-white rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors shadow-md"
            >
              <i className="fa-solid fa-paper-plane text-sm"></i>
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-slate-800 hover:bg-slate-700 text-white px-5 py-3 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-105 group border border-white/10"
        >
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 font-semibold mr-0 group-hover:mr-3">Chat with an Expert&nbsp;</span>
          <i className="fa-solid fa-comment-dots text-xl"></i>
        </button>
      )}
    </div>
  );
};

export default ChatWidget;

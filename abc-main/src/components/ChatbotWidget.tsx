import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { MessageCircle, X, Loader2, Send } from "lucide-react";

interface ChatbotWidgetProps {
  vercelUrl: string;
  iconUrl: string;
  onUpdateConfig?: (vercelUrl: string, iconUrl: string) => void;
}

interface Message {
  role: "user" | "assistant";
  text: string;
}

export default function ChatbotWidget({ vercelUrl, iconUrl }: ChatbotWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: "Halo! Saya Nicole. Ada yang bisa dibantu? 😊" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const kirimPesan = async () => {
    if (!input.trim()) return;

    const cleanUrl = vercelUrl.replace(/\/$/, ""); 
    const apiUrl = `${cleanUrl}/chat`;

    const userMessage: Message = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.text }),
      });

      if (!response.ok) throw new Error("Gagal fetch");

      const data = await response.json();
      const botMessage: Message = { role: "assistant", text: data.reply };
      setMessages((prev) => [...prev, botMessage]);

    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { role: "assistant", text: "❌ Gagal terhubung. Pastikan server Vercel aktif." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") kirimPesan();
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
        >
          <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75 animate-ping group-hover:hidden"></span>
          
          {iconUrl ? (
             <img src={iconUrl} alt="Chat" className="w-full h-full rounded-full object-cover border-2 border-white" />
          ) : (
             <MessageCircle className="w-8 h-8 relative z-10" />
          )}
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[350px] md:w-[380px] h-[550px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100 animate-slide-up font-sans">
          
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 flex items-center justify-between text-white shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm p-0.5 border border-white/30 overflow-hidden">
                {iconUrl ? (
                  <img src={iconUrl} alt="Bot" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-white text-blue-600">
                    <MessageCircle size={20} />
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-bold text-base">Nicole Orithyia</h3>
                <div className="flex items-center gap-1.5 opacity-90">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-xs">Online</span>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => setIsOpen(false)} 
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 bg-slate-50 relative overflow-hidden flex flex-col">
            
            <div className="absolute inset-0 opacity-5 pointer-events-none" 
                 style={{backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)", backgroundSize: "20px 20px"}}>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 relative z-10">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div 
                    className={`max-w-[80%] p-3.5 rounded-2xl text-sm shadow-sm leading-relaxed ${
                      msg.role === "user" 
                        ? "bg-gradient-to-br from-blue-600 to-cyan-600 text-white rounded-br-none" 
                        : "bg-white text-gray-800 border border-gray-100 rounded-bl-none"
                    }`}
                  >
                    {msg.role === "assistant" && (
                      <span className="block text-[10px] font-bold text-cyan-600 mb-1 uppercase tracking-wider">Nicole</span>
                    )}
                    <div className="whitespace-pre-line">{msg.text}</div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start animate-pulse">
                  <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-cyan-600 animate-spin" />
                    <span className="text-xs text-gray-500">Sedang mengetik...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="p-4 bg-white border-t border-gray-100 relative z-20">
            <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-full border border-gray-200 focus-within:ring-2 focus-within:ring-cyan-500/50 focus-within:border-cyan-500 transition-all">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleEnter}
                placeholder="Ketik pesan..."
                className="flex-1 bg-transparent px-4 py-2 outline-none text-sm text-gray-700 placeholder:text-gray-400"
              />
              <button 
                onClick={kirimPesan}
                disabled={!input.trim() || isLoading}
                className="p-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Send size={18} />
              </button>
            </div>
          </div>

        </div>
      )}
    </>
  );
}
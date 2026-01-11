import { useState } from 'react';
import { MessageCircle, X, Settings, Check, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';

interface ChatbotWidgetProps {
  vercelUrl: string;
  iconUrl: string;
  onUpdateConfig: (vercelUrl: string, iconUrl: string) => void;
}

export default function ChatbotWidget({ vercelUrl, iconUrl, onUpdateConfig }: ChatbotWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [configForm, setConfigForm] = useState({ vercelUrl, iconUrl });

  const handleSaveConfig = () => {
    onUpdateConfig(configForm.vercelUrl, configForm.iconUrl);
    setIsConfigOpen(false);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
        {isConfigOpen && (
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 w-80 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <Settings className="w-5 h-5 text-cyan-600" />
                Chatbot Settings
              </h3>
              <button
                onClick={() => setIsConfigOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-700 flex items-center gap-1">
                  <LinkIcon className="w-3 h-3" />
                  Vercel URL
                </label>
                <input
                  type="text"
                  value={configForm.vercelUrl}
                  onChange={(e) => setConfigForm({ ...configForm, vercelUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="https://your-chatbot.vercel.app"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-700 flex items-center gap-1">
                  <ImageIcon className="w-3 h-3" />
                  Icon URL (Image/GIF)
                </label>
                <input
                  type="text"
                  value={configForm.iconUrl}
                  onChange={(e) => setConfigForm({ ...configForm, iconUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="https://example.com/icon.gif"
                />
              </div>

              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p className="text-xs text-gray-600 mb-2 font-medium">Preview:</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-white shadow-md flex-shrink-0">
                    <img
                      src={configForm.iconUrl}
                      alt="Chatbot icon"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/8294620/pexels-photo-8294620.jpeg?auto=compress&cs=tinysrgb&w=200';
                      }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 break-all">
                    {configForm.vercelUrl || 'No URL set'}
                  </div>
                </div>
              </div>

              <button
                onClick={handleSaveConfig}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                Save Configuration
              </button>
            </div>
          </div>
        )}

        {isOpen && (
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-96 h-[500px] flex flex-col animate-scale-in">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-white shadow-md">
                  <img
                    src={iconUrl}
                    alt="Chatbot"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/8294620/pexels-photo-8294620.jpeg?auto=compress&cs=tinysrgb&w=200';
                    }}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-white">AI Assistant</h3>
                  <p className="text-xs text-blue-100">Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-1.5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-hidden">
              <iframe
                src={vercelUrl}
                className="w-full h-full border-0"
                title="Chatbot"
                allow="microphone"
              />
            </div>
          </div>
        )}

        <div className="flex gap-2">
          {!isConfigOpen && (
            <button
              onClick={() => setIsConfigOpen(true)}
              className="bg-white text-gray-700 p-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 border border-gray-200"
              title="Configure Chatbot"
            >
              <Settings className="w-5 h-5" />
            </button>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="group bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 relative"
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <>
                <div className="w-12 h-12 absolute inset-0 flex items-center justify-center">
                  <img
                    src={iconUrl}
                    alt="Chat"
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      const icon = (e.target as HTMLImageElement).nextElementSibling;
                      if (icon) (icon as HTMLElement).style.display = 'block';
                    }}
                  />
                  <MessageCircle className="w-6 h-6 hidden" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
}

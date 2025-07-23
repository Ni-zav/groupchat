import React, { useState, useRef } from 'react';
import { Send, Paperclip, Image, Video, FileText, X } from 'lucide-react';

export interface MessageInputProps {
  onSendMessage: (message: string, type: 'text') => void;
  onFileUpload: (file: File, type: 'image' | 'video' | 'pdf') => void;
  disabled?: boolean;
  isSidebarCollapsed?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ 
  onSendMessage, 
  onFileUpload, 
  disabled = false, 
  isSidebarCollapsed = false
}) => {
  const [message, setMessage] = useState('');
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentFileType, setCurrentFileType] = useState<'image' | 'video' | 'pdf' | null>(null);

  const handleSendMessage = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim(), 'text');
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileSelect = (type: 'image' | 'video' | 'pdf') => {
    setCurrentFileType(type);
    setShowAttachMenu(false);
    
    if (fileInputRef.current) {
      let acceptTypes = '';
      switch (type) {
        case 'image':
          acceptTypes = 'image/*';
          break;
        case 'video':
          acceptTypes = 'video/*';
          break;
        case 'pdf':
          acceptTypes = '.pdf,application/pdf';
          break;
      }
      fileInputRef.current.accept = acceptTypes;
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && currentFileType) {
      onFileUpload(file, currentFileType);
    }
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setCurrentFileType(null);
  };

  return (
    <div className="absolute bottom-0 left-0 right-0">
      {/* Attachment Menu */}
      {showAttachMenu && (
        <>
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setShowAttachMenu(false)}
          />
          <div className={"absolute bottom-full mb-2 bg-gray-800 border border-gray-600 shadow-lg z-50 min-w-48 box-border " + (isSidebarCollapsed
      ? "left-2"
      : "left-80")}>
            <div className="p-2">
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-600">
                <span className="text-white text-sm font-medium">Upload File</span>
                <button
                  onClick={() => setShowAttachMenu(false)}
                  className="text-gray-400 hover:text-white p-1"
                >
                  <X size={14} />
                </button>
              </div>
              
              <div className="space-y-1">
                <button
                  onClick={() => handleFileSelect('image')}
                  className="w-full flex items-center space-x-3 p-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-150"
                >
                  <Image size={18} className="text-green-400" />
                  <span className="text-sm">Upload Image</span>
                </button>
                
                <button
                  onClick={() => handleFileSelect('video')}
                  className="w-full flex items-center space-x-3 p-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-150"
                >
                  <Video size={18} className="text-blue-400" />
                  <span className="text-sm">Upload Video</span>
                </button>
                
                <button
                  onClick={() => handleFileSelect('pdf')}
                  className="w-full flex items-center space-x-3 p-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-150"
                >
                  <FileText size={18} className="text-red-400" />
                  <span className="text-sm">Upload PDF</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Message Input Container */}
      <div
        className="bg-gray-900 border-t border-gray-700 h-20 flex items-center gap-2 px-4"
        style={
          !isSidebarCollapsed && window.innerWidth >= 1024
            ? { marginLeft: '16rem' } // 16rem = 256px = w-64 sidebar
            : {}
        }
      >
        {/* Attachment Button */}
        <button
          onClick={() => setShowAttachMenu(!showAttachMenu)}
          disabled={disabled}
          className="flex-shrink-0 h-12 w-12 flex items-center justify-center bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Attach file"
          tabIndex={0}
          style={{marginTop: 0, marginBottom: 0}}
        >
          <Paperclip size={20} />
        </button>

        {/* Text Input */}
        <div className="flex-1 relative flex items-center h-full">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
            disabled={disabled}
            className="w-full h-12 bg-gray-800 text-white placeholder-gray-400 border border-gray-600 px-4 focus:outline-none focus:border-gray-500 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            autoComplete="off"
            tabIndex={0}
            style={{marginTop: 0, marginBottom: 0}}
          />
        </div>

        {/* Send Button */}
        <button
          onClick={handleSendMessage}
          disabled={!message.trim() || disabled}
          className="flex-shrink-0 h-12 w-12 flex items-center justify-center bg-secondary text-white hover:bg-primary/90 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary"
          aria-label="Send message"
          tabIndex={0}
          style={{marginTop: 0, marginBottom: 0}}
        >
          <Send size={20} />
        </button>
      </div>
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default MessageInput;
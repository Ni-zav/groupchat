import React, { useState } from 'react';
import { MessageProps } from '../types/chat';
import { FileText, Download, AlertTriangle } from 'lucide-react';

const Message: React.FC<MessageProps> = ({ 
  message, 
  isOwnMessage, 
  senderName, 
  senderRole 
}) => {
  const [imageError, setImageError] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const getRoleBadgeColor = (role: number) => {
    switch (role) {
      case 0: return 'bg-red-600 text-white'; // Admin
      case 1: return 'bg-blue-600 text-white'; // Agent
      case 2: return 'bg-green-600 text-white'; // Customer
      default: return 'bg-gray-600 text-white';
    }
  };

  const getRoleName = (role: number) => {
    switch (role) {
      case 0: return 'Admin';
      case 1: return 'Agent';
      case 2: return 'Customer';
      default: return 'User';
    }
  };

  const renderMessageContent = () => {
    switch (message.type) {
      case 'text':
        return (
          <div className="text-white leading-relaxed break-words">
            {message.message}
          </div>
        );

      case 'image':
        return (
          <div className="space-y-2">
            {imageError ? (
              <div className="flex items-center space-x-2 text-red-400 bg-red-900/20 p-3 border border-red-800">
                <AlertTriangle size={20} />
                <span className="text-sm">Failed to load image</span>
              </div>
            ) : (
              <>
                <div className="relative">
                  {imageLoading && (
                    <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center">
                      <div className="text-gray-400 text-sm">Loading...</div>
                    </div>
                  )}
                  <img
                    src={message.message}
                    alt="Shared image"
                    className="max-w-full h-auto max-h-96 w-auto"
                    onLoad={() => setImageLoading(false)}
                    onError={() => {
                      setImageError(true);
                      setImageLoading(false);
                    }}
                    style={{ display: imageLoading ? 'none' : 'block' }}
                  />
                </div>
                {/* Download button for image */}
                {!imageLoading && !imageError && (
                  <div className="flex justify-end mt-1">
                    <a
                      href={message.message}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors duration-150"
                      aria-label="Download Image"
                    >
                      <Download size={18} />
                      <span className="text-sm">Download</span>
                    </a>
                  </div>
                )}
              </>
            )}
          </div>
        );

      case 'video':
        return (
          <div className="space-y-2">
            {videoError ? (
              <div className="flex items-center space-x-2 text-red-400 bg-red-900/20 p-3 border border-red-800">
                <AlertTriangle size={20} />
                <span className="text-sm">Failed to load video</span>
              </div>
            ) : (
              <video
                src={message.message}
                controls
                className="max-w-full h-auto max-h-64 w-auto bg-black"
                onError={() => setVideoError(true)}
                preload="metadata"
              >
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        );

      case 'pdf':
        return (
          <div className="flex items-center space-x-3 p-3 bg-gray-800 border border-gray-700 hover:bg-gray-700 transition-colors duration-150">
            <FileText size={24} className="text-blue-400 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-white font-medium truncate">
                Document.pdf
              </div>
              <div className="text-gray-400 text-sm">
                PDF Document
              </div>
            </div>
            <a
              href={message.message}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors duration-150"
              aria-label="Download PDF"
            >
              <Download size={18} />
              <span className="text-sm">Download</span>
            </a>
          </div>
        );

      default:
        return (
          <div className="text-gray-400 italic">
            Unsupported message type: {message.type}
          </div>
        );
    }
  };

  return (
    <div className={`flex flex-col ${isOwnMessage ? 'items-end' : 'items-start'} mb-4 animate-fade-in`}>
      {/* Sender info - only show for incoming messages */}
      {!isOwnMessage && (
        <div className="flex items-center space-x-2 mb-1 px-2">
          <span className="text-gray-300 text-sm font-medium">
            {senderName}
          </span>
          <span className={`px-2 py-1 text-xs font-medium ${getRoleBadgeColor(senderRole)}`}>
            {getRoleName(senderRole)}
          </span>
        </div>
      )}
      
      {/* Message bubble */}
      <div className={`
        message-bubble
        ${isOwnMessage ? 'message-outgoing' : 'message-incoming'}
        ${isOwnMessage ? 'ml-12' : 'mr-12'}
      `}>
        {renderMessageContent()}
        
        {/* Timestamp */}
        <div className={`text-xs text-gray-400 mt-2 ${isOwnMessage ? 'text-right' : 'text-left'}`}>
          {formatTimestamp(message.timestamp)}
        </div>
      </div>
    </div>
  );
};

export default Message;
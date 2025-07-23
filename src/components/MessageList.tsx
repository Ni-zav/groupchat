import React, { useEffect, useRef } from 'react';
import './hide-scrollbar.css';
import { MessageListProps } from '../types/chat';
import Message from './Message';

const MessageList: React.FC<MessageListProps> = ({ 
  messages, 
  participants, 
  currentUserId = 'admin@company.com' // Default to admin for demo
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Find participant by ID
  const findParticipant = (senderId: string) => {
    return participants.find(p => p.id === senderId);
  };

  if (!messages || messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        <div className="text-center">
          <div className="text-lg mb-2">No messages yet</div>
          <div className="text-sm">Start a conversation!</div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={scrollContainerRef}
      className="flex-1 overflow-y-auto px-2 py-2 hide-scrollbar"
      style={{ maxHeight: 'calc(100vh - 140px)' }}
    >
      <div className="space-y-1">
        {messages.map((message) => {
          const sender = findParticipant(message.sender);
          const isOwnMessage = message.sender === currentUserId;
          
          return (
            <Message
              key={message.id}
              message={message}
              isOwnMessage={isOwnMessage}
              senderName={sender?.name || 'Unknown User'}
              senderRole={sender?.role || 2}
            />
          );
        })}
        
        {/* Invisible element to help with auto-scrolling */}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageList;
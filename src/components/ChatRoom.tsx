import React, { useState } from 'react';
import { ChatRoomProps, ROLE_NAMES } from '../types/chat';
import { Menu, Users, X } from 'lucide-react';
import MemberIndicator from './MemberIndicator';
import MemberListMenu from './MemberListMenu';

const ChatRoom: React.FC<ChatRoomProps> = ({ room, onToggleSidebar }) => {
  if (!room) {
    return (
      <div className="h-16 bg-gray-900 border-b border-gray-700 flex items-center justify-between px-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors duration-150"
            aria-label="Toggle sidebar"
          >
            <Menu size={20} />
          </button>
          <div className="text-gray-400">Select a room to start chatting</div>
        </div>
      </div>
    );
  }

  const getRoleColor = (role: number) => {
    switch (role) {
      case 0: return 'text-red-400'; // Admin
      case 1: return 'text-blue-400'; // Agent  
      case 2: return 'text-green-400'; // Customer
      default: return 'text-gray-400';
    }
  };

  const getStatusIndicator = (role: number) => {
    // Simple online status simulation - admins and agents are usually online
    const isOnline = role === 0 || role === 1;
    return (
      <div className={`w-2 h-2 ${isOnline ? 'bg-green-500' : 'bg-gray-500'} flex-shrink-0`} />
    );
  };

  return (
    <div className="h-16 bg-gray-900 border-b border-gray-700 flex items-center justify-between px-4">
      <div className="flex items-center space-x-4 flex-1 min-w-0">
        {/* Mobile sidebar toggle */}
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors duration-150"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>

        {/* Room image */}
        <div className="w-10 h-10 bg-gray-700 flex-shrink-0 overflow-hidden">
          <img
            src={room.image_url}
            alt={`${room.name} room`}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `<div class="w-full h-full bg-gray-700 flex items-center justify-center text-gray-400 text-sm font-bold">${room.name.charAt(0).toUpperCase()}</div>`;
              }
            }}
          />
        </div>

        {/* Room info */}
        <div className="flex-1 min-w-0">
          <h1 className="text-white font-semibold text-lg truncate">
            {room.name}
          </h1>
          <div className="flex items-center space-x-1 text-sm text-gray-400">
            <Users size={14} />
            <span>{room.participant.length} participants</span>
          </div>
        </div>
      </div>

      {/* Single Member List Toggle Icon */}
      <MemberListMenu participants={room.participant} />
    </div>
  );
};

export default ChatRoom;
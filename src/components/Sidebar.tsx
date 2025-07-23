import React from 'react';
import { SidebarProps, ROLE_NAMES } from '../types/chat';
import { MessageCircle, Users, X, Hash, Github } from 'lucide-react';

const Sidebar: React.FC<SidebarProps> = ({ 
  rooms, 
  activeRoomId, 
  onRoomSelect, 
  isCollapsed, 
  onToggleCollapse 
}) => {
  const getParticipantCount = (room: any) => {
    return room.participant?.length || 0;
  };

  const getOnlineCount = (room: any) => {
    // Simulate online users - admins and agents are typically online
    if (!room.participant) return 0;
    return room.participant.filter((p: any) => p.role === 0 || p.role === 1).length;
  };

  const getRoomInitial = (roomName: string) => {
    return roomName.charAt(0).toUpperCase();
  };

  return (
    <>
      {/* Mobile overlay: only show on mobile when sidebar is open */}
      {!isCollapsed && typeof window !== 'undefined' && window.innerWidth < 1024 && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onToggleCollapse}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:relative top-0 left-0 h-full bg-sidebar-background border-r border-gray-700 z-50
        transition-transform duration-250 ease-out
        ${isCollapsed ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}
        w-64 lg:w-64 flex flex-col
      `}>
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-700 bg-gray-900">
          <div className="flex items-center space-x-2">
            <MessageCircle size={24} className="text-white" />
            <h2 className="text-white font-bold text-lg">Chat Rooms</h2>
          </div>
          
          {/* Mobile close button */}
          <button
            onClick={onToggleCollapse}
            className="lg:hidden p-1 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors duration-150"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Room list */}
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="p-2 space-y-1">
            {rooms.length === 0 ? (
              <div className="text-gray-400 text-center py-8">
                <MessageCircle size={32} className="mx-auto mb-2 opacity-50" />
                <div className="text-sm">No rooms available</div>
              </div>
            ) : (
              rooms.map((room) => {
                const isActive = room.id === activeRoomId;
                const participantCount = getParticipantCount(room);
                const onlineCount = getOnlineCount(room);
                
                return (
                  <button
                    key={room.id}
                    onClick={() => onRoomSelect(room.id)}
                    className={`
                      w-full p-3 text-left transition-colors duration-150
                      hover-surface
                      ${isActive 
                        ? 'bg-sidebar-item-active border-l-4 border-white' 
                        : 'hover:bg-sidebar-item-hover'
                      }
                    `}
                    aria-label={`Select ${room.name} room`}
                  >
                    <div className="flex items-center space-x-3">
                      {/* Room image/avatar */}
                      <div className="w-12 h-12 bg-gray-700 flex-shrink-0 overflow-hidden relative">
                        <img
                          src={room.image_url}
                          alt=""
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              parent.innerHTML = `<div class="w-full h-full bg-gray-700 flex items-center justify-center text-white text-lg font-bold">${getRoomInitial(room.name)}</div>`;
                            }
                          }}
                        />
                        
                        {/* Online indicator */}
                        {onlineCount > 0 && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-sidebar-background flex items-center justify-center">
                            <span className="text-xs text-white font-bold">{onlineCount}</span>
                          </div>
                        )}
                      </div>

                      {/* Room info */}
                      <div className="flex-1 min-w-0">
                        <div className={`font-semibold truncate ${isActive ? 'text-white' : 'text-gray-200'}`}>
                          {room.name}
                        </div>
                        
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                          <div className="flex items-center space-x-1">
                            <Users size={12} />
                            <span>{participantCount}</span>
                          </div>
                          
                          {onlineCount > 0 && (
                            <>
                              <span>•</span>
                              <div className="flex items-center space-x-1 text-green-400">
                                <div className="w-2 h-2 bg-green-500" />
                                <span>{onlineCount} online</span>
                              </div>
                            </>
                          )}
                        </div>

                        {/* Participants preview */}
                        <div className="flex items-center space-x-1 mt-1 text-xs text-gray-500">
                          <Hash size={10} />
                          <span className="truncate">
                            {room.participant?.slice(0, 2).map(p => p.name.split(' ')[0]).join(', ')}
                            {participantCount > 2 && ` +${participantCount - 2} more`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="h-20 flex items-center justify-between border-t border-gray-700 bg-gray-900 px-4">
          <div className="text-xs text-gray-400 w-1/2 truncate">
            {rooms.length} room{rooms.length !== 1 ? 's' : ''} available
          </div>
          <div className="w-1/2 flex justify-end">
            <a
              href="https://github.com/Ni-zav/groupchat"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-2 rounded hover:bg-gray-800 transition-colors duration-150"
              aria-label="View source on GitHub"
            >
              <Github size={20} className="text-gray-400 hover:text-white" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
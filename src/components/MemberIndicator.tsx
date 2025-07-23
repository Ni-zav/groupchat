
import React, { useState } from 'react';
import { User, Crown, Headphones, UserCheck, MoreVertical, X } from 'lucide-react';
import { Participant } from '../types/chat';

interface MemberIndicatorProps {
  participant: Participant;
  showContextMenu?: boolean;
  onMenuToggle?: () => void;
}


const MemberIndicator: React.FC<MemberIndicatorProps> = ({ 
  participant, 
  showContextMenu = false,
  onMenuToggle 
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const getRoleIcon = (role: number) => {
    switch (role) {
      case 0: return <Crown size={14} className="text-yellow-400" />;
      case 1: return <Headphones size={14} className="text-blue-400" />;
      case 2: return <UserCheck size={14} className="text-green-400" />;
      default: return <User size={14} className="text-gray-400" />;
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

  const getRoleColor = (role: number) => {
    switch (role) {
      case 0: return 'text-yellow-400';
      case 1: return 'text-blue-400';
      case 2: return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusColor = (role: number) => {
    const isOnline = role === 0 || role === 1;
    return isOnline ? 'bg-green-500' : 'bg-gray-500';
  };

  const getStatusText = (role: number) => {
    const isOnline = role === 0 || role === 1;
    return isOnline ? 'Online' : 'Away';
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-2 p-2 hover:bg-gray-800 transition-colors duration-150 group cursor-pointer">
        <div className="relative">
          <div className="w-8 h-8 bg-gray-700 flex items-center justify-center text-white text-sm font-bold">
            {participant.name.charAt(0).toUpperCase()}
          </div>
          <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 border-2 border-gray-900 ${getStatusColor(participant.role)}`} />
        </div>
        <div className="flex items-center space-x-1">
          {getRoleIcon(participant.role)}
          <span className="text-gray-300 group-hover:text-white text-sm font-medium">
            {participant.name.split(' ')[0]}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MemberIndicator;
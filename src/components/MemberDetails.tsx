import React from 'react';
import { X } from 'lucide-react';
import { Participant } from '../types/chat';

interface MemberDetailsProps {
  participant: Participant;
  onClose: () => void;
}

const MemberDetails: React.FC<MemberDetailsProps> = ({ participant, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={20} />
        </button>
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-14 h-14 bg-gray-700 flex items-center justify-center text-white text-2xl font-bold rounded-full">
            {participant.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="text-white text-lg font-semibold">{participant.name}</div>
            <div className="text-gray-400 text-sm">{participant.id}</div>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-gray-400 text-sm">Role:</span>
            <span className="text-sm font-medium">{participant.role === 0 ? 'Admin' : participant.role === 1 ? 'Agent' : 'Customer'}</span>
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-gray-400 text-sm">Status:</span>
            <span className="text-sm font-medium">{participant.role === 0 || participant.role === 1 ? 'Online' : 'Away'}</span>
          </div>
        </div>
        <div className="space-y-2">
          <button className="w-full px-4 py-2 bg-gray-800 text-gray-200 rounded hover:bg-gray-700 transition">View Profile</button>
          <button className="w-full px-4 py-2 bg-gray-800 text-gray-200 rounded hover:bg-gray-700 transition">Send Direct Message</button>
          {participant.role !== 0 && (
            <button className="w-full px-4 py-2 bg-red-700 text-white rounded hover:bg-red-600 transition">Manage User</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberDetails;

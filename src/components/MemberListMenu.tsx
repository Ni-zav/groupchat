import React, { useState, useRef, useEffect } from 'react';
import { Users } from 'lucide-react';
import MemberIndicator from './MemberIndicator';
import MemberDetails from './MemberDetails';
import { Participant } from '../types/chat';

interface MemberListMenuProps {
  participants: Participant[];
}

const MemberListMenu: React.FC<MemberListMenuProps> = ({ participants }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Participant|null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-800 transition-colors duration-150 focus:outline-none"
        aria-label="Show members"
        onClick={() => setOpen((v) => !v)}
      >
        <Users size={22} className="text-gray-300" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-64 max-h-80 overflow-y-auto bg-gray-900 border border-gray-700 rounded shadow-lg z-50">
          <div className="p-2">
            <div className="text-gray-400 text-xs mb-2 font-semibold">Members</div>
            {participants.map((participant) => (
              <div key={participant.id} onClick={() => setSelected(participant)}>
                <MemberIndicator participant={participant} />
              </div>
            ))}
          </div>
        </div>
      )}
      {selected && (
        <MemberDetails participant={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
};

export default MemberListMenu;

// TypeScript interfaces for the group chat application

export interface Participant {
  id: string;
  name: string;
  role: 0 | 1 | 2; // 0: Admin, 1: Agent, 2: Customer
}

export interface Room {
  name: string;
  id: number;
  image_url: string;
  participant: Participant[];
}

export interface Message {
  id: number;
  type: 'text' | 'image' | 'video' | 'pdf';
  message: string;
  sender: string;
  timestamp: string;
}

export interface ChatResult {
  room: Room;
  comments: Message[];
}

export interface ChatData {
  results: ChatResult[];
}

// Helper types for component props
export interface MessageProps {
  message: Message;
  isOwnMessage: boolean;
  senderName: string;
  senderRole: Participant['role'];
}

export interface SidebarProps {
  rooms: Room[];
  activeRoomId: number | null;
  onRoomSelect: (roomId: number) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export interface ChatRoomProps {
  room: Room | null;
  onToggleSidebar: () => void;
}

export interface MessageListProps {
  messages: Message[];
  participants: Participant[];
  currentUserId?: string;
}

export interface MessageInputProps {
  onSendMessage: (message: string, type: 'text') => void;
  onFileUpload: (file: File, type: 'image' | 'video' | 'pdf') => void;
  disabled?: boolean;
}

// Role mapping helper
export const ROLE_NAMES: Record<Participant['role'], string> = {
  0: 'Admin',
  1: 'Agent', 
  2: 'Customer'
} as const;

// Role colors for UI
export const ROLE_COLORS: Record<Participant['role'], string> = {
  0: 'text-red-400',    // Admin
  1: 'text-blue-400',   // Agent
  2: 'text-green-400'   // Customer
} as const;
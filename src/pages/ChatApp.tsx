import React, { useState, useEffect } from 'react';
import { ChatData, ChatResult } from '../types/chat';
import Sidebar from '../components/Sidebar';
import ChatRoom from '../components/ChatRoom';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import { useToast } from '../hooks/use-toast';

const ChatApp: React.FC = () => {
  const [chatData, setChatData] = useState<ChatData | null>(null);
  const [activeRoomId, setActiveRoomId] = useState<number | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Load chat data on component mount
  useEffect(() => {
    const loadChatData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch('/chat.json');
        
        if (!response.ok) {
          throw new Error(`Failed to load chat data: ${response.status} ${response.statusText}`);
        }
        
        const data: ChatData = await response.json();
        
        if (!data.results || !Array.isArray(data.results)) {
          throw new Error('Invalid chat data format');
        }
        
        setChatData(data);
        
        // Auto-select first room if available
        if (data.results.length > 0) {
          setActiveRoomId(data.results[0].room.id);
        }
        
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        setError(errorMessage);
        console.error('Error loading chat data:', err);
        
        toast({
          title: "Error",
          description: "Failed to load chat data. Please refresh the page.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadChatData();
  }, [toast]);

  // Handle room selection
  const handleRoomSelect = (roomId: number) => {
    setActiveRoomId(roomId);
    // Auto-collapse sidebar on mobile after room selection
    if (window.innerWidth < 1024) {
      setIsSidebarCollapsed(true);
    }
  };

  // Handle sidebar toggle
  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Handle responsive sidebar behavior
  useEffect(() => {
    const handleResize = () => {
      // Auto-collapse sidebar on mobile
      if (window.innerWidth < 1024) {
        setIsSidebarCollapsed(true);
      } else {
        setIsSidebarCollapsed(false);
      }
    };

    // Set initial state
    handleResize();

    // Listen for window resize
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Get active room data
  const getActiveRoom = (): ChatResult | null => {
    if (!chatData || !activeRoomId) return null;
    return chatData.results.find(result => result.room.id === activeRoomId) || null;
  };

  // Handle sending new messages
  const handleSendMessage = (message: string, type: 'text') => {
    if (!activeRoom) return;

    const newMessage = {
      id: Date.now(),
      type,
      message,
      sender: "admin@company.com", // Current user
      timestamp: new Date().toISOString()
    };

    // Update the chat data with the new message
    setChatData(prevData => {
      if (!prevData) return prevData;
      
      return {
        ...prevData,
        results: prevData.results.map(result => 
          result.room.id === activeRoomId
            ? { ...result, comments: [...result.comments, newMessage] }
            : result
        )
      };
    });
    
    toast({
      title: "Message sent",
      description: "Your message has been delivered.",
    });
  };

  // Handle file uploads
  const handleFileUpload = (file: File, type: 'image' | 'video' | 'pdf') => {
    if (!activeRoom) return;

    // In a real app, you would upload to a server and get a URL
    // For demo purposes, we'll create a blob URL
    const fileUrl = URL.createObjectURL(file);
    
    const newMessage = {
      id: Date.now(),
      type,
      message: fileUrl,
      sender: "admin@company.com", // Current user
      timestamp: new Date().toISOString()
    };

    // Update the chat data with the new message
    setChatData(prevData => {
      if (!prevData) return prevData;
      
      return {
        ...prevData,
        results: prevData.results.map(result => 
          result.room.id === activeRoomId
            ? { ...result, comments: [...result.comments, newMessage] }
            : result
        )
      };
    });
    
    toast({
      title: "File uploaded",
      description: `${file.name} has been shared in the chat.`,
    });
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="w-12 h-12 bg-gray-700 mx-auto mb-4"></div>
            <div className="text-white text-lg font-medium">Loading Chat...</div>
            <div className="text-gray-400 text-sm mt-2">Please wait while we load your conversations</div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <div className="text-white text-xl font-medium mb-2">Something went wrong</div>
          <div className="text-gray-400 text-sm mb-6">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-white text-black font-medium hover:bg-gray-200 transition-colors duration-150"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  // No data state
  if (!chatData || chatData.results.length === 0) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">💬</div>
          <div className="text-white text-xl font-medium mb-2">No chat rooms available</div>
          <div className="text-gray-400 text-sm">Check back later for new conversations</div>
        </div>
      </div>
    );
  }

  const activeRoom = getActiveRoom();

  return (
    <div className="h-screen bg-black flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        rooms={chatData.results.map(result => result.room)}
        activeRoomId={activeRoomId}
        onRoomSelect={handleRoomSelect}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={handleToggleSidebar}
      />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat room header */}
        <ChatRoom
          room={activeRoom?.room || null}
          onToggleSidebar={handleToggleSidebar}
        />

        {/* Messages area */}
        <div className="flex-1 flex flex-col min-h-0">
          {activeRoom ? (
            <>
              <MessageList
                messages={activeRoom.comments}
                participants={activeRoom.room.participant}
                currentUserId="admin@company.com"
              />
              <MessageInput
                onSendMessage={handleSendMessage}
                onFileUpload={handleFileUpload}
                disabled={false}
                isSidebarCollapsed={isSidebarCollapsed}
              />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-black">
              <div className="text-center">
                <div className="text-gray-400 text-4xl mb-4">💬</div>
                <div className="text-white text-lg font-medium mb-2">Welcome to Chat</div>
                <div className="text-gray-400 text-sm">Select a room from the sidebar to start chatting</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
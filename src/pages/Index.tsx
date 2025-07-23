import React from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  // Redirect to chat app immediately
  React.useEffect(() => {
    navigate('/chat');
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <div className="animate-pulse">
          <div className="w-12 h-12 bg-gray-700 mx-auto mb-4"></div>
          <div className="text-white text-lg font-medium">Loading Chat Application...</div>
        </div>
      </div>
    </div>
  );
};

export default Index;

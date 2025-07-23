import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 text-white">404</h1>
        <p className="text-xl text-gray-400 mb-6">Page not found</p>
        <a 
          href="/" 
          className="px-6 py-3 bg-white text-black font-medium hover:bg-gray-200 transition-colors duration-150"
        >
          Return to Chat
        </a>
      </div>
    </div>
  );
};

export default NotFound;

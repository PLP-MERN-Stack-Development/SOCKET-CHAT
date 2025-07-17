import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center p-4 text-white">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-md w-full shadow-xl border border-white/20">
        <h1 className="text-4xl font-bold mb-8 text-center">Welcome to SocketChat</h1>
        {isAuthenticated ? (
          <Link 
            to="/chat" 
            className="block w-full bg-white text-indigo-600 hover:bg-gray-100 font-semibold py-3 px-4 rounded-lg text-center transition duration-200"
          >
            Go to Chat
          </Link>
        ) : (
          <div className="space-y-4">
            <Link 
              to="/login" 
              className="block w-full bg-white text-indigo-600 hover:bg-gray-100 font-semibold py-3 px-4 rounded-lg text-center transition duration-200"
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg text-center transition duration-200"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
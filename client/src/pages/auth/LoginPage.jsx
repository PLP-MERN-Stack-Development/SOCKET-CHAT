import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import LoginForm from '../../components/auth/LoginForm';

const LoginPage = () => {
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (email, password) => {
    try {
      const success = await login(email, password);
      if (success) {
        navigate('/chat');
      } else {
        setError('Invalid email or password');
      }
    } catch {
      // Optional: Add error logging here for debugging
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="auth-page">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
};

export default LoginPage;

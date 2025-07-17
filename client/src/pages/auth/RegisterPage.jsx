import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import RegisterForm from '../../components/auth/RegisterForm';

const RegisterPage = () => {
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (username, email, password) => {
    try {
      const success = await register(username, email, password);
      if (success) {
        navigate('/chat');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch {
      // Optional: log error or display a user-friendly message
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="auth-page">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
};

export default RegisterPage;

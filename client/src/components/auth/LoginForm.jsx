import AuthForm from './AuthForm';

const LoginForm = ({ onSubmit }) => {
  const fields = [
    { name: 'email', type: 'email', placeholder: 'Enter your email', required: true },
    { name: 'password', type: 'password', placeholder: 'Enter your password', required: true },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-md w-full shadow-xl border border-white/20">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">Login</h2>
        <AuthForm fields={fields} onSubmit={onSubmit} buttonText="Login" />
      </div>
    </div>
  );
};

export default LoginForm;

import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import SocketProvider from './context/SocketProvider'; // ✅
import AppRouter from './routes/AppRouter';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SocketProvider>
          <AppRouter />
        </SocketProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
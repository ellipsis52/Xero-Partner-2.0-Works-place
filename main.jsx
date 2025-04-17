// src/index.jsx
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext'; // Assure-toi que ce fichier existe et est correct

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
<div className="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32 animate-fade-in">
  {/* ... rest of the code ... */}
</div>

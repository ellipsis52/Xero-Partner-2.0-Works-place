import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Si tu as un fichier CSS pour le style

const App = () => {
  return (
    <div>
      <h1>Bienvenue dans ton application React !</h1>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

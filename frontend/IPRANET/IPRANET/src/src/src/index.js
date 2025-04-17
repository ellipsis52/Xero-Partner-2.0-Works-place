import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Si tu utilises du CSS pour tes styles

const App = () => {
  return (
    <div>
      <h1>Bienvenue dans ton application React !</h1>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "./styles/index.scss";
// On récupère la div qui pour ID = root de la page index.html et on y insère le code html provenant de App.js
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);



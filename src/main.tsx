// src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Move one directory up to access index.css
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import { FaFileAlt, FaRegClipboard, FaUsers, FaBoxOpen } from 'react-icons/fa';
import './i18n';
import { DarkModeProvider } from './DarkModeContext'; // Import the provider



// Render the App component into the root element
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
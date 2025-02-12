// src/App.tsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Invoices from './pages/Invoices';
import Customers from './pages/Customers';
import NotFound from './pages/NotFound';
import Products from './pages/Products';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Billing from './pages/Billing';
import './index.css'; // Ensure this is imported for CSS styles

const App: React.FC = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Product A', description: 'Description for Product A', price: 99.99 },
    { id: 2, name: 'Product B', description: 'Description for Product B', price: 149.99 },
    { id: 3, name: 'Product C', description: 'Description for Product C', price: 199.99 },
    { id: 4, name: 'Product D', description: 'Description for Product D', price: 299.99 },
    { id: 5, name: 'Product E', description: 'Description for Product E', price: 399.99 },
    { id: 6, name: 'Product F', description: 'Description for Product F', price: 499.99 },
  ]);

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Add or remove the 'dark' class based on the isDarkMode state
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <Router>
      <nav className={`p-4 ${isDarkMode ? 'dark' : ''}`}>
        <ul className="flex space-x-4">
          <li><Link to="/" className={`hover:underline ${isDarkMode ? 'text-white' : 'text-black'}`}>Home</Link></li>
          <li><Link to="/invoices" className={`hover:underline ${isDarkMode ? 'text-white' : 'text-black'}`}>Invoices</Link></li>
          <li><Link to="/customers" className={`hover:underline ${isDarkMode ? 'text-white' : 'text-black'}`}>Customers</Link></li>
          <li><Link to="/products" className={`hover:underline ${isDarkMode ? 'text-white' : 'text-black'}`}>Products</Link></li>
          <li><Link to="/reports" className={`hover:underline ${isDarkMode ? 'text-white' : 'text-black'}`}>Reports</Link></li>
          <li><Link to="/settings" className={`hover:underline ${isDarkMode ? 'text-white' : 'text-black'}`}>Settings</Link></li>
          <li><Link to="/billing" className={`hover:underline ${isDarkMode ? 'text-white' : 'text-black'}`}>Billing</Link></li>
          <li>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only"
                checked={isDarkMode}
                onChange={() => setIsDarkMode(prev => !prev)}
              />
              <div className={`toggle-bg ${isDarkMode ? 'dark' : ''}`}></div>
              <div className={`toggle-dot ${isDarkMode ? 'dark' : ''}`}></div>
            </label>
          </li>
        </ul>
      </nav>
      <div className={`p-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
        <Routes>
          <Route path="/products" element={<Products products={products} setProducts={setProducts} />} />
          <Route path="/" element={<Home />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/products" element={<Products setProducts={setProducts} />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/billing" element={<Billing products={products} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

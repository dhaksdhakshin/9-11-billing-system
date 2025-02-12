import React from 'react';
import { Link } from 'react-router-dom'; 
import { FaFileAlt, FaRegClipboard, FaUsers, FaBoxOpen } from 'react-icons/fa'; 
import { useTranslation } from 'react-i18next'; 
import '../home.css'; 

const Home: React.FC = () => {
  const { t } = useTranslation(); 

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-cyan-500 to-indigo-500 rounded-lg shadow-lg relative overflow-hidden">
      {/* Unique Background Pattern */}
      <div className="absolute inset-0 bg-white opacity-10 rounded-lg"></div>

      <h1 className="text-6xl font-bold text-white mb-4 animate__animated animate__fadeInDown z-10 drop-shadow-lg">
        {t('Welcome to the Gei Billing System')}
      </h1>
      <p className="text-lg text-white mt-2 mb-6 animate__animated animate__fadeIn z-10 drop-shadow-md">
        {t('Use the navigation below to explore the app and manage your data efficiently.')}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl z-10">
        <Link to="/reports" className="flex items-center justify-between p-6 bg-blue-600 text-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
          <span className="flex items-center">
            <FaFileAlt className="mr-4 text-3xl" />
            <span className="text-xl font-semibold">{t('View Reports')}</span>
          </span>
        </Link>
        <Link to="/invoices" className="flex items-center justify-between p-6 bg-green-600 text-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
          <span className="flex items-center">
            <FaRegClipboard className="mr-4 text-3xl" />
            <span className="text-xl font-semibold">{t('Manage Invoices')}</span>
          </span>
        </Link>
        <Link to="/customers" className="flex items-center justify-between p-6 bg-orange-600 text-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
          <span className="flex items-center">
            <FaUsers className="mr-4 text-3xl" />
            <span className="text-xl font-semibold">{t('Customer Management')}</span>
          </span>
        </Link>
        <Link to="/products" className="flex items-center justify-between p-6 bg-purple-600 text-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
          <span className="flex items-center">
            <FaBoxOpen className="mr-4 text-3xl" />
            <span className="text-xl font-semibold">{t('Product Listings')}</span>
          </span>
        </Link>
      </div>
      
      <div className="mt-8 z-10">
        <h2 className="text-2xl font-bold text-white mb-2">{t('Quick Tips')}:</h2>
        <ul className="list-disc list-inside text-white">
          <li className="animate__animated animate__fadeIn">{t('Check Reports')}</li>
          <li className="animate__animated animate__fadeIn">{t('Update Customers')}</li>
          <li className="animate__animated animate__fadeIn">{t('Use Search')}</li>
        </ul>
      </div>

      {/* Recent Activity Section */}
      <div className="mt-10 w-full max-w-6xl z-10">
        <h2 className="text-2xl font-bold text-white mb-4">{t('Recent Activity')}</h2>
        <div className="bg-white bg-opacity-80 rounded-lg p-6 shadow-md">
          <ul className="list-disc list-inside text-gray-800">
            <li className="animate__animated animate__fadeIn">Invoice #123 created.</li>
            <li className="animate__animated animate__fadeIn">New customer added: John Doe.</li>
            <li className="animate__animated animate__fadeIn">Product #456 updated.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home; 

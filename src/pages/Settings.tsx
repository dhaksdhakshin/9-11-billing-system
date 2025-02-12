// src/components/Settings.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaSun, FaMoon, FaBell, FaLanguage, FaUser, FaLock, FaTrash } from 'react-icons/fa';

const Settings: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState(i18n.language || 'English');
  const [profileVisible, setProfileVisible] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleDarkModeToggle = () => setDarkMode((prev) => !prev);
  const handleNotificationsToggle = () => setNotifications((prev) => !prev);
  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
  };
  const handleProfileToggle = () => setProfileVisible((prev) => !prev);
  const handleProfileUpdate = () => alert(`Profile updated: \nName: ${userName}\nEmail: ${email}`);
  const handlePasswordUpdate = () => {
    alert('Password updated!');
    setPassword('');
  };
  const handleAccountDeletion = () => {
    if (window.confirm(t('confirmDeleteAccount'))) {
      alert(t('accountDeleted'));
    }
  };

  return (
    <div className={`relative min-h-screen transition-colors duration-300 ${darkMode ? 'bg-[#2D2A32] text-[#EAE7DC]' : 'bg-[#F2F2F2] text-gray-800'}`}>
      <div className="max-w-2xl mx-auto p-10 relative z-10 bg-white dark:bg-[#403D3F] border dark:border-[#5A5A5C] rounded-lg shadow-lg transition-all duration-300">
        <h1 className="text-4xl font-serif font-semibold mb-4">{t('settings')}</h1>
        <p className="mb-6 text-lg font-light">{t('customizeMessage')}</p>

        <div className="space-y-8">
          {/* Preferences Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold font-serif">{t('preferences')}</h2>

            {/* Dark Mode Toggle */}
            <div className="flex items-center transition-colors duration-300">
              {darkMode ? <FaMoon className="text-yellow-400 text-2xl" /> : <FaSun className="text-yellow-500 text-2xl" />}
              <label className="flex items-center space-x-2 ml-3 text-lg">
                <span>{t('darkMode')}</span>
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={handleDarkModeToggle}
                  className="form-checkbox h-6 w-6 text-blue-600 rounded focus:ring-blue-500"
                />
              </label>
            </div>

            {/* Notifications Toggle */}
            <div className="flex items-center">
              <FaBell className={`text-2xl ${notifications ? 'text-blue-500' : 'text-gray-500'}`} />
              <label className="flex items-center space-x-2 ml-3 text-lg">
                <span>{t('notifications')}</span>
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={handleNotificationsToggle}
                  className="form-checkbox h-6 w-6 text-blue-600 rounded focus:ring-blue-500"
                />
              </label>
            </div>
          </div>

          {/* Language Selection */}
          <div>
            <h2 className="text-2xl font-semibold font-serif">{t('language')}</h2>
            <div className="mt-2">
              <FaLanguage className="inline-block mr-2 text-2xl" />
              <select
                value={language}
                onChange={handleLanguageChange}
                className="p-3 border border-gray-300 rounded shadow focus:outline-none focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              >
                <option value="English">{t('English')}</option>
                <option value="Spanish">{t('Spanish')}</option>
                <option value="French">{t('French')}</option>
                <option value="German">{t('German')}</option>
              </select>
            </div>
          </div>

          {/* Profile Section */}
          <div>
            <h2 className="text-2xl font-semibold font-serif">{t('profile')}</h2>
            <button
              className="mt-2 text-blue-600 hover:underline"
              onClick={handleProfileToggle}
            >
              {profileVisible ? t('hideProfile') : t('showProfile')}
            </button>

            {profileVisible && (
              <div className="mt-4 space-y-4">
                <input
                  type="text"
                  placeholder={t('enterName')}
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="p-3 border border-gray-300 rounded w-full shadow focus:outline-none focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                />
                <input
                  type="email"
                  placeholder={t('enterEmail')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-3 border border-gray-300 rounded w-full shadow focus:outline-none focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                />
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
                  onClick={handleProfileUpdate}
                >
                  {t('updateProfile')}
                </button>
              </div>
            )}
          </div>

          {/* Password Management */}
          <div>
            <h2 className="text-2xl font-semibold font-serif">{t('password')}</h2>
            <div className="mt-2">
              <input
                type="password"
                placeholder={t('enterNewPassword')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-3 border border-gray-300 rounded w-full shadow focus:outline-none focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              />
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
                onClick={handlePasswordUpdate}
              >
                {t('updatePassword')}
              </button>
            </div>
          </div>

          {/* Account Deletion */}
          <div>
            <h2 className="text-2xl font-semibold font-serif">{t('account')}</h2>
            <button
              className="mt-4 flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
              onClick={handleAccountDeletion}
            >
              <FaTrash className="mr-2" />
              {t('deleteAccount')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

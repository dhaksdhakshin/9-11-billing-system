import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Reports: React.FC = () => {
  const { t } = useTranslation();
  const [selectedReportType, setSelectedReportType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // New state for sorting order
  const [reportData] = useState([
    { id: 1, title: 'Sales Report Q1', date: '2024-01-15', type: 'Sales' },
    { id: 2, title: 'Customer Engagement Q1', date: '2024-01-20', type: 'Customer' },
    { id: 3, title: 'Inventory Overview', date: '2024-02-10', type: 'Inventory' },
    { id: 4, title: 'Sales Report Q2', date: '2024-04-15', type: 'Sales' },
  ]);

  const filterReports = (type: string) => {
    setSelectedReportType(type);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value);
  };

  const filteredReports = reportData
    .filter(report => {
      const matchesType = selectedReportType === 'All' || report.type === selectedReportType;
      const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    })
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.date.localeCompare(b.date);
      }
      return b.date.localeCompare(a.date);
    });

  const handleDownload = () => {
    // Placeholder for download functionality
    alert('Download report functionality not implemented yet.');
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-500 to-blue-500">
      <div className="p-6 relative z-10 bg-white dark:bg-gray-800 bg-opacity-90 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold">{t('Title')}</h1>
        <p className="mt-2">{t('Description')}</p>

        <div className="my-4 flex items-center space-x-4">
          <input
            type="text"
            placeholder={t('SearchPlaceholder')}
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-2 border border-gray-300 rounded"
          />
          <div>
            <button onClick={() => filterReports('All')} className={`mr-2 ${selectedReportType === 'All' ? 'font-bold text-blue-500' : ''}`}>
              {t('reports.all')}
            </button>
            <button onClick={() => filterReports('Sales')} className={`mr-2 ${selectedReportType === 'Sales' ? 'font-bold text-blue-500' : ''}`}>
              {t('reports.sales')}
            </button>
            <button onClick={() => filterReports('Customer')} className={`mr-2 ${selectedReportType === 'Customer' ? 'font-bold text-blue-500' : ''}`}>
              {t('reports.customer')}
            </button>
            <button onClick={() => filterReports('Inventory')} className={`mr-2 ${selectedReportType === 'Inventory' ? 'font-bold text-blue-500' : ''}`}>
              {t('reports.inventory')}
            </button>
          </div>
          <select value={sortOrder} onChange={handleSortChange} className="p-2 border border-gray-300 rounded">
            <option value="asc">{t('SortAscending')}</option>
            <option value="desc">{t('SortDescending')}</option>
          </select>
          <button onClick={handleDownload} className="ml-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            {t('DownloadReports')}
          </button>
        </div>

        <table className="w-full bg-white border border-gray-200 rounded shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border-b">{t('id')}</th>
              <th className="p-2 border-b">{t('title')}</th>
              <th className="p-2 border-b">{t('date')}</th>
              <th className="p-2 border-b">{t('type')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.length > 0 ? (
              filteredReports.map(report => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="p-2 border-b">{report.id}</td>
                  <td className="p-2 border-b">{report.title}</td>
                  <td className="p-2 border-b">{report.date}</td>
                  <td className="p-2 border-b">{report.type}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-2 text-center text-gray-500">
                  {t('NoResults')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;

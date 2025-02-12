import React, { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState([
    { id: '1', name: 'Gei Divith', email: 'gei@example.com' },
    { id: '2', name: 'Niggeshwaran', email: 'niggei@example.com' },
    { id: '3', name: 'Dhaks', email: 'dhaks@example.com' },
  ]);

  const [newCustomer, setNewCustomer] = useState({ name: '', email: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [editingCustomerId, setEditingCustomerId] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCustomer(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCustomer.name && newCustomer.email) {
      const newId = (customers.length + 1).toString();
      setCustomers([...customers, { ...newCustomer, id: newId }]);
      alert('Customer added successfully!');
      setNewCustomer({ name: '', email: '' });
    }
  };

  const handleEditCustomer = (customer: { id: string; name: string; email: string }) => {
    setEditingCustomerId(customer.id);
    setNewCustomer({ name: customer.name, email: customer.email });
  };

  const handleUpdateCustomer = () => {
    if (editingCustomerId) {
      setCustomers(customers.map(customer =>
        customer.id === editingCustomerId
          ? { ...customer, ...newCustomer }
          : customer
      ));
      alert('Customer updated successfully!');
      setEditingCustomerId(null);
      setNewCustomer({ name: '', email: '' });
    }
  };

  const handleDeleteCustomer = (id: string) => {
    setCustomers(customers.filter(customer => customer.id !== id));
    alert('Customer deleted successfully!');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-500 to-blue-500">
      <div className="p-6 relative z-10 bg-white dark:bg-gray-800 bg-opacity-90 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Customers</h1>

        <input
          type="text"
          placeholder="Search customers..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="mb-4 border rounded p-2 w-full dark:bg-gray-700 dark:text-gray-200"
        />

        <form onSubmit={handleSubmit} className="flex gap-4 mb-6">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newCustomer.name}
            onChange={handleInputChange}
            required
            className="p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-200"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newCustomer.email}
            onChange={handleInputChange}
            required
            className="p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-200"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 transition duration-200"
          >
            {editingCustomerId ? 'Update Customer' : 'Add Customer'}
          </button>
        </form>

        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="p-2 border dark:border-gray-600 text-left font-semibold text-gray-800 dark:text-gray-100">ID</th>
              <th className="p-2 border dark:border-gray-600 text-left font-semibold text-gray-800 dark:text-gray-100">Name</th>
              <th className="p-2 border dark:border-gray-600 text-left font-semibold text-gray-800 dark:text-gray-100">Email</th>
              <th className="p-2 border dark:border-gray-600 text-left font-semibold text-gray-800 dark:text-gray-100">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map(customer => (
                <tr key={customer.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200">
                  <td className="p-2 border dark:border-gray-600 text-gray-800 dark:text-gray-100">{customer.id}</td>
                  <td className="p-2 border dark:border-gray-600 text-gray-800 dark:text-gray-100">{customer.name}</td>
                  <td className="p-2 border dark:border-gray-600 text-gray-800 dark:text-gray-100">{customer.email}</td>
                  <td className="p-2 border dark:border-gray-600 text-gray-800 dark:text-gray-100 flex space-x-2">
                    <button onClick={() => handleEditCustomer(customer)} className="text-blue-500 hover:underline flex items-center">
                      <FaEdit className="mr-1" /> Edit
                    </button>
                    <button onClick={() => handleDeleteCustomer(customer.id)} className="text-red-500 hover:underline flex items-center">
                      <FaTrashAlt className="mr-1" /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-2 text-center text-gray-500 dark:text-gray-400">
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;

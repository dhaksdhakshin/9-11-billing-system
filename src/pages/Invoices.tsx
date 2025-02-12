import React, { useState } from 'react';

const Invoices: React.FC = () => {
    const [invoices, setInvoices] = useState([
        { id: '1', customerName: 'John Doe', amount: 150.0, dueDate: '2024-11-15' },
    ]);
    const [newInvoice, setNewInvoice] = useState({ customerName: '', amount: '', dueDate: '' });
    const [searchQuery, setSearchQuery] = useState('');
    const [editingInvoiceId, setEditingInvoiceId] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewInvoice(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newInvoice.customerName && newInvoice.amount && newInvoice.dueDate) {
            const newId = (invoices.length + 1).toString();
            setInvoices([...invoices, { ...newInvoice, id: newId, amount: parseFloat(newInvoice.amount) }]);
            setNewInvoice({ customerName: '', amount: '', dueDate: '' });
        }
    };

    const handleEditInvoice = (invoice: { id: string; customerName: string; amount: number; dueDate: string }) => {
        setEditingInvoiceId(invoice.id);
        setNewInvoice({ customerName: invoice.customerName, amount: invoice.amount.toString(), dueDate: invoice.dueDate });
    };

    const handleUpdateInvoice = () => {
        if (editingInvoiceId) {
            setInvoices(invoices.map(invoice =>
                invoice.id === editingInvoiceId
                    ? { ...invoice, ...newInvoice, amount: parseFloat(newInvoice.amount) }
                    : invoice
            ));
            setEditingInvoiceId(null);
            setNewInvoice({ customerName: '', amount: '', dueDate: '' });
        }
    };

    const handleDeleteInvoice = (id: string) => {
        setInvoices(invoices.filter(invoice => invoice.id !== id));
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const filteredInvoices = invoices.filter(invoice =>
        invoice.customerName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-green-500 to-blue-500">
            <div className="p-6 relative z-10 bg-white dark:bg-gray-800 bg-opacity-90 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Invoices</h1>

                <input
                    type="text"
                    placeholder="Search invoices by customer name..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="mb-4 border rounded p-2 w-full dark:bg-gray-700 dark:text-white"
                />

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
                    <input
                        type="text"
                        name="customerName"
                        placeholder="Customer Name"
                        value={newInvoice.customerName}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
                        required
                    />
                    <input
                        type="number"
                        name="amount"
                        placeholder="Amount (₹)"
                        value={newInvoice.amount}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
                        required
                    />
                    <input
                        type="date"
                        name="dueDate"
                        value={newInvoice.dueDate}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
                        required
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
                    >
                        {editingInvoiceId ? 'Update Invoice' : 'Add Invoice'}
                    </button>
                </form>

                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-100 dark:bg-gray-700">
                            <th className="p-2 border dark:border-gray-600 text-left font-semibold text-gray-800 dark:text-white">ID</th>
                            <th className="p-2 border dark:border-gray-600 text-left font-semibold text-gray-800 dark:text-white">Customer Name</th>
                            <th className="p-2 border dark:border-gray-600 text-left font-semibold text-gray-800 dark:text-white">Amount (₹)</th>
                            <th className="p-2 border dark:border-gray-600 text-left font-semibold text-gray-800 dark:text-white">Due Date</th>
                            <th className="p-2 border dark:border-gray-600 text-left font-semibold text-gray-800 dark:text-white">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredInvoices.length > 0 ? (
                            filteredInvoices.map(invoice => (
                                <tr key={invoice.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="p-2 border dark:border-gray-600 text-gray-800 dark:text-white">{invoice.id}</td>
                                    <td className="p-2 border dark:border-gray-600 text-gray-800 dark:text-white">{invoice.customerName}</td>
                                    <td className="p-2 border dark:border-gray-600 text-gray-800 dark:text-white">₹{invoice.amount.toFixed(2)}</td>
                                    <td className="p-2 border dark:border-gray-600 text-gray-800 dark:text-white">{invoice.dueDate}</td>
                                    <td className="p-2 border dark:border-gray-600 text-gray-800 dark:text-white">
                                        <button onClick={() => handleEditInvoice(invoice)} className="text-blue-500 hover:underline">Edit</button>
                                        <button onClick={() => handleDeleteInvoice(invoice.id)} className="text-red-500 hover:underline ml-2">Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="p-2 text-center text-gray-500 dark:text-gray-400">
                                    No invoices found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Invoices;

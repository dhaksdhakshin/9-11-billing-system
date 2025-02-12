import React, { useState, useEffect } from 'react';
import { addProduct, updateProduct, deleteProduct, getProducts } from '../utils/db';
import { FaEdit, FaTrash, FaSearch } from 'react-icons/fa';

type Product = {
  id?: number;
  name: string;
  description: string;
  price: number;
  barcode: string;
};

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);  
  const [newProduct, setNewProduct] = useState<Product>({ name: '', description: '', price: 0, barcode: '' });
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const allProducts = await getProducts();
        setProducts(allProducts);
      } catch (error) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.description || newProduct.price <= 0) {
      setError('Please fill all fields correctly');
      return;
    }
    setError(null); // Clear error message

    setLoading(true);
    try {
      if (editingProductId) {
        const updatedProduct = { ...newProduct, id: editingProductId };
        await updateProduct(updatedProduct);
        setProducts(products.map((p) => (p.id === editingProductId ? updatedProduct : p)));
      } else {
        const productToAdd = { ...newProduct, price: Number(newProduct.price) };
        await addProduct(productToAdd);
        setProducts([...products, productToAdd]);
      }
      setNewProduct({ name: '', description: '', price: 0, barcode: '' });
      setEditingProductId(null);
    } catch (error) {
      setError('Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProductId(product.id!);
    setNewProduct({ ...product });
  };

  const handleDeleteProduct = async (productId: number) => {
    setLoading(true);
    try {
      await deleteProduct(productId);
      setProducts(products.filter((p) => p.id !== productId));
    } catch (error) {
      setError('Failed to delete product');
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((p) => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.id && p.id.toString().includes(searchQuery)) // Add this to filter by ID
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-semibold text-center mb-8">Product List</h1>

      {/* Product Form */}
      <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6">{editingProductId ? 'Edit Product' : 'Add Product'}</h2>
        <div className="flex space-x-4 mb-4">
          <input
            type="text"
            placeholder="Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="p-3 border border-gray-300 rounded-lg w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            className="p-3 border border-gray-300 rounded-lg w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
            className="p-3 border border-gray-300 rounded-lg w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Barcode"
            value={newProduct.barcode}
            onChange={(e) => setNewProduct({ ...newProduct, barcode: e.target.value })}
            className="p-3 border border-gray-300 rounded-lg w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddProduct}
            className="py-3 px-6 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
          >
            {editingProductId ? 'Update Product' : 'Add Product'}
          </button>
        </div>
      </div>

      <div className="flex justify-between mb-6">
        <div className="flex items-center space-x-2 w-1/3">
          <FaSearch className="text-gray-600" />
          <input
            type="text"
            placeholder="Search products"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {error && <div className="text-red-600 text-center mb-4">{error}</div>}
      {loading && <div className="text-center text-blue-500">Loading...</div>}

      <div className="flex">
        {/* Product List */}
        <div className="flex-1 pr-10">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-start">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                <p className="text-lg font-bold text-blue-600">₹{product.price.toFixed(2)}</p>
                <p className="text-sm text-gray-400">ID: {product.id}</p> {/* Display Product ID here */}

                <div className="mt-4 flex space-x-3">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit className="inline-block" />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id!)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash className="inline-block" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;

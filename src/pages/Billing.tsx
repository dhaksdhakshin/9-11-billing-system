import React, { useState, useEffect } from 'react';
import { getProducts } from '../utils/db';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  barcode: string;
};

type SelectedProduct = Product & { quantity: number; total: number };

const Billing: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const storedProducts = await getProducts();
      setProducts(storedProducts);
    };
    fetchProducts();
  }, []);

  const addToBill = (product: Product) => {
    const existingProduct = selectedProducts.find((p) => p.id === product.id);
    if (existingProduct) {
      setSelectedProducts((prev) =>
        prev.map((p) => (p.id === product.id ? { ...p, quantity: p.quantity + 1, total: (p.quantity + 1) * p.price } : p))
      );
    } else {
      setSelectedProducts([...selectedProducts, { ...product, quantity: 1, total: product.price }]);
    }
  };

  const removeFromBill = (id: number) => {
    setSelectedProducts(selectedProducts.filter((p) => p.id !== id));
  };

  useEffect(() => {
    setTotalAmount(selectedProducts.reduce((sum, p) => sum + p.total, 0));
  }, [selectedProducts]);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Trigger the print dialog for the receipt
  const printBill = () => {
    // Hide all content except for the print section
    const bodyContent = document.body.innerHTML;
    const printSection = document.getElementById('printSection');

    if (printSection) {
      const printContent = printSection.innerHTML;

      // Temporarily replace the body content with the print section
      document.body.innerHTML = printContent;

      // Trigger the print dialog
      window.print();

      // Restore the original content after printing
      document.body.innerHTML = bodyContent;
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Billing</h1>

      <div style={styles.section}>
        <h2 style={styles.subHeader}>Available Products</h2>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchInput}
        />
        <div style={styles.productList}>
          {filteredProducts.map((product) => (
            <div key={product.id} style={styles.productCard}>
              <h3>{product.name}</h3>
              <p>₹{product.price.toFixed(2)}</p>
              <button style={styles.addButton} onClick={() => addToBill(product)}>
                Add to Bill
              </button>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.subHeader}>Selected Products</h2>
        <ul style={styles.selectedList}>
          {selectedProducts.map((product) => (
            <li key={product.id} style={styles.selectedProduct}>
              <span>{product.name}</span>
              <span>Quantity: {product.quantity}</span>
              <span>Total: ₹{product.total.toFixed(2)}</span>
              <button style={styles.removeButton} onClick={() => removeFromBill(product.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div style={styles.totalSection}>
        <h2>Total Amount: ₹{totalAmount.toFixed(2)}</h2>
      </div>

      {/* Print Button */}
      <div style={styles.printSection}>
        <button onClick={printBill} style={styles.printButton}>Print Bill</button>
      </div>

      {/* Hidden Print Layout */}
      <div id="printSection" style={{ display: 'none' }}>
        <div style={styles.printLayout}>
          <h1 style={styles.printHeader}>Bill Receipt</h1>
          <table style={styles.printTable}>
            <thead>
              <tr>
                <th style={styles.printTableHeader}>Product</th>
                <th style={styles.printTableHeader}>Quantity</th>
                <th style={styles.printTableHeader}>Price (₹)</th>
                <th style={styles.printTableHeader}>Total (₹)</th>
              </tr>
            </thead>
            <tbody>
              {selectedProducts.map((product) => (
                <tr key={product.id} style={styles.printTableRow}>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>{product.price.toFixed(2)}</td>
                  <td>{product.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={styles.printTotal}>
            <h3>Total Amount: ₹{totalAmount.toFixed(2)}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

// Inline styles for demonstration purposes
const styles = {
  container: {
    maxWidth: '800px',
    margin: 'auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    textAlign: 'center',
    fontSize: '2em',
    color: '#333',
  },
  section: {
    marginBottom: '20px',
  },
  subHeader: {
    fontSize: '1.5em',
    color: '#555',
    marginBottom: '10px',
  },
  searchInput: {
    width: '100%',
    padding: '8px',
    marginBottom: '15px',
    fontSize: '1em',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  productList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '15px',
  },
  productCard: {
    border: '1px solid #eee',
    borderRadius: '8px',
    padding: '10px',
    textAlign: 'center',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  addButton: {
    padding: '8px 12px',
    marginTop: '10px',
    fontSize: '0.9em',
    color: '#fff',
    backgroundColor: '#28a745',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  selectedList: {
    listStyleType: 'none',
    padding: '0',
  },
  selectedProduct: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid #eee',
  },
  removeButton: {
    padding: '5px 8px',
    fontSize: '0.9em',
    color: '#fff',
    backgroundColor: '#dc3545',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  totalSection: {
    textAlign: 'right',
    fontSize: '1.5em',
    fontWeight: 'bold',
    color: '#333',
    marginTop: '20px',
  },
  printSection: {
    marginTop: '20px',
    textAlign: 'center',
  },
  printButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '1.2em',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  printLayout: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    margin: '0 auto',
    maxWidth: '600px',
    borderRadius: '8px',
  },
  printHeader: {
    textAlign: 'center',
    fontSize: '2em',
    color: '#333',
    marginBottom: '20px',
  },
  printTable: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
  },
  printTableHeader: {
    textAlign: 'left',
    fontSize: '1.2em',
    fontWeight: 'bold',
    padding: '10px',
    borderBottom: '2px solid #ddd',
  },
  printTableRow: {
    borderBottom: '1px solid #ddd',
  },
  printTotal: {
    fontSize: '1.5em',
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'right',
    marginTop: '20px',
  },
};

export default Billing;

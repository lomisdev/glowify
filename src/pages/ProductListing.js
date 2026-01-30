import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Placeholder: Fetch from backend
    setProducts([
      { id: 1, name: 'Rose Lip Balm', price: 15, category: 'Lips' },
      { id: 2, name: 'Hydrating Serum', price: 25, category: 'Skincare' },
    ]);
  }, []);

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        {filteredProducts.map(product => (
          <div key={product.id} style={{ border: '1px solid #ddd', padding: '10px' }}>
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <Link to={`/product/${product.id}`} className="btn">View</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListing;

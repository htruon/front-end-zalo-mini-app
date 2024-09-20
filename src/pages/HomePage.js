import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/product')
      .then(response => {
        setProducts(response.data);
      });
  }, []);

  return (
    <div>
      <h2>Product Categories</h2>
      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product-item">
            <img src={product.imageUrl} alt={product.productName} />
            <h3>{product.productName}</h3>
            <p>Code: {product.productCode}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
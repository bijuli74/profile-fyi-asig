import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import ProductCard from '../components/ProductCard';

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products from FakeStore API
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  const addToCart = (product) => {
    // Implement add to cart logic here
    console.log(`${product.title} added to cart!`);
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
    <>
      <NavBar />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </>
  );
};

export default ProductListing;

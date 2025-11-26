'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const url = selectedCategory 
        ? `${process.env.NEXT_PUBLIC_API_URL}/products?category=${selectedCategory}`
        : `${process.env.NEXT_PUBLIC_API_URL}/products`;
      const response = await axios.get(url);
      setProducts(response.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar productos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);
      const cats = [...new Set(response.data.data?.map(p => p.categoryId).filter(Boolean) || [])];
      setCategories(cats);
    } catch (err) {
      console.error('Error al cargar categorías:', err);
    }
  };

  const handleCategoryFilter = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleProductClick = (productId) => {
    router.push(`/products/${productId}`);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Productos</h1>
      
      {error && <div style={{ color: '#d32f2f', marginBottom: '1rem' }}>{error}</div>}

      <div style={{ marginBottom: '2rem' }}>
        <h3>Filtrar por Categoría:</h3>
        <button
          onClick={() => handleCategoryFilter('')}
          style={{
            padding: '0.5rem 1rem',
            marginRight: '0.5rem',
            backgroundColor: selectedCategory === '' ? '#2196F3' : '#ddd',
            color: selectedCategory === '' ? '#fff' : '#000',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '3px',
          }}
        >
          Todas
        </button>
        {categories.map((catId) => (
          <button
            key={catId}
            onClick={() => handleCategoryFilter(catId)}
            style={{
              padding: '0.5rem 1rem',
              marginRight: '0.5rem',
              backgroundColor: selectedCategory === catId ? '#2196F3' : '#ddd',
              color: selectedCategory === catId ? '#fff' : '#000',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '3px',
            }}
          >
            Categoría {catId}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem' }}>
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product.id)}
              style={{
                border: '1px solid #ddd',
                borderRadius: '5px',
                padding: '1rem',
                cursor: 'pointer',
                transition: 'box-shadow 0.3s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)')}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
            >
              <h3>{product.nombre}</h3>
              <p>{product.descripcion}</p>
              <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#2196F3' }}>
                ${product.precio?.toFixed(2) || 'N/A'}
              </p>
              {product.imageUrl && <img src={product.imageUrl} alt={product.nombre} style={{ maxWidth: '100%', height: 'auto' }} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

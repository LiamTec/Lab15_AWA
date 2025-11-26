'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!params.id) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}`);
        if (response.data.success) {
          setProduct(response.data.data);
        } else {
          setError(response.data.message || 'Producto no encontrado');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Error al cargar el producto');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (loading) return <div style={{ padding: '2rem' }}>Cargando...</div>;
  if (error) return <div style={{ padding: '2rem', color: '#d32f2f' }}>Error: {error}</div>;
  if (!product) return <div style={{ padding: '2rem' }}>Producto no encontrado</div>;

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <button onClick={() => router.back()} style={{ marginBottom: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}>
        ← Volver
      </button>
      <h1>{product.nombre}</h1>
      {product.imageUrl && (
        <img src={product.imageUrl} alt={product.nombre} style={{ maxWidth: '100%', height: 'auto', marginBottom: '1rem' }} />
      )}
      <p>{product.descripcion}</p>
      <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2196F3' }}>
        Precio: ${product.precio?.toFixed(2) || 'N/A'}
      </p>
      <p>Categoría ID: {product.categoryId || 'Sin categoría'}</p>
    </div>
  );
}

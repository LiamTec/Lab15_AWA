'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ nombre: '', precio: '', descripcion: '', categoryId: '', imageUrl: '' });

  useEffect(() => {
    checkAdminAndLoadProducts();
  }, []);

  const checkAdminAndLoadProducts = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        fetchProducts(token);
      } else {
        router.push('/');
      }
    } catch (err) {
      console.error('Acceso denegado:', err);
      router.push('/');
    }
  };

  const fetchProducts = async (token) => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data.data || []);
    } catch (err) {
      setError('Error al cargar productos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const data = {
        nombre: formData.nombre,
        precio: parseFloat(formData.precio),
        descripcion: formData.descripcion,
        categoryId: formData.categoryId ? parseInt(formData.categoryId) : null,
        imageUrl: formData.imageUrl,
      };

      if (editingId) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/products/${editingId}`,
          data,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setError('');
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/products`,
          data,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      setFormData({ nombre: '', precio: '', descripcion: '', categoryId: '', imageUrl: '' });
      setShowForm(false);
      setEditingId(null);
      fetchProducts(token);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al guardar producto');
    }
  };

  const handleEdit = (product) => {
    setFormData({
      nombre: product.nombre,
      precio: product.precio,
      descripcion: product.descripcion,
      categoryId: product.categoryId || '',
      imageUrl: product.imageUrl || '',
    });
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleDelete = async (productId) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este producto?')) return;

    const token = localStorage.getItem('token');
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchProducts(token);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al eliminar producto');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ nombre: '', precio: '', descripcion: '', categoryId: '', imageUrl: '' });
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Gestión de Productos</h1>
      {error && <div style={{ color: '#d32f2f', marginBottom: '1rem', padding: '1rem', backgroundColor: '#ffebee', borderRadius: '3px' }}>{error}</div>}

      <button
        onClick={() => setShowForm(!showForm)}
        style={{
          marginBottom: '2rem',
          padding: '0.75rem 1.5rem',
          backgroundColor: '#4CAF50',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          borderRadius: '3px',
          fontSize: '1rem',
        }}
      >
        {showForm ? 'Cancelar' : '+ Nuevo Producto'}
      </button>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          style={{
            border: '1px solid #ddd',
            padding: '2rem',
            borderRadius: '5px',
            marginBottom: '2rem',
            backgroundColor: '#f9f9f9',
          }}
        >
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              required
              style={{ width: '100%', padding: '0.75rem', boxSizing: 'border-box', borderRadius: '3px', border: '1px solid #ddd' }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Precio:</label>
            <input
              type="number"
              name="precio"
              value={formData.precio}
              onChange={handleInputChange}
              step="0.01"
              required
              style={{ width: '100%', padding: '0.75rem', boxSizing: 'border-box', borderRadius: '3px', border: '1px solid #ddd' }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Descripción:</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
              style={{ width: '100%', padding: '0.75rem', boxSizing: 'border-box', borderRadius: '3px', border: '1px solid #ddd', minHeight: '100px' }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Categoría ID:</label>
            <input
              type="number"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleInputChange}
              style={{ width: '100%', padding: '0.75rem', boxSizing: 'border-box', borderRadius: '3px', border: '1px solid #ddd' }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>URL de Imagen:</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              style={{ width: '100%', padding: '0.75rem', boxSizing: 'border-box', borderRadius: '3px', border: '1px solid #ddd' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              type="submit"
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#2196F3',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '3px',
              }}
            >
              {editingId ? 'Actualizar' : 'Crear'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#757575',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '3px',
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              border: '1px solid #ddd',
            }}
          >
            <thead>
              <tr style={{ backgroundColor: '#f0f0f0' }}>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #ddd' }}>ID</th>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Nombre</th>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Precio</th>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Categoría</th>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '1rem' }}>{product.id}</td>
                  <td style={{ padding: '1rem' }}>{product.nombre}</td>
                  <td style={{ padding: '1rem' }}>${product.precio?.toFixed(2)}</td>
                  <td style={{ padding: '1rem' }}>{product.categoryId || 'Sin categoría'}</td>
                  <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => handleEdit(product)}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#2196F3',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '3px',
                      }}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#d32f2f',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '3px',
                      }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

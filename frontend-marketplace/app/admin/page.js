'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import axios from 'axios';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.data.success) {
        router.push('/');
      }
    } catch (err) {
      console.error('Acceso denegado:', err);
      router.push('/');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Panel de Administración</h1>
      <p>Bienvenido a la sección de administración.</p>
      <p>Aquí puedes gestionar productos, categorías y usuarios.</p>
      <div style={{ marginTop: '2rem' }}>
        <h3>Acciones disponibles:</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button
            onClick={() => router.push('/admin/products')}
            style={{
              padding: '1rem',
              backgroundColor: '#2196F3',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '3px',
              fontSize: '1rem',
              textAlign: 'left',
            }}
          >
            📦 Gestionar Productos
          </button>
          <button
            onClick={() => router.push('/')}
            style={{
              padding: '1rem',
              backgroundColor: '#4CAF50',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '3px',
              fontSize: '1rem',
              textAlign: 'left',
            }}
          >
            🏠 Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  );
}

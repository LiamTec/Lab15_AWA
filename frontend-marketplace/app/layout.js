'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';

function NavBar() {
  const router = useRouter();
  const { isLoggedIn, userRole, username, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <nav style={{ backgroundColor: '#333', color: '#fff', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => handleNavigation('/')}>
        🛒 Marketplace
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {isLoggedIn ? (
          <>
            <span style={{ fontSize: '0.9rem', backgroundColor: '#555', padding: '0.5rem 1rem', borderRadius: '3px' }}>
              👤 {username} ({userRole})
            </span>
            {userRole === 'ADMIN' && (
              <button onClick={() => handleNavigation('/admin')} style={{ padding: '0.5rem 1rem', cursor: 'pointer', backgroundColor: '#FF9800', color: '#fff', border: 'none', borderRadius: '3px' }}>
                ⚙️ Admin
              </button>
            )}
            <button onClick={handleLogout} style={{ padding: '0.5rem 1rem', cursor: 'pointer', backgroundColor: '#d32f2f', color: '#fff', border: 'none', borderRadius: '3px', fontWeight: 'bold' }}>
              🚪 Salir
            </button>
          </>
        ) : (
          <>
            <button onClick={() => handleNavigation('/login')} style={{ padding: '0.5rem 1rem', cursor: 'pointer', backgroundColor: '#2196F3', color: '#fff', border: 'none', borderRadius: '3px' }}>
              Login
            </button>
            <button onClick={() => handleNavigation('/register')} style={{ padding: '0.5rem 1rem', cursor: 'pointer', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '3px' }}>
              Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <title>Marketplace</title>
      </head>
      <body style={{ fontFamily: 'Arial, sans-serif', margin: 0, padding: 0 }}>
        <AuthProvider>
          <NavBar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

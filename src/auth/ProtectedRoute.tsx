import type { ReactNode } from 'react';
import { Navigate } from 'react-router';

type ProtectedRouteProps = {
  children: ReactNode;
};

// Composant qui protège le contenu placé entre ses balises.
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = localStorage.getItem('token') !== null;

  if (isAuthenticated) {
    return children;
  }
  return <Navigate to="/" replace />;
}

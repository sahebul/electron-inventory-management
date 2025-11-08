import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { guestRoutes } from './guestRoutes';
import { protectedRoutes } from './protectedRoutes';
import { AuthContext } from "../App";
import { useContext } from 'react';
function GuestRoute() {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) {
    return <Navigate to="/products" replace />;
  }
  return <Outlet />;
}

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Guest Routes */}
      <Route element={<GuestRoute />}>
        {guestRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          {protectedRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
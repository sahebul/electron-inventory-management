import LoginPage from '../pages/LoginPage';
import { ROUTES } from './routePaths';

export const guestRoutes = [
  {
    path: ROUTES.HOME,
    element: <LoginPage />,
  },
];
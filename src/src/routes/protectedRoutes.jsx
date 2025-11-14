import ProductListPage from '../pages/ProductListPage';
import AddProduct from '../pages/AddProduct';
import {BusinessListPage,AddBusinessPage,EditBusinessPage} from '../pages/business';
import { ROUTES } from './routePaths';
import { AddUserPage, EditUserPage, UserListPage } from '../pages/users';

export const protectedRoutes = [
  {
    path: ROUTES.PRODUCTS,
    element: <ProductListPage />,
  },
  {
    path: ROUTES.ADD_PRODUCTS,
    element: <AddProduct />,
  },
  {
    path: ROUTES.BUSINESS,
    element: <BusinessListPage />,
  },
  {
    path: ROUTES.ADD_BUSINESS,
    element: <AddBusinessPage />,
  },
   {
    path: ROUTES.EDIT_BUSINESS,
    element: <EditBusinessPage />,
  },

  {
    path: ROUTES.USERS,
    element: <UserListPage />,
  },
  {
    path: ROUTES.ADD_USER,
    element: <AddUserPage />,
  },
   {
    path: ROUTES.EDIT_USER,
    element: <EditUserPage />,
  },

];
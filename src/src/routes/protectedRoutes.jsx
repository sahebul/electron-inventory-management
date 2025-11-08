import ProductListPage from '../pages/ProductListPage';
import AddProduct from '../pages/AddProduct';
import {BusinessListPage,AddBusinessPage,EditBusinessPage} from '../pages/business';
import { ROUTES } from './routePaths';

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
];
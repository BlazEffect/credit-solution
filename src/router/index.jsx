import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from '../pages/Main';
import Login from '../pages/Login';

export const routes = [
    {
        path: '/',
        element: (<Main />)
    },
    {
        path: '/login',
        element: (<Login />)
    }
]

const router = createBrowserRouter(routes);

export default router;
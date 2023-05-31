import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import LoginScreen from './screens/login'
import HomeScreen from './screens/home';
import MainLayout from './layouts/main';
import PedidosScreen from './screens/pedidos';
import ProductosScreen from './screens/productos';
import CategoriasScreen from './screens/categorias';
import NewProductScreen from './screens/productos/new';
import PrivateRoute from './components/PrivateRoute';


const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginScreen/>
    },
    {
        path: '/',
        element: <PrivateRoute><MainLayout/></PrivateRoute>,
        children: [
            {
                path: 'dashboard',
                element: <PrivateRoute><HomeScreen/></PrivateRoute>
            },
            {
                path: 'pedidos/new',
                element: <PrivateRoute><PedidosScreen/></PrivateRoute>
            },
            {
                path: 'productos',
                element: <PrivateRoute><ProductosScreen/></PrivateRoute>
            },
            
            {
                path: 'productos/new',
                element: <PrivateRoute><NewProductScreen/></PrivateRoute>
            },
            {
                path: 'productos/edit/:id',
                element: <PrivateRoute><NewProductScreen/></PrivateRoute>
            },
            {
                path: 'pedidos',
                element: <PrivateRoute><PedidosScreen/></PrivateRoute>
            },
            {
                path: 'categorias',
                element: <PrivateRoute><CategoriasScreen/></PrivateRoute>
            }
        ]
    }
]);

export default router;
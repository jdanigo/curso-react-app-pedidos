import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import LoginScreen from './screens/login'
import HomeScreen from './screens/home';
import MainLayout from './layouts/main';
import PedidosScreen from './screens/pedidos';
import ProductosScreen from './screens/productos';
import CategoriasScreen from './screens/categorias';
import NewProductScreen from './screens/productos/new';

const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginScreen/>
    },
    {
        path: '/',
        element: <MainLayout/>,
        children: [
            {
                path: 'dashboard',
                element: <HomeScreen/>
            },
            {
                path: 'productos',
                element: <ProductosScreen/>
            },
            {
                path: 'productos/new',
                element: <NewProductScreen/>
            },
            {
                path: 'productos/edit/:id',
                element: <NewProductScreen/>
            },
            {
                path: 'pedidos',
                element: <PedidosScreen/>
            },
            {
                path: 'categorias',
                element: <CategoriasScreen/>
            }
        ]
    }
]);

export default router;
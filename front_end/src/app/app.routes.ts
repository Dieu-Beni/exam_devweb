import { Routes } from '@angular/router';
import { Login } from './admin/login/login';
import { Layout } from './admin/layout/layout';
import { Products } from './admin/products/products';
import { Categories } from './admin/categories/categories';
import { Landing } from './client/landing/landing';
import { CategoryProducts } from './client/category-products/category-products';
import { ClientProducts } from './client/client-products/client-products';
import { Register } from './pages/register/register';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'shop',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'register',
        component: Register
    },
    {
        path: '',
        component: Landing,
        children:[
            {
                path: 'product/:id',
                component: CategoryProducts
            },
            {
                path: 'shop',
                component: ClientProducts
            },
        ]
    },
    
    {
        path: 'admin',
        component: Layout,
        children:[
            {
                path: 'products',
                component: Products
            },
            {
                path: 'categories',
                component: Categories
            }
        ]
    }
];

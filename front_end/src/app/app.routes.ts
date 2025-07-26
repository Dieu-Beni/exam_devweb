import { Routes } from '@angular/router';
import { Login } from './admin/login/login';
import { Layout } from './admin/layout/layout';
import { Products } from './admin/products/products';
import { Categories } from './admin/categories/categories';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: '',
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

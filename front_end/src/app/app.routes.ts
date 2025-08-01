import { Routes } from '@angular/router';
import { Login } from './admin/login/login';
import { Layout } from './admin/layout/layout';
import { Products } from './admin/products/products';
import { Categories } from './admin/categories/categories';
import { Landing } from './client/landing/landing';
import { CategoryProducts } from './client/category-products/category-products';
import { ClientProducts } from './client/client-products/client-products';
import { Register } from './pages/register/register';
import { Customer } from './admin/customer/customer';
import { CustomerCart } from './client/customer-cart/customer-cart';
import { Checkout } from './client/checkout/checkout';
import { DetailProduct } from './client/detail-product/detail-product';
import { Order } from './admin/order/order';
import { Card } from './admin/card/card';
import { CustomerOrders } from './client/customer-orders/customer-orders';
import { Profil } from './client/profil/profil';

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
            {
                path: 'customer_cart',
                component: CustomerCart
            },
            {
                path: 'checkout',
                component: Checkout
            },
            {
                path: 'detailPro/:id',
                component: DetailProduct
            },
            {
                path: 'customer_orders',
                component: CustomerOrders
            },
            {
                path: 'profil',
                component: Profil
            }
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
            },
            {
                path: 'customers',
                component: Customer
            },
            {
                path: 'orders',
                component: Order
            },
            {
                path: 'cards/:id',
                component: Card
            }
        ]
    }
];

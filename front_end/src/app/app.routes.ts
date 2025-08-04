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
import { Dashbord } from './admin/dashbord/dashbord';
import { adminGuard } from './guards/admin-guard';
import { clientGuard } from './guards/client-guard';
import { Paiement } from './admin/paiement/paiement';
import { ClientHistorique } from './admin/client-historique/client-historique';

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
        //canActivateChild: [clientGuard],
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
                canActivate: [clientGuard],
                component: CustomerCart
            },
            {
                path: 'checkout',
                canActivate: [clientGuard],
                component: Checkout
            },
            {
                path: 'detailPro/:id',
                component: DetailProduct
            },
            {
                path: 'customer_orders',
                canActivate: [clientGuard],
                component: CustomerOrders
            },
            {
                path: 'profil',
                canActivate: [clientGuard],
                component: Profil
            }
        ]
    },
    {
        path: 'admin',
        canActivateChild: [adminGuard],
        component: Layout,
        children:[
            {
                path: '',
                component: Dashbord
            },
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
            },
            {
                path: 'payment/:id',
                component: Paiement
            },
            {
                path:'commande/:id_user',
                component: ClientHistorique
            }
        ]
    },
    {
        path: '**',
        component: Login
    }
];

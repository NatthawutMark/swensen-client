import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductComponent } from './product/product.component';
import { AdminProductComponent } from './Admin/admin-product/admin-product.component';
import { AdminProductAddComponent } from './Admin/admin-product-add/admin-product-add.component';

const redirect = "/home"

const routes: Routes = [
    {
        path: '',
        redirectTo: redirect,
        pathMatch: 'full'
    },
    {
        path: 'home',
        pathMatch: 'full',
        component: HomeComponent
    },
    {
        path: 'login',
        pathMatch: 'full',
        component: LoginComponent
    },
    {
        path: 'register',
        pathMatch: 'full',
        component: RegisterComponent
    },
    {
        path: 'product',
        pathMatch: 'full',
        component: ProductComponent
    },
    {
        path: 'admin',
        component: AdminProductComponent,
        children: [
            {
                path: 'add',
                pathMatch: 'full',
                component:AdminProductAddComponent
                // redirectTo: '',
                // children: [
                //     {
                //         path: 'product',
                //         redirectTo: 'roots/admin/product',
                //     }
                // ]
            }
        ]
    },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

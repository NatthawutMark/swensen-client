import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './store/home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductComponent } from './store/product/product.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
// import { AdminProductAddComponent } from './admin/admin-product-add/admin-product-add.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { LayoutAdminComponent } from './shared/layout/layout-admin/layout-admin.component';
import { LayoutDefaultComponent } from './shared/layout/layout-default/layout-default.component';

const redirect = "/store"

const routes: Routes = [
    {
        path: '',
        redirectTo: redirect,
        pathMatch: 'full'
    },
    {
        path: 'store',
        // pathMatch: 'full',
        // component: HomeComponent,
        component: LayoutDefaultComponent,
        loadChildren: () => import('./store/store.module').then(m => m.StoreModule)
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
        component: LayoutAdminComponent,
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
        // component: AdminProductComponent,
        // children: [
        //     {
        //         path: 'add',
        //         pathMatch: 'full',
        //         component: AdminProductAddComponent
        //     }
        // ]
    },

    // error ok
    {
        path: 'error',
        loadChildren: () => import('./error/error.module').then(m => m.ErrorModule)
    },
    {
        path: '**',
        redirectTo: '/error'
    },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

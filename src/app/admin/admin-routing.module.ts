import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { UsersService } from '../_service/users.service';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminCategoryComponent } from './admin-category/admin-category.component';

var redirect = "/home"

var userService: UsersService;

if (userService! != null) {
    redirect = '/admin/home';
}
else {
    redirect = '/admin/login';
}

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: redirect
    },
    {
        path: 'home',
        pathMatch: 'full',
        component: AdminHomeComponent,
    },
    {
        path: 'product',
        pathMatch: 'full',
        component: AdminProductComponent,
    },
    {
        path: 'category',
        pathMatch: 'full',
        component: AdminCategoryComponent,
    },
    {
        path: 'login',
        pathMatch: 'full',
        component: AdminLoginComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }

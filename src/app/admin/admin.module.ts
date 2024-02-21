import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material/material.module';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminProductAddComponent } from './admin-product-add/admin-product-add.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { AdminCategoryAddComponent } from './admin-category-add/admin-category-add.component';
// import { AdminProductAddComponent } from './admin-product-add/admin-product-add.component';



@NgModule({
    declarations: [
        AdminLoginComponent,
        AdminProductComponent,
        AdminProductAddComponent,
        AdminHomeComponent,
        AdminCategoryComponent,
        AdminCategoryAddComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        AdminRoutingModule
    ]
})
export class AdminModule { }

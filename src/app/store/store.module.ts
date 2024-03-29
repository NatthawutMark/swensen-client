import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { MaterialModule } from '../shared/material/material.module';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';


@NgModule({
    declarations: [
        HomeComponent,
        ProductComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        StoreRoutingModule
    ]
})
export class StoreModule { }

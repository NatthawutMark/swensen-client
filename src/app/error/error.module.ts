import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorNotFoundComponent } from './error-not-found/error-not-found.component';
import { ErrorRoutingModule } from './error-routing.module';



@NgModule({
    declarations: [
        ErrorNotFoundComponent
    ],
    imports: [
        CommonModule,
        ErrorRoutingModule
    ]
})
export class ErrorModule { }

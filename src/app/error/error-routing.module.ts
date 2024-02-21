import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorNotFoundComponent } from './error-not-found/error-not-found.component';

const redirect = "/home"

const routes: Routes = [
    {
        path: '',
        component: ErrorNotFoundComponent,
    },
    {
        path: 'notfound',
        component: ErrorNotFoundComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ErrorRoutingModule { }

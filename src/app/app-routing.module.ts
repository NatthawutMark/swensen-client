import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const redirect = "/home"

const routes: Routes = [
    {
        path: '',
        redirectTo: redirect,
        pathMatch:'full'
    },
    {
        path: 'home',
        pathMatch:'full',
        component: HomeComponent
    },
    {
        path:'login',
        pathMatch:'full',
        component:LoginComponent
    },
    {
        path:'register',
        pathMatch:'full',
        component:RegisterComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

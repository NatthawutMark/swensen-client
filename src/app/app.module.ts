import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask, IConfig } from 'ngx-mask';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MaterialModule } from './shared/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './product/product.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { AdminLoginComponent } from './Admin/admin-login/admin-login.component';
import { AdminProductComponent } from './Admin/admin-product/admin-product.component';
import { AdminProductAddComponent } from './Admin/admin-product-add/admin-product-add.component';

const maskConfig: Partial<IConfig> = {
  validation: false,
};
// @Injectable({
//   providedIn: 'root'
// })
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProductComponent,
    AdminLoginComponent,
    AdminProductComponent,
    AdminProductAddComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    MaterialModule,
    HttpClientModule,
    NgImageSliderModule
  ],
  providers: [provideNgxMask(maskConfig)],
  bootstrap: [AppComponent]
})
export class AppModule { }

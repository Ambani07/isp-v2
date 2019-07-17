// modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// services
import { AuthService } from './shared/auth.service';
import { AuthGuard } from './shared/auth.guard';

// components
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

// routes
const routes: Routes = [
    {path: '',
    component: AuthComponent,
    children: [
        {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
        {path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
    ]
}]

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    CommonModule,
    HttpClientModule
  ],
  providers: [AuthService,
              AuthGuard]
})
export class AuthModule { }

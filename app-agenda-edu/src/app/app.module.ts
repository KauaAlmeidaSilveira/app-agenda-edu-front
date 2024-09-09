import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ComponentsModule } from './components/components.module';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { ScheduleMenuComponent } from './pages/schedule-menu/schedule-menu.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { BookingFormComponent } from './pages/booking-form/booking-form.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
@NgModule({
	declarations: [
		AppComponent,
		LoginPageComponent,
		SignupPageComponent,
		ScheduleMenuComponent,
		BookingFormComponent,
		ForgotPasswordComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		ComponentsModule,
		AngularMaterialModule,
		MatNativeDateModule,
	],
	providers: [
		provideAnimationsAsync(),
		provideHttpClient(withFetch()),
		provideToastr(),
		provideAnimations(),
		{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
		DatePipe,
	],
	bootstrap: [AppComponent],
})
export class AppModule {}

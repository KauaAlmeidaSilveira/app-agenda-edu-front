import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.type';
import { tap } from 'rxjs';
import { API_CONFIG } from '../config/api-config';

@Injectable({
	providedIn: 'root',
})
export class LoginService {
	apiUrl: string = API_CONFIG.baseUrl + '/auth';

	constructor(private httpClient: HttpClient) {}

	login(email: string, password: string) {
		return this.httpClient
			.post<LoginResponse>(this.apiUrl + '/login', { email, password })
			.pipe(
				tap((value) => {
					sessionStorage.setItem('auth-token', value.token);
					sessionStorage.setItem('email', value.email);
				})
			);
	}

	signup(name: string, email: string, password: string, confirmPassword: string) {
		return this.httpClient
			.post<LoginResponse>(this.apiUrl + '/signup', { name, email, password, confirmPassword })
			.pipe(
				tap((value) => {
					sessionStorage.setItem('auth-token', value.token);
					sessionStorage.setItem('email', value.email);
				})
			);
	}

	forgotPassword(email: string, newPassword: string, confirmNewPassword: string) {
		return this.httpClient
			.post<void>(this.apiUrl + '/forgotPassword', { email, newPassword, confirmNewPassword })
	}
}

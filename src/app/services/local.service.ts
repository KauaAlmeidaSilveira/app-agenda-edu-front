import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api-config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Local } from '../types/local.type';
import { firstValueFrom } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class LocalService {
	apiUrl: string = API_CONFIG.baseUrl + '/locals';

	constructor(
		private httpClient: HttpClient,
	) {}

	verifyToken(): HttpHeaders {
		const token = sessionStorage.getItem('auth-token');

		if (token != null) {
			const headers = new HttpHeaders({
				Authorization: `Bearer ${token}`,
			});
			return headers;
		}

		throw new Error('Token de autenticação não encontrado');
	}

	async findAll(): Promise<Local[]> {
		const headers = this.verifyToken();

		return await firstValueFrom(
			this.httpClient
				.get<Local[]>(this.apiUrl, { headers })
		);
	}

}


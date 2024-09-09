import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api-config';
import { firstValueFrom } from 'rxjs';
import { CoursesGroup } from '../types/coursesGroup.type';

@Injectable({
	providedIn: 'root',
})
export class CourseService {
	apiUrl: string = API_CONFIG.baseUrl + '/courses';

	constructor(private httpClient: HttpClient) {}

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

	async findAll(): Promise<CoursesGroup[]>{
		const headers = this.verifyToken()

		return await firstValueFrom(
			this.httpClient
				.get<CoursesGroup[]>(this.apiUrl, { headers })			
		)
	}
}

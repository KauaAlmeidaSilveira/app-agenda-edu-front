import { Booking } from './../types/booking.type';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api-config';
import { firstValueFrom } from 'rxjs';
import { DatePipe } from '@angular/common';
import { RegisterBooking } from '../types/registerBooking.type';

@Injectable({
	providedIn: 'root',
})
export class BookingService {
	apiUrl: string = API_CONFIG.baseUrl + '/bookings';

	constructor(private httpClient: HttpClient, private datePipe: DatePipe) {}

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

	async findBookingsByUserEmail(): Promise<Booking[]> {
		const headers = this.verifyToken();

		return await firstValueFrom(
			this.httpClient.get<Booking[]>(this.apiUrl + '/user/bookings', {
				headers,
			})
		);
	}

	async disableBookingById(bookingId: Number): Promise<Booking> {
		const headers = this.verifyToken();

		return await firstValueFrom(
			this.httpClient.patch<Booking>(
				`${this.apiUrl}/disable/${bookingId}`,
				{},
				{ headers }
			)
		);
	}

	async findPossiblesCheckIn(
		date: Date | null,
		localId: Number
	): Promise<String[]> {
		const headers = this.verifyToken();

		let dateFormated = this.datePipe.transform(date, 'yyyy-MM-dd');

		return await firstValueFrom(
			this.httpClient.get<String[]>(
				`${this.apiUrl}/checkin/${dateFormated}/${localId}`,
				{ headers }
			)
		);
	}

	async findPossiblesCheckOutWithCheckIn(
		date: Date | null,
		localId: Number,
		checkInSelected: string
	): Promise<String[]> {
		const headers = this.verifyToken();

		const dateFormated = this.datePipe.transform(date, 'yyyy-MM-dd');

		// Adicionando o parâmetro checkInSelected à URL como parâmetro de consulta
		return await firstValueFrom(
			this.httpClient.get<String[]>(
				`${this.apiUrl}/checkout/${dateFormated}/${localId}`,
				{
					headers,
					params: {
						checkInSelected: checkInSelected,
					},
				}
			)
		);
	}

	async insertBooking(booking: RegisterBooking): Promise<RegisterBooking> {
		const headers = this.verifyToken();

		return await firstValueFrom(
			this.httpClient
				.post<RegisterBooking>(
					`${this.apiUrl}/new`,
					booking,
					{ headers }
				)
		);
	}
}

import { Booking } from './../../types/booking.type';
import { BookingService } from './../../services/booking.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-schedule-menu',
	templateUrl: './schedule-menu.component.html',
	styleUrl: './schedule-menu.component.scss',
})
export class ScheduleMenuComponent {
	constructor(
		private router: Router,
		private bookingService: BookingService
	) {}

	bookings: Booking[] = [];

	async ngOnInit(): Promise<void> {
		this.loadBookings();
	}

	public async loadBookings(): Promise<void> {
		try {
			this.bookings = await this.bookingService.findBookingsByUserEmail();
		} catch (error) {
			console.error('Erro ao buscar bookings:', error);
		}
	}

	async disableBookingById(booking: Booking): Promise<void> {
		try {
			await this.bookingService.disableBookingById(booking.id);
			await this.loadBookings();
		} catch (error) {
			console.error('Erro ao desativar booking:', error);
		}
	}

	navigate(page: string) {
		if (page === 'bookingForm') {
			this.router.navigate(['/bookingForm']);
		}
	}
}

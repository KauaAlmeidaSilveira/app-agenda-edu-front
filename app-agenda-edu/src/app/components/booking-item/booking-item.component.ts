import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Booking } from '../../types/booking.type';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
	selector: 'app-booking-item',
	templateUrl: './booking-item.component.html',
	styleUrl: './booking-item.component.scss',
})
export class BookingItemComponent {
	constructor(private dialog: MatDialog) {}

	@Input({ required: true }) booking: Booking = {
		id: 0,
		localName: '',
		checkIn: '',
		checkOut: '',
		date: '',
		courseName: '',
		userId: 0,
	};

	@Output() cancelBookingEmmit = new EventEmitter<Booking>();

	cancelBooking() {
		const dialogRef = this.dialog.open(ConfirmDialogComponent);

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.cancelBookingEmmit.emit(this.booking);
			}
		});
	}
}

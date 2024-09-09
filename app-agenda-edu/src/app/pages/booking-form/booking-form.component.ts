import { Component } from '@angular/core';
import { LocalService } from '../../services/local.service';
import { Local } from '../../types/local.type';
import { CourseService } from '../../services/courses.service';
import { CoursesGroup } from '../../types/coursesGroup.type';
import { BookingService } from '../../services/booking.service';
import { Router } from '@angular/router';
import { RegisterBooking } from '../../types/registerBooking.type';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-booking-form',
	templateUrl: './booking-form.component.html',
	styleUrl: './booking-form.component.scss',
})
export class BookingFormComponent {
	constructor(
		private localService: LocalService,
		private courseService: CourseService,
		private bookingService: BookingService,
		private router: Router,
		private toastService: ToastrService
	) {}

	locals: Local[] = [];

	courses: CoursesGroup[] = [];

	checkIns: String[] = [];

	checkOut: String[] = [];

	booking: RegisterBooking = {
		localId: 0,
		date: '',
		checkIn: '',
		checkOut: '',
		courseId: 0,
	};

	async ngOnInit(): Promise<void> {
		this.loadLocals();
		this.loadCourses();
	}

	private async loadLocals(): Promise<void> {
		try {
			this.locals = await this.localService.findAll();
		} catch (error) {
			console.error('Erro ao buscar local:', error);
		}
	}

	private async loadCourses(): Promise<void> {
		try {
			this.courses = await this.courseService.findAll();
		} catch (error) {
			console.error('Erro ao buscar turmas:', error);
		}
	}

	public async findPossiblesCheckIn(): Promise<void> {
		try {
			if (this.booking.localId != 0) {
				this.checkIns = await this.bookingService.findPossiblesCheckIn(
					new Date(this.booking.date),
					this.booking.localId
				);
			} else {
				console.log('É preciso selecionar um local !!');
			}
		} catch (error) {
			console.error('Erro ao buscar checkins:', error);
		}
	}

	public async findPossiblesCheckOutWithOut(): Promise<void> {
		try {
			if (this.booking.checkIn != null && this.booking.localId != 0) {
				this.checkOut =
					await this.bookingService.findPossiblesCheckOutWithCheckIn(
						new Date(this.booking.date),
						this.booking.localId,
						this.booking.checkIn
					);
			} else {
				console.log('É preciso selecionar um local e um check-in !!');
			}
		} catch (error) {
			console.error('Erro ao buscar checkouts:', error);
		}
	}

	public async insert(): Promise<void> {
		try {
			await this.bookingService.insertBooking(this.booking);
			this.toastService.success('Agendamento Feito com sucesso!');
			this.router.navigate(['/scheduleMenu']);
		} catch (errorResponse: any) {
			if (errorResponse.error) {
				if(errorResponse.error.errors) {
					errorResponse.error.errors.forEach((error: any) => {
						this.toastService.error(error.message);
					});
				}else {
					this.toastService.error(errorResponse.error.error);
				}
			} else {
				this.toastService.error("É preciso que todos os campos estejam preenchidos!");
			}
		}
	}
}

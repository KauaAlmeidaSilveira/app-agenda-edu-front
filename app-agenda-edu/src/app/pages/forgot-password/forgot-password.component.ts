import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
	constructor(
		private loginService: LoginService,
		private toastService: ToastrService,
		private router: Router
	) {}

	account = {
		email: '',
		newPassword: '',
		confirmNewPassword: '',
	};

	submit() {
		this.loginService
			.forgotPassword(
				this.account.email,
				this.account.newPassword,
				this.account.confirmNewPassword
			)
			.subscribe({
				next: () => {
					this.toastService.success('Senha alterada com sucesso!');
					this.router.navigate(['/login']);
				},
				error: (errorResponse: any) => {
					if (errorResponse.error) {
						if (errorResponse.error.errors) {
							errorResponse.error.errors.forEach((error: any) => {
								this.toastService.error(error.message);
							});
						} else {
							this.toastService.error(errorResponse.error.error);
						}
					} else {
						this.toastService.error('Erro inesperado!');
					}
				},
			});
	}

	setEmail(value: string) {
		this.account.email = value;
	}

	setPassword(value: string) {
		this.account.newPassword = value;
	}

	setConfirmPassword(value: string) {
		this.account.confirmNewPassword = value;
	}
}

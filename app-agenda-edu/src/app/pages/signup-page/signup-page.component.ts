import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
	selector: 'app-signup-page',
	templateUrl: './signup-page.component.html',
	styleUrl: './signup-page.component.scss',
})
export class SignupPageComponent {

	constructor(
		private loginService: LoginService,
		private toastService: ToastrService,
		private router: Router
	){}

	account = {
		nome: '',
		email: '',
		password: '',
		confirmPassword: '',
	};

	submit() {
		console.log(this.account)
		this.loginService
			.signup(this.account.nome, this.account.email, this.account.password, this.account.confirmPassword)
			.subscribe({
				next: () => {
					this.toastService.success('Cadastro Feito com sucesso!');
					this.router.navigate(['/login']);
				},
				error: (errorResponse) => {
					if (errorResponse.error) {
						if(errorResponse.error.errors) {
							errorResponse.error.errors.forEach((error: any) => {
								this.toastService.error(error.message);
							});
						}else {
							this.toastService.error(errorResponse.error.error);
						}
					} else {
						this.toastService.error("Email ou senha incorretos!");
					}
				}
			});
	}

	setName(value: string) {
		this.account.nome = value;
	}

	setEmail(value: string) {
		this.account.email = value;
	}

	setPassword(value: string) {
		this.account.password = value;
	}

	setConfirmPassword(value: string) {
		this.account.confirmPassword = value;
	}
}

import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {

	constructor(
		private loginService: LoginService,
		private toastService: ToastrService,
		private router: Router
	){}

    account = {
        email: '',
        password: ''
    }

    submit() {
		this.loginService.login(this.account.email, this.account.password).subscribe(
			{
				next: () => {
					this.toastService.success("Login feito com sucesso!");
					this.router.navigate(["/scheduleMenu"]);
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
			}
		);
	}
	

    setEmail(value: string){
        this.account.email = value
    }

    setPassword(value: string){
        this.account.password = value
    }

	navigate(){
		this.router.navigate(["/forgotPassword"]);
	}
}

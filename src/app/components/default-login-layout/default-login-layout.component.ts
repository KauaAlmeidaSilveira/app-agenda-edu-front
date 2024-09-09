import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-default-login-layout',
  templateUrl: './default-login-layout.component.html',
  styleUrl: './default-login-layout.component.scss'
})
export class DefaultLoginLayoutComponent {

  @Input({required:true}) title: string = 'Title'
  @Input({required:true}) btnText: string = ''
  @Input() pageType: 'Login' | 'Signup' = 'Login'
  @Input("disableNavPage") isDisabled: boolean = false

  @Output("submit") onSubmitEmmit = new EventEmitter();

  submit(){
    this.onSubmitEmmit.emit();
  }

  constructor(private router: Router) {}

  navigate(page: string){
    if(page === 'Login'){
      this.router.navigate(['/login'])
    }else if(page === 'Signup'){
      this.router.navigate(['/signup'])
    }
  }

}

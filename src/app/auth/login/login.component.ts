import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errors: any[] = [];
  notifyMessage: string = '';

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.route.params.subscribe(
      (params) => {
        if(params['registered'] === 'success'){
          this.notifyMessage = 'You have been successfuly registered, you can login now!';
        }
    });
    // initialization of form
    this.loginForm = this.fb.group({
      email: ['', [ Validators.required, 
                    Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@bcx+(?:\.[a-zA-Z0-9-]+)*$')]],
      password: ['', Validators.required]
    });
  }

  isInvalidForm(fieldName): boolean{
    return this.loginForm.controls[fieldName].invalid &&
          (this.loginForm.controls[fieldName].dirty || this.loginForm.controls[fieldName].touched);
  }

  isRequired(fieldName){
    return this.loginForm.controls[fieldName].errors.required;
  }

  login(){
    
    console.log(this.loginForm.valid);

    this.auth.login(this.loginForm.value).subscribe(
      (token) => {
        this.router.navigate(['/admin']);
      },
      (errorResponse) => {
        this.errors = errorResponse.error.errors;
      }
    );
  }

}

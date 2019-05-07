import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { AuthenticationService } from '../services';
import { VolunteerRequest } from '../models';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  
  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private authenticationService: AuthenticationService,
  ) {
      
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) { 
          console.log(this.authenticationService.currentUserValue);
          
          
      }else{
          this.router.navigate(['login']);
      }
  }

  ngOnInit() {
      if (this.authenticationService.loggedIn() == true) {
        if (this.authenticationService.IsApprover() == true) {
            this.router.navigate(['approver']);
        } else if (this.authenticationService.IsApproved() == true) {
            this.router.navigate(['volunteer']);
        } else{
            this.router.navigate(['status']);
        }
      }else{
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
      }
      
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          console.log("Invalid credentials")
          return;
      }

      this.loading = true;
      this.authenticationService.login(this.f.email.value, this.f.password.value)
          .pipe(first())
          .subscribe(
              data => {
                  if(data.Role=='True'){
                      this.router.navigate(['approver']);
                  }else if(data.Status==VolunteerRequest.Approved){
                      this.router.navigate(['volunteer'])
                  }else if(data.Status==VolunteerRequest.Pending || data.Status==VolunteerRequest.Rejected){
                      this.router.navigate(['status'])
                  }
                  
              },
              error => {
                  console.log(error);
                  
                  this.loading = false;
              });
  }
}

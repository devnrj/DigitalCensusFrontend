import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService, UserService } from '../services';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    userAccount: FormGroup;
    ProfilePicture: File = null;
    imageUrl:string="../../assets/profile.jpg";
    filename="";
    aadharNumber:boolean;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
    ) { }

    ngOnInit() {
        if (this.authenticationService.loggedIn() == true) {
            if (this.authenticationService.IsApprover() == true) {
                this.router.navigate(['approver']);
            } else if (this.authenticationService.IsApproved() == true) {
                this.router.navigate(['volunteer']);
            } else{
                this.router.navigate(['status']);
            }
        } else {
            this.userAccount = this.formBuilder.group({
                email: ['', Validators.required,Validators.email],
                password: ['', Validators.required]
            });

            this.registerForm = this.formBuilder.group({
                firstName: ['', Validators.required],
                lastName: ['', Validators.required],
                userAccount: this.userAccount,
                aadharNumber: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]],
                ProfilePictureAddress: ['', Validators.required],
                ProfilePicture: ['']
            });
        }
    }

    pickImage(file: FileList) {
        this.ProfilePicture = file.item(0);
        var reader = new FileReader();
        reader.onload= (event:any)=>{
            this.imageUrl = event.target.result;
        }
        reader.readAsDataURL(this.ProfilePicture);
        const formData : FormData = new FormData();
        formData.append('Image',this.ProfilePicture,this.ProfilePicture.name);
        console.log(formData);
        this.userService.uploadProfilePicture(formData).subscribe(data=>this.filename=data.toString(),
        error=>console.log(error));
    }
    
    isUniqueAadhar(val){
        console.log(val);
        this.aadharNumber=val;
        this.userService.isUniqueAadharNumber(val).subscribe(data=>{
            
            this.aadharNumber=data=="true"?true:false;
            console.log(this.aadharNumber);
            },
        );
    }
    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }
    get g() { return this.userAccount.controls; }
    onSubmit() {
        this.submitted = true;
        this.registerForm.controls['ProfilePictureAddress'].setValue(this.filename);
        
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        this.loading = true;
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/login']);
                },
                error => {
                    this.loading = false;
                }
        );
    }
}
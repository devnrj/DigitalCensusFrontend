import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from './services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy{
  title = 'DigitalCensus';
  constructor(private router:Router,private authService:AuthenticationService){}
  ngOnInit(){
   
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['login']);
  }

  ngOnDestroy(){
    localStorage.clear();
  }
}

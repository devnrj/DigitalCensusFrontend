import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.css']
})
export class VolunteerComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    if(localStorage.getItem('role') != null && localStorage.getItem('role')=='True' || localStorage.getItem('status')!='1'){
      this.router.navigate(['forebidden']);
    }else if(localStorage.getItem('role')==null){
      this.router.navigate(['forebidden']);
    }
  }

}

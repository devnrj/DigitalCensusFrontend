import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VolunteerRequest } from '../../models/';
@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  constructor(private router:Router) { }
  status:string;
  name:string;

  ngOnInit() {
    if(localStorage.getItem('role') != null && localStorage.getItem('role')=='True'){
      this.router.navigate(['forebidden']);
    }else if(localStorage.getItem('role')==null){
      this.router.navigate(['forebidden']);
    }
    if(localStorage.getItem('status')=='0'){
      this.status='Pending';
    }else if(localStorage.getItem('status')=='1'){
      this.status='Approved';
    }else{
      this.status='Rejected';
    }
    this.name=localStorage.getItem('name');
    console.log(this.status);
  }

}

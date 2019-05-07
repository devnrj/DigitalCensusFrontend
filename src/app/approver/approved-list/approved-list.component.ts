import { Component, OnInit } from '@angular/core';
import { User, VolunteerRequest } from '../../models';
import {UserService} from '../../services/';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approved-list',
  templateUrl: './approved-list.component.html',
  styleUrls: ['./approved-list.component.css']
})
export class ApprovedListComponent implements OnInit {

  users:User[]=[];
  isEmpty:boolean;
  
  constructor(private userService:UserService,private router:Router) { }

  ngOnInit() {
    if(localStorage.getItem('role') != null && localStorage.getItem('role')=='False'){
      this.router.navigate(['forebidden']);
    }else if(localStorage.getItem('role')==null){
      this.router.navigate(['forebidden']);
    }
    this.getApprovedVolunteers();
    if(this.users==null || this.users.length==0){
      this.isEmpty = true;
    }else{
      this.isEmpty = false;
    }
  }
  getApprovedVolunteers(){
    this.userService.getByVolunteerByStatus(VolunteerRequest.Approved).subscribe(data=>this.users=data,
    error=>console.log(error));
  }
}

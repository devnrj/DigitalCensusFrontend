import { Component, OnInit } from '@angular/core';
import { User, VolunteerRequest } from '../../models';
import {UserService} from '../../services/';
import { Router } from '@angular/router';
@Component({
  selector: 'app-rejected-list',
  templateUrl: './rejected-list.component.html',
  styleUrls: ['./rejected-list.component.css']
})
export class RejectedListComponent implements OnInit {
  users:User[]=[];
  isEmpty:boolean;
  constructor(private userService:UserService, private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('role') != null && localStorage.getItem('role')=='False'){
      this.router.navigate(['forebidden']);
    }else if(localStorage.getItem('role')==null){
      this.router.navigate(['forebidden']);
    }
    this.getRejectedVolunteers();
    if(this.users==null || this.users.length==0){
      this.isEmpty = true;
    }else{
      this.isEmpty = false;
    }
  }

  getRejectedVolunteers(){
    this.userService.getByVolunteerByStatus(VolunteerRequest.Rejected).subscribe(data=>this.users=data,
    error=>console.log(error));
  }
}

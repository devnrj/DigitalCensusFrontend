import { Component, OnInit } from '@angular/core';
import { User, VolunteerRequest } from '../../models';
import { UserService } from '../../services/';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pending-list',
  templateUrl: './pending-list.component.html',
  styleUrls: ['./pending-list.component.css']
})
export class PendingListComponent implements OnInit {

  users: User[] = [];
  isEmpty: boolean;
  
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('role') != null && localStorage.getItem('role') == 'False') {
      this.router.navigate(['forebidden']);
    } else if (localStorage.getItem('role') == null) {
      this.router.navigate(['forebidden']);
    }
    this.getPendingVolunteers();
  }

  getPendingVolunteers() {
    this.userService.getByVolunteerByStatus(VolunteerRequest.Pending).subscribe(data => {
      this.users = <User[]><any[]>data;
      
      if(this.users.length==0){
        this.isEmpty=true;
      }else{
        this.isEmpty=false
      }
    },
      error => console.log(error));
    if(this.isEmpty==false){
      
    }
  }
  approve(index) {
    let user = this.users[index];
    user.requestStatus = VolunteerRequest.Approved;
    this.userService.update(user).subscribe(data => data,
      error => error);
    document.getElementById(index).remove();
  }
  decline(index) {
    let user = this.users[index];
    user.requestStatus = VolunteerRequest.Rejected;
    this.userService.update(user).subscribe(data => data,
      error => error);
    document.getElementById(index).remove();
  }
}

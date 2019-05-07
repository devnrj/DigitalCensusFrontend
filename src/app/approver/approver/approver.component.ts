import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approver',
  templateUrl: './approver.component.html',
  styleUrls: ['./approver.component.css']
})
export class ApproverComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
    if(localStorage.getItem('role') != null && localStorage.getItem('role')=='False'){
      this.router.navigate(['forebidden']);
    }else if(localStorage.getItem('role')==null){
      this.router.navigate(['forebidden']);
    }
  }

}

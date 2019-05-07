import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { House } from 'src/app/models';
import { HouseService } from 'src/app/services';
@Component({
  selector: 'app-add-house',
  templateUrl: './add-house.component.html',
  styleUrls: ['./add-house.component.css']
})
export class AddHouseComponent implements OnInit {

  constructor(private router:Router,private houseService:HouseService) { }
  states:string[]=[];
  house=new House();
  submitted=false;
  censusHouseNumber:string;
  ngOnInit() {
    this.states =[
      'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh',
      'Jammu and Kashmir','Jharkhand','Karnatak','Kerala','Madhya Pradesh','Maharashtra'	,'Manipur'	,'Meghalaya',
      'Mizoram','Nagaland'	,'Odisha','Punjab'	,'Rajasthan','Sikkim'	,'Tamil Nadu','Telangana','Tripura'	,'Uttar Pradesh',
      'Uttarakhand','West Bengal'	,'Andaman and Nicobar Islands','Chandigarh	','Dadar and Nagar Haveli	','Daman and Diu	',
      'Delhi','Lakshadweep','Puducherry ' ];

    if(localStorage.getItem('role') != null && localStorage.getItem('role')=='True' || localStorage.getItem('status')!='1'){
      this.router.navigate(['forebidden']);
    }else if(localStorage.getItem('role')==null){
      this.router.navigate(['forebidden']);
    }
  }

  onSubmit(form){
    this.submitted=true;
    if(form.invalid){
      return
    }
    
    this.houseService.add(this.house).subscribe(data=>this.censusHouseNumber=data.toString(),
    error=>console.log(error));
  }

}

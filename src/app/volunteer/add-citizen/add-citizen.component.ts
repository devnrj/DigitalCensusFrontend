import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Citizen,Relation,Gender,Occupation,MaritalStatus,IndustryNature, House } from 'src/app/models';
import { HouseService } from '../../services';

@Component({
  selector: 'app-add-citizen',
  templateUrl: './add-citizen.component.html',
  styleUrls: ['./add-citizen.component.css']
})
export class AddCitizenComponent implements OnInit {

  citizen=new Citizen();
  validChn:boolean;

  Relation=Relation;
  Gender=Gender;
  Occupation=Occupation;
  MaritalStatus=MaritalStatus;
  IndustryNature=IndustryNature;
  chn:string;
  mStatus:string;
  constructor(private router:Router,private service:HouseService) { }

  reset(form){
    form.reset();
  }
  ngOnInit() {
    if(localStorage.getItem('role') != null && localStorage.getItem('role')=='True' || localStorage.getItem('status')!='1'){
      this.router.navigate(['forebidden']);
    }else if(localStorage.getItem('role')==null){
      this.router.navigate(['forebidden']);
    }
  }
  onSubmit(form){
    console.log(form);
    if(form.invalid){
      return;
    }
    console.log(this.citizen);
    this.service.addCitizen(this.citizen).subscribe(data=>{
      console.log(data)
      window.alert(data);
    },
    error=>console.log(error));
  }
  isValidCHN(){
    if(typeof this.chn =='undefined' || this.chn.trim()==""){

    }else{
      this.service.isValidCensusHouseNumber(this.chn).subscribe(data=>{
        console.log(data)
        this.citizen.CitizenHouseNumberRefID=data.id;
        this.validChn=true;
      },
        error=>{
          console.log(error)
          this.validChn=false;
        });
    }
  }
}

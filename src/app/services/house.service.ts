import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { House, Citizen } from '../models';
import { OnlineOfflineService } from '../services/online-offline.service';

@Injectable({ providedIn: 'root' })
export class HouseService {
    headers: HttpHeaders;
    constructor(private http: HttpClient,private readonly OnlineOfflineService:OnlineOfflineService) {
        this.headers = new HttpHeaders();
        this.headers.append('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
        this.registerToEvents(OnlineOfflineService);
    }

    private registerToEvents(onlineOfflineService: OnlineOfflineService) {
        onlineOfflineService.connectionChanged.subscribe(online => {
          if (online) {
            console.log('went online');
            console.log('sending all stored items');
          } else {
            console.log('went offline, storing in indexdb');
          }
        });
      }

    allStatePopulation(){
        return this.http.get(`http://localhost:53393/api/population`);
    }

    addCitizen(citizen:Citizen){
        console.log(citizen);
        return this.http.post(`http://localhost:53393/api/citizen`,citizen,{headers: this.headers});
    }
    add(house: House) {
        console.log(house);
        return this.http.post(`http://localhost:53393/api/house`, house, {headers : this.headers});
    }
    getAll(house: House) {
        return this.http.get<House[]>(`http://localhost:53393/api/house`,{headers : this.headers});
    }
    isValidCensusHouseNumber(censusHouseNumber) {
        return this.http.get<House>(`http://localhost:53393/api/house/cnh/` + censusHouseNumber,{headers : this.headers});
    }
}
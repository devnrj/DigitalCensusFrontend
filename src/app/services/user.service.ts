import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UUID } from 'angular2-uuid';

import { User } from '../models';
import { VolunteerRequest } from '../models';
@Injectable({ providedIn: 'root' })
export class UserService {
    headers: HttpHeaders;
    constructor(private http: HttpClient) {
        this.headers = new HttpHeaders();
        this.headers.append('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    }
    
    downloadProfilePicture(imgId){
        console.log(imgId);
        return this.http.get(`http://localhost:53393/Image/${imgId}`);
    }

    uploadProfilePicture(fileToUpload){
        const endPoint = "http://localhost:53393/api/UploadImage";
        return this.http.post(endPoint,fileToUpload);
    }

    isUniqueAadharNumber(val){
        const endPoint= `http://localhost:53393/api/verifyAadhar/${val}`;
        return this.http.get(endPoint,{ headers: this.headers });
    }
    
    getAll() {
        return this.http.get<User[]>(`http://localhost:53393/api/user`, { headers: this.headers });
    }

    getById(id: UUID) {
        return this.http.get(`http://localhost:53393/api/user/${id}`, { headers: this.headers });
    }

    getByVolunteerByStatus(status: VolunteerRequest) {
        return this.http.get<User[]>(`http://localhost:53393/api/user/status/${status}`, { headers: this.headers });
    }

    register(user: User) {
        return this.http.post(`http://localhost:53393/api/user`, user, { headers: this.headers });
    }

    update(user: User) {
        return this.http.put(`http://localhost:53393/api/user/`, user, { headers: this.headers });
    }

    delete(id: UUID) {
        return this.http.delete(`http://localhost:53393/api/user/${id}`, { headers: this.headers });
    }
}
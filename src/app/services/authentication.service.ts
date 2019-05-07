import { Injectable, EventEmitter} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    
    constructor(private http: HttpClient,private router: Router,) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
    IsApproved(){
        return localStorage.getItem("status")=="1"?true:false;
    }

    IsApprover(){
        return localStorage.getItem("role")=="True"?true:false;
    }
    loggedIn(){
        return !!localStorage.getItem('access_token');
    }

    login(email: string, password: string) {
        var req_header= new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded','No-Auth':'True'})
        return this.http.post<any>(`http://localhost:53393/token`, 
                                   `grant_type=password&username=${email}&password=${password}`)
            .pipe(map(user => {
               // console.log(user);
                // login successful if there's a jwt token in the response
                if (user && user.access_token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    localStorage.setItem('status',user.Status);
                    localStorage.setItem('name',user.Name);
                    localStorage.setItem('guid',user.Guid);
                    localStorage.setItem('role',user.Role);
                    localStorage.setItem('email',user.Email);
                    localStorage.setItem('access_token',user.access_token);
                    this.currentUserSubject.next(user);
                }
                return user;
            }));
    }
    

    logout() {
        // remove user from local storage to log user out
        localStorage.clear();
        this.currentUserSubject.next(null);
        this.router.navigate(['login']);
    }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsersService {

    public currentUser!: Observable<any>;
    private currentUserSubject!: BehaviorSubject<any>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')!));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): any {
        return this.currentUserSubject.value;
    }

    register(data: any) {
        return this.http.post<any>(`${environment.apiUrl}/api/users/register`, data).pipe(map(res => {
            return res;
        }));
    }

    login(data: any) {
        return this.http.post<any>(`${environment.apiUrl}/api/users/login`, data).pipe(map(res => {
            localStorage.setItem('currentUser', JSON.stringify(res.results.data))
            this.currentUserSubject.next(res.results.data);
            return res;
        }));
    }

    //   setting(data: any) {
    //     return this.http.post<any>(`${environment.apiUrl}/api/configoicstamp/setting`, data).pipe(map(res => {
    //       return res;
    //     }));
    //   }

}
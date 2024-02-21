import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsersService {

    public currentUser!: Observable<any>;
    private currentUserSubject!: BehaviorSubject<any>;

    public currentAdmin!: Observable<any>;
    private currentAdminSubject!: BehaviorSubject<any>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')!));
        this.currentUser = this.currentUserSubject.asObservable();

        this.currentAdminSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentAdmin')!));
        this.currentAdmin = this.currentAdminSubject.asObservable();
    }

    public get currentUserValue(): any {
        return this.currentUserSubject.value;
    }

    public get currentAdminValue(): any {
        return this.currentAdminSubject.value;
    }

    register(data: any) {
        return this.http.post<any>(`${environment.apiUrl}/api/users/register`, data).pipe(map(res => {
            return res;
        }));
    }

    login(data: any) {
        return this.http.post<any>(`${environment.apiUrl}/api/users/login`, data).pipe(map(res => {
            let strUser = ''
            var result = res.results.data;
            if (result.type == 'admin') {
                // strUser = 'currentAdmin';
                localStorage.setItem('currentAdmin', JSON.stringify(result))
                this.currentAdminSubject.next(result);
            }
            else {
                // strUser = 'currentUser';
                localStorage.setItem('currentUser', JSON.stringify(result))
                this.currentUserSubject.next(result);
            }
            return res;
        }));
    }

    //   setting(data: any) {
    //     return this.http.post<any>(`${environment.apiUrl}/api/configoicstamp/setting`, data).pipe(map(res => {
    //       return res;
    //     }));
    //   }

}
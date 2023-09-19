import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoryService {

    constructor(private http: HttpClient) {}

    list(data: any) {
        return this.http.post<any>(`${environment.apiUrl}/api/category/list`, data).pipe(map(res => {
            return res;
        }));
    }

    // listPromotion(data: any) {
    //     return this.http.post<any>(`${environment.apiUrl}/api/users/promotion`, data).pipe(map(res => {
    //         return res;
    //     }));
    // }

    //   setting(data: any) {
    //     return this.http.post<any>(`${environment.apiUrl}/api/configoicstamp/setting`, data).pipe(map(res => {
    //       return res;
    //     }));
    //   }

}
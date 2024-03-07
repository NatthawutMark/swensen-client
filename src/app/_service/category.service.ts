import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoryService {

    constructor(private http: HttpClient) { }

    list() {
        return this.http.get(`${environment.apiUrl}/api/category/`).pipe(map(res => {
            return res;
        }));
    }

    submit(data: any) {
        return this.http.post<any>(`${environment.apiUrl}/api/category/`, data).pipe(map(res => {
            return res;
        }));
    }

    active(id: string) {
        let params = new HttpParams();
        params = params.append('id', id)
        const ops = { params: params }
        
        return this.http.get<any>(`${environment.apiUrl}/api/category/active`, ops).pipe(map(res => {
            return res;
        }));
    }

    remove(id: string) {
        let params = new HttpParams();
        params = params.append('id', id)
        const ops = { params: params }

        return this.http.get<any>(`${environment.apiUrl}/api/category/remove`, ops).pipe(map(res => {
            return res;
        }));
    }

}
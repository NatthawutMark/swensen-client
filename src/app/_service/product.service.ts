import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {

    constructor(private http: HttpClient) { }

    list(data: any) {
        return this.http.post<any>(`${environment.apiUrl}/api/product/list`, data).pipe(map(res => {
            return res;
        }));
    }

    listSpecial() {
        return this.http.get<any>(`${environment.apiUrl}/api/product/special`).pipe(map(res => {
            return res;
        }));
    }

    submit(_data: any) {
        let formData = new FormData();

        if (_data.id) {
            formData.append('id', _data.id);
        }
        if (_data.name) {
            formData.append('name', _data.name);
        }
        if (_data.cate_id) {
            formData.append('cate_id', _data.cate_id);
        }
        if (_data.price) {
            formData.append('price', _data.price);
        }
        if (_data.qty) {
            formData.append('qty', _data.qty);
        }
        if (_data.special) {
            formData.append('special', _data.special);
        }
        if (_data.action) {
            formData.append('action', _data.action);
        }
        if (_data.image) {
            for (let i = 0; i < _data.image.length; i++) {
                formData.append('image', _data.image[i].file_blob, _data.image[i].file_name);
            }
        }

        return this.http.post<any>(`${environment.apiUrl}/api/product/submit`, formData).pipe(map(res => {
            return res;
        }));
        // return this.http.post<any>(`${environment.apiUrl}/api/product/submit`, formData).pipe(map(res => {
        //     return res;
        // }));
    }

    remove(_data: any) {
        return this.http.post<any>(`${environment.apiUrl}/api/product/remove`, _data).pipe(map(res => {
            return res;
        }));
    }

    detail(id: string) {
        let params = new HttpParams();
        params = params.append('id', id);
        let ops = { params: params }

        return this.http.get(`${environment.apiUrl}/api/product`, ops).pipe(map(res => {
            return res;
        }));
    }

    getFileBlob(id: string): any {/* Observable<Blob> */
        return this.http.get(`${environment.apiUrl}/api/product/image/${id}`, { responseType: 'blob' });
    }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

    // listPromotion(data: any) {
    //     return this.http.post<any>(`${environment.apiUrl}/api/users/promotion`, data).pipe(map(res => {
    //         return res;
    //     }));
    // }

    submit(_data: any) {
        console.log('submit', _data);

        let formData = new FormData();

        if (_data.name) {
            formData.append('name', _data.name);
        }

        if (_data.cage_id) {
            formData.append('cage_id', _data.cage_id);
        }
        
        if (_data.image) {
            for (let i = 0; i < _data.image.length; i++) {
                formData.append('image', _data.image[i].file_blob, _data.image[i].file_blob.file_name);
            }
        }

        return this.http.post<any>(`${environment.apiUrl}/api/product/submit`, formData).pipe(map(res => {
            return res;
        }));
    }
    
    remove(_data: any) {
        return this.http.post<any>(`${environment.apiUrl}/api/product/remove`, _data).pipe(map(res => {
            return res;
        }));
    }

    // download(_data: any) {
    //     return this.httpClient.get(`${environment.fileApiUrl}/api/file/download/` + _data.fileId, { responseType: 'blob' });
    // }
}
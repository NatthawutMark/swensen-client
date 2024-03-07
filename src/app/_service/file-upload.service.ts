import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FileUploadService {

    constructor(private http: HttpClient) { }
    // API url

    // Returns an observable
    upload(file: any): Observable<any> {
        // Create form data
        const formData = new FormData();

        // Store form name as "file" with file data
        formData.append("file", file, file.name);

        // Make http post request over api
        // with formData as req
        return this.http.post<any>(`${environment.apiUrl}/api/category/list`, formData).pipe(map(res => {
            return res;
        }));
        // return this.http.post(this.baseApiUrl, formData)
    }
}

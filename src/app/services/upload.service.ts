import { Injectable } from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  // baseURL = 'http://localhost:3104/api/upload';
  baseURL = 'https://sdera.azurewebsites.net/api/upload';

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    return this.http.post(this.baseURL, formData, { reportProgress: true, observe: 'events' });

  }
}

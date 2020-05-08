import { Injectable } from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

constructor(private http: HttpClient) { }

public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

   return this.http.post('http://localhost:3104/api/upload', formData, { reportProgress: true, observe: 'events' });
    
  }
}

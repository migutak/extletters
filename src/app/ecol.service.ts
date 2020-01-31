import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EcolService {

  constructor(private httpClient: HttpClient) { }

  demanddownload(file: string) {
    const body = { filename: file };

    return this.httpClient.post(environment.demanddownload + '/filesapi/download', body, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  login(nationid: string, letterid: string) {
    return this.httpClient.get<any>(environment.api + '/api/extletters/search?nationid=' + nationid + '&letterid=' + letterid);
  }

  extletters(id: number, body: {}) {
    return this.httpClient.put<any>(environment.api + '/api/extletters/' + id, body);
  }
}

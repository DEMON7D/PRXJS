import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) {
  }

  getData(url: string): Observable<any> {
    return this.http.get(url)
      .map(response => {
        console.log(response);
        return <any>(response);
      });
  }
}

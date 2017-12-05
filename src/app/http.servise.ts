import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {HttpClient} from '@angular/common/http';
import {ISearchResult} from './ISearchResult';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) {
  }

  getData(url: string): Observable<ISearchResult> {
    return this.http.get<ISearchResult>(url);

  }
}

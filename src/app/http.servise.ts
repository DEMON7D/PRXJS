import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {HttpClient} from '@angular/common/http';
import {ISearchResult} from './ISearchResult';
import {IItem} from './IItem';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) {
  }

  getData(url: string): Observable<IItem[]> {
    return this.http.get<ISearchResult>(url)
      .map((res: ISearchResult) => res.response.listings );

  }
}

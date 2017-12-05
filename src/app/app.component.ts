import { FormControl } from '@angular/forms';
import { HttpService } from './http.servise';
import 'rxjs/add/operator/debounceTime';
import {Component, OnDestroy, OnInit} from '@angular/core';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/distinctUntilChanged';
import {ISearchResult} from './ISearchResult';
import {IItem} from './IItem';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  name = new FormControl();
  private alive = true;
  listings: IItem[];

  constructor(private http: HttpService) {

  }

  ngOnInit() {
    this.name.valueChanges
      .takeWhile(() => this.alive)
      .debounceTime(400)
      .filter((value) => value.length > 2)
      .distinctUntilChanged()
      .switchMap( (value) =>  this.http.getData(`https://api.nestoria.co.uk/api?encoding=json&action=search_listings&country=uk&place_name=${value}`))
      .subscribe( (response: ISearchResult) => this.listings = response.response.listings);
    }

    ngOnDestroy( ) {
      this.alive = false;
    }
}


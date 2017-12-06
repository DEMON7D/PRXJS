import { FormControl } from '@angular/forms';
import { HttpService } from './http.servise';
import 'rxjs/add/operator/debounceTime';
import {Component, OnDestroy, OnInit} from '@angular/core';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/distinctUntilChanged';
import {IItem} from './IItem';
import {Observable} from 'rxjs/Rx'


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  name = new FormControl();
  countries = new FormControl('de');
  private params = {
    name: '',
    country: this.countries.value
  };
  listings: Observable<IItem[]>;

  constructor(private http: HttpService) {

  }

  ngOnInit() {
    const name = this.name.valueChanges
      .debounceTime(400)
      .filter((value) =>  value.length > 2 )
      .distinctUntilChanged()
      .do( (value) => this.params.name = value );

    const countries = this.countries.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .do( (value) => this.params.country = value);

     this.listings = Observable.merge(name, countries)
       .switchMap( () =>  this.http.getData(`https://api.nestoria.${this.params.country}/api?encoding=json&action=search_listings&country=${this.params.country}&place_name=${this.params.name}`));
  }

    ngOnDestroy( ) {

    }
}


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
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/merge';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  name = new FormControl();
  countries = new FormControl('de');
  private alive = true;
  listings: Observable<IItem[]>;

  constructor(private http: HttpService) {

  }

  ngOnInit() {
   this.listings = this.name.valueChanges.merge(this.countries.valueChanges)
      .takeWhile(() => this.alive)
      .debounceTime(400)
      .filter((value) => value.length > 1)
      .distinctUntilChanged()
      .switchMap( (value) =>  this.http.getData(`https://api.nestoria.${this.countries.value}/api?encoding=json&action=search_listings&country=${this.countries.value}&place_name=${this.name.value}`))

    }

    ngOnDestroy( ) {
      this.alive = false;
    }
}


import { FormControl } from '@angular/forms';
import { HttpService } from './http.servise';
import 'rxjs/add/operator/debounceTime';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<input [formControl]="name">`
})
export class AppComponent implements OnInit {
  name = new FormControl();

  constructor(private http: HttpService) {

  }

  ngOnInit() {
    this.name.valueChanges
      .debounceTime(400)
      .subscribe((value) => {
        console.log(value);
        this.http.getData(`http://google.ru/?search=${value}`)
          .subscribe();
    });
  }
}

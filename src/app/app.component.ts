import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
//   template:'<app-layout></app-layout>',
  template:'<router-outlet></router-outlet>',
  // templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'swensen-cliant';
}

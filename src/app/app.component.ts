import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ngSpot';
  links = [
    { path: '/login', icon: 'home', label: 'Login' },
    { path: '/search', icon: 'library_music', label: 'Search Artist' },
  ];
  constructor() {}

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { clientId } from '../../../client';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  login() {
    // tslint:disable-next-line:max-line-length
    (<any>window).location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=http://localhost:4200/search`;
  }

}

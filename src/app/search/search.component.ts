import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../shared/spotify.service';
import { Artist } from '../shared/artist';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchStr: string;
  searchRes: Artist[];
  access_token: string;

  constructor(private authService: AuthService, private spotifyService: SpotifyService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.access_token = this.route.snapshot.fragment
      .split('access_token=')[1]
      .split('&token')[0];
    localStorage.setItem('access_token', this.access_token);
    this.authService.getToken();
  }

  searchMusic() {
    this.spotifyService
      .searchMusic(this.searchStr)
      .subscribe(res => this.searchRes = res.artists.items);
  }
}

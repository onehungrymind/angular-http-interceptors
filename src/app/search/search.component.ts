import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../shared/spotify.service';
import { Artist } from '../shared/artist';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchRes: Artist[];
  searchStr: string;
  access_token: string;

  constructor(private spotifyService: SpotifyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.access_token = this.route.snapshot.fragment
      .split('access_token=')[1]
      .split('&token')[0];
    localStorage.setItem('access_token', this.access_token);
  }

  searchMusic() {
    this.spotifyService.searchMusic(this.searchStr)
      .subscribe(res => this.searchRes = res.artists.items);
  }

  selectArtist(artist: string) {
    const replace = `${window.location.protocol}//${window.location.host}/search`;
    window.history.replaceState({}, document.title, replace);
    window.open(artist, '_blank');
  }
}

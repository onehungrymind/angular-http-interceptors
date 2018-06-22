import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../shared/spotify.service';
import { Artist } from '../shared/artist';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchStr: string;
  searchRes: Artist[];

  constructor(
    private spotifyService: SpotifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const accessToken = this.route.snapshot.fragment
      .split('access_token=')[1]
      .split('&token')[0];
    this.spotifyService.setToken(accessToken);
  }

  searchMusic() {
    this.spotifyService
      .searchMusic(this.searchStr)
      .subscribe(res => this.searchRes = res.artists.items);
  }
}

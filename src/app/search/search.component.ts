import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../shared/spotify.service';
import { Artist } from '../shared/artist';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  accessToken: string;
  searchRes: Artist[];
  searchControl: FormControl = new FormControl();

  constructor(
    private spotifyService: SpotifyService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.route.snapshot.fragment) {
      this.handleAccessToken();
    }
    this.searchMusic();
  }

  searchMusic() {
    this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      map(event => event),
      switchMap(qq => this.spotifyService.searchMusic(qq))
    ).subscribe(res => this.searchRes = res.artists.items);
  }

  handleAccessToken() {
    this.accessToken = this.route.snapshot.fragment
      .split('access_token=')[1]
      .split('&token')[0];
    localStorage.setItem('accessToken', this.accessToken);
    this.router.navigate(['/search'], { queryParams: {} });
  }

  selectArtist(artist: string) {
    window.open(artist, '_blank');
  }

}

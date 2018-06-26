import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../shared/spotify.service';
import { Artist } from '../shared/artist';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { map, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchRes: Artist[];
  access_token: string;
  form: FormGroup;
  searchControl: FormControl = new FormControl();

  constructor(
    private spotifyService: SpotifyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if (this.route.snapshot.fragment) {
      this.callback();
    }
    this.searchMusic();
  }

  searchMusic() {
    this.searchControl.valueChanges.pipe(
      tap(changes => console.log('Changes', changes)),
      debounceTime(500),
      distinctUntilChanged(),
      map((event: any) => event),
      switchMap(qq => this.spotifyService.searchMusic(qq))
    ).subscribe(res => this.searchRes = res.artists.items);
  }

  selectArtist(artist: string) {
    window.open(artist, '_blank');
  }

  callback() {
    const replace = `${window.location.protocol}//${window.location.host}/search`;

    this.access_token = this.route.snapshot.fragment
      .split('access_token=')[1]
      .split('&token')[0];
    localStorage.setItem('access_token', this.access_token);
    window.history.replaceState({}, document.title, replace);
  }
}

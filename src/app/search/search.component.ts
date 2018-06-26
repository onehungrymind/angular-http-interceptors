import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../shared/spotify.service';
import { Artist } from '../shared/artist';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

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
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.route.snapshot.fragment) {
      this.callback();
    }
    this.searchMusic();
  }

  searchMusic() {
    this.searchControl.valueChanges.pipe(
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
    this.access_token = this.route.snapshot.fragment
      .split('access_token=')[1]
      .split('&token')[0];
    localStorage.setItem('access_token', this.access_token);
    this.router.navigate(['/search'], { queryParams: {} });
  }
}

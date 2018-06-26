import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Artist } from './artist';

const BASE_URL = 'https://api.spotify.com/v1';

@Injectable()
export class SpotifyService {

  constructor(private http: HttpClient) {}

  searchMusic(str: string) {
    const URL = `${BASE_URL}/search/`;
    let params = new HttpParams();
    params = params.append('q', str)
                   .append('type', 'artist')
                   .append('limit', '20');

    return this.http.get<Artist>(URL, { params })
      .pipe(map(res => res));
  }
}

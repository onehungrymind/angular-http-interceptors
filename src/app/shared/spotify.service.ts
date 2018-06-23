import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

const BASE_URL = 'https://api.spotify.com/v1/';

@Injectable()
export class SpotifyService {
  access_token;

  constructor(private http: HttpClient) {}

  setToken(accessToken: string) {
    this.access_token = accessToken;
  }

  searchMusic(str: string, type = 'artist') {
    const URL = `${BASE_URL}search`;
    let params = new HttpParams();
    params = params.append('q', str);
    params = params.append('type', type);
    params = params.append('limit', '20');

    return this.http.get<any>(`${URL}`, { params })
      .pipe(map(res => res));
  }

  getArtist(id: string) {
    const URL = `${BASE_URL}artists`;
    return this.http.get<any>(`${URL}/${id}`)
      .pipe(map(res => res));
  }
}

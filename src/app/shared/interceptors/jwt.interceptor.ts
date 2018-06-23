import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private route: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // return;
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 400) {
          this.route.navigateByUrl('/login').then(nav => {
            console.log('NAV', nav);
          });
        }
      }
    }));
  }
}

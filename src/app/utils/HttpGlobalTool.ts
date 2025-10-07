import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, Observable, throwError} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class HttpGlobalTool {

  constructor(private http: HttpClient) {
  }

  paramCfg = {
    headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}
  };

  bodyCfg = {
    headers: {'Content-Type': 'application/json;charset=UTF-8'}
  };

  get(url: string): Observable<any> {
    return this.http.get(url).pipe(
      catchError((e) => {
        console.log(e.error.error)
        return throwError(() => e);
      })
    );
  }

  post(url: string, param: any): Observable<any> {
    return this.http.post(url, param, this.paramCfg).pipe(
      catchError((e) => {
        console.log(e.error.error)
        return throwError(() => e);
      })
    );
  }

  postBody(url: string, body: any): Observable<any> {
    return this.http.post(url, body, this.bodyCfg).pipe(
      catchError((e) => {
        console.log(e.error.error)
        return throwError(() => e);
      })
    );
  }

  put(url: string, body: any): Observable<any> {
    return this.http.put(url, body).pipe(
      catchError((e) => {
        console.log(e.error.error)
        return throwError(() => e);
      })
    );
  }

  delete(url: string): Observable<any> {
    return this.http.delete(url).pipe(
      catchError((e) => {
        console.log(e.error.error)
        return throwError(() => e);
      })
    );
  }

}

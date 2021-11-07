import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  //origin = 'http://127.0.0.1:8000';
  //origin = 'http://192.168.43.112:8000';
  origin = 'https://wilytechnology.in/crypto/public';
  authKey:any = null;

  authKeyChange: Subject<any> = new Subject<any>();
  public authKeyChangeObs = this.authKeyChange.asObservable();

  constructor(
    private http: HttpClient,
    private authService:AuthenticationService
    ) {
      this.updateAuthKey();

      this.authKeyChangeObs.subscribe(() => {
        this.updateAuthKey();
      });
  }

  updateAuthKey(){
    this.authService.getToken().then(res=>{
      //console.log(res);
      if(res){
        this.authKey = 'Bearer '+res;
      }else{
        this.authKey = res;
      }
    });
  }

  getRequest(api,auth?:boolean,type?:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    if(auth && this.authKey){
      headers = headers.set('Authorization', this.authKey);
    }

    return this.http.get(this.origin+api,{headers:headers})
    .pipe(
      retry(0), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  postRequest(api,postdata,auth?:boolean,type?:string){
    let headers = new HttpHeaders();
    if(auth && this.authKey){
      headers = headers.set('Authorization', this.authKey);
    }

    return this.http.post(this.origin+api,postdata,{headers:headers})
    .pipe(
      catchError(this.handleError) // then handle the error
    );
  }

  putRequest(api,postdata,auth?:boolean,type?:string){
    let headers = new HttpHeaders();
    if(auth && this.authKey){
      headers = headers.set('Authorization', this.authKey);
    }

    return this.http.put(this.origin+api,postdata,{headers:headers})
    .pipe(
      catchError(this.handleError) // then handle the error
    );
  }

  deleteRequest(api,auth?:boolean,type?:string){
    let headers = new HttpHeaders();
    if(auth && this.authKey){
      headers = headers.set('Authorization', this.authKey);
    }

    return this.http.delete(this.origin+api,{headers:headers})
    .pipe(
      catchError(this.handleError) // then handle the error
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(error);
  }

}

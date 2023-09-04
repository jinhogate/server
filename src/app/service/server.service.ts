import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CustomResponse } from '../interface/custom-response.model';
import { Observable, Subscriber, catchError, tap, throwError } from 'rxjs';
import { Server } from '../interface/server.model';
import { Status } from '../enum/status.enum';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  private readonly apiUrl = 'http://localhost:8080/server';

  constructor(private http: HttpClient) {}

  servers$ = <Observable<CustomResponse>>(
    this.http
      .get<CustomResponse>(`${this.apiUrl}/list`)
      .pipe(tap(console.log), catchError(this.handleError))
  );

  save$ = (server: Server) =>
    <Observable<CustomResponse>>(
      this.http
        .post<CustomResponse>(`${this.apiUrl}/save`, server)
        .pipe(tap(console.log), catchError(this.handleError))
    );

  ping$ = (ipAddress: string) =>
    <Observable<CustomResponse>>(
      this.http
        .get<CustomResponse>(`${this.apiUrl}/ping/${ipAddress}`)
        .pipe(tap(console.log), catchError(this.handleError))
    );

  server$ = (idServer: number) =>
    <Observable<CustomResponse>>(
      this.http
        .get<CustomResponse>(`${this.apiUrl}/get/${idServer}`)
        .pipe(tap(console.log), catchError(this.handleError))
    );

    
  delete$ = (idServer: number) =>
  <Observable<CustomResponse>>(
    this.http
      .delete<CustomResponse>(`${this.apiUrl}/delete/${idServer}`)
      .pipe(tap(console.log), catchError(this.handleError))
  );

  filter$ = (status: Status, response: CustomResponse) =>
    new Observable<CustomResponse>(
      subscriber =>{
        console.log(response);
        subscriber.next(
          status === Status.ALL ? {...response, message: `Servers filtered by ${status} status`} : 
          {
            ...response,
            message : response.data.servers?.filter(server => server.status === status).length>0 
            ? `Servers filtered by ${status === Status.SERVER_UP? 'Server Up' : 'Server Down'} status`
            : `No servers of ${status} found`,
            data : {
              servers : response.data.servers?.filter(server => server.status === status)
            }
          }
        );
        subscriber.complete();
      }
    )
    .pipe(tap(console.log), catchError(this.handleError));

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError(`An error occured - Error code ${error.status}`);
  }
}

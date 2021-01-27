import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router :Router,private toaster:ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error=>{
        if(error)
        {
          switch (error.status) {
            case 400:
              if(error.error.errors)
              {
                const modalstateError=[];
                for(const key in error.error.errors)
                {
                  if(error.error.errors[key])
                  {
                    modalstateError.push(error.error.errors[key]);
                  }
                }
                throw modalstateError.flat();
              }else{
                this.toaster.error(error.statusText,error.status);
              }
              break;
              case 401:
                this.toaster.error(error.statusText,error.status);
                break;
              case 404:
              this.router.navigateByUrl('/not-found');
              break;
              case 500:
                const navigationExtra:NavigationExtras={state:{error:error.error}}
                this.router.navigateByUrl('/server-error',navigationExtra);
                break;
          
            default:
              this.toaster.error('Something unexpected went wrong');
              console.log(error);
              break;
          }
        }
        return throwError(error);
      })
    )
  }
}

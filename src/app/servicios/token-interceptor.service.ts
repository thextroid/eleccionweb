import { Injectable } from "@angular/core";
import { HttpInterceptor } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(req, next) {
    const tokenizeReq = req.clone({
      setHeaders: {
        authjwt: `${localStorage.getItem("access_token")}`,
      },
    });
    return next.handle(tokenizeReq);
  }
}

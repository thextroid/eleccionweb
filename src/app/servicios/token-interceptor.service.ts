import { Injectable } from "@angular/core";
import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const idtoken = localStorage.getItem("access_token");
    if (idtoken) {
      const cloned = req.clone({
        headers: req.headers.set("authjwt", idtoken),
      });
      return next.handle(req);
    }
    return next.handle(req);
  }
}

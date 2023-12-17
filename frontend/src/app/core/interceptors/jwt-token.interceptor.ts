import { Injectable, inject } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from "rxjs";

import { JWTService } from "../services/jwt.service";


@Injectable()
export class JWTTokenInterceptor implements HttpInterceptor {
    private readonly _jwtService = inject(JWTService);

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const modifiedReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${this._jwtService.token}`),
        });

        return next.handle(modifiedReq);
    }
}

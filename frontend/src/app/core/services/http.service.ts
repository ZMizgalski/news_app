import { HttpClient, HttpErrorResponse, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, catchError, filter, of, retry } from "rxjs";

import { environment } from "src/environments/environment.development";


@Injectable()
export class HttpService {
    private readonly _httpClient = inject(HttpClient);

    public request<T>(request: HttpRequest<T>): Observable<HttpErrorResponse | HttpResponse<T>> {
        return this._httpClient.request<T>(request).pipe(
            catchError((e) => of(e)),
            filter((event) => event instanceof HttpResponse || event instanceof HttpErrorResponse),
            retry(2)
        );
    }

    public get<T>(url: string) {
        const request = new HttpRequest<T>('GET', `${environment.url}/${url}`);
        return this.request(request);
    }

    public post<T>(url: string, body: any) {
        const request = new HttpRequest<T>('POST', `${environment.url}/${url}`, body);
        return this.request(request);
    }
}

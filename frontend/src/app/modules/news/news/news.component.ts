import { HttpResponse } from "@angular/common/http";
import { Component, inject } from "@angular/core";
import { catchError, map, of } from "rxjs";

import { HttpService } from "src/app/core/services/http.service";
import { JWTService } from "src/app/core/services/jwt.service";

import { NewsMessageBullet } from "src/app/core/types/global.types";


@Component({
    selector: 'app-news',
    templateUrl: './news.component.html'
})
export class NewsComponent {
    public readonly $news = inject(HttpService).get<NewsMessageBullet[]>(`api/getNews/${inject(JWTService).tokenData?.id}`).pipe(
        catchError(() => of([])),
        map((m) => (m instanceof HttpResponse) ? m.body : null)
    );
}

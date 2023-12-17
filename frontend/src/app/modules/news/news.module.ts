import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NewsComponent } from "./news/news.component";

import { NewsRoutingModule } from "./news-routing.module";

import { HttpService } from "src/app/core/services/http.service";

import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';


@NgModule({
    declarations: [ NewsComponent ],
    imports: [
        CommonModule,
        NewsRoutingModule,
        ButtonModule,
        TagModule,
        ProgressBarModule
    ],
    providers: [ HttpService ]
})
export class NewsModule {}

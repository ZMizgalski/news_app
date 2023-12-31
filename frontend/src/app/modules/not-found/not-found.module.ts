import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NotFoundComponent } from "./not-found/not-found.component";

import { NotFoundRoutingModule } from "./not-found-routing.module";

import { ButtonModule } from 'primeng/button';


@NgModule({
    declarations: [ NotFoundComponent ],
    imports: [
        CommonModule,
        NotFoundRoutingModule,
        ButtonModule
    ]
})
export class NotFoundModule {}

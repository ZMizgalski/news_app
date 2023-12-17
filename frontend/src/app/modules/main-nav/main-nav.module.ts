import { NgModule } from "@angular/core";
import { CommonModule, TitleCasePipe } from "@angular/common";

import { MainNavComponent } from "./main-nav/main-nav.component";

import { BreakpointService } from "src/app/core/services/breakpoint.service";
import { SocketService } from "src/app/core/services/socket.service";

import { MainNavRoutingModule } from "./main-nav.routing.module";

import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { SidebarModule } from 'primeng/sidebar';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';


@NgModule({
    declarations: [ MainNavComponent ],
    imports: [
        CommonModule,
        MainNavRoutingModule,
        MenuModule,
        ButtonModule,
        ToolbarModule,
        ToastModule,
        SidebarModule,
        DividerModule
    ],
    providers: [ BreakpointService ]
})
export class MainNavModule {}

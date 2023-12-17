import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { BreakpointService } from './services/breakpoint.service';


@NgModule({
    imports: [ HttpClientModule ],
    providers: [ BreakpointService ]
})
export class CoreModule {}

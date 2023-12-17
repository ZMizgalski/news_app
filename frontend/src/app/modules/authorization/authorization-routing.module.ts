import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthorizationComponent } from "./authorization/authorization.component";
import { LoginComponent } from "./login/login.component";

import { isLogged } from "src/app/core/guards/can-route.guard";


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/dashboard/(dashboard:auth/(auth:login))'
    },
    {
        path: '',
        component: AuthorizationComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent,
                outlet: 'auth',
                canActivate: [ isLogged(false) ]
            }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class AuthorizationRoutingModule {}

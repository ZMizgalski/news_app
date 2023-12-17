import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { MainNavComponent } from "./main-nav/main-nav.component";

import { isLogged } from "src/app/core/guards/can-route.guard";


const routes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard/(dashboard:home)',
        pathMatch: 'full',
        outlet: 'dashboard'
    },
    {
        path: '',
        component: MainNavComponent,
        children: [
            {
                path: 'home',
                loadChildren: () => import('../home/home.module').then(m => m.HomeModule),
                outlet: 'dashboard',
                canActivate: [ isLogged(false) ]
            },
            {
                path: 'account',
                loadChildren: () => import('../account/account.module').then(m => m.AccountModule),
                outlet: 'dashboard',
                canActivate: [ isLogged(true) ]
            },
            {
                path: 'news',
                loadChildren: () => import('../news/news.module').then(m => m.NewsModule),
                outlet: 'dashboard',
                canActivate: [ isLogged(true) ]
            },
            {
                path: 'send-message',
                loadChildren: () => import('../send-message/send-message.module').then(m => m.SendMessageModule),
                outlet: 'dashboard',
                canActivate: [ isLogged(true) ]
            },
            {
                path: 'auth',
                loadChildren: () => import('../authorization/authorization.module').then(m => m.AuthorizationModule),
                outlet: 'dashboard',
                canActivate: [ isLogged(false) ]
            },
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class MainNavRoutingModule {}

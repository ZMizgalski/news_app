import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard/(dashboard:home)',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./modules/main-nav/main-nav.module').then(m => m.MainNavModule)
    },
    {
        path: '404',
        loadChildren: () => import('./modules/not-found/not-found.module').then(m => m.NotFoundModule)
    },
    {
        path: '**',
        redirectTo: '/404',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}

import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";

import { JWTService } from "src/app/core/services/jwt.service";


@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html'
})
export class NotFoundComponent {
    private readonly _router = inject(Router);

    public readonly jwtService = inject(JWTService);

    public makeRoute(logged: boolean): void {
        this._router.navigate(['/dashboard', { outlets: { dashboard: [ logged ? 'account' : 'home' ] } }]);
    }
}

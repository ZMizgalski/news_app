import { inject } from "@angular/core";
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { map } from "rxjs";

import { JWTService } from "../services/jwt.service";


export const isLogged = (logged: boolean): CanActivateFn => (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    return inject(JWTService).$token.pipe(
        map((value) => (value !== null) === logged)
    );
};

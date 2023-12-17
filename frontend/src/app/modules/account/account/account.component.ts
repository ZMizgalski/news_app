import { Component, inject } from "@angular/core";

import { JWTService } from "src/app/core/services/jwt.service";


@Component({
    selector: 'app-account',
    templateUrl: './account.component.html'
})
export class AccountComponent {
    public readonly $tokenData = inject(JWTService).$tokenData;
}

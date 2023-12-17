import { Component, inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, finalize, tap } from "rxjs";

import { HttpService } from "src/app/core/services/http.service";
import { JWTService } from 'src/app/core/services/jwt.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { SocketService } from 'src/app/core/services/socket.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent {
    private readonly _formBuilder = inject(FormBuilder);
    private readonly _httpService = inject(HttpService);
    private readonly _jwtService = inject(JWTService);
    private readonly _localStorageService = inject(LocalStorageService);
    private readonly _router = inject(Router);
    private readonly _socketService = inject(SocketService);

    public readonly loading = new BehaviorSubject<boolean>(false);

    public readonly form = this._formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
        remember: [false, Validators.required]
    });

    public formSubmitted(): void {
        const { username, password, remember } = this.form.value;

        this.loading.next(true);

        this._httpService.post<{ token: string }>('auth/login', { username, password })
            .pipe(
                finalize(() => this.loading.next(false)),
                tap((m) => {
                    if (m instanceof HttpResponse) {
                        const token = m.body?.token;

                        if (token) {
                            this._jwtService.updateToken(token);
                            this._localStorageService.saveToken(token, remember ?? false);
                            this._socketService.crateSocket.next();
                            this._router.navigate(['/dashboard', { outlets: { dashboard: ['account']}}]);
                        }
                    }
                })
            )
            .subscribe();
    }
}

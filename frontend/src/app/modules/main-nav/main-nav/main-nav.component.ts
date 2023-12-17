
import { Component, DestroyRef, OnDestroy, OnInit, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { tap } from "rxjs";

import { BreakpointService } from "src/app/core/services/breakpoint.service";
import { JWTService } from "src/app/core/services/jwt.service";
import { SocketService } from "src/app/core/services/socket.service";


@Component({
    selector: 'app-main-nav',
    templateUrl: './main-nav.component.html',
    styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnDestroy, OnInit {
    public navOpened = false;

    public readonly jwtService = inject(JWTService);

    public readonly $isHandset = inject(BreakpointService).$isHandset;

    private readonly _router = inject(Router);
    private readonly _socketService = inject(SocketService);
    private readonly _messageService = inject(MessageService);
    private readonly _destroyRef = inject(DestroyRef)

    public ngOnDestroy(): void {
        this._socketService.removeSocket.next();
    }

    public ngOnInit(): void {
        this._socketService.messageEmited.pipe(
            tap(({ type, message }) => this._messageService.add({
                severity: this._socketService.toastTypes.get(type) ?? 'info',
                summary: type,
                detail: message
            })),
            takeUntilDestroyed(this._destroyRef)
        )
        .subscribe();
    }

    public makeRoute<T extends Object>(route: string, outlet: T): void {
        this._router.navigate([route, { outlets: { ...outlet } }]);
    }

    public logout(): void {
        this.jwtService.logout();
        this._socketService.removeSocket.next();
        this.makeRoute('/dashboard', { dashboard: ['home'] });
    }
}

import { DestroyRef, Injectable, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Observable, Subject, combineLatest, filter, mergeMap, takeUntil, tap } from "rxjs";

import { JWTService } from "./jwt.service";

import { Socket } from "ngx-socket-io";

import { NewsMessageBullet } from "../types/global.types";


@Injectable()
export class SocketService {
    private readonly _socket = inject(Socket);
    private readonly _jwtService = inject(JWTService);
    private readonly _destroyRef = inject(DestroyRef);

    public readonly crateSocket = new Subject<void>();
    public readonly removeSocket = new Subject<void>();
    public readonly messageEmited = new Subject<NewsMessageBullet>();

    constructor() {
        this.getMessages();
    }

    public readonly toastTypes = new Map<string, string>([
        ['success', 'success'],
        ['danger', 'error'],
        ['warning', 'warn'],
        ['info', 'info']
    ]);

    public createSocketEvent<T>(value: string): Observable<T> {
        return combineLatest({
            token: this._jwtService.$token,
            data: this._jwtService.$tokenData
        }).pipe(
            tap(({ token, data }) => {
                this._socket.ioSocket['auth'] = { token: `Bearer ${token}`, userId: data?.id };
            }),
            mergeMap(() => this._socket.fromEvent<T>(value))
        );
    }

    public getMessages(): void {
        this.crateSocket.pipe(
            mergeMap(() => this._jwtService.$tokenData.pipe(
                filter(user => user !== null && user?.role === 'user'),
                mergeMap(() => this.createSocketEvent<NewsMessageBullet>('message').pipe(
                    tap((message) => this.messageEmited.next(message)),
                )),
                takeUntil(this.removeSocket)
            )),
            takeUntilDestroyed(this._destroyRef)
        )
        .subscribe();
    }
}

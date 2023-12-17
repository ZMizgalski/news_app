import { Injectable, inject } from "@angular/core";
import { BehaviorSubject, Observable, combineLatest, map } from "rxjs";

import { jwtDecode } from "jwt-decode";

import { JWTUser } from "../types/local-storage.types";

import { LocalStorageService } from "./local-storage.service";


@Injectable()
export class JWTService {
    private readonly _$token = new BehaviorSubject<string | null>(null);
    private readonly _$tokenData = new BehaviorSubject<JWTUser | null>(null);

    private readonly _localStorageService = inject(LocalStorageService);

    public get token(): string | null {
        return this._$token.getValue();
    }

    public get $token(): Observable<string | null> {
        return this._$token.asObservable();
    }

    public get tokenData(): JWTUser | null {
        return this._$tokenData.getValue();
    }

    public get $tokenData(): Observable<JWTUser | null> {
        return this._$tokenData.asObservable();
    }

    public get $logged(): Observable<boolean> {
        return this.$token.pipe(
            map(token => token !== null)
        );
    }

    public hasRole(role: string): Observable<boolean> {
        return combineLatest({ data: this.$tokenData, logged: this.$logged }).pipe(
            map(({ logged, data }) => data?.role === role && logged)
        );
    }

    public decodeToken(token: string): JWTUser | null {
        return jwtDecode(token);
    }

    public isTokenExpired(exp?: number): boolean {
        return exp ? Date.now() >= exp * 1000 : false;
    }

    public validateToken(tokenData: JWTUser | null): void {
        if (this.isTokenExpired(tokenData?.exp)) {
            this.logout();
        }
    }

    public updateToken(token: string): void {
        const decodedToken = this.decodeToken(token);

        this._$token.next(token);
        this._$tokenData.next(decodedToken);

        this.validateToken(decodedToken);
    }

    public logout(): void {
        this._$tokenData.next(null);
        this._$token.next(null);
        this._localStorageService.clearTokens();
    }
}

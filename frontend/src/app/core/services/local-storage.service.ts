import { Injectable } from "@angular/core";


const ItemName = 'token';

@Injectable()
export class LocalStorageService {
    public saveToken(token: string, remember?: boolean): void {
        if (remember) {
            localStorage.setItem(ItemName, token);
        } else {
            sessionStorage.setItem(ItemName, token);
        }
    }

    public getToken(): string | null {
        return (sessionStorage.getItem(ItemName) ?? null) || (localStorage.getItem(ItemName) ?? null);
    }

    public clearTokens(): void {
        localStorage.clear();
        sessionStorage.clear();
    }
}

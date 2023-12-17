import { JwtPayload } from "jwt-decode";


export type JWTUser =
    & JwtPayload
    & {
        id: string;
        username: string;
        role: string;
    }

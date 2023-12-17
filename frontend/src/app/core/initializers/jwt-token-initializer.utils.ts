import { SocketService } from 'src/app/core/services/socket.service';
import { filter, of, tap } from 'rxjs';

import { LocalStorageService } from './../services/local-storage.service';
import { JWTService } from "../services/jwt.service";


export const initializeJwtLocalJwtToken = (
    jwtService: JWTService,
    localStorageService: LocalStorageService,
    socketService: SocketService
) => () => of(localStorageService.getToken()).pipe(
    filter((token) => token !== null),
    tap((token) => {
        socketService.crateSocket.next();
        jwtService.updateToken(token!)
    })
);

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { initializeJwtLocalJwtToken } from './core/initializers/jwt-token-initializer.utils';
import { JWTService } from './core/services/jwt.service';
import { LocalStorageService } from './core/services/local-storage.service';
import { JWTTokenInterceptor } from './core/interceptors/jwt-token.interceptor';
import { SocketService } from './core/services/socket.service';

import { MessageService } from 'primeng/api';

import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

import { environment } from 'src/environments/environment.development';


const config: SocketIoConfig = { url: environment.url, options: {} };

@NgModule({
    declarations: [ AppComponent ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CoreModule,
        AppRoutingModule,
        SocketIoModule.forRoot(config)
    ],
    providers: [
        JWTService,
        LocalStorageService,
        MessageService,
        SocketService,
        {
            provide: APP_INITIALIZER,
            useFactory: initializeJwtLocalJwtToken,
            multi: true,
            deps: [ JWTService, LocalStorageService, SocketService ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JWTTokenInterceptor,
            multi: true
        }
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {}

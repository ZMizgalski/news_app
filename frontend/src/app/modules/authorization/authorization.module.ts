import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AuthorizationComponent } from "./authorization/authorization.component";
import { LoginComponent } from "./login/login.component";

import { AuthorizationRoutingModule } from "./authorization-routing.module";

import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';

import { HttpService } from "src/app/core/services/http.service";


@NgModule({
    declarations: [
        AuthorizationComponent,
        LoginComponent
    ],
    imports: [
        CommonModule,
        CheckboxModule,
        ButtonModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        PasswordModule,
        AuthorizationRoutingModule
    ],
    providers: [ HttpService ]
})
export class AuthorizationModule {}

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SendMessageRoutingModule } from "./send-message-routing.module";

import { SendMessageComponent } from "./send-message/send-message.component";
import { PickMessageTypeComponent } from './pick-message-type-modal/pick-message-type-modal.component';

import { HttpService } from "src/app/core/services/http.service";

import { DataViewModule } from 'primeng/dataview';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from "primeng/api";
import { DropdownModule } from 'primeng/dropdown';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ListboxModule } from 'primeng/listbox';
import { InputTextareaModule } from 'primeng/inputtextarea';


@NgModule({
    declarations: [
        SendMessageComponent,
        PickMessageTypeComponent
    ],
    imports: [
        CommonModule,
        SendMessageRoutingModule,
        DataViewModule,
        TableModule,
        InputTextModule,
        ButtonModule,
        DropdownModule,
        DynamicDialogModule,
        ListboxModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextareaModule
    ],
    providers: [ ConfirmationService, HttpService, DialogService ]
})
export class SendMessageModule {}

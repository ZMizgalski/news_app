import { HttpResponse } from "@angular/common/http";
import { Component, inject } from "@angular/core";
import { map } from "rxjs";

import { HttpService } from "src/app/core/services/http.service";

import { Table } from "primeng/table";
import { DialogService } from "primeng/dynamicdialog";

import { PickMessageTypeComponent } from "../pick-message-type-modal/pick-message-type-modal.component";


type TableUser = {
    id: string;
    createdAt: Date;
    username: string;
}

@Component({
    selector: 'app-send-message',
    templateUrl: './send-message.component.html',
    styleUrls: ['./send-message.component.scss']
})
export class SendMessageComponent {
    public readonly httpService = inject(HttpService);

    public readonly $items = this.httpService.get<TableUser[]>('api/getAllUsers').pipe(
        map(m => (m instanceof HttpResponse) ? m.body : null)
    );

    private readonly _dialogService = inject(DialogService);

    public filter(e: Event, table: Table): void {
        table.filterGlobal((e.target as HTMLInputElement).value, 'contains')
    }

    public sendMessage(recieverId: string): void {
        this._dialogService.open(PickMessageTypeComponent, {
            data: { recieverId },
            header: 'Select message type',
            width: '50vw',
            modal: true
        });
    }
}

import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Component, inject } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { BehaviorSubject, finalize, tap } from "rxjs";

import { MessageService } from "primeng/api";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";

import { HttpService } from "src/app/core/services/http.service";


type ListBoxItem = {
    name: string;
    value: string;
}

type SendMessageFormGroup = FormGroup<{
    message: FormControl<string | null>;
    type: FormControl<ListBoxItem | null>;
}>

@Component({
    selector: 'app-pick-message-type-modal',
    templateUrl: './pick-message-type-modal.component.html'
})
export class PickMessageTypeComponent {
    public readonly loading = new BehaviorSubject<boolean>(false);

    public readonly formBuilder = inject(FormBuilder);

    public readonly options: Array<ListBoxItem> = [
        { name: 'Success', value: 'success' },
        { name: 'Warning', value: 'warning' },
        { name: 'Danger', value: 'danger' },
        { name: 'Info', value: 'info' }
    ];

    public readonly form = this.formBuilder.group({
        message: [null, Validators.required],
        type: [null, Validators.required]
    }) as SendMessageFormGroup;

    private readonly _httpService = inject(HttpService);
    private readonly _dialogRef = inject(DynamicDialogRef);
    private readonly _dialogConfig = inject(DynamicDialogConfig);
    private readonly _messageService = inject(MessageService);

    public onSubmit(): void {
        const { message, type } = this.form.value;

        this.loading.next(true)

        this._httpService.post('api/sendMessage', {
            message,
            type: type?.value ?? 'info',
            recieverId: this._dialogConfig.data?.recieverId ?? null
        }).pipe(
            finalize(() => this.loading.next(false)),
            tap((r) => (r instanceof HttpResponse) ? this.onSuccess() : this.onError(r))
        )
        .subscribe();
    }

    public closeDialog(): void {
        this._dialogRef.close();
    }

    private onSuccess(): void {
        this.closeDialog();
        this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Sent' });
    }

    private onError(error: HttpErrorResponse): void {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
    }
}

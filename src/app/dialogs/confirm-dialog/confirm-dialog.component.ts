import {Component, Inject} from '@angular/core';
import icClose from '@iconify/icons-ic/twotone-close';
import icCheck from '@iconify/icons-ic/twotone-check';
import icWarning from '@iconify/icons-ic/twotone-warning';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'confirm-dialog',
    templateUrl: 'confirm-dialog.component.html',
    styleUrls: ['confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
    public confirmTitle: string;
    public confirmMessage: string;

    icWarning = icWarning;
    icCheck = icCheck;
    icClose = icClose;

    constructor(@Inject(MAT_DIALOG_DATA) public _data: any,
                public _dialogRef: MatDialogRef<ConfirmDialogComponent>
    ) {
        this.confirmTitle = _data.confirmTitle;
        this.confirmMessage = _data.confirmMessage;
    }

    confirm() {
        this._dialogRef.close(true);
    }
}

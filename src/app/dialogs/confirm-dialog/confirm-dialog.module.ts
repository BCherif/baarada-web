import {NgModule} from '@angular/core';
import {ConfirmDialogComponent} from './confirm-dialog.component';
import {CommonModule} from '@angular/common';
import {MatIconModule} from "@angular/material/icon";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatRadioModule} from "@angular/material/radio";
import {MatSelectModule} from "@angular/material/select";
import {MatMenuModule} from "@angular/material/menu";
import {IconModule} from "@visurel/iconify-angular";
import {MatDividerModule} from "@angular/material/divider";

@NgModule({
    declarations: [
        ConfirmDialogComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatDialogModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatRadioModule,
        MatSelectModule,
        MatMenuModule,
        IconModule,
        MatDividerModule
    ],
    entryComponents: [
        ConfirmDialogComponent
    ],
    providers: []
})
export class ConfirmDialogModule {
}

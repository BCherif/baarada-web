import {CommonModule} from '@angular/common';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {UserFormComponent} from './user-form.component';
import {MatMenuModule} from '@angular/material/menu';
import {IconModule} from '@visurel/iconify-angular';
import {MatDividerModule} from '@angular/material/divider';
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {NgxMatIntlTelInputModule} from "ngx-mat-intl-tel-input";
import {MatButtonToggleModule} from "@angular/material/button-toggle";

@NgModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
        MatButtonToggleModule,
        MatMenuModule,
        IconModule,
        MatDividerModule,
        MatTooltipModule,
        MatExpansionModule,
        MatCheckboxModule,
        NgxMatIntlTelInputModule
    ],
    declarations: [UserFormComponent],
    entryComponents: [UserFormComponent],
    exports: [UserFormComponent],
    providers: []
})
export class UserFormModule {
}

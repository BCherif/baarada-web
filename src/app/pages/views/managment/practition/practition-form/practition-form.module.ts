import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {PractitionFormComponent} from './practition-form.component';
import {MatMenuModule} from '@angular/material/menu';
import {IconModule} from '@visurel/iconify-angular';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {ImageCropperModule} from "ngx-image-cropper";
import {NgxMatIntlTelInputModule} from "ngx-mat-intl-tel-input";

@NgModule({
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
    MatDividerModule,
    MatExpansionModule,
    MatCheckboxModule,
    ImageCropperModule,
    NgxMatIntlTelInputModule
  ],
  declarations: [PractitionFormComponent],
  entryComponents: [PractitionFormComponent],
  exports: [PractitionFormComponent],
  providers: []
})
export class PractitionFormModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PageLayoutModule} from '../../../../../@vex/components/page-layout/page-layout.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BreadcrumbsModule} from '../../../../../@vex/components/breadcrumbs/breadcrumbs.module';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {IconModule} from '@visurel/iconify-angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ContainerModule} from '../../../../../@vex/directives/container/container.module';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {PractitionComponent} from "./practition.component";
import {PractitionRoutingModule} from "./practition-routing.module";
import {PractitionFormModule} from "./practition-form/practition-form.module";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";


@NgModule({
  declarations: [PractitionComponent],
    imports: [
        CommonModule,
        PractitionRoutingModule,
        PageLayoutModule,
        FlexLayoutModule,
        BreadcrumbsModule,
        PractitionFormModule,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,
        MatCheckboxModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        IconModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonToggleModule,
        MatTooltipModule,
        ContainerModule,
        MatSelectModule,
        MatProgressSpinnerModule
    ],
  providers: []
})
export class PractitionModule {
}

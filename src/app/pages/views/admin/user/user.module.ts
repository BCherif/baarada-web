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
import {UserRoutingModule} from "./user-routing.module";
import {UserFormModule} from "./user-form/user-form.module";
import {MatExpansionModule} from "@angular/material/expansion";
import {UserGridComponent} from "./user-grid.component";
import {UsersCardModule} from "../../../../grids/users-card/users-card.module";


@NgModule({
    declarations: [UserGridComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        UserRoutingModule,
        PageLayoutModule,
        FlexLayoutModule,
        BreadcrumbsModule,
        UserFormModule,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,
        MatCheckboxModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        IconModule,
        MatTooltipModule,
        ContainerModule,
        MatSelectModule,
        MatButtonToggleModule,
        MatExpansionModule,
        UsersCardModule
    ],
    providers: [

    ]
})
export class UserModule {
}

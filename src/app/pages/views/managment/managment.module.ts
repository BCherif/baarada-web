import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import {FlexLayoutModule} from '@angular/flex-layout';
import {IconModule} from '@visurel/iconify-angular';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ManagmentRoutingModule} from "./managment-routing.module";
import {ManagmentComponent} from "./managment.component";
import {ContainerModule} from "../../../../@vex/directives/container/container.module";


@NgModule({
    declarations: [ManagmentComponent],
    imports: [
        CommonModule,
        ManagmentRoutingModule,
        MatTabsModule,
        FlexLayoutModule,
        IconModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatTooltipModule,
        ContainerModule
    ]
})
export class ManagmentModule {
}

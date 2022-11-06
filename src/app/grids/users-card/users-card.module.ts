import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersCardComponent} from './users-card.component';
import {IconModule} from '@visurel/iconify-angular';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatRippleModule} from '@angular/material/core';
import {MatTooltipModule} from "@angular/material/tooltip";


@NgModule({
    declarations: [UsersCardComponent],
    imports: [
        CommonModule,
        IconModule,
        FlexLayoutModule,
        MatButtonModule,
        MatIconModule,
        MatRippleModule,
        MatTooltipModule
    ],
    exports: [UsersCardComponent]
})
export class UsersCardModule {
}

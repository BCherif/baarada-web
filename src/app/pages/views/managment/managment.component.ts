import {Component, OnInit} from '@angular/core';
import icWork from '@iconify/icons-ic/twotone-work';
import icPeople from '@iconify/icons-ic/twotone-people-outline';
import icSettingsApp from '@iconify/icons-ic/twotone-settings';
import {scaleIn400ms} from "../../../../@vex/animations/scale-in.animation";
import {fadeInRight400ms} from "../../../../@vex/animations/fade-in-right.animation";
import {stagger40ms} from "../../../../@vex/animations/stagger.animation";
import {fadeInUp400ms} from "../../../../@vex/animations/fade-in-up.animation";
import {scaleFadeIn400ms} from "../../../../@vex/animations/scale-fade-in.animation";
import {Link} from "../../../../@vex/interfaces/link.interface";
import {trackById} from "../../../../@vex/utils/track-by";

@Component({
    selector: 'baarada-management',
    templateUrl: 'managment.component.html',
    styleUrls: ['managment.component.scss'],
    animations: [
        scaleIn400ms,
        fadeInRight400ms,
        stagger40ms,
        fadeInUp400ms,
        scaleFadeIn400ms
    ]
})
export class ManagmentComponent implements OnInit {

    links: Link[] = [];

    trackById = trackById;

    icSettingsApp = icSettingsApp;
    icIcons = [];

    constructor() {
    }

    ngOnInit() {
        this.initTabsMenu();
    }

    initTabsMenu(): void {

        this.links.push({
            label: 'PRATICIENS',
            route: './practitioners'
        });
        this.icIcons.push(icPeople);

        this.links.push({
            label: 'METIERS',
            route: './works'
        });
        this.icIcons.push(icWork);
    }
}

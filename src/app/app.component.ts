import {Component, Inject, LOCALE_ID, Renderer2} from '@angular/core';
import {ConfigService} from '../@vex/services/config.service';
import {Settings} from 'luxon';
import {DOCUMENT} from '@angular/common';
import {Platform} from '@angular/cdk/platform';
import {NavigationService} from '../@vex/services/navigation.service';
import {LayoutService} from '../@vex/services/layout.service';
import {ActivatedRoute} from '@angular/router';
import {filter, map} from 'rxjs/operators';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {SplashScreenService} from '../@vex/services/splash-screen.service';
import {Style, StyleService} from '../@vex/services/style.service';
import {ConfigName} from '../@vex/interfaces/config-name.model';
import icLayers from "@iconify/icons-ic/twotone-layers";
import icSettings from "@iconify/icons-ic/twotone-settings";
import icFile from "@iconify/icons-fa-solid/file-signature";
import icKey from "@iconify/icons-fa-solid/key";
import icDashboard from "@iconify/icons-ic/twotone-dashboard";
import icWork from "@iconify/icons-ic/twotone-work";
import icBuilding from "@iconify/icons-fa-solid/building";
import icUsers from "@iconify/icons-fa-solid/users";
import icUsersCogs from "@iconify/icons-fa-solid/users-cog";
import icCash from "@iconify/icons-fa-solid/cash-register";

@Component({
  selector: 'vex-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vex';

  constructor(private configService: ConfigService,
              private styleService: StyleService,
              private renderer: Renderer2,
              private platform: Platform,
              @Inject(DOCUMENT) private document: Document,
              @Inject(LOCALE_ID) private localeId: string,
              private layoutService: LayoutService,
              private route: ActivatedRoute,
              private navigationService: NavigationService,
              private splashScreenService: SplashScreenService) {
    Settings.defaultLocale = this.localeId;

    if (this.platform.BLINK) {
      this.renderer.addClass(this.document.body, 'is-blink');
    }

    /**
     * Customize the template to your needs with the ConfigService
     * Example:
     *  this.configService.updateConfig({
     *    sidenav: {
     *      title: 'Custom App',
     *      imageUrl: '//placehold.it/100x100',
     *      showCollapsePin: false
     *    },
     *    showConfigButton: false,
     *    footer: {
     *      visible: false
     *    }
     *  });
     */

    /**
     * Config Related Subscriptions
     * You can remove this if you don't need the functionality of being able to enable specific configs with queryParams
     * Example: example.com/?layout=apollo&style=default
     */
    this.route.queryParamMap.pipe(
      map(queryParamMap => queryParamMap.has('rtl') && coerceBooleanProperty(queryParamMap.get('rtl'))),
    ).subscribe(isRtl => {
      this.document.body.dir = isRtl ? 'rtl' : 'ltr';
      this.configService.updateConfig({
        rtl: isRtl
      });
    });

    this.route.queryParamMap.pipe(
      filter(queryParamMap => queryParamMap.has('layout'))
    ).subscribe(queryParamMap => this.configService.setConfig(queryParamMap.get('layout') as ConfigName));

    this.route.queryParamMap.pipe(
      filter(queryParamMap => queryParamMap.has('style'))
    ).subscribe(queryParamMap => this.styleService.setStyle(queryParamMap.get('style') as Style));


    this.navigationService.items = [
      {
        type: 'link',
        label: 'Tableau de bord',
        route: '/',
        icon: icLayers
      },
      {
        type: 'link',
        label: 'Gestion Pratitien',
        route: '/views/managment/practitioners',
        icon: icWork
      },
    ];
  }
}
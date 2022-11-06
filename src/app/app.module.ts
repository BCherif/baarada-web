import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {VexModule} from '../@vex/vex.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CustomLayoutModule} from './custom-layout/custom-layout.module';
import {ToastrModule} from "ngx-toastr";
import localeFr from '@angular/common/locales/fr';
import {HashLocationStrategy, LocationStrategy, registerLocaleData} from "@angular/common";
import {InterceptorService} from './shared/http/interceptor.service';
import {MAT_DATE_LOCALE} from '@angular/material/core';

registerLocaleData(localeFr);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      timeOut: 2700
    }),

    // Vex
    VexModule,
    CustomLayoutModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'fr-FR'},
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

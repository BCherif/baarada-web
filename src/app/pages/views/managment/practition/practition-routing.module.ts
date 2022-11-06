import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {QuicklinkModule} from 'ngx-quicklink';
import {VexRoutes} from '../../../../../@vex/interfaces/vex-route.interface';
import {PractitionComponent} from "./practition.component";


const routes: VexRoutes = [
  {
    path: '',
    component: PractitionComponent,
    data: {
      toolbarShadowEnabled: true,
      title: 'Metiers'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, QuicklinkModule]
})
export class PractitionRoutingModule {
}

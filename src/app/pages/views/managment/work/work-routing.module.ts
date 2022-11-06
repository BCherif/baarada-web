import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {QuicklinkModule} from 'ngx-quicklink';
import {VexRoutes} from '../../../../../@vex/interfaces/vex-route.interface';
import {WorkComponent} from "./work.component";


const routes: VexRoutes = [
  {
    path: '',
    component: WorkComponent,
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
export class WorkRoutingModule {
}

import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {QuicklinkModule} from 'ngx-quicklink';
import {VexRoutes} from "../../../../@vex/interfaces/vex-route.interface";
import {ManagmentComponent} from "./managment.component";


const routes: VexRoutes = [
  {
    path: '',
    component: ManagmentComponent,
    children: [
      {
        path: 'works',
        loadChildren: () => import('./work/work.module').then(m => m.WorkModule)
      },
      {
        path: 'practitioners',
        loadChildren: () => import('./practition/practition.module').then(m => m.PractitionModule)
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, QuicklinkModule]
})
export class ManagmentRoutingModule {
}

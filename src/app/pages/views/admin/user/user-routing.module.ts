import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {QuicklinkModule} from 'ngx-quicklink';
import {VexRoutes} from '../../../../../@vex/interfaces/vex-route.interface';
import {UserGridComponent} from "./user-grid.component";


const routes: VexRoutes = [
    {
        path: '',
        component: UserGridComponent,
        data: {
            toolbarShadowEnabled: true,
            title: 'Utilisateurs'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule, QuicklinkModule]
})
export class UserRoutingModule {
}

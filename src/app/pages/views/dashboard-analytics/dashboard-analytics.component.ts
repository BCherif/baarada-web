import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import icPeople from '@iconify/icons-ic/twotone-people';
import icWork from '@iconify/icons-ic/twotone-work';
import {DashBody} from "../../../shared/models/entities/dash.body.model";
import {ToastrService} from "ngx-toastr";
import {DashboardService} from "../../../shared/services/dashboard.service";

@Component({
  selector: 'vex-dashboard-analytics',
  templateUrl: './dashboard-analytics.component.html',
  styleUrls: ['./dashboard-analytics.component.scss']
})
export class DashboardAnalyticsComponent implements OnInit {

  icPeople = icPeople;
  icWork = icWork;



  dashBody = new DashBody();

  constructor(private cd: ChangeDetectorRef,
              private _toast: ToastrService,
              private _dashboardService: DashboardService) {
  }

  ngOnInit() {
    this.getDash();
  }

  getDash() {
    this._dashboardService.initDash().subscribe((response) => {
      if (response.ok) {
        this.dashBody = response.data;
      }
    })
  }

}

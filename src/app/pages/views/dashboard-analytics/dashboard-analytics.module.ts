import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardAnalyticsRoutingModule } from './dashboard-analytics-routing.module';
import { DashboardAnalyticsComponent } from './dashboard-analytics.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartModule } from '../../../../@vex/components/chart/chart.module';
import { MatIconModule } from '@angular/material/icon';
import { IconModule } from '@visurel/iconify-angular';
import { WidgetAssistantModule } from '../../../../@vex/components/widgets/widget-assistant/widget-assistant.module';
import { WidgetLargeChartModule } from '../../../../@vex/components/widgets/widget-large-chart/widget-large-chart.module';
import { WidgetTableModule } from '../../../../@vex/components/widgets/widget-table/widget-table.module';
import { SecondaryToolbarModule } from '../../../../@vex/components/secondary-toolbar/secondary-toolbar.module';
import { BreadcrumbsModule } from '../../../../@vex/components/breadcrumbs/breadcrumbs.module';
import { MatButtonModule } from '@angular/material/button';
import { PageLayoutModule } from '../../../../@vex/components/page-layout/page-layout.module';
import { ContainerModule } from '../../../../@vex/directives/container/container.module';
import {
  WidgetQuickValueCenterModule
} from "../../../widgets/widget-quick-value-center/widget-quick-value-center.module";


@NgModule({
  declarations: [DashboardAnalyticsComponent],
    imports: [
        CommonModule,
        DashboardAnalyticsRoutingModule,
        FlexLayoutModule,
        ChartModule,
        MatIconModule,
        IconModule,
        WidgetAssistantModule,
        WidgetLargeChartModule,
        WidgetTableModule,
        SecondaryToolbarModule,
        BreadcrumbsModule,
        MatButtonModule,
        PageLayoutModule,
        ContainerModule,
        WidgetQuickValueCenterModule
    ]
})
export class DashboardAnalyticsModule {
}

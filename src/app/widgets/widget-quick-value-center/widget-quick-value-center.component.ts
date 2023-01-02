import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Icon} from '@visurel/iconify-angular';
import {fadeInRight400ms} from 'src/@vex/animations/fade-in-right.animation';
import {fadeInUp400ms} from 'src/@vex/animations/fade-in-up.animation';
import {scaleInOutAnimation} from 'src/@vex/animations/scale-in-out.animation';

@Component({
  selector: 'widget-quick-value-center',
  templateUrl: 'widget-quick-value-center.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [scaleInOutAnimation,
    fadeInUp400ms, fadeInRight400ms
  ]
})
export class WidgetQuickValueCenterComponent implements OnInit {

  @Input() icon: Icon;
  @Input() value: number;
  @Input() label: string;
  // @Input() change: number;
  @Input() helpText: string;
  @Input() iconClass: string;

  constructor() {
  }

  ngOnInit() {
  }

}

import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {TableColumn} from '../../../../../@vex/interfaces/table-column.interface';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icRefresh from '@iconify/icons-ic/twotone-refresh';
import icClose from '@iconify/icons-ic/twotone-close';
import icCheck from '@iconify/icons-ic/twotone-check';
import icSearch from '@iconify/icons-ic/twotone-search';
import icAdd from '@iconify/icons-ic/twotone-add';
import icFilterList from '@iconify/icons-ic/twotone-filter-list';
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';
import {fadeInUp400ms} from '../../../../../@vex/animations/fade-in-up.animation';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions} from '@angular/material/form-field';
import {stagger40ms} from '../../../../../@vex/animations/stagger.animation';
import {FormControl} from '@angular/forms';
import {UntilDestroy} from '@ngneat/until-destroy';
import {ToastrService} from "ngx-toastr";
import {PractitionFormComponent} from "./practition-form/practition-form.component";
import {PractitionerService} from "../../../../shared/services/practitioner.service";
import {Practition} from "../../../../shared/models/entities/practition.model";


@UntilDestroy()
@Component({
  selector: 'baarada-practition',
  templateUrl: 'practition.component.html',
  styleUrls: ['practition.component.scss'],
  animations: [
    fadeInUp400ms,
    stagger40ms
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'standard'
      } as MatFormFieldDefaultOptions
    }
  ]
})
export class PractitionComponent implements OnInit {

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  @Input()
  columns: TableColumn<Practition>[] = [
    {label: 'Image', property: 'avatar', type: 'image', visible: true},
    {label: 'Nom & Prénom', property: 'fullName', type: 'text', visible: true, cssClasses: ['font-medium']},
    {label: 'Etat', property: 'activate', type: 'button', visible: true},
    {label: 'Actions', property: 'actions', type: 'button', visible: true}
  ];
  searchFromCtrl = new FormControl();
  icClose = icClose;
  icCheck = icCheck;
  icEdit = icEdit;
  icRefresh = icRefresh;
  icSearch = icSearch;
  icAdd = icAdd;
  icFilterList = icFilterList;
  icMoreHoriz = icMoreHoriz;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  page = 0;
  size = 10;
  totalElements: number;

  practitions: Practition[];

  constructor(private _matDialog: MatDialog,
              private _practitionerService: PractitionerService,
              private _toast: ToastrService) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  ngOnInit() {
    this.findAllByPage(this.page, this.size);
  }

  findAllByPage(page: number, size: number) {
    this._practitionerService.findByPage(page, size).subscribe((value) => {
      if (value.ok) {
        this.practitions = value.data.items;
        this.totalElements = value.data.totalElements;
      }
    });
  }

  toggleColumnVisibility(column, event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
  }


  dowloadImage(url: string) {
    return this._practitionerService.getImage(url);
  }

  showFormDialog(practition?: Practition, rowIndex?: number) {
    console.log('praticien', practition);
    let matDialogRef: MatDialogRef<PractitionFormComponent> = this._matDialog.open(PractitionFormComponent, {
      disableClose: true,
      data: {
        practition: practition
      },
      width: '600px'
    });
    matDialogRef.afterClosed().subscribe(newPractition => {
      if (newPractition) {
        this.findAllByPage(this.page, this.size);
      }
    });
  }


  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property;
  }

}

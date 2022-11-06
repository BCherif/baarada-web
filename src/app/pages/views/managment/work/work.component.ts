import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {TableColumn} from '../../../../../@vex/interfaces/table-column.interface';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icRefresh from '@iconify/icons-ic/twotone-refresh';
import icCompareArrows from '@iconify/icons-ic/twotone-compare-arrows';
import icClose from '@iconify/icons-ic/twotone-close';
import icCheck from '@iconify/icons-ic/twotone-check';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icSearch from '@iconify/icons-ic/twotone-search';
import icAdd from '@iconify/icons-ic/twotone-add';
import icSub from '@iconify/icons-ic/twotone-minus';
import icFilterList from '@iconify/icons-ic/twotone-filter-list';
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';
import icFolder from '@iconify/icons-ic/twotone-folder';
import {fadeInUp400ms} from '../../../../../@vex/animations/fade-in-up.animation';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions} from '@angular/material/form-field';
import {stagger40ms} from '../../../../../@vex/animations/stagger.animation';
import {FormControl} from '@angular/forms';
import {UntilDestroy} from '@ngneat/until-destroy';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icMail from '@iconify/icons-ic/twotone-mail';
import icMap from '@iconify/icons-ic/twotone-map';
import {ToastrService} from "ngx-toastr";
import {Work} from "../../../../shared/models/entities/work.model";
import {WorkService} from "../../../../shared/services/work.service";
import {WorkFormComponent} from "./work-form/work-form.component";


@UntilDestroy()
@Component({
  selector: 'baarada-work',
  templateUrl: 'work.component.html',
  styleUrls: ['work.component.scss'],
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
export class WorkComponent implements OnInit {

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  @Input()
  columns: TableColumn<Work>[] = [
    {label: '#Image', property: 'icon', type: 'image', visible: true},
    {label: 'Nom', property: 'name', type: 'text', visible: true, cssClasses: ['font-medium']},
    {label: 'Etat', property: 'activate', type: 'button', visible: true},
    {label: 'Actions', property: 'actions', type: 'button', visible: true}
  ];
  searchFromCtrl = new FormControl();
  icCompareArrows = icCompareArrows;
  icClose = icClose;
  icCheck = icCheck;
  icPhone = icPhone;
  icMail = icMail;
  icMap = icMap;
  icEdit = icEdit;
  icRefresh = icRefresh;
  icSearch = icSearch;
  icDelete = icDelete;
  icAdd = icAdd;
  icSub = icSub;
  icFilterList = icFilterList;
  icMoreHoriz = icMoreHoriz;
  icFolder = icFolder;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  page = 0;
  size = 10;
  totalElements: number;

  works: Work[];

  constructor(private _matDialog: MatDialog,
              private _workService: WorkService,
              private _toast: ToastrService) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  ngOnInit() {
    this.findAllByPage(this.page, this.size);
  }

  findAllByPage(page: number, size: number) {
    this._workService.findByPage(page, size).subscribe((value) => {
      if (value.ok) {
        this.works = value.data.items;
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
    return this._workService.getImage(url);
  }

  showFormDialog(work?: Work, rowIndex?: number) {
    let matDialogRef: MatDialogRef<WorkFormComponent> = this._matDialog.open(WorkFormComponent, {
      disableClose: true,
      data: {
        work: work
      },
      width: '600px'
    });
    matDialogRef.afterClosed().subscribe(newWork => {
      if (newWork) {
        this.findAllByPage(this.page,this.size);
      }
    });
  }


  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property;
  }

}

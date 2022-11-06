import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icAdd from '@iconify/icons-ic/twotone-add';
import icCheck from '@iconify/icons-ic/twotone-check';
import icClose from '@iconify/icons-ic/twotone-close';
import icWork from '@iconify/icons-ic/twotone-work';
import {ToastrService} from "ngx-toastr";
import {Practition} from "../../../../../shared/models/entities/practition.model";
import {PractitionerService} from "../../../../../shared/services/practitioner.service";
import {Work} from "../../../../../shared/models/entities/work.model";
import {WorkService} from "../../../../../shared/services/work.service";

@Component({
  selector: 'baarada-practition-form',
  templateUrl: 'practition-form.component.html',
  styleUrls: ['practition-form.component.scss']
})
export class PractitionFormComponent implements OnInit {

  icAdd = icAdd;
  icEdit = icEdit;
  icCheck = icCheck;
  icClose = icClose;
  icWork = icWork;

  practitionFormGroup: FormGroup;
  practition: Practition;

  file: FormData = new FormData();
  fileNames = '';
  work: Work;
  works: Work[];

  constructor(@Inject(MAT_DIALOG_DATA) public _data: any,
              private _dialogRef: MatDialogRef<PractitionFormComponent>,
              private _fb: FormBuilder,
              private _practitionerService: PractitionerService,
              private _workService: WorkService,
              private _toast: ToastrService) {

    if (this._data) {
      this.practition = this._data.practition;
      this.updateForm();
    }

  }

  ngOnInit() {
    this.getWorks();
    this.createForm();
  }

  createForm(): void {
    this.practitionFormGroup = this._fb.group({
      id: [''],
      fullName: ['', [Validators.required]],
      avatar: [''],
      work: [''],
      presentation: [''],
    });
  }

  updateForm(): void {
    this.practitionFormGroup = this._fb.group({
      id: [this.practition?.id],
      fullName: [this.practition?.fullName, [Validators.required]],
      avatar: [this.practition?.avatar],
      work: [this.practition?.work?.id],
      presentation: [this.practition?.presentation],
      activate: [this.practition?.activate]
    });
  }

  loadFiles(event) {
    this.fileNames = '';
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      for (let i = 0; i < fileList.length; i++) {
        const fichier: File = fileList[i];
        this.file.append('avatar', fichier, fichier.name);
        this.fileNames += fichier.name;
      }
    }
  }

  getWorks() {
    this._workService.findAll().subscribe((response) => {
      if (response.ok) {
        this.works = response.data;
      }
    })
  }

  getWorkById(id: number) {
    this._workService.getById(id).subscribe((response) => {
      if (response.ok) {
        this.work = response.data;
      }
    })
  }

  save() {
    this.practition = this.practitionFormGroup.value;
    this.practition.work = this.work;
    this.file.append('practitioner', JSON.stringify(this.practition));
    this._practitionerService.create(this.file).subscribe((ret) => {
      if (ret.ok) {
        this._dialogRef.close(ret.data);
        this._toast.success(ret.message);
      } else {
        this._toast.error(ret.message);
      }
    }, error => {
      this._toast.error('Une erreur est survenue');
    })
  }

  changeState() {
    this.practitionFormGroup.patchValue({activate: !this.practitionFormGroup.get('activate').value});
  }
}

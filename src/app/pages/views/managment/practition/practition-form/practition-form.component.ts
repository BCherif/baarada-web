import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
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
import {ImageCroppedEvent} from "ngx-image-cropper";
import {ImportFileService} from "../../../../../shared/services/import-file.service";

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
  imageChangedEvent: any = '';
  imageChangedEventCouverture: any = '';
  croppedImage: any = '';
  croppedImageCouverture: any = '';
  imageFile: any;
  imageFileCouverture: any;
  @ViewChild('couverture') couverture: ElementRef;
  constructor(@Inject(MAT_DIALOG_DATA) public _data: any,
              private _dialogRef: MatDialogRef<PractitionFormComponent>,
              private _fb: FormBuilder,
              private _practitionerService: PractitionerService,
              private _workService: WorkService,
              private _toast: ToastrService,
              private _importFile: ImportFileService) {

    if (this._data) {
      this.practition = this._data.practition;
      this.updateForm();
    }

  }
  getCouverture() {
    console.log('ok');
    this.couverture.nativeElement.click();
  }

  ngOnInit() {
    this.getWorks();
    this.createForm();
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    const blob = this._importFile.dataURLtoBlob(event.base64);
    this.imageFile = this._importFile.blobToFile(blob, "photo");
    this.file.append('avatar', this.imageFile, this.imageFile.name);
  }

  imageCroppedCouverture(event: ImageCroppedEvent) {
    this.croppedImageCouverture = event.base64;
    const blob = this._importFile.dataURLtoBlob(event.base64);
    this.imageFileCouverture = this._importFile.blobToFile(blob, "photo");
    this.file.append('background', this.imageFileCouverture, this.imageFileCouverture.name);
  }


  createForm(): void {
    this.practitionFormGroup = this._fb.group({
      id: [''],
      fullName: ['', [Validators.required]],
      avatar: [''],
      work: [''],
      presentation: [''],
      background: [''],
    });
  }

  updateForm(): void {
    this.practitionFormGroup = this._fb.group({
      id: [this.practition?.id],
      fullName: [this.practition?.fullName, [Validators.required]],
      avatar: [this.practition?.avatar],
      background: [this.practition?.background],
      work: [this.practition?.work?.id],
      presentation: [this.practition?.presentation],
      activate: [this.practition?.activate]
    });
  }

  loadFiles(event) {
    this.imageChangedEvent = event;
    // this.fileNames = '';
    // const fileList: FileList = event.target.files;
    // if (fileList.length > 0) {
    //   for (let i = 0; i < fileList.length; i++) {
    //     const fichier: File = fileList[i];
    //     this.file.append('avatar', fichier, fichier.name);
    //     this.fileNames += fichier.name;
    //   }
    // }
  }
  loadFilesCouverture(event) {
    this.imageChangedEventCouverture = event;
    // this.fileNames = '';
    // const fileList: FileList = event.target.files;
    // if (fileList.length > 0) {
    //   for (let i = 0; i < fileList.length; i++) {
    //     const fichier: File = fileList[i];
    //     this.file.append('avatar', fichier, fichier.name);
    //     this.fileNames += fichier.name;
    //   }
    // }
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

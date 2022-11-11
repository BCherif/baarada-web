import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icAdd from '@iconify/icons-ic/twotone-add';
import icCheck from '@iconify/icons-ic/twotone-check';
import icClose from '@iconify/icons-ic/twotone-close';
import icWork from '@iconify/icons-ic/twotone-work';
import {ToastrService} from "ngx-toastr";
import {WorkService} from "../../../../../shared/services/work.service";
import {Work} from "../../../../../shared/models/entities/work.model";
import {ImageCroppedEvent} from "ngx-image-cropper";
import {ImportFileService} from "../../../../../shared/services/import-file.service";

@Component({
  selector: 'baarada-work-form',
  templateUrl: 'work-form.component.html',
  styleUrls: ['work-form.component.scss']
})
export class WorkFormComponent implements OnInit {

  icAdd = icAdd;
  icEdit = icEdit;
  icCheck = icCheck;
  icClose = icClose;
  icWork = icWork;

  workFormGroup: FormGroup;
  work: Work;

  file: FormData = new FormData();
  // fileNames = '';
  imageChangedEvent: any = '';
  croppedImage: any = '';
  imageFile: any;


  constructor(@Inject(MAT_DIALOG_DATA) public _data: any,
              private _dialogRef: MatDialogRef<WorkFormComponent>,
              private _fb: FormBuilder,
              private _workService: WorkService,
              private _toast: ToastrService,
              private _importFile: ImportFileService,) {

    if (this._data) {
      this.work = this._data.work;
    }
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    const blob = this._importFile.dataURLtoBlob(event.base64);
    this.imageFile = this._importFile.blobToFile(blob, "photo");
    this.file.append('icon', this.imageFile, this.imageFile.name);

  }

  ngOnInit() {

    this.workForm();

  }

  workForm(): void {
    this.workFormGroup = this._fb.group({
      id: [this.work?.id],
      name: [this.work?.name, [Validators.required]],
      icon: [this.work?.icon],
      activate: [this.work?.activate]
    });
  }

  loadFiles(event) {
    this.imageChangedEvent = event;
    // this.fileNames = '';
    // const fileList: FileList = event.target.files;
    // if (fileList.length > 0) {
    //   for (let i = 0; i < fileList.length; i++) {
    //     const fichier: File = fileList[i];
    //     this.file.append('icon', fichier, fichier.name);
    //     this.fileNames += fichier.name;
    //   }
    // }
  }

  save() {
    let newWork = this.workFormGroup.value;
    this.file.append('work', JSON.stringify(newWork));
    this._workService.create(this.file).subscribe((ret) => {
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
    this.workFormGroup.patchValue({activate: !this.workFormGroup.get('activate').value});
  }
}

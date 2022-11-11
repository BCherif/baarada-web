import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class ImportFileService {

  constructor(@Inject(DOCUMENT) private document: Document) { }

    public getFile(accept: string, multiple): Promise<FileList> {
        return new Promise<FileList>((resolve, reject) => {
            const fileInput: HTMLInputElement = this.document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = accept;
            fileInput.multiple = multiple;
            // fileInput.accept = 'image/*';
            fileInput.addEventListener('error', event => {
                reject(event.error);
            });
            fileInput.addEventListener('change', event => {
              return resolve(fileInput.files);
            });
            fileInput.click();
        });
    }
    dataURLtoBlob(dataURL) {
        let binary = atob(dataURL.split(',')[1]);
        let array = [];
        for (var index = 0; index < binary.length; index++) {
            array.push(binary.charCodeAt(index));
        }
        return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
    }
  audioURLtoBlob(dataURL) {
    let binary = atob(dataURL.split(',')[1]);
    let array = [];
    for (var index = 0; index < binary.length; index++) {
      array.push(binary.charCodeAt(index));
    }
    return new Blob([new Uint8Array(array)], {type: 'audio/mp3'});
  }

  public blobToFile = (theBlob: Blob, fileName:string): File => {
    var b: any = theBlob;
    console.log("blllll", b);

    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;
    //Cast to a File() type
    return <File>theBlob;
  }
}



import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { UploadImageRequest } from '../DTO/Requests/upload-image-request';
import { AppResponseError } from '../DTO/Responses/app-response-error';
import { UploadImageResponseOK } from '../DTO/Responses/UploadImageResponse/upload-image-response-ok';
import { CommService } from './comm.service';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  constructor(private commService: CommService) { }
  responseSubjects: { [responseID: string]: Subject<any> } = {
    UploadImageResponseOK: new Subject<UploadImageResponseOK>(),
    AppResponseError: new Subject<AppResponseError>()
  }
  get onUploadImageResponseOK() {
    return this.responseSubjects.UploadImageResponseOK
  }

  get onResponseError() {
    return this.responseSubjects.AppResponseError
  }


  UploadImage(request: UploadImageRequest) {
    return this.commService.UploadImage(request).
      pipe(
        map(data => [data, this.responseSubjects[data.responseType]])
      ).
      subscribe(
        ([data, subject]) => subject.next(data),
        error => console.log("====>>>>", error)
      )
  }
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { RemoveShareDocumentRequest } from '../DTO/Requests/remove-share-document-request';
import { AppResponseError } from '../DTO/Responses/app-response-error';
import { RemoveShareDocumentResponseOK } from '../DTO/Responses/RemoveShareDocumentResponses/remove-share-document-response-ok';
import { CommService } from './comm.service';

@Injectable({
  providedIn: 'root'
})
export class RemoveShareDocumentsServiceService {

  constructor(private commService: CommService) { }
  responseSubjects: { [responseID: string]: Subject<any> } = {
    RemoveShareDocumentResponseOK: new Subject<RemoveShareDocumentResponseOK>(),
    AppResponseError: new Subject<AppResponseError>()
  }
  RemoveShare(request: RemoveShareDocumentRequest) {
    return this.commService.RemoveShare(request).
      pipe(
        map(data => [data, this.responseSubjects[data.responseType]])
      ).subscribe(
        ([data, subject]) => subject.next(data),
        error => console.log("====>>>>", error)
      )
  }

  get onRemoveShareDocumentResponseOK() {
    return this.responseSubjects.RemoveShareDocumentResponseOK
  }
  get onResponseError() {
    return this.responseSubjects.AppResponseError
  }
}

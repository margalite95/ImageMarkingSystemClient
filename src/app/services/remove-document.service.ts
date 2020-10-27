import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { RemoveDocumentsRequest } from '../DTO/Requests/remove-documents-request';
import { AppResponseError } from '../DTO/Responses/app-response-error';
import { RemoveDocumentsResponseOK } from '../DTO/Responses/RemoveDocumentResponses/remove-documents-response-ok';
import { CommService } from './comm.service';

@Injectable({
  providedIn: 'root'
})
export class RemoveDocumentService {

  constructor(private commService: CommService) { }
  responseSubjects: { [responseID: string]: Subject<any> } = {
    RemoveDocumentsResponseOK: new Subject<RemoveDocumentsResponseOK>(),
    AppResponseError: new Subject<AppResponseError>()
  }
  get onRemoveDocumentsResponseOK() {
    return this.responseSubjects.RemoveDocumentsResponseOK
  }

  get onResponseError() {
    return this.responseSubjects.AppResponseError
  }
  RemoveDocument(request: RemoveDocumentsRequest) {
    return this.commService.RemoveDocument(request).
      pipe(
        map(data =>
          [data, this.responseSubjects[data.responseType]])
      ).
      subscribe(
        ([data, subject]) => subject.next(data),
        error => console.log("====>>>>", error)
      )
  }
}

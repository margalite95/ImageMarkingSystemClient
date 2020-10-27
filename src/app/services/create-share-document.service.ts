import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateSharedDocumentRequest } from '../DTO/Requests/create-shared-document-request';
import { CreateShareDocumentResponseOK } from '../DTO/Responses/CreateSharedDocumentResponses/create-share-document-response-ok';
import { AppResponseError } from '../DTO/Responses/app-response-error';
import { CommService } from './comm.service';
import { CreateShareDocumentUserNotExistsResponse } from '../DTO/Responses/CreateSharedDocumentResponses/CreateShareDocumentUserNotExistsResponse';


@Injectable({
  providedIn: 'root'
})
export class CreateShareDocumentService {
  constructor(private commService: CommService) { }
  responseSubjects: { [responseID: string]: Subject<any> } = {
    CreateShareDocumentResponseOK: new Subject<CreateShareDocumentResponseOK>(),
    CreateShareDocumentUserNotExistsResponse: new Subject<CreateShareDocumentUserNotExistsResponse>(),
    AppResponseError: new Subject<AppResponseError>()
  }
  CreateShareDocument(request: CreateSharedDocumentRequest) {
    return this.commService.CreateShareDocument(request).
      pipe(
        map(data => [data, this.responseSubjects[data.responseType]])
      ).subscribe(
        ([data, subject]) => subject.next(data),
        error => console.log("====>>>>", error)
      )
  }

  get onCreateShareDocumentUserNotExistsResponse() {
    return this.responseSubjects.CreateShareDocumentUserNotExistsResponse
  }
  get onCreateShareDocumentResponseOK() {
    return this.responseSubjects.CreateShareDocumentResponseOK
  }
  get onResponseError() {
    return this.responseSubjects.AppResponseError
  }
}
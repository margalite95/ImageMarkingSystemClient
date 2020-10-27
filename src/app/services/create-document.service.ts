import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateDocumentsRequest } from '../DTO/Requests/create-documents-request';
import { AppResponseError } from '../DTO/Responses/app-response-error';
import { CreateDocumentsResponseOK } from '../DTO/Responses/CreateDocumentsResponses/create-documents-response-ok';
import { CreateDocumentsUserIDNotExist } from '../DTO/Responses/CreateDocumentsResponses/create-documents-user-idnot-exist';
import { CommService } from './comm.service';

@Injectable({
  providedIn: 'root'
})
export class CreateDocumentService {
  constructor(private commService: CommService) { }
  responseSubjects: { [responseID: string]: Subject<any> } = {
    CreateDocumentsResponseOK: new Subject<CreateDocumentsResponseOK>(),
    CreateDocumentsUserIDNotExist: new Subject<CreateDocumentsUserIDNotExist>(),
    AppResponseError: new Subject<AppResponseError>()
  }

  CreateDocument(request: CreateDocumentsRequest) {
    return this.commService.CreateDocument(request).
      pipe(
        map(data => [data, this.responseSubjects[data.responseType]])
      ).subscribe(
        ([data, subject]) => subject.next(data),
        error => console.log("====>>>>", error)
      )
  }

  get onCreateDocumentResponseOK() {
    return this.responseSubjects.CreateDocumentsResponseOK
  }
  get onCreateDocumentsUserIDNotExist() {
    return this.responseSubjects.CreateDocumentsUserIDNotExist
  }
  get onResponseError() {
    return this.responseSubjects.AppResponseError
  }
}

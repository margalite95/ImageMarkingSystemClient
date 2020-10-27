import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetReciversDocsRequest } from '../DTO/Requests/get-recivers-docs-request';
import { AppResponseError } from '../DTO/Responses/app-response-error';
import { GetReciversDocsResponseOK } from '../DTO/Responses/GetReciversDocsResponses/get-recivers-docs-response-ok';
import { CommService } from './comm.service';

@Injectable({
  providedIn: 'root'
})
export class GetReciversDocsService {

  constructor(private commService: CommService) { }
  responseSubjects: { [responseID: string]: Subject<any> } = {
    GetReciversDocsResponseOK: new Subject<GetReciversDocsResponseOK>(),
    AppResponseError: new Subject<AppResponseError>()
  }
  get onGetReciversDocsResponseOK() {
    return this.responseSubjects.GetReciversDocsResponseOK
  }

  get onResponseError() {
    return this.responseSubjects.AppResponseError
  }
  GetReciversDocs(request: GetReciversDocsRequest) {
    return this.commService.GetReciversDocs(request).
      pipe(
        map(data => [data, this.responseSubjects[data.responseType]])
      ).
      subscribe(
        ([data, subject]) => subject.next(data),
        error => console.log("====>>>>", error)
      )
  }
}

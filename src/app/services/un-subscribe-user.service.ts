import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { UnSubscribeUserRequest } from '../DTO/Requests/un-subscribe-user-request';
import { AppResponseError } from '../DTO/Responses/app-response-error';
import { UnSubscribeUserInvalidEmailResponse } from '../DTO/Responses/UnSubscribeUserResponses/un-subscribe-user-invalid-email-response';
import { UnSubscribeUserResponseOK } from '../DTO/Responses/UnSubscribeUserResponses/un-subscribe-user-response-ok';
import { CommService } from './comm.service';

@Injectable({
  providedIn: 'root'
})
export class UnSubscribeUserService {

  constructor(private commService: CommService, private router: Router) { }

  responseSubjects: { [responseID: string]: Subject<any> } = {
    UnSubscribeUserResponseOK: new Subject<UnSubscribeUserResponseOK>(),
    UnSubscribeUserInvalidEmailResponse: new Subject<UnSubscribeUserInvalidEmailResponse>(),
    AppResponseError: new Subject<AppResponseError>()
  }
  UnSubscribeUser(request: UnSubscribeUserRequest) {
    this.commService.UnSubscribeUser(request).
      pipe(
        map(data => [data, this.responseSubjects[data.responseType]])
      ).
      subscribe(
        ([data, subject]) => subject.next(data),
        error => console.log("====>>>>", error)
      )

  }
  get onUnSubscribeUserOK() {
    return this.responseSubjects.UnSubscribeUserResponseOK
  }
  get onUnSubscribeUserInvalidEmail() {
    return this.responseSubjects.UnSubscribeUserInvalidEmailResponse
  }
  get onResponseError() {
    return this.responseSubjects.AppResponseError
  }
}

import { Injectable } from '@angular/core';
import { CommService } from './comm.service';
import { SignUpRequest } from '../DTO/Requests/sign-up-request';
import { Subject } from 'rxjs';
import { AppResponseError } from '../DTO/Responses/app-response-error';
import { SignUpUserNameAlreadyExists } from '../DTO/Responses/SignUpResponses/sign-up-user-name-already-exists';
import { SignUpResponseOK } from '../DTO/Responses/SignUpResponses/sign-up-response-ok';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private commService: CommService) { }
  responseSubjects: { [responseID: string]: Subject<any> } = {
    SignUpResponseOK: new Subject<SignUpResponseOK>(),
    SignUpUserNameAlreadyExists: new Subject<SignUpUserNameAlreadyExists>(),
    AppResponseError: new Subject<AppResponseError>()
  }
  SignUp(request: SignUpRequest) {
    return this.commService.SignUp(request).
      pipe(
        map(data => [data, this.responseSubjects[data.responseType]])
      ).
      subscribe(
        ([data, subject]) => subject.next(data),
        error => console.log("====>>>>", error)
      )
  }

  get onSignUpOK() {
    return this.responseSubjects.SignUpResponseOK
  }
  get onUserNameAlreadyExists() {
    return this.responseSubjects.SignUpUserNameAlreadyExists
  }
  get onResponseError() {
    return this.responseSubjects.AppResponseError
  }
}

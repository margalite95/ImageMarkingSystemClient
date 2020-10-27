import { Injectable } from '@angular/core';
import { CommService } from './comm.service';
import { SignInRequest } from '../DTO/Requests/sign-in-request';
import { Subject } from 'rxjs';
import { User } from '../DTO/Models/user';
import { SignInResponseOK } from '../DTO/Responses/SignInResponses/sign-in-response-ok';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AppResponseError } from '../DTO/Responses/app-response-error';
import { SignInInvalidEmailResponse } from '../DTO/Responses/SignInResponses/sign-in-invalid-email-response';

@Injectable({
  providedIn: 'root'
})
export class SignInService {
  currentUser: User
  userName: string
  userNameSubject = new Subject<User>()
  errorSubject = new Subject<AppResponseError>()
  constructor(private commService: CommService, private router: Router) { }
  responseSubjects: { [responseID: string]: Subject<any> } = {
    SignInResponseOK: new Subject<SignInResponseOK>(),
    SignInInvalidEmailResponse: new Subject<SignInInvalidEmailResponse>(),
    AppResponseError: new Subject<AppResponseError>()
  }

  getCurrentUser(): User {
    return this.currentUser
  }
  getUserName(): string {
    return this.userName
  }
  setCurrentUser(user: User) {
    this.currentUser = user
    this.userNameSubject.next(this.currentUser)
  }
  getUserID(): string {
    return this.currentUser.Email
  }
  resetUser() {
    this.currentUser = null
  }
  get onSignIn() {
    return this.userNameSubject
  }
  get onSignInOK() {
    return this.responseSubjects.SignInResponseOK
  }
  get onUInvalidEmailResponse() {
    return this.responseSubjects.SignInInvalidEmailResponse
  }
  get onResponseError() {
    return this.responseSubjects.AppResponseError
  }
  onError(): Subject<any> {
    return this.errorSubject
  }
  SignIn(request: SignInRequest) {
    return this.commService.SignIn(request).
      pipe(
        map(data => [data, this.responseSubjects[data.responseType]])
      ).
      subscribe(
        ([data, subject]) => subject.next(data),
        error => console.log("====>>>>", error)

      )


  }
}

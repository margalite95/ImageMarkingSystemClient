import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetSharedUsersRequest } from '../DTO/Requests/get-shared-users-request';
import { AppResponseError } from '../DTO/Responses/app-response-error';
import { GetSharedUsersNotExistResponse } from '../DTO/Responses/GetSharedUsersResponses/get-shared-users-not-exist-response';
import { GetSharedUsersResponseOK } from '../DTO/Responses/GetSharedUsersResponses/get-shared-users-response-ok';
import { CommService } from './comm.service';

@Injectable({
  providedIn: 'root'
})
export class GetSharedUsersService {

  constructor(private commService: CommService) { }
  responseSubjects: { [responseID: string]: Subject<any> } = {
    GetSharedUsersResponseOK: new Subject<GetSharedUsersResponseOK>(),
    GetSharedUsersNotExistResponse: new Subject<GetSharedUsersNotExistResponse>(),
    AppResponseError: new Subject<AppResponseError>()
  }
  GetSharedUsers(request: GetSharedUsersRequest) {
    return this.commService.GetSharedUsers(request).
      pipe(
        map(data => [data, this.responseSubjects[data.responseType]])
      ).subscribe(
        ([data, subject]) => subject.next(data),
        error => console.log("====>>>>", error)
      )
  }


  get onGetSharedUsersNotExistResponse() {
    return this.responseSubjects.GetSharedUsersNotExistResponse
  }
  get onGetSharedUsersResponseOK() {
    return this.responseSubjects.GetSharedUsersResponseOK
  }
  get onResponseError() {
    return this.responseSubjects.AppResponseError
  }

}

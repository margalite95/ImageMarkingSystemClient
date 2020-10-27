import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { GetMarkerRequest } from '../DTO/Requests/get-marker-request';
import { AppResponseError } from '../DTO/Responses/app-response-error';
import { GetMarkerResponseOK } from '../DTO/Responses/GetMarkerResponses/get-marker-response-ok';
import { CommService } from './comm.service';

@Injectable({
  providedIn: 'root'
})
export class GetMarkerService {


  constructor(private commService: CommService) { }
  responseSubjects: { [responseID: string]: Subject<any> } = {
    GetMarkerResponseOK: new Subject<GetMarkerResponseOK>(),
    AppResponseError: new Subject<AppResponseError>()
  }
  GetMarker(request: GetMarkerRequest) {
    return this.commService.GetMarker(request).
      pipe(
        map(data => [data, this.responseSubjects[data.responseType]])
      ).subscribe(
        ([data, subject]) => subject.next(data),
        error => console.log("====>>>>", error)
      )
  }


  get onGetMarkerResponseOK() {
    return this.responseSubjects.GetMarkerResponseOK
  }
  get onResponseError() {
    return this.responseSubjects.AppResponseError
  }
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { RemoveMarkerRequest } from '../DTO/Requests/remove-marker-request';
import { AppResponseError } from '../DTO/Responses/app-response-error';
import { RemoveMarkerResponseOK } from '../DTO/Responses/RemoveMarkerResponses/remove-marker-response-ok';
import { CommService } from './comm.service';

@Injectable({
  providedIn: 'root'
})
export class RemoveMarkerService {

  constructor(private commService: CommService) { }
  responseSubjects: { [responseID: string]: Subject<any> } = {
    RemoveMarkerResponseOK: new Subject<RemoveMarkerResponseOK>(),
    AppResponseError: new Subject<AppResponseError>()
  }
  RemoveMarker(request: RemoveMarkerRequest) {
    return this.commService.RemoveMarker(request).
      pipe(
        map(data => [data, this.responseSubjects[data.responseType]])
      ).subscribe(
        ([data, subject]) => subject.next(data),
        error => console.log("====>>>>", error)
      )
  }

  get onRemoveMarkerResponseOK() {
    return this.responseSubjects.RemoveMarkerResponseOK
  }
  get onResponseError() {
    return this.responseSubjects.AppResponseError
  }
}

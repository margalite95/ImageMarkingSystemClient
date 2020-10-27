import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { CreateMarkerRequest } from '../DTO/Requests/create-marker-request';
import { AppResponseError } from '../DTO/Responses/app-response-error';
import { CreateMarkerResponseOK } from '../DTO/Responses/GeCreateMarkerResponses/create-marker-response-ok';
import { CommService } from './comm.service';

@Injectable({
  providedIn: 'root'
})
export class CreateMarkerService {

  constructor(private commService: CommService) { }
  responseSubjects: { [responseID: string]: Subject<any> } = {
    CreateMarkerResponseOK: new Subject<CreateMarkerResponseOK>(),
    AppResponseError: new Subject<AppResponseError>()
  }
  CreateMarker(request: CreateMarkerRequest) {

    return this.commService.CreateMarker(request).
      pipe(
        map(data => [data, this.responseSubjects[data.responseType]])
       
      ).subscribe(
        ([data, subject]) => subject.next(data),
        error => console.log("====>>>>", error)
      )
  }

  get onCreateMarkerResponseOK() {
    return this.responseSubjects.CreateMarkerResponseOK.pipe(take(1))
  }
  get onResponseError() {
    return this.responseSubjects.AppResponseError
  }
}

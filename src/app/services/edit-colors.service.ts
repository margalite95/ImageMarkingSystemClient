import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { EditColorsRequest } from '../DTO/Requests/edit-colors-request';
import { AppResponseError } from '../DTO/Responses/app-response-error';
import { EditColorsResponseOK } from '../DTO/Responses/EditColorsResponses/edit-colors-response-ok';
import { CommService } from './comm.service';

@Injectable({
  providedIn: 'root'
})
export class EditColorsService {

  constructor(private commService: CommService) { }
  responseSubjects: { [responseID: string]: Subject<any> } = {
    EditColorsResponseOK: new Subject<EditColorsResponseOK>(),
    AppResponseError: new Subject<AppResponseError>()
  }
  EditColors(request: EditColorsRequest) {

    return this.commService.EditColors(request).
      pipe(
        map(data => [data, this.responseSubjects[data.responseType]])
      ).subscribe(
        ([data, subject]) => subject.next(data),
        error => console.log("====>>>>", error)
      )
  }

  get onEditColorsResponseOK() {
    return this.responseSubjects.EditColorsResponseOK.pipe(take(1))
  }
  get onResponseError() {
    return this.responseSubjects.AppResponseError
  }
}

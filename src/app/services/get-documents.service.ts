import { Injectable } from '@angular/core';
import { CommService } from './comm.service';
import { GetDocumentsRequest } from '../DTO/Requests/get-documents-request';
import { Observable, Subject } from 'rxjs';
import { GetDocumentsNotExistsResponse } from '../DTO/Responses/GetDocumentsResponses/get-documents-not-exists-response';
import { AppResponseError } from '../DTO/Responses/app-response-error';
import { GetDocumentsResponseOK } from '../DTO/Responses/GetDocumentsResponses/get-documents-response-ok';
import { map } from 'rxjs/operators';
import { Documents } from '../DTO/Models/documents';

@Injectable({
  providedIn: 'root'
})
export class GetDocumentsService {
  docid:string
  currentDoc:Documents
  docs:Array<Documents>

  
  constructor(private commService:CommService) { 
    this.docs=new Array<Documents>()
  }
  responseSubjects: { [responseID: string]: Subject<any> } = {
    GetDocumentsResponseOK: new Subject<GetDocumentsResponseOK>(),
    GetDocumentsNotExistsResponse: new Subject<GetDocumentsNotExistsResponse>(),
    AppResponseError: new Subject<AppResponseError>()
  }
  get onGetDocumentsResponseOK() {
    return this.responseSubjects.GetDocumentsResponseOK
  }
  get onGetDocumentsNotExistsResponse() {
    return this.responseSubjects.GetDocumentsNotExistsResponse
  }
  get onResponseError() {
    return this.responseSubjects.AppResponseError
  }
  setCurrentDoc(doc:Documents)
  {
    this.currentDoc=doc
  }
  getCurrentDoc():Documents{
    return this.currentDoc
  }
  setDocs(docsSet:Array<Documents>)
  {
    docsSet.forEach(element => {
      this.docs.push(element)
    
    });
    //this.docs=docsSet
  }
  getDocs():Array<Documents>{
    return this.docs
  }
  GetDocuments(request:GetDocumentsRequest){
    return this.commService.GetDocuments(request).
    pipe(
      map(data => [data, this.responseSubjects[data.responseType]])
    ).
    subscribe(
      ([data, subject]) => subject.next(data),
      error => console.log("====>>>>", error)
    )
}
}

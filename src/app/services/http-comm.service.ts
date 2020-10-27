import { Injectable } from '@angular/core';
import { CommService } from './comm.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignInRequest } from '../DTO/Requests/sign-in-request';
import { SignUpRequest } from '../DTO/Requests/sign-up-request';
import { GetDocumentsRequest } from '../DTO/Requests/get-documents-request';
import { UnSubscribeUserRequest } from '../DTO/Requests/un-subscribe-user-request';
import { CreateDocumentsRequest } from '../DTO/Requests/create-documents-request';
import { UploadImageRequest } from '../DTO/Requests/upload-image-request';
import { RemoveDocumentsRequest } from '../DTO/Requests/remove-documents-request';
import { CreateMarkerRequest } from '../DTO/Requests/create-marker-request';
import { GetMarkerRequest } from '../DTO/Requests/get-marker-request';
import { RemoveMarkerRequest } from '../DTO/Requests/remove-marker-request';
import { CreateSharedDocumentRequest } from '../DTO/Requests/create-shared-document-request';
import { RemoveShareDocumentRequest } from '../DTO/Requests/remove-share-document-request';
import { EditColorsRequest } from '../DTO/Requests/edit-colors-request';
import { GetSharedUsersRequest } from '../DTO/Requests/get-shared-users-request';
import { GetReciversDocsRequest } from '../DTO/Requests/get-recivers-docs-request';



@Injectable({
  providedIn: 'root'
})
export class HttpCommService implements CommService {

  constructor(private httpClient: HttpClient) {
  }
  GetReciversDocs(request: GetReciversDocsRequest): Observable<any> {
    console.log(request)
    return this.httpClient.post('https://localhost:44305/api/GetReciversDocs', request);
  }
  GetSharedUsers(request: GetSharedUsersRequest): Observable<any> {
    console.log(request)
    return this.httpClient.post('https://localhost:44305/api/GetSharedUsers', request);
  }
  EditColors(request: EditColorsRequest): Observable<any> {
    console.log(request)
    return this.httpClient.post(' https://localhost:44305/api/EditColors', request);
  }
  RemoveShare(request: RemoveShareDocumentRequest): Observable<any> {
    console.log(request)
    return this.httpClient.post('https://localhost:44305/api/RemoveShareDocument', request);
  }
  CreateShareDocument(request: CreateSharedDocumentRequest): Observable<any> {
    console.log(request)
    return this.httpClient.post('https://localhost:44305/api/CreateShareDocument', request);
  }

  CreateMarker(request: CreateMarkerRequest): Observable<any> {
    console.log(request)
    return this.httpClient.post('https://localhost:44305/api/CreateMarker', request);
  }
  GetMarker(request: GetMarkerRequest): Observable<any> {
    console.log(request)
    return this.httpClient.post('https://localhost:44305/api/GetMarker', request);
  }
  RemoveMarker(request: RemoveMarkerRequest): Observable<any> {
    console.log(request)
    return this.httpClient.post('https://localhost:44305/api/RemoveMarker', request);
  }
  RemoveDocument(request: RemoveDocumentsRequest): Observable<any> {
    console.log(" RemoveDocumentRequest", request)
    return this.httpClient.post('https://localhost:44305/api/RemoveDocument', request);
  }

  UploadImage(request: UploadImageRequest): Observable<any> {
    console.log(request)
    return this.httpClient.post('https://localhost:44305/api/UploadImage', request.ImageUrl as FormData);
  }
  CreateDocument(request: CreateDocumentsRequest): Observable<any> {
    return this.httpClient.post('https://localhost:44305/api/CreateDocuments', request);
  }
  UnSubscribeUser(request: UnSubscribeUserRequest): Observable<any> {
    console.log(request)
    return this.httpClient.post('https://localhost:44305/api/UnSubscribeUser', request);
  }
  SignUp(request: SignUpRequest): Observable<any> {
    console.log(request)
    return this.httpClient.post('https://localhost:44305/api/SignUp', request);
  }
  SignIn(request: SignInRequest): Observable<any> {
    console.log(request)
    return this.httpClient.post('https://localhost:44305/api/SignIn', request);
  }
  GetDocuments(request: GetDocumentsRequest): Observable<any> {
    return this.httpClient.post('https://localhost:44305/api/GetDocuments', request);
  }


}

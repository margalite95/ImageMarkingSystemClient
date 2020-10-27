import { Injectable } from '@angular/core';
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
export abstract class CommService {

  constructor() { }

  abstract SignUp(request: SignUpRequest): Observable<any>
  abstract SignIn(request: SignInRequest): Observable<any>
  abstract GetDocuments(request: GetDocumentsRequest): Observable<any>
  abstract UnSubscribeUser(request: UnSubscribeUserRequest): Observable<any>
  abstract CreateDocument(request: CreateDocumentsRequest): Observable<any>
  abstract UploadImage(request: UploadImageRequest): Observable<any>
  abstract RemoveDocument(request: RemoveDocumentsRequest): Observable<any>
  abstract CreateMarker(request: CreateMarkerRequest): Observable<any>
  abstract GetMarker(request: GetMarkerRequest): Observable<any>
  abstract RemoveMarker(request: RemoveMarkerRequest): Observable<any>
  abstract CreateShareDocument(request: CreateSharedDocumentRequest): Observable<any>
  abstract RemoveShare(request: RemoveShareDocumentRequest): Observable<any>
  abstract EditColors(request: EditColorsRequest): Observable<any>
  abstract GetSharedUsers(request: GetSharedUsersRequest): Observable<any>
  abstract GetReciversDocs(request: GetReciversDocsRequest): Observable<any>


}

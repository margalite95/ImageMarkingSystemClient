import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HeaderService } from '../services/header.service';
import { GetDocumentsService } from '../services/get-documents.service';
import { SignInService } from '../services/sign-in.service';
import { User } from '../DTO/Models/user';
import { Documents } from '../DTO/Models/documents';
import { Router } from '@angular/router';
import { RemoveDocumentService } from '../services/remove-document.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  myDocuments: Array<Documents>
  userID: User
  constructor(public headerService: HeaderService,
    private getDocumentsService: GetDocumentsService,
    private removeDocumentService: RemoveDocumentService,
    private signInService: SignInService, private router: Router) {
  }


  ngOnInit() {
    this.headerService.show();
    this.userID = this.signInService.getCurrentUser()
    this.getDocumentsService.GetDocuments({ Owner: this.userID.Email })

    this.getDocumentsService.onGetDocumentsResponseOK.subscribe(
      res => {
        console.log(res)
        this.myDocuments = res.documents
        this.getDocumentsService.setDocs(this.myDocuments)
      }
    )

    this.removeDocumentService.onRemoveDocumentsResponseOK.subscribe(
      res => {
        this.myDocuments = this.myDocuments.filter(doc => doc.docID !== res.request.docID);
      }
    )

    this.getDocumentsService.onGetDocumentsNotExistsResponse.subscribe(
      data => {
        console.log("You do not have any documents")
        this.router.navigate(['/myDocuments/'])
      })
    this.getDocumentsService.onResponseError.subscribe(error => console.log(error))
  }
  routeToCreateDocument() {
    this.router.navigate(['/createDocument/']);
  }
  routeToCreateShareDocument(doc: Documents) {
    this.router.navigate(['/createSharedDocument/']);
    this.getDocumentsService.setCurrentDoc(doc)
  }
  routeToEditDocument(doc: Documents) {
    this.router.navigate(['/editDocument/']);
    this.getDocumentsService.setCurrentDoc(doc)
  }
  routetoGetSharedUsers(doc: Documents) {
    this.router.navigate(['/getShareUsersComponent/']);
    this.getDocumentsService.setCurrentDoc(doc)
  }
}

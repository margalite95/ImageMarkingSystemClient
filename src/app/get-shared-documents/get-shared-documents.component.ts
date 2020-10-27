import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Documents } from '../DTO/Models/documents';
import { User } from '../DTO/Models/user';
import { GetDocumentsService } from '../services/get-documents.service';
import { HeaderService } from '../services/header.service';
import { RemoveShareDocumentsServiceService } from '../services/remove-share-documents-service.service';
import { SignInService } from '../services/sign-in.service';

@Component({
  selector: 'app-get-shared-documents',
  templateUrl: './get-shared-documents.component.html',
  styleUrls: ['./get-shared-documents.component.css']
})
export class GetSharedDocumentsComponent implements OnInit {
  Result: string
  ResultShare: string
  sharedDocuments: Array<Documents>
  // @Output() sharedDocuments:EventEmitter<Array<Documents>>
  userID: User
  constructor(public headerService: HeaderService,
    private getDocumentsService: GetDocumentsService,
    private removeShareDocumentsServiceService: RemoveShareDocumentsServiceService,
    private signInService: SignInService, private router: Router) {
    this.sharedDocuments = new Array<Documents>()
  }


  ngOnInit() {
    this.headerService.show();
    this.userID = this.signInService.getCurrentUser()
    this.getDocumentsService.GetDocuments({ Owner: this.userID.Email })
    this.getDocumentsService.onGetDocumentsResponseOK.subscribe(
      res => {
        this.sharedDocuments = res.shareDocuments;
      }
    )

    this.removeShareDocumentsServiceService.onRemoveShareDocumentResponseOK.subscribe(
      res => {
        this.sharedDocuments = this.sharedDocuments.filter(doc => doc.docID !== res.request.docID);
      }
    )
    this.getDocumentsService.onGetDocumentsNotExistsResponse.subscribe(
      data => {
        console.log("You do not have any documents")
        this.router.navigate(['/myDocuments/'])
      })
    this.getDocumentsService.onResponseError.subscribe(error => console.log(error))
  }
  routeToEditDocument(doc: Documents) {
    this.router.navigate(['/editDocument/']);
    this.getDocumentsService.setCurrentDoc(doc)
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Documents } from '../DTO/Models/documents';
import { CreateShareDocumentService } from '../services/create-share-document.service';
import { GetDocumentsService } from '../services/get-documents.service';

@Component({
  selector: 'app-create-shared-documents',
  templateUrl: './create-shared-documents.component.html',
  styleUrls: ['./create-shared-documents.component.css']
})
export class CreateSharedDocumentsComponent implements OnInit {
  Result: string
  currentDoc: Documents
  myForm: FormGroup;
  constructor(private createShareDocumentService: CreateShareDocumentService,
    private getDocumentsService: GetDocumentsService,
    private router: Router) { }

  ngOnInit() {
    this.myForm = new FormGroup({
      Email: new FormControl('', [Validators.email, Validators.required]),
    })
    this.currentDoc = this.getDocumentsService.getCurrentDoc()
    this.createShareDocumentService.onCreateShareDocumentResponseOK.subscribe(
      res => {
        console.log(res)
        this.router.navigate(['/myDocuments/']);

      }
    )
    this.createShareDocumentService.onCreateShareDocumentUserNotExistsResponse.subscribe(error => {
      console.log(error)
      this.Result = "This user does not exist"


    })
    this.createShareDocumentService.onResponseError.subscribe(error => {
      this.Result = "This document is already shared with this user. Please select another user"
      console.log(error)
    })
  }

  CreateShareDocument() {
    console.log(this.myForm.value)
    this.createShareDocumentService.CreateShareDocument({ DocID: this.currentDoc.docID, UserID: this.myForm.value.Email })

  }
}

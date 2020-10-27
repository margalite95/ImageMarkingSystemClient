import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../DTO/Models/user';
import { CreateDocumentService } from '../services/create-document.service';
import { HeaderService } from '../services/header.service';
import { SignInService } from '../services/sign-in.service';

@Component({
  selector: 'app-create-document',
  templateUrl: './create-document.component.html',
  styleUrls: ['./create-document.component.css']
})
export class CreateDocumentComponent implements OnInit {
  form: FormGroup
  OwnerID: User
  ImageURL: string
  DocumentName: string
  constructor(public createDocumentService: CreateDocumentService
    , private router: Router, private headerService: HeaderService,
    private signInService: SignInService
  ) {
  }

  onDocumentAdded(doc: string) {
    this.ImageURL = "https://localhost:44305/" + doc
    console.log(this.ImageURL)
    this.DocumentName = this.ImageURL.substring(this.ImageURL.lastIndexOf("\\") + 1, this.ImageURL.length)
    console.log(this.DocumentName)


  }

  ngOnInit() {
    this.headerService.show();
    this.OwnerID = this.signInService.getCurrentUser()
    this.createDocumentService.onCreateDocumentResponseOK.subscribe(
      res => {
        console.log(res)
        this.router.navigate(['/myDocuments/']);

      }
    )
    this.createDocumentService.onCreateDocumentsUserIDNotExist.subscribe(data => console.log("Impossible to create document please log in"))
    this.createDocumentService.onResponseError.subscribe(error => console.log(error))

    this.form = new FormGroup({
      Owner: new FormControl(this.signInService.getCurrentUser()),
      ImageUrl: new FormControl('', [Validators.required]),
      DocumentName: new FormControl('', [Validators.required]),
    })
  }
  CreateDocument() {
    this.createDocumentService.CreateDocument({
      "Owner": this.OwnerID.Email, "ImageUrl": this.ImageURL
      , "DocumentName": this.DocumentName
    })
  }
}

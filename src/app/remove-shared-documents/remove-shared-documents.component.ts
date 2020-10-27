import { Component, Input, OnInit } from '@angular/core';
import { RemoveShareDocumentsServiceService } from '../services/remove-share-documents-service.service';

@Component({
  selector: 'app-remove-shared-documents',
  templateUrl: './remove-shared-documents.component.html',
  styleUrls: ['./remove-shared-documents.component.css']
})
export class RemoveSharedDocumentsComponent implements OnInit {
  @Input() sharedocid: string
  @Input() shareduserid: string
  constructor(private removeShareDocumentService: RemoveShareDocumentsServiceService) { }

  ngOnInit() {
    this.removeShareDocumentService.onResponseError.subscribe(error => console.log(error))
  }
  RemoveShareDocument() {
    this.removeShareDocumentService.RemoveShare({ DocID: this.sharedocid, UserID: this.shareduserid })
  }
}



import { Component, Input, OnInit } from '@angular/core';
import { GetDocumentsService } from '../services/get-documents.service';
import { GetSharedUsersService } from '../services/get-shared-users.service';
import { RemoveShareDocumentsServiceService } from '../services/remove-share-documents-service.service';

@Component({
  selector: 'app-get-share-users',
  templateUrl: './get-share-users.component.html',
  styleUrls: ['./get-share-users.component.css']
})
export class GetShareUsersComponent implements OnInit {
  // @Input() docID:string
  docID: string
  Result: string = ''
  sharedUsers: Array<string>
  constructor(private getDocumentsService: GetDocumentsService,
    private removeShareDocumentsServiceService: RemoveShareDocumentsServiceService,
    private getSharedUsersService: GetSharedUsersService) {
    this.sharedUsers = new Array<string>()
  }


  ngOnInit() {

    this.docID = this.getDocumentsService.getCurrentDoc().docID
    this.GetSharedUsers()

    console.log(this.docID)
    this.removeShareDocumentsServiceService.onRemoveShareDocumentResponseOK.subscribe(
      res => {
        this.sharedUsers = this.sharedUsers.filter(user => user !== res.request.userID);
      }
    )
    this.getSharedUsersService.onGetSharedUsersNotExistResponse.subscribe(error => {

      console.log(error)
    })

    this.getSharedUsersService.onResponseError.subscribe(error => {
      console.log(error)

    })
    this.getSharedUsersService.onGetSharedUsersResponseOK.subscribe(
      res => {
        if (res.request.length != 0) {
          this.sharedUsers = res.request;
        }
        console.log(res.request)
      }
    )
  }
  GetSharedUsers() {
    this.getSharedUsersService.GetSharedUsers({ DocId: this.docID })
  }
}

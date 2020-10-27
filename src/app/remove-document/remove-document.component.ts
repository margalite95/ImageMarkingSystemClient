import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { HeaderService } from '../services/header.service';
import { RemoveDocumentService } from '../services/remove-document.service';

@Component({
  selector: 'app-remove-document',
  templateUrl: './remove-document.component.html',
  styleUrls: ['./remove-document.component.css']
})
export class RemoveDocumentComponent implements OnInit {


  @Input() docId: string
  constructor(private headerService: HeaderService, private removeDocumentService: RemoveDocumentService,
  ) {
  }

  ngOnInit() {
    this.headerService.show();

    this.removeDocumentService.onResponseError.subscribe(error => console.log(error))
  }
  RemoveDocument() {
    this.removeDocumentService.RemoveDocument({ DocID: this.docId })
  }
}



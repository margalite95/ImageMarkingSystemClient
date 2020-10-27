import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { RemoveMarkerService } from '../services/remove-marker.service';

@Component({
  selector: 'app-remove-marker',
  templateUrl: './remove-marker.component.html',
  styleUrls: ['./remove-marker.component.css']
})
export class RemoveMarkerComponent implements OnInit {


  @Input() markerid: string
  @Input() docid: string
  @Output() onMarkerRemoved = new EventEmitter();

  constructor(private removeMarkerService: RemoveMarkerService) { }

  ngOnInit() {
    this.removeMarkerService.onRemoveMarkerResponseOK.subscribe(
      res => {
        this.onMarkerRemoved.emit(res);
      }
    )

    this.removeMarkerService.onResponseError.subscribe(error => console.log(error))
  }
  RemoveMarker() {
    this.removeMarkerService.RemoveMarker({ DocID: this.docid, MarkerID: this.markerid })
  }
}



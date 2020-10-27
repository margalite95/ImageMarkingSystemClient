import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket'
import { GetDocumentsService } from './get-documents.service';

@Injectable({
  providedIn: 'root'
})
export class WSService {

  _subject: WebSocketSubject<MessageEvent>

  messages: { [messageType: string]: Subject<string> } = {
    newConnection: new Subject<string>(),
    newMarker: new Subject<string>(),
    removeMarker: new Subject<string>(),
    disconnect: new Subject<string>(),
    editMarkerColor: new Subject<string>()
  }

  Connect(userId: string, docId: string) {
    console.log("Service Start")
    var url = "wss://localhost:44305/ws?id=" + userId + "&docId=" + docId
    this._subject = webSocket(
      { url: url, deserializer: msg => msg })
    this._subject.pipe(map(msg => {
      console.log(msg)
      var data = msg.data.split('/')

      return [data[0], this.messages[data[1]]]
    })).
      subscribe(
        ([data, subject]) => {
          (subject as Subject<string>).next(data as string)
        }
      )
  }
  DisConnect() {
    this._subject.complete()

  }


  get onEditMarkerColor() {
    return this.messages.editMarkerColor
  }
  get onRemoveMarker() {
    return this.messages.removeMarker
  }
  get onNewConnection() {
    return this.messages.newConnection
  }
  get onNewMarker() {
    return this.messages.newMarker
  }
  get onDisConnect() {
    return this.messages.disconnect
  }
  constructor(private getDocumentsService: GetDocumentsService) {

  }


}

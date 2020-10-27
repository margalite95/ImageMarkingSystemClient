import { Component, OnInit } from '@angular/core';

import { ViewChild, ElementRef } from '@angular/core';
import { take, takeUntil } from 'rxjs/operators';
import { fromEvent, Subject, Subscription, interval, Observable } from 'rxjs';
import { buffer, switchMap } from 'rxjs/operators'
import { marker } from '../DTO/Models/marker';
import { MarkingService } from '../services/marking.service';
import { Documents } from '../DTO/Models/documents';
import { CreateMarkerService } from '../services/create-marker.service';
import { GetDocumentsService } from '../services/get-documents.service';
import { WSService } from '../services/ws.service';
import { Point } from '../DTO/Models/Point';
import { GetMarkerService } from '../services/get-marker.service';
import { EditColorsService } from '../services/edit-colors.service';
import { SignInService } from '../services/sign-in.service';
import { GetReciversDocsService } from '../services/get-recivers-docs.service';



@Component({
  selector: 'app-image-marking',
  templateUrl: './image-marking.component.html',
  styleUrls: ['./image-marking.component.css']
})

export class ImageMarkingComponent {
  @ViewChild('shapeCanvas', { static: false }) shapeCanvas: ElementRef;
  @ViewChild('btnEllipse', { static: false }) btnEllipse: ElementRef
  @ViewChild('btnRectangle', { static: false }) btnRectangle: ElementRef
  @ViewChild('drawingCanvas', { static: false }) drawingCanvas: ElementRef;
  // @ViewChild('selectCanvas', { static: false }) selectCanvas: ElementRef;

  poly: Subject<Point>
  switchSubject: Subject<Point>
  ping$: any = interval(20000);
  currentUser: string
  currentDoc: Documents
  currentImg: any
  currentBackColor: string = "black"
  currentForeColor: string = "black"
  drawMode: any
  currentMarkers: Array<marker>;
  sharesUsers: Array<string>
  subscriptions= new Subscription()

  constructor(private markingService: MarkingService, private createMarkerService: CreateMarkerService,
    private getDocumentsService: GetDocumentsService, private getMarkerService: GetMarkerService,
    private wsService: WSService, private editColorsService: EditColorsService, private signInService: SignInService,
    private getReciversDocsService: GetReciversDocsService) {
    this.poly = new Subject<Point>()
    this.switchSubject = new Subject<Point>()
    this.currentMarkers = new Array<marker>()
    this.sharesUsers = new Array<string>()

  }

  onChangeForeColor(mrk: marker) {
    this.currentForeColor = mrk.foreColor
    this.editColorsService.EditColors({
      docID: mrk.docID, markerID: mrk.markerID, foreColor: mrk.foreColor,
      backColor: this.currentBackColor, userID: mrk.userID
    })

  }

  onChangeBackColor(mrk: marker) {
    this.currentBackColor = mrk.backColor
    this.editColorsService.EditColors({
      docID: mrk.docID, markerID: mrk.markerID, foreColor: this.currentForeColor,
      backColor: this.currentBackColor, userID: mrk.userID
    })
  }

  clearCanvas() {
    var canvas = this.drawingCanvas.nativeElement
    var ctx2 = canvas.getContext('2d')
    ctx2.clearRect(0, 0, this.drawingCanvas.nativeElement.width, this.drawingCanvas.nativeElement.height);
  }
  initCanvas(canvas: any) {
    canvas.nativeElement.getContext('2d').clearRect(0, 0, canvas.nativeElement.width, canvas.nativeElement.height);
    for (var i = 0; i < this.currentMarkers.length; i++) {
      this.drawShape(this.currentMarkers[i])
    }

  }
  drawShape(shape: marker) {
    if (shape.markerType == "Rectangle") {
      this.DrawRecTan(shape)
    }
    else if (shape.markerType == "Ellipse") {
      this.DrawEllipse(shape)
    }
  }

  DrawRecTan(recTanPoints: marker) {
    var ctx1 = this.shapeCanvas.nativeElement.getContext('2d')
    ctx1.beginPath();
    ctx1.rect(recTanPoints.radiusX, recTanPoints.radiusY, recTanPoints.centerX, recTanPoints.centerY)
    ctx1.strokeStyle = recTanPoints.foreColor
    ctx1.fillStyle = recTanPoints.backColor
    ctx1.stroke();
    ctx1.fill()

  }
  DrawEllipse(ellipsePoints: marker) {
    var ctx1 = this.shapeCanvas.nativeElement.getContext('2d')
    ctx1.beginPath();
    ctx1.ellipse(ellipsePoints.centerX, ellipsePoints.centerY, ellipsePoints.radiusX, ellipsePoints.radiusY, 0, 0, 2 * Math.PI);
    ctx1.fillStyle = ellipsePoints.backColor
    ctx1.strokeStyle = ellipsePoints.foreColor
    ctx1.stroke();
    ctx1.fill()
  }

  ngOnInit() {
    console.log("ngoninit")
    this.currentDoc = this.getDocumentsService.getCurrentDoc()
    this.currentUser = this.signInService.getCurrentUser().Email
    this.currentImg = this.currentDoc.imageUrl

    this.wsService.Connect(this.currentUser, this.currentDoc.docID)

    this.getMarkerService.GetMarker({ docID: this.currentDoc.docID })

    this.getMarkerService.onGetMarkerResponseOK.subscribe(
      res => {
        console.log(res.markers)
        this.currentMarkers = res.markers
        this.initCanvas(this.shapeCanvas)
        console.log(this.currentMarkers.length)
      }
    )

    this.wsService.onNewMarker.subscribe(data => {
      this.getMarkerService.GetMarker({ docID: this.currentDoc.docID })
    }

    )
    this.wsService.onRemoveMarker.subscribe(data => {
      this.getMarkerService.GetMarker({ docID: this.currentDoc.docID })
    }

    )
    this.wsService.onNewConnection.subscribe(data => {
      if (!this.sharesUsers.includes(data)) {
        this.sharesUsers.push(data)
      }
      console.log("onNewConnection", data, this.sharesUsers)
    }

    )
    this.wsService.onEditMarkerColor.subscribe(data => {
      this.getMarkerService.GetMarker({ docID: this.currentDoc.docID })
    }

    )
    this.wsService.onDisConnect.subscribe(data => {
      this.sharesUsers = this.sharesUsers.filter(id => id != data);
      console.log("onDisConnect", data, this.sharesUsers)
    }

    )

    this.getReciversDocsService.GetReciversDocs({ docID: this.currentDoc.docID })
    this.getReciversDocsService.onGetReciversDocsResponseOK.subscribe(res => {
      console.log(res);
      this.sharesUsers = res.request
    })

    this.subscriptions.add(this.markingService.onRecDraw.subscribe(shapePoly => {
      var shapeRect = this.markingService.MakeDrawRect(shapePoly, this.currentDoc.docID, this.currentForeColor, this.currentBackColor)
      this.markingService.MakeDrawRect(shapePoly, this.currentDoc.docID, this.currentForeColor, this.currentBackColor)
      this.drawShape(shapeRect)
      this.createMarkerService.CreateMarker({
        docID: shapeRect.docID, markerType: shapeRect.markerType, centerX: shapeRect.centerX, centerY: shapeRect.centerY,
        radiusX: shapeRect.radiusX, radiusY: shapeRect.radiusY, foreColor: shapeRect.foreColor, backColor: shapeRect.backColor,
        userID: shapeRect.userID
      })
    }))


    this.subscriptions.add(this.markingService.onEllipseDraw.subscribe(shapePoly => {

console.log("insubject")
      var shape = this.markingService.MakeDrawEllipse(shapePoly, this.currentDoc.docID, this.currentForeColor, this.currentBackColor)
      this.markingService.MakeDrawEllipse(shapePoly, this.currentDoc.docID, this.currentForeColor, this.currentBackColor)
      this.drawShape(shape)
      this.createMarkerService.CreateMarker({
        docID: shape.docID, markerType: shape.markerType, centerX: shape.centerX, centerY: shape.centerY,
        radiusX: shape.radiusX, radiusY: shape.radiusY, foreColor: shape.foreColor, backColor: shape.backColor,
        userID: shape.userID
      })
    }));


    this.editColorsService.onEditColorsResponseOK.subscribe(res => {
      const i = this.currentMarkers.findIndex(doc => doc.markerID == res.markerID)
      this.currentMarkers[i] = res
      this.initCanvas(this.shapeCanvas)
    })
    this.createMarkerService.onCreateMarkerResponseOK.subscribe(res => {

      this.currentMarkers.push(res)
    })

    this.createMarkerService.onResponseError.subscribe(res =>
      alert("The shape doesnt saved"))
  }

  ngAfterViewInit() {
    console.log("Hello")

    var elem = document.querySelector("#mydiv")
    var ctx1 = this.shapeCanvas.nativeElement.getContext('2d')

    this.shapeCanvas.nativeElement.width = 800
    this.shapeCanvas.nativeElement.height = 1000

    this.drawingCanvas.nativeElement.width = 800
    this.drawingCanvas.nativeElement.height = 1000
    this.markingService.btnAndMouseEvents(this.drawingCanvas.nativeElement)

    var ctx2 = this.drawingCanvas.nativeElement.getContext('2d')

    var drawBtn$ = fromEvent(this.btnEllipse.nativeElement, 'click')
    var drawBtn1$ = fromEvent(this.btnRectangle.nativeElement, 'click')


    drawBtn$.subscribe(evt => this.drawMode = "Ellipse")
    drawBtn1$.subscribe(evt => this.drawMode = "Rectangle")


    this.markingService.draw$.subscribe(evt => {
      this.markingService.MakeDrawFree(evt, this.drawingCanvas)
      this.poly.next(this.markingService.MakeDrawFree(evt, this.drawingCanvas))
    })

    this.poly.pipe(buffer(this.markingService.mouseUp$),).subscribe(shapePoly => {
      console.log(this.drawMode)
      this.markingService.modeSubjects[this.drawMode].next(shapePoly);
      this.clearCanvas();
    })
  }

  onRemovedMarker(res) {
    this.currentMarkers = this.currentMarkers.filter(mrk => mrk.markerID != res.request.markerID);
    this.initCanvas(this.shapeCanvas);
  }

  ngOnDestroy(): void {
this.subscriptions.unsubscribe()
    this.wsService.DisConnect()
  }
}

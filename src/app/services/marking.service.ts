import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { fromEvent, Observable, Subject } from 'rxjs';
import { marker } from '../DTO/Models/Marker';
import { SignInService } from './sign-in.service';
import { Point } from '../DTO/Models/Point';
import { switchMap, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MarkingService {
  user: string
  mouseDown$: Observable<any>
  mouseUp$: Observable<any>
  draw$: Observable<any>
  


  constructor(private signInService: SignInService) {
    this.user = this.signInService.getCurrentUser().Email
  }
  modeSubjects: { [responseID: string]: Subject<any> } = {
    Rectangle: new Subject<Array<Point>>(),
    Ellipse: new Subject<Array<Point>>(),
    FreeDraw: new Subject<any>()
  }
  btnAndMouseEvents(canvas: any) {
    this.mouseUp$ = fromEvent(canvas, 'mouseup')
    this.mouseDown$ = fromEvent(canvas, 'mousedown')
    this.draw$ = this.mouseDown$.pipe(
      switchMap(event =>
        fromEvent(canvas, 'mousemove').pipe(
          takeUntil(this.mouseUp$)
        ))
    )
  }
  MakeDrawFree(evt: any, CurrdrawingCanvas: any) {
    console.log(evt.movementX + ":" + evt.movementY)
    var canvas = CurrdrawingCanvas.nativeElement
    var ctx2 = canvas.getContext('2d')
    var rect = canvas.getBoundingClientRect();
    var xcanvas = evt.clientX - rect.left
    var ycanvas = evt.clientY - rect.top
    ctx2.beginPath()
    ctx2.moveTo(xcanvas - evt.movementX, ycanvas - evt.movementY)
    ctx2.lineTo(xcanvas, ycanvas)
    ctx2.stroke()
    return (new Point(xcanvas - evt.movementX, ycanvas - evt.movementY))
  }
  MakeDrawRect(shapePoly: Array<Point>, docId: string, foreColor: string, BackColor: string): marker {
    if (shapePoly.length == 0) {
      return
    }
    var ret = new marker()
    var centerX: number//width
    var centerY: number//length 
    var minX: number = shapePoly[0].X
    var maxX: number = shapePoly[0].X
    var minY: number = shapePoly[0].Y
    var maxY: number = shapePoly[0].Y
    if (shapePoly.length == 0)
      return ret;

    shapePoly.forEach(point => {
      if (minX > point.X) {
        minX = point.X
      }
      if (minY > point.Y) {
        minY = point.Y
      }
    });
    shapePoly.forEach(point => {
      if (maxX < point.X) {
        maxX = point.X
      }
      if (maxY < point.Y) {
        maxY = point.Y
      }
    });


    centerX = maxX - minX
    centerY = maxY - minY
    ret.docID = docId
    ret.markerType = "Rectangle"
    ret.centerX = centerX
    ret.centerY = centerY
    ret.radiusX = minX
    ret.radiusY = minY
    ret.foreColor = foreColor
    ret.backColor = BackColor
    ret.userID = this.user
    return ret
  }
  MakeDrawEllipse(shapePoly: Array<Point>, docId: string, foreColor: string, BackColor: string): marker {
    var ret = new marker()
    if (shapePoly.length == 0)
      return ret;
    var center = new Point(0, 0)
    center = shapePoly.reduce((acc, pt) => acc.add(pt))
    center = center.div(shapePoly.length)
    var radius = new Point(0, 0)
    radius = shapePoly.reduce((acc, pt) => acc.add(new Point(Math.abs(pt.X - center.X), Math.abs(pt.Y - center.Y))))
    radius = radius.div(shapePoly.length)

    ret.docID = docId
    ret.markerType = "Ellipse"
    ret.centerX = center.X
    ret.centerY = center.Y
    ret.radiusX = radius.X
    ret.radiusY = radius.Y
    ret.foreColor = foreColor
    ret.backColor = BackColor
    ret.userID = this.user
    return ret
  }
  get onRecDraw() {
    return this.modeSubjects.Rectangle
  }
  get onEllipseDraw() {
    return this.modeSubjects.Ellipse
  }
  get onFreeDraw() {
    return this.modeSubjects.FreeDraw
  }
}

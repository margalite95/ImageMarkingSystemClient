import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  visible: boolean
  userName: string
  constructor() { this.visible = false }

  hide() { this.visible = false }

  show() { this.visible = true }
}

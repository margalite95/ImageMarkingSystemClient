import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../services/header.service';
import { SignInService } from '../services/sign-in.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  userName: string
  constructor(public headerService: HeaderService, private signInService: SignInService) { }
  ngOnInit() {

    this.signInService.onSignIn.subscribe(name => {
      this.userName = name.UserName
      console.log(this.userName)
    })
    console.log(this.userName)
  }
  resetUser() {
    this.signInService.resetUser()
  }
}


import { Component, OnInit } from '@angular/core';
import { SignInService } from '../services/sign-in.service';
import { UnSubscribeUserService } from '../services/un-subscribe-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-un-subscribe-user',
  templateUrl: './un-subscribe-user.component.html',
  styleUrls: ['./un-subscribe-user.component.css']
})
export class UnSubscribeUserComponent implements OnInit {
  userID: string
  Result: string
  constructor(private unSubscribeUserService: UnSubscribeUserService,
    private signInService: SignInService, private router: Router) { }


  ngOnInit() {
    this.userID = this.signInService.getCurrentUser().Email

    this.unSubscribeUserService.onUnSubscribeUserOK.subscribe(
      res => {
        console.log(res)
        this.router.navigate(['//']);

      }
    )
    this.unSubscribeUserService.onUnSubscribeUserInvalidEmail.subscribe(data => console.log("Enter valid username"))
    this.unSubscribeUserService.onResponseError.subscribe(error => console.log(error))

  }
  UnSubscribeUser() {
    this.unSubscribeUserService.UnSubscribeUser({ Email: this.userID })
  }
}

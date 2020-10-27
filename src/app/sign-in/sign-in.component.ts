import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SignInService } from '../services/sign-in.service';
import { User } from '../DTO/Models/user';
import { HeaderService } from '../services/header.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  form: FormGroup
  Result: string
  currentUser: User
  constructor(private signInService: SignInService, public headerService: HeaderService
    , private router: Router) { }


  signIn() {
    if (this.form.valid) {
      this.signInService.SignIn(this.form.value)
    }
  }


  ngOnInit() {
    this.signInService.onSignInOK.subscribe(
      res => {
        console.log(res)
        this.signInService.setCurrentUser({ Email: res.email, UserName: res.userName })
        this.router.navigate(['/myDocuments/']);

      }
    )
    this.signInService.onUInvalidEmailResponse.subscribe(
      data => {
        console.log("Enter valid username and password"),
          this.Result = "Enter valid username"
      })
    this.signInService.onResponseError.subscribe(error => console.log(error))

    this.form = new FormGroup({
      Email: new FormControl('', [Validators.email, Validators.required]),
    })

  }

}
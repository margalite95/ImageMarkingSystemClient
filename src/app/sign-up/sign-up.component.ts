import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignInService } from '../services/sign-in.service';
import { SignUpService } from '../services/sign-up.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  form: FormGroup
  Result: string

  constructor(private signUpService: SignUpService, private signInService: SignInService,
    private router: Router) { }
  signUp() {
    console.log("signUp ", this.form.value)
    this.signUpService.SignUp(this.form.value)
  }
  ngOnInit() {
    this.signUpService.onSignUpOK.subscribe(
      res => {
        console.log(res)
        this.signInService.setCurrentUser({ Email: res.email, UserName: res.userName })
        this.router.navigate(['/myDocuments/']);

      }
    )
    this.signUpService.onUserNameAlreadyExists.subscribe(
      data => {
        console.log("User already Exist"),
          this.Result = "User already Exist"
      })

    this.signUpService.onResponseError.subscribe(error => console.log(error))

    this.form = new FormGroup({
      Email: new FormControl('', [Validators.email, Validators.required]),
      UserName: new FormControl('', Validators.required)

    })
  }

}

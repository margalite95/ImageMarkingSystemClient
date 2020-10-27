import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DocumentsComponent } from './documents/documents.component';
import { ImageMarkingComponent } from './image-marking/image-marking.component';
import { HomeComponent } from './home/home.component';
import { CreateDocumentComponent } from './create-document/create-document.component';
import { UnSubscribeUserComponent } from './un-subscribe-user/un-subscribe-user.component';
import { CreateSharedDocumentsComponent } from './create-shared-documents/create-shared-documents.component';
import { GetSharedDocumentsComponent } from './get-shared-documents/get-shared-documents.component';
import { GetShareUsersComponent } from './get-share-users/get-share-users.component';


const routes: Routes = [
  {path:'signIn',component:SignInComponent},
  {path:'signUp',component:SignUpComponent},
  {path:'myDocuments',component:DocumentsComponent},
  {path:'imageMarking',component:ImageMarkingComponent},
  {path:'createDocument',component:CreateDocumentComponent},
  {path:'',component:HomeComponent},
  {path:'unSubscribeUser',component:UnSubscribeUserComponent},
  {path:'editDocument',component:ImageMarkingComponent},
  {path:'sharedDocument',component:GetSharedDocumentsComponent},
  {path:'createSharedDocument',component:CreateSharedDocumentsComponent},
  {path:'getShareUsersComponent',component:GetShareUsersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

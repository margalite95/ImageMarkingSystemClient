import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import { CreateDocumentComponent } from './create-document/create-document.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommService } from './services/comm.service';
import { HttpCommService } from './services/http-comm.service';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HeaderComponent } from './header/header.component';
import { DocumentsComponent } from './documents/documents.component';
import { ImageMarkingComponent } from './image-marking/image-marking.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { UnSubscribeUserComponent } from './un-subscribe-user/un-subscribe-user.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { RemoveDocumentComponent } from './remove-document/remove-document.component';
import { RemoveMarkerComponent } from './remove-marker/remove-marker.component';
import { RemoveSharedDocumentsComponent } from './remove-shared-documents/remove-shared-documents.component';
import { CreateSharedDocumentsComponent } from './create-shared-documents/create-shared-documents.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { GetSharedDocumentsComponent } from './get-shared-documents/get-shared-documents.component';
import { GetShareUsersComponent } from './get-share-users/get-share-users.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateDocumentComponent,
    SignUpComponent,
    SignInComponent,
    HeaderComponent,
    DocumentsComponent,
    ImageMarkingComponent,
    HomeComponent,
    UnSubscribeUserComponent,
    UploadImageComponent,
    RemoveDocumentComponent,
    RemoveMarkerComponent,
    GetSharedDocumentsComponent,
    RemoveSharedDocumentsComponent,
    CreateSharedDocumentsComponent,
    GetShareUsersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ColorPickerModule
  ],
  providers: [{provide:CommService,useClass:HttpCommService}],
  bootstrap: [AppComponent]
})
export class AppModule { }

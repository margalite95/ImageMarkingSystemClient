import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UploadImageService } from '../services/upload-image.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {
  uploadData = new FormData();
  selectedFile: File
  @Output() docurl: EventEmitter<string>
  message: string
  @Input() id
  constructor(private uploadImageService: UploadImageService) {
    this.docurl = new EventEmitter<string>()

  }

  UploadImage(event) {
    this.selectedFile = event.target.files[0]
    this.uploadData.append('ImageUrl', this.selectedFile, this.selectedFile.name);
    this.uploadImageService.UploadImage({ ImageUrl: this.uploadData as FormData })
  }

  ngOnInit() {

    this.uploadImageService.onUploadImageResponseOK.subscribe(
      res => {
        console.log(res)
        this.docurl.emit(res.imageUrl)
        this.message = 'Image uploaded succesfully'
        console.log(this.docurl)
      }
    )

    this.uploadImageService.onResponseError.subscribe(error => console.log(error))

  }
}

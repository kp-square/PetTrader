import { Input, OnInit } from '@angular/core';
import {  Component } from '@angular/core';

@Component({
  selector: 'app-preview-img',
  templateUrl: './preview-img.component.html',
  styleUrls: ['./preview-img.component.css']
})
export class PreviewImgComponent implements OnInit {
  // its important myCanvas matches the variable name in the template
  @Input() imgPath : string;

  constructor(){

  }
  ngOnInit(): void {
    console.log(this.imgPath);
  }
}

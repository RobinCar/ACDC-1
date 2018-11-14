import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router";

import { ImageService } from "../imageService/image.service"
import { ImageWithTHML } from '../model/image';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.css']
})
export class SelectionComponent implements OnInit {

  images: ImageWithTHML[];

  constructor(private router: Router,private imageService:ImageService) {
    this.images = imageService.getImages();
  }

  ngOnInit() {
  }

  onSelect(image: ImageWithTHML) {
    this.router.navigate(['/edit'], { queryParams: { path: image.src } });
  }
  
}

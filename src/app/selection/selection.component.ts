import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router";

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.css']
})
export class SelectionComponent implements OnInit {

  images: string[] = [
    "https://via.placeholder.com/1920x1080",
    "https://via.placeholder.com/640x360",
    "https://via.placeholder.com/1024x576",
    "https://via.placeholder.com/500x500",
    "https://via.placeholder.com/1000x1000"
  ];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSelect(image: string) {
    this.router.navigate(['/edit'], { queryParams: { path: image } });
  }
}

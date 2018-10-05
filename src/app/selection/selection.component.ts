import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.css']
})
export class SelectionComponent implements OnInit {

  images:string[] = [
    "https://via.placeholder.com/1500x1500",
    "https://via.placeholder.com/1400x1400",
    "https://via.placeholder.com/1300x1300",
    "https://via.placeholder.com/1200x1200",
    "https://via.placeholder.com/1100x1100"
  ];

  constructor() { }

  ngOnInit() {
  }

}

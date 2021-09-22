import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-bookmark',
  templateUrl: './add-bookmark.component.html',
  styleUrls: ['./add-bookmark.component.css']
})
export class AddBookmarkComponent implements OnInit {

  constructor(private location: Location,) { }

  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }
  onSearch(){
    
  }
}

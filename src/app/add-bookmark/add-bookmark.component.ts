import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HomeComponent } from '../home/home.component';
@Component({
  selector: 'app-add-bookmark',
  templateUrl: './add-bookmark.component.html',
  styleUrls: ['./add-bookmark.component.css']
})
export class AddBookmarkComponent implements OnInit {

  input;
  isSearching: boolean = false;
  searchReasult= [];
  bookmarkArray = [];
  constructor(private location: Location,
    private homeComponent: HomeComponent) { }

  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }
  onSearch(){
    this.bookmarkArray = [];
    this.searchReasult = [];
    this.input = document.getElementById('input');
    console.log(this.input);
    var value = this.input.value;
    var length = value.length;
    console.log(value);
    var keys = Object.keys(window.localStorage);
    var bookmarkKeys = keys.slice(2);
    for (let key of bookmarkKeys) {
      this.bookmarkArray.push(JSON.parse(window.localStorage.getItem(`${key}`)));
    }
    for (let bookmark of this.bookmarkArray) {
      console.log(bookmark.bookmarkName);
      if ( bookmark.bookmarkName.substr(0, length) == value) {
        this.isSearching = true;
        this.searchReasult.push(bookmark);
        console.log(this.searchReasult);
        console.log("matched")
      }
    }
  }
}

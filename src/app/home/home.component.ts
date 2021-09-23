import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  keys;
  bookmarks=[];
  items = [];
  input;
  isSearching = false;
  isEditing = false;
  bookmarkSearch = [];
  // bookmarkKeys;
  constructor(public dialog: MatDialog,) { }

  ngOnInit() {
    this.keys = Object.keys(window.localStorage);
    for (let key of this.keys) {
      var item = JSON.parse(window.localStorage.getItem(`${key}`));
      if (key == 'count') {
        console.log("count");
      }else if (item.bookmarkName == '' && item.bookmarkURL == ''){
        console.log("empity");
        window.localStorage.removeItem(`${key}`);
      }else if (item.bookmarkName == '' && item.bookmarkURL !== ''){
        console.log("empity");
      }
      else {
        this.bookmarks.push(item);
      }
    }
  }

  goBack() {
    this.isEditing = false;
    this.isSearching = false;
  }
  delete(list){
    var name = list.bookmarkName;
    var URL = list.bookmarkURL;
    for (let key of this.keys) {
      var item = JSON.parse(window.localStorage.getItem(`${key}`));
      if (item.bookmarkName === name && item.bookmarkURL === URL) {
        window.localStorage.removeItem(`${key}`);
      }
    }
    for( var i = 0; i < this.bookmarks.length; i++){
      if ( this.bookmarks[i].bookmarkName === name && this.bookmarks[i].bookmarkURL === URL) { 
          this.bookmarks.splice(i, 1);
          i--;
      }
    }
    if (this.isSearching) {
      for( var i = 0; i < this.bookmarkSearch.length; i++){
        if ( this.bookmarkSearch[i].bookmarkName === name && this.bookmarkSearch[i].bookmarkURL === URL) { 
            this.bookmarkSearch.splice(i, 1);
            i--;
        }
      }
    }
    console.log(list);
    location.reload();
  }
  onSearch(){
    this.bookmarkSearch = [];
    this.input = document.getElementById('input');
    var value = this.input.value;
    var length = value.length;
    if ( value == '') {
      this.isSearching = false;
    }
    for (let bookmark of this.bookmarks) {
      var searchingParmeter = bookmark.bookmarkName.substr(0, length);
      if ( searchingParmeter == value) {
        this.bookmarkSearch.push(bookmark);
        this.isSearching = true;
        console.log("matched");
      }
    }
  }

  onClick(link){
    window.open(link);
  }
}

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
  keys;
  bookmarks = this.homeComponent.bookmarks;
  constructor(private location: Location,
    private homeComponent: HomeComponent) { }

  ngOnInit() {
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
      for( var i = 0; i < this.searchReasult.length; i++){
        if ( this.searchReasult[i].bookmarkName === name && this.searchReasult[i].bookmarkURL === URL) { 
            this.searchReasult.splice(i, 1);
            i--;
        }
      }
    }
    console.log(list);
    location.reload();
  }
  goBack(): void {
    this.location.back();
  }
  onSearch(){
    this.bookmarkArray = [];
    this.searchReasult = [];
    this.input = document.getElementById('input');
    var value = this.input.value;
    var length = value.length;
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
        this.bookmarkArray.push(item);
      }
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

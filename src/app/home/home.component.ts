import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddComponent } from '../add/add.component';
import { BookmarkserviceService } from '../services/bookmarkservice.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  keys;
  bookmarks=[];
  items = [];
  isEditing = false;
  constructor(public dialog: MatDialog,
    private bookmarkService: BookmarkserviceService,
    private location: Location,
    private router: Router) { }

  ngOnInit() {
    this.keys = Object.keys(window.localStorage);
    console.log(this.keys);
    var bookmarkKeys = this.keys.slice(2);
    console.log(bookmarkKeys);
    for (let key of bookmarkKeys) {
      this.bookmarks.push(JSON.parse(window.localStorage.getItem(`${key}`)));
    }
    console.log(this.bookmarks);
    // window.onload = function() {
    // var Imgs = document.querySelectorAll('.img');
    // console.log(Imgs);
    // for (let i = 0; i < Imgs.length; i++) {
    //   let item = Imgs[i];
    //   console.log(item);
    // }
    // };
    // this.getAverageRGB();
  }

  edit() {
    this.isEditing = true;
  }
  goBack() {
    this.isEditing = false;
  }
}

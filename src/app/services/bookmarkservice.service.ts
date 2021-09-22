import { Injectable } from '@angular/core';
import { BOOKMARKS } from '../shared/defultData';
@Injectable({
  providedIn: 'root'
})
export class BookmarkserviceService {

   // We create three variables: 
  // one for possible data in the localStorage,
  // one for our default data and
  // one for the data our service should return.
  bookmarksLocalStorage = JSON.parse(  localStorage.getItem('sp-bookmarklist') );
  bookmarksDefaultData = BOOKMARKS;
  bookmarksToReturn = this.bookmarksDefaultData;
  constructor() { }
  // The "getBookmarks()" function checks if there is data in the local storage.
  // If there is, we return this data,
  // if there isn't we return the default data.
  getBookmarks() {
    if ( this.bookmarksLocalStorage !== null ) {
      this.bookmarksToReturn = this.bookmarksLocalStorage;
    }
    return Promise.resolve( this.bookmarksToReturn );
  }

   // A "setBookmarks()" function saves new data in the local storage.
  setBookmarks( bookmarks : Object ) {
    localStorage.setItem( 'sp-bookmarklist', JSON.stringify( bookmarks ) );
  }

  // getImgs(){

  // }
  getAverageRGB(imgEl) {

    var blockSize = 5, // only visit every 5 pixels
        defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
        canvas = document.createElement('canvas'),
        context = canvas.getContext && canvas.getContext('2d'),
        data, width, height,
        i = -4,
        length,
        rgb = {r:0,g:0,b:0},
        count = 0;

    if (!context) {
        return defaultRGB;
    }

    height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

    context.drawImage(imgEl, 0, 0);

    try {
        data = context.getImageData(0, 0, width, height);
    } catch(e) {
        /* security error, img on diff domain */
        return defaultRGB;
    }

    length = data.data.length;

    while ( (i += blockSize * 4) < length ) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i+1];
        rgb.b += data.data[i+2];
    }

    // ~~ used to floor values
    rgb.r = ~~(rgb.r/count);
    rgb.g = ~~(rgb.g/count);
    rgb.b = ~~(rgb.b/count);

    return rgb;

  }
}

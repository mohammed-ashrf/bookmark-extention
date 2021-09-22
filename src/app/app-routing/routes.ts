import { Routes } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { AddComponent } from '../add/add.component';
import { AddBookmarkComponent } from '../add-bookmark/add-bookmark.component';

export const routes: Routes = [
  { path: 'home',  component: HomeComponent },
  { path: 'add',  component: AddComponent },
  { path: 'search',     component:AddBookmarkComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
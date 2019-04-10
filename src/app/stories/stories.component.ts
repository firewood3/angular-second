import { Component, OnInit } from '@angular/core';
import {HackerNewsApiService} from '../api/hacker-news-api.service';
import {of} from 'rxjs/internal/observable/of';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent implements OnInit {

  items;

  constructor(private hackerNewsApiService: HackerNewsApiService) {}

  ngOnInit() {
    this
      .hackerNewsApiService
      .fetchStories()
      .subscribe(value => {
        this.items = value;
      }, error => console.log('Could not fetch'));
  }



}

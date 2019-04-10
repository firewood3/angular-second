import {Component, Input, OnInit} from '@angular/core';
import {HackerNewsApiService} from '../api/hacker-news-api.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input() itemId: number;
  item;

  constructor(private hackerNewsAPIService: HackerNewsApiService) { }

  ngOnInit() {
    this
      .hackerNewsAPIService
      .fetchItem(this.itemId)
      .subscribe(value => {
        this.item = value;
      }, error => console.log('Could not load item : ' + this.itemId));
  }

}

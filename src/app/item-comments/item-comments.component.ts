import { Component, OnInit } from '@angular/core';
import {HackerNewsApiService} from '../api/hacker-news-api.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-item-comments',
  templateUrl: './item-comments.component.html',
  styleUrls: ['./item-comments.component.scss']
})
export class ItemCommentsComponent implements OnInit {
  sub: any;
  item;
  idLiteral: string;
  constructor(
    private hackerNewsAPIService: HackerNewsApiService,
    private route: ActivatedRoute
  ) { this.idLiteral = 'id'; }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const itemId = +params[this.idLiteral];
      this.hackerNewsAPIService.fetchComments(itemId).subscribe(
        data => {
          this.item = data;
        }, error => console.log('Could not load item : ' + itemId)
      );
    });
  }

}

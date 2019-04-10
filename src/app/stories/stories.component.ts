import { Component, OnInit } from '@angular/core';
import {HackerNewsApiService} from '../api/hacker-news-api.service';
import {of} from 'rxjs/internal/observable/of';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent implements OnInit {
  typeSub: any;
  pageSub: any;
  storiesType;
  pageNum: number;
  listStart: number;
  items;

  pageLiteral: string;

  constructor(
    private hackerNewsApiService: HackerNewsApiService,
    private route: ActivatedRoute
  ) { this.pageLiteral = 'page'; }

  ngOnInit() {
    /* 라우트 데이터를 받아옴*/
    this.typeSub = this.route
      .data.subscribe(
        data => {
          this.storiesType = (data as any).storiesType;
          console.log(this.storiesType);
        });

    /* 라우트 프러퍼티를 받아옴*/
    this.pageSub = this.route.params.subscribe(
      params => {
        this.pageNum = +params[this.pageLiteral] ? +params[this.pageLiteral] : 1;
        this.hackerNewsApiService
          .fetchStories(this.storiesType, this.pageNum)
          .subscribe(
            items => this.items = items,
            error => console.log('Error fetching' + this.storiesType + 'stories'),
            () => {
              // <ol> 테그 페이징 순서 시작 번호를 계산해줌
              this.listStart = ((this.pageNum - 1) * 30) + 1;
              // 페이징 버튼을 눌러서 페이지가 바뀌었을 때, 사용자의 위지가 아래에 머물지 않도록 해줌
              window.scrollTo(0, 0);
              console.log('storiesType :' + this.storiesType);
              console.log('pageNum : ' + this.pageNum);
              console.log('listStart : ' + this.listStart);
            }
          );
      }
    );
  }

}

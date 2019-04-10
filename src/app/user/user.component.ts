import { Component, OnInit } from '@angular/core';
import {HackerNewsApiService} from '../api/hacker-news-api.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  sub: any;
  user;
  idLiteral: string;

  constructor(
    private hackerNewsAPIService: HackerNewsApiService,
    private route: ActivatedRoute,
    private location: Location
  ) { this.idLiteral = 'id'; }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const userID = params[this.idLiteral];
      this.hackerNewsAPIService.fetchUser(userID).subscribe(data => {
        this.user = data;
      }, error => console.log('Could not load user'));
    });
  }

  goBack() {
    this.location.back();
  }

}

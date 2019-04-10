# Origin
 - https://houssein.me/angular2-hacker-news
 - https://github.com/housseindjirdeh/angular2-hn
 
# Hacker News

이 글에서 해커 뉴스를 제작할 것이다.

요약
1. 설정하고, 프론트 페이지를 만들것이다.
2. 옵저버블 데이터 서비스를 비동기형식으로 로드할 것이다.
3. 스토리타입으로 다른 페이지를 네비게이트 할것이다. 라우팅 컴포넌트를 쓸것이다.
4. 아이템들과 유저 프로필을 방문할 수 있도록 라우트를 추가할 것이다.

다음 사항을 이해할 것이다.
1. The ngmodule decorator
2. View Encapsulation
3. RxJS

## Getting Started
```code
ng new angular2-hn
cd angular2-hn
ng serve
```

## NgModule
NgModule은 모든 선언을 명시한다. (Components, directives and pipes), Library imports (such as FormaModule and HttpModule) and provider(a single-instatnce service for example)

모든 component, directives, pipes들을 모두  NgModule에 선언하지 않아도 된다. 각자 컴포넌트에 선언해도 된다.

## Let's get read to rumble
```code
ng generate component Header
```
- app.component.html / scss
- header.component.html /scss

## View Encapsulation
페이지를 반응형으로 만들었다.
컴포넌트별로 지역적인 HTML과 CSS를 가지고 뷰는 캡슐화 된다.

## Multiple Components
다음의 컴포넌트를 추가하므로써 아이템 리스트 페이지의 골격을 완성함
- stories
- fotter

## RxJS and Observables
- 진짜 데이터를 당겨오기 전에, RxJs와 observables의 컨셉을 알아보자.
- 엥귤러에서는 HTTPclient를 쓰는데 http.get()하면 무엇을 리턴받는가?
- 비동기 컬렉션 스트림 데이터를 반환 받는다. Observavle이라는,, RxJS라이브러리를 사용한,
- 옵저버블은 스트림 데이터를 구독할 수 있게 한다. 그리고 이 데이터를 처리할 때, 데이터를 변환 시킬수도있다.
- Stream emits values

## Observable Data Service
리얼 데이터 당겨오기
- injecting component : service
- HTTPClientModule

받아올 데이터
```json
// https://hacker-news.firebaseio.com/v0/item/2.json?print=pretty

{
  "by" : "phyllis",
  "descendants" : 0,
  "id" : 2,
  "kids" : [ 454411 ],
  "score" : 16,
  "time" : 1160418628,
  "title" : "A Student's Guide to Startups",
  "type" : "story",
  "url" : "https://www.paulgraham.com/mit.html"
}
```

- service에서 get()정의 stories에서 service의 get()메소드 호출
- 500개의 데이터가 존재. Built-in Pipe 사용, slice를 위해,
- Stroies에서 Ids를 불러오고 각 item에서 id에 부합하는 Item을 호출해온다.
- Domain 파이프는 만들어서 넣었고, Moment.js 파이프는 어떻게 넣는지 모르겠다. 다 끝마쳤을때 해야겠다.

***여기까지가 firstPage의 내용이다***

## Things are kinda slow though & Let's switch things up
바뀌는 API 주소 => https://node-hnapi.herokuapp.com/news?page=1
<br>
이전 방식은 리스트를 뿌릴때 id를 먼저 500개 받고 화면에 뿌려질 데이터를 30개만 다시 당겨오는 구조였다. (2번 호출되는 구조)
<br>
이렇게되면 느리다.
<br>
그래서 paging을 지원하는 api에서 30개의 데이터만 페이징 형태로 id와 데이터를 함께 가져온다.(1번만 호출하는 구조)

***여기까지가 SECOND PAGE의 내용이다***

## Routing
우리는 꽤 오랜 길을 걸어왔다. 하지만 계속하기 전에, 전체의 컴포넌트 구조를 그려보자. 저자의 우스운 파워포인트 스킬을 용서하라...

```code
- HeaderComponent
- StoriesComponent
    - ItemComponent1
    - ItemComponent2
    ...
- FooterComponent
```

```code
- HeaderComponent
- ItemCommentsComponent
    - CommentTreeComponent
        - CommmentComponent1
        - CommmentComponent2
        ...
- FooterComponent
```

라우트 모듈 생성
```code
ng generate module app-routes --flat --module=app
```

한 것.
- 라우트 배열을 생성했다. path와 컴포넌트를 연결해주고 연결될때 데이터도 넣어줄수 있다.
- root는 /news/1로 리다이렉트된다.
- jobs/:page 에서 page는 컴포넌트에서 토큰으로 사용될 수 있다.
- item/:id 에서 id도 컴포넌트에서 토큰으로 사용될 수 있다.

다음과 같이 라우팅 페이지가 어디에 로드될지 앵귤러에게 알려줘야 한다.
```html
<!-- app.component.html -->

<div id="wrapper">
  <app-header></app-header>
  <router-outlet></router-outlet>
  <app-footer></app-footer>
</div>
```

## Story Navigation
이제 네비게이션해보자.<br>
우선 헤더의 링크를 바꾸어주자. HeaderComponent HTML수정 

*routerLink 를 href대신 사용하는 것을 잊지말자.*

라우트 모듈을 등록하면 ActivatedRoute을 사용해서 라우팅 할 수 있다.

프론트 페이지에서 라우터로부터 data와 params를 subscribe하여 정보를 불러오고 api를 fetch하자.


## Item Comments
ItemComponent를 누르면 ItemComentsComponent로 넘어가겠다.

```code
- HeaderComponent
- ItemCommentsComponent
    - CommentTreeComponent
        - CommmentComponent1
        - CommmentComponent2
        ...
- FooterComponent
```

*More than one module matches. Use skip-import option to skip importing the component into the closest module.*

이런 에러가 나는 것은 컴포넌트를 추가할 모듈을 찾지 못했다는 뜻이다. 

```code
ng g c new-component --module app
```

- ItemCommentsComponent는 라우터로 부터 생성되고 라우터의 파라메타를 받아 api를 호출함
- ItemCommentsComponent가 받은 정보는 모든 comment를 가지고 있음.
- HTML에서 comment를 commentTree로 바인딩함 comment트리는 for문으로 comment를 호출함
- for문으로 호출된 comment는 각자 commentCompnoet로 바인딩 됨. 
- Comment는 또 Comment를 가질 수 있는데 commentComponent가 재귀적으로 하위 comment들을 호출함

## User Profile
1. API에서 불러올 엔드포인트를 받아올 함수를 작성해준다. HTTPClient 이용
2. user 컴포넌트 생성
3. 라우트에서 user 컴포넌트로 들어갈수있게금 path지정해줌
4. user 컴포넌트는 oninit하면서 API 함수를 호출해준다.
 


# MyHackerNews

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

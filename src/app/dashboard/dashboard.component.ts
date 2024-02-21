import {Component, OnInit} from '@angular/core';
import {ListComponent} from "../list/list.component";
import {DetailComponent} from "../detail/detail.component";
import {AsyncPipe, NgIf} from "@angular/common";
import {UnauthorizedComponent} from "../unauthorized/unauthorized.component";
import {ActivatedRoute} from "@angular/router";
import {ContentFacade} from "../../libs/facade/content-facade/content-facade.facade";
import {AuthFacade} from "../../libs/facade/auth-facade/auth-facade.facade";
import {take} from "rxjs";
import {ContentState} from "../../libs/reducers/content-reducer/content.reducer";
import {Store} from "@ngrx/store";
import {selectContentList} from "../../libs/selectors/content-selector/content.selectors";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ListComponent,
    DetailComponent,
    NgIf,
    UnauthorizedComponent,
    AsyncPipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  constructor(public readonly contentFacade: ContentFacade,
              public readonly authFacade: AuthFacade,
              public readonly route: ActivatedRoute,
              private store: Store<{content: ContentState}>) {}

  ngOnInit(): void {
    //Rely on the id in the route to know what content to select
    this.route.params.subscribe(params => {
      if (params) {
        let id = params['id'];
        console.log('DC ID: ' + id);
        this.store.select(selectContentList).pipe(take(1)).subscribe(content => {
          let idx = content?.findIndex(item => item.id === id);
          console.log('DC Select Item: ' + idx);
          if (idx !== -1) {
            this.contentFacade.selectContentById(id);
          } else {
            this.contentFacade.selectContent(null);
          }
        });
      }
    });
  }
}

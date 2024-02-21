import { Injectable } from '@angular/core';
import {Item} from "../../model/item";
import {map, Observable, take} from "rxjs";
import {v4} from "uuid";
import {NavService} from "../../services/nav-service/nav.service";
import {Store} from "@ngrx/store";
import {LoadContentActions} from "../../actions/load-content-action/load-content.actions";
import {AddContentActions} from "../../actions/add-content-action/add-content.actions";
import {UpdateContentActions} from "../../actions/update-content-action/update-content.actions";
import {DeleteContentActions} from "../../actions/delete-content-action/delete-content.actions";
import {ContentState} from "../../reducers/content-reducer/content.reducer";
import {
  selectContentList,
  selectLoadSubscription,
  selectSelectedContent
} from "../../selectors/content-selector/content.selectors";
import {SelectContentActions} from "../../actions/select-content-action/select-content.actions";

@Injectable({
  providedIn: 'root'
})
export class ContentFacade {

  constructor(private navService: NavService,
              private store: Store<{content: ContentState}>) {
    this.loadContent();
  }

  loadContent() {
    console.log('CF Load Content')
    this.store.dispatch({type: LoadContentActions.loadContents.type});
  }

  addContent(addedContent: Item) {
    addedContent.id = v4();
    console.log('CF Add Content');
    this.store.dispatch({type: AddContentActions.addContent.type, content: addedContent})
  }

  updateContent(contentEvent: Item) {
    console.log('CF Update Content');
    if (contentEvent.id) {
      // Weird quirk with the form the state of the expiration is still set
      // if it was previously and has expiration was unchecked, so clear it out here before saving
      if (!contentEvent.hasExpiration) {
        contentEvent.expirationDate = '';
      }
      this.store.dispatch(UpdateContentActions.updateContent({content: contentEvent}));
    } else {
      this.addContent(contentEvent);
    }
  }

  deleteContent(deletedContent: Item) {
    console.log('CF Delete Content');
    this.store.dispatch(DeleteContentActions.deleteContent({content: deletedContent}));
  }

  selectContentById(id: string | null) {
    this.store.select(selectLoadSubscription).subscribe(
      () => {
        this.store.select(selectContentList).pipe(
          take(1),
          map(value => this.findContentById(value, id))
        ).subscribe(content => {
          console.log('CF Data At SCBI: ' + JSON.stringify(content));
          if (content) {
            this.selectContent(content);
          } else {
            this.selectContent(null);
          }
        });
      }
    );
  }

  selectContent(contentEvent: Item | null) {
    console.log('CF - Select: ' + JSON.stringify(contentEvent));
    this.store.dispatch(SelectContentActions.selectContent({content: contentEvent}));
  }

  goToContent(content: Item) {
    console.log('CF goto: ' + JSON.stringify(content));
    this.navService.navigateContent(content);
  }

  resetContent() {
    console.log('CF Reset');
    this.navService.navigateDashboard();
  }

  getContentList(): Observable<Item[] | null> {
    return this.store.select(selectContentList);
  }

  getSelectedContent(): Observable<Item | null> {
    return this.store.select(selectSelectedContent);
  }

  // Eventually move this stuff to a util?
  private findContentById(content: Item[] | null, toFind: string | null): Item | undefined {
    return content?.find(content => content.id === toFind);
  }
}

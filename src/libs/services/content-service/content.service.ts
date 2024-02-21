import { Injectable } from '@angular/core';
import { Observable} from "rxjs";
import {Item} from "../../model/item";
import {ContentHttpService} from "../content-http-service/content-http.service";
import {NavService} from "../nav-service/nav.service";

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private contentHttp: ContentHttpService,
              private navService: NavService) {
  }

  loadContent(): Observable<Item[]> {
    console.log('CS Load Content');
    return this.contentHttp.loadContent();
  }

  addContent(addedContent: Item) {
    console.log('CS Add Content: ' + JSON.stringify(addedContent));
    return this.contentHttp.createContent(addedContent);
  }

  updateContent(updatedContent: Item) {
    console.log('CS Update Content: ' + JSON.stringify(updatedContent));
    return this.contentHttp.updateContent(updatedContent);
  }

  deleteContent(deletedContent: Item) {
    console.log('CS Delete Content: ' + JSON.stringify(deletedContent));
    return this.contentHttp.deleteContent(deletedContent);
  }

  resetSelectedContent() {
    console.log('CS Reset to Empty');
    this.navService.navigateDashboard();
  }
}

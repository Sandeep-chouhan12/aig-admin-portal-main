import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  hideSideNav = new BehaviorSubject<boolean>(false);
  hideSideNavEvent = this.hideSideNav.asObservable();


  private readonly titleSubject = new BehaviorSubject<string>('Dashboard');
  public readonly title$ = this.titleSubject.asObservable();

  setTitle(newTitle: string): void {
    if (this.titleSubject.value !== newTitle) {
      setTimeout(() => {
        this.titleSubject.next(newTitle);
      }, 1);
    }
  }
  constructor() { }
}

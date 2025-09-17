import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageStateService {
  //  user module
  public pageNo = 0;
  constructor() { }

  public clearAll() {
    this.pageNo = 0
  }
}

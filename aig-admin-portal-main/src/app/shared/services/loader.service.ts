import { Injectable } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public isDataLoaded: Observable<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private ngxUiLoaderService: NgxUiLoaderService) { }


  public showLoader() {
    this.updateDataLoadedStatus(false)
    this.ngxUiLoaderService.startLoader('loader-01');
  }

  public hideLoader() {
   this.updateDataLoadedStatus(true)
    this.ngxUiLoaderService.stopLoader('loader-01');
  }

  updateDataLoadedStatus(status: boolean) {
    (this.isDataLoaded as BehaviorSubject<boolean>).next(status);
  }
}

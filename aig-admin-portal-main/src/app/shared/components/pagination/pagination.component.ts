import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageRequest } from '../../models/page-request';
import { PaginationManager } from '../../models/pagination-manager';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  ngOnInit(): void { }

  @Input() pageManager!: PaginationManager;
  @Input() pageRequest!: PageRequest;
  @Input() data: any;
  @Output() fetchData = new EventEmitter<any>();


  manageNext(isNext: boolean) {
    if (isNext)
      this.pageRequest.pageNo++;
    else
      this.pageRequest.pageNo--;
    if (this.pageRequest.pageNo >= 0 && this.pageRequest.pageNo < this.pageManager.totalPages)
      this.getAllData();
  }
  // get pages
  setPage(page: any) {
    if (page - 1 != this.pageRequest.pageNo) {
      this.pageRequest.pageNo = page - 1;
      this.getAllData();
    }
  }

  // getAllData() {
  //   this.eventEmit.emit(this.pageRequest);
  // }
  getAllData() {
    this.fetchData.emit(this.pageRequest);
  }
}

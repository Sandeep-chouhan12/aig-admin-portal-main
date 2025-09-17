import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableConfig } from '../../models/table-config';
import { ColumnConfig } from '../../models/column-config';
import { ModalConfig } from '../../models/modal-config';
import { outputAst } from '@angular/compiler';

@Component({
  selector: 'app-common-data-table',
  templateUrl: './common-data-table.component.html',
  styleUrls: ['./common-data-table.component.scss'],
})
export class CommonDataTableComponent implements OnInit {
  @Input() tableConfig!: TableConfig;
  @Input() modalConfig!: ModalConfig;
  @Input() columnConfig: ColumnConfig[] = [];
  @Input() dataSource: any[] = [];

  //Row Actions
  @Output() addEvent = new EventEmitter();
  @Output() editEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();
  @Output() viewEvent = new EventEmitter();
  @Output() changeStatus = new EventEmitter();
  id: number = 0;

  //Row Status
  @Output() activeEvent = new EventEmitter(); //toggle button

  constructor() { }
  ngOnInit(): void { }

  // on delete row
  public setData(data: any) {
    this.id = data;
  }

  public deleteData() {
    this.deleteEvent.emit(this.id);
  }

  //edit data
  public OnEditRow(data: any) {
    this.editEvent.emit(data);
  }

  //add data
  public OnAddClick() {
    this.addEvent.emit('Add from ' + this.tableConfig.tableHeader);
  }

  //edit data
  public OnViewClick(data: any) {
    this.viewEvent.emit(data);
  }

  public updateStatus(index: number, userId: number) {
    this.changeStatus.emit({ status: status, index: index, userId: userId })
  }
}

import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent {

  @Input() title!: string;
  @Input() message!: string;
  @Output() onDelete = new EventEmitter<any>();
  @Input() id!: number;
  @Input() isloading!: boolean

  ngOnInit() {
  }

  deleteData() {
    this.onDelete.emit();
  }
}

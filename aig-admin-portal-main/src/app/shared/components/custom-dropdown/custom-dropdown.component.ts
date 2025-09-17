import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-custom-dropdown',
  templateUrl: './custom-dropdown.component.html',
  styleUrls: ['./custom-dropdown.component.scss']
})
export class CustomDropdownComponent {
 @Input() options: { label: string; value: any }[] = [];
  @Input() placeholder: string = 'Select';
  @Input() formGroup!: FormGroup;
  @Input() controlName!: string;
  @Output() selected = new EventEmitter<string>();
  @Input() selectedValue: string = '';
  @Input()  selectedOption: string = '';
  @Input() noOptionsMessage: string = 'No options available';

  isOpen: boolean = false;
  private valueChangeSub?: Subscription;
  ngOnInit() {
    const control = this.control;
    if (control) {
      this.selectedOption = control.value?.label || ''; 
      this.valueChangeSub = control.valueChanges.subscribe((value) => {
        this.selectedOption = value?.label || ''; 
      });
    }
  }
  
  
  ngOnDestroy() {
    this.valueChangeSub?.unsubscribe();
  }
  get control() {
    return this.formGroup?.get(this.controlName);
  }
  toggleDropdown(event: Event) {
  event.stopPropagation();
  if (!this.isOpen) {
    this.isOpen = true; 
  } else {
    this.isOpen = false; 
  }
  }
  
  selectOption(option: any) {
    this.selectedOption = option.label;   
    this.control?.setValue(option);        
    this.control?.markAsTouched();         
    this.selected.emit(option);             
    this.isOpen = false;                    
  }
  
    
  getErrorMessage(): string {
    if (!this.control?.errors) return '';
    if (this.control.errors['required']) return 'Field is required';
    return 'Invalid selection';
  }
  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.custom-select')) {
      this.isOpen = false; 
    }

}

}

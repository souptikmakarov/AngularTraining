import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';

import { AppValidators } from '../app-validators';
import {DateButton} from 'angular-bootstrap-datetimepicker';
import * as _moment from 'moment';
import {unitOfTime} from 'moment';

let moment = _moment;

if ('default' in _moment) {
  moment = _moment['default'];
}

declare var $: any;

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit, AfterViewInit {
  form: FormGroup;
  showMessage = false;
	currDate = new Date(Date.now());
  private _isPickerOpen = false;

  constructor(private fb: FormBuilder, private _elementRef: ElementRef) {}

  ngOnInit() {

    // this.form = new FormGroup({
    //   name: new FormControl('', [
    //     Validators.required, 
    //     Validators.minLength(3),
    //     AppValidators.cannotContainSpace
    //   ],
    //     AppValidators.shouldBeUnique
    //   ),
    //   phone: new FormControl('', Validators.required),
    //   email: new FormControl('', Validators.required),
    //   city: new FormControl('', Validators.required)
    // });
    // this.createForm();
    this.createFormWithFormBuilder();
  }

  // Create form using FormGroup & FormControl
  private createForm() {
    this.form = new FormGroup({
      name: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(3),
          AppValidators.cannotContainSpace
        ],
        AppValidators.shouldBeUnique
      ),
      contact: new FormGroup({
        phone: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email])
      }),
      city: new FormControl('', Validators.required)
    });
  }

  // Create form using FormBuilder
  private createFormWithFormBuilder() {
    this.form = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          AppValidators.cannotContainSpace
        ],
        AppValidators.shouldBeUnique
      ],
      contact: this.fb.group({
        phone: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]]
      }),
      birthday: ['', Validators.required]
    });
  }

  get name() {
    return this.form.get('name');
  }

  get phone() {
    return this.form.get('contact.phone');
  }

  get email() {
    return this.form.get('contact.email');
  }

  get birthday() {
    return this.form.get('birthday');
  }

  onSave() {
    // Forcing the form into error state
    // let savedSuccessfully = this.customersService.saveCustomer(this.form.value);
    // if(!savedSuccessfully) {
    // this.form.setErrors({
    //   invalidCustomer: true
    // });
    // }
    console.log(this.form.controls);
    this.form.reset();
  }

  ngAfterViewInit(): void {
    const dropdownToggle = $('[data-toggle="dropdown"]', this._elementRef.nativeElement);
    dropdownToggle.parent().on('show.bs.dropdown', () => {
      this._isPickerOpen = true;
    });
    dropdownToggle.parent().on('hide.bs.dropdown', () => {
      this._isPickerOpen = false;
    });
  }

  /**
   * This filter `disables` dates that are invalid for selection.
   * It returns `false` if the date is invalid for selection; Otherwise, `true`.
   * Filters use ES6 syntax so the `this` context is fixed to this component.
   * @param value
   *  the numeric value of the user entered date.
   */
  dateInputFilter = (value: (number | null)) => {
    return value >= moment().valueOf();
  }

  /**
   * This filter `disables` dates that are invalid for selection.
   * It returns `false` if the date is invalid for selection; Otherwise, `true`.
   * Filters use ES6 syntax so the `this` context is fixed to this component.
   * @param dateButton
   *  the target datebutton.
   * @param viewName
   *  the current view.
   */
  datePickerFilter = (dateButton: DateButton, viewName: string) => {
    return dateButton.value >= moment().startOf(viewName as unitOfTime.StartOf).valueOf();
  }

  /**
   * Used to keep the Bootstrap drop-down open while clicking on the date/time picker.
   * Without this, the dropdown will close whenever the user clicks,
   * @param event
   *  the DOM click event.
   */
  keepDropDownOpen(event: Event) {
    event.stopPropagation();
  }

  /**
   * Close the Date drop-down when date is selected.
   * Do not `toggle` the drop-down unless a value is selected.
   * ngModel handles actually setting the start date value.
   * @param event
   *  the `DlDateTimePickerChange` event.
   */
  dateSelected(event, formControlName) {
    console.log('_isDropdownVisible', this._isPickerOpen);
    if (this._isPickerOpen && event.value) {
      $('.date-dropdown').dropdown('toggle');
      console.log("Value set for", formControlName);
      this.birthday.setValue(event.value);
    }
  }
}

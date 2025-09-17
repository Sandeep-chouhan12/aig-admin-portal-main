import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppUtil } from 'src/app/shared/utils/app-util';
import { Constants } from 'src/app/shared/utils/constants';
import { FormsValidator } from 'src/app/shared/utils/forms-validator';
import { ForgetPasswordRequest } from '../../payload/forget-password-request';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  @Output() email = new EventEmitter<any>();
  @Output() submitted = new EventEmitter<any>();

  forgetPassword: ForgetPasswordRequest = new ForgetPasswordRequest();
  emailFrom!: FormGroup;
  constants = Constants;
  isLoading: boolean = false

  constructor(private authService: AuthService, private builder: FormBuilder) {
    this.emailFrom = this.builder.group({
      email: ['', Validators.required]
    })
  }

  public checkFieldValid(fieldName: any, form: any) {
    return FormsValidator.formValidCheck(fieldName, form);
  }

  // send OTP to Email
  public sendOTP() {
    FormsValidator.formSubmittion(this.emailFrom);
    if (this.emailFrom.invalid)
      return;
    this.isLoading = true
    if (AppUtil.isEmail(this.forgetPassword.email)) {
      this.authService.sendOTP(this.forgetPassword).subscribe({
        next: (res: any) => {
          AppUtil.openToast('success', res.message, 'Success');
          AppUtil.authFormController('btn3');
          this.submitted.emit(false);
          this.email.emit(this.forgetPassword.email);
          this.isLoading = false
        },
        error: (err: any) => {
          AppUtil.openToast('error', err.error.message, 'Error');
          this.isLoading = false
        }
      })
    } else {
      AppUtil.openToast('error', Constants.INVALID_EMAIL, 'Error');
      this.isLoading = false
    }
  }
}

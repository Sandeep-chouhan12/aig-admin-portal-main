import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppUtil } from 'src/app/shared/utils/app-util';
import { Constants } from 'src/app/shared/utils/constants';
import { FormsValidator } from 'src/app/shared/utils/forms-validator';
import { ForgetPasswordRequest } from '../../payload/forget-password-request';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent {
  @Input() email!: string;

  forgetPassword: ForgetPasswordRequest = new ForgetPasswordRequest();
  confirmPassword!: string;
  newPasswordForm!: FormGroup;
  constants = Constants;
  isLoading: boolean = false;

  constructor(private authService: AuthService, private builder: FormBuilder) {
    this.newPasswordForm = this.builder.group({
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })
  }

  public checkFieldValid(fieldName: any, form: any) {
    return FormsValidator.formValidCheck(fieldName, form);
  }

  public setNewPassword() {
    FormsValidator.formSubmittion(this.newPasswordForm);
    if (this.newPasswordForm.invalid) {
      return;
    }
    this.isLoading = true;

    if (this.confirmPassword === this.forgetPassword.newPassword) {
      this.forgetPassword.email = this.email;
      this.authService.setNewPassword(this.forgetPassword).subscribe({
        next: (res: any) => {
          AppUtil.openToast('success', res.message, 'Success');
          AppUtil.authFormController('btn1');
          this.isLoading = true;
        },
        error: (err: any) => {
          AppUtil.openToast('error', err.error.message, 'Error');
          this.isLoading = false;
        }
      })
    } else {
      AppUtil.openToast('error', Constants.PASSWORD_NOT_MATCHED, 'Error');
      this.isLoading = false;
    }
  }

  public changePasswordIcon(refEle: any) {
    AppUtil.changePassowrdIcon(refEle);
  }
}

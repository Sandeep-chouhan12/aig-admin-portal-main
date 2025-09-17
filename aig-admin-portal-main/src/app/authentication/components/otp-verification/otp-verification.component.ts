import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppUtil } from 'src/app/shared/utils/app-util';
import { Constants } from 'src/app/shared/utils/constants';
import { FormsValidator } from 'src/app/shared/utils/forms-validator';
import { ForgetPasswordRequest } from '../../payload/forget-password-request';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss']
})
export class OtpVerificationComponent implements AfterViewInit, OnInit {
  @Input() email!: string;
  @Input() submitted?: boolean;
  appUtil = AppUtil;
  forgetPassword: ForgetPasswordRequest = new ForgetPasswordRequest();
  verifyOTPForm!: FormGroup;
  otp1!: string;
  otp2!: string;
  otp3!: string;
  otp4!: string;

  constructor(private authService: AuthService, private builder: FormBuilder) {
    this.verifyOTPForm = this.builder.group({
      otp1: ['', Validators.required],
      otp2: ['', Validators.required],
      otp3: ['', Validators.required],
      otp4: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    AppUtil.otpModelManger();
  }

  ngAfterViewInit(): void { }

  public verifyOTP() {
    this.submitted = true;
    FormsValidator.formSubmittion(this.verifyOTPForm);
    if (this.verifyOTPForm.invalid) {
      AppUtil.openToast('error', Constants.OTP_REQUIRED, 'Error')
      return;
    }

    this.forgetPassword.otp = this.otp1 + this.otp2 + this.otp3 + this.otp4;
    this.forgetPassword.email = this.email;
    this.authService.verifyOTP(this.forgetPassword).subscribe({
      next: (res: any) => {
        AppUtil.openToast('success', res.message, 'Success');
        AppUtil.authFormController('btn4');
      },
      error: (err: any) => {
        AppUtil.openToast('error', err.error.message, 'Error');
      },
    });
  }
}

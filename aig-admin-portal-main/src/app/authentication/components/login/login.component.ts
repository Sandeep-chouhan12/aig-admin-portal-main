import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ComponentsRoutes } from 'src/app/shared/utils/components-routes';
import { LoginRequest } from '../../payload/login-request';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppUtil } from 'src/app/shared/utils/app-util';
import { Constants } from 'src/app/shared/utils/constants';
import { FormsValidator } from 'src/app/shared/utils/forms-validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ComponentsRoutes],
})
export class LoginComponent implements OnInit {

  componentRoutes = ComponentsRoutes;
  loginCredential = new LoginRequest();
  appUtil = AppUtil;
  constants = Constants;
  loginFrom!: FormGroup;
  isLoading: boolean = false

  constructor(private authService: AuthService, private router: Router, private builder: FormBuilder) {
    this.loginFrom = this.builder.group({
      userId: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void { }

  public checkFieldValid(fieldName: any, form: any) {
    return FormsValidator.formValidCheck(fieldName, form);
  }

  public adminLogin() {
    FormsValidator.formSubmittion(this.loginFrom);
    if (this.loginFrom.invalid) {
      return;
    }
    this.isLoading = true

    if (AppUtil.isEmail(this.loginCredential.userId)) {
      this.loginCredential.userId = this.loginCredential.userId.trim();
      this.authService.loginAdmin(this.loginCredential).subscribe({
        next: (data: any) => {
          this.authService.setToken(data.admin.accessToken)
          setTimeout(() => {
            this.router.navigate([this.componentRoutes.ADMIN_HOME])
          }, 100);
          this.isLoading = false
        },
        error: (err: any) => {
          AppUtil.openToast('error', err.error.message, 'Error')
          this.isLoading = false
        },
      });
    } else {
      AppUtil.openToast('error', Constants.INVALID_EMAIL, 'Error');
      this.isLoading = false
    }
  }

  public changePasswordIcon(refEle: any) {
    AppUtil.changePassowrdIcon(refEle);
  }
}

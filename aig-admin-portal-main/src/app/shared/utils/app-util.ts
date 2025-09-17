import { HttpClient } from '@angular/common/http';
import { AbstractControl, FormGroup } from '@angular/forms';
import { parsePhoneNumber } from "libphonenumber-js";
import { NumberFormatPipe } from '../pipes/number-format.pipe';
import { Injectable } from '@angular/core';
declare var butterup: any;
@Injectable({
  providedIn: 'root'
})
export class AppUtil {

  static http: HttpClient;
  static FILE_ICON_SVG = 'assets/images/svg_img/fileicon.svg';

  constructor(private http1: HttpClient, private numberFormatePipe: NumberFormatPipe) {
    AppUtil.http = http1
  }

  static button1 = false;
  static button2 = false;
  public static DEFAULT_IMAGE = 'assets/images/svg_img/user-profile.svg';
  public static DEFAULT_PROPERTY_IMAGE = 'assets/images/temp_img/property.png';
  public static COUNTRY_CODE: string = "+91"

  // dismiss modal
  public static modalDismiss(id: string) {
    const button = document.getElementById(id);
    button?.click();
  }

  //           password matcher
  static match(control: AbstractControl): void | null {
    const passwordControl = control.get('password');
    const confirmPasswordControl = control.get('confirmPassword');

    if (passwordControl!.pristine || confirmPasswordControl!.pristine) {
      return null;
    }

    if (passwordControl!.value === confirmPasswordControl!.value) {
      return null;
    }

    confirmPasswordControl!.setErrors({ match: true });
  }
  public static openToast(
    type: string = 'success',
    message: string = '',
    title: string = 'Success'
  ) {
    try {
      // Manually clean up existing ButterUp container
      const existing = document.querySelector('.butterup-container');

      if (existing?.parentNode) {
        existing.parentNode.removeChild(existing);
      }

      // Show the new toast
      butterup.toast({
        title: title,
        message: message,
        location: 'top-center',
        icon: true,
        dismissable: true,
        type: type,
        duration: 3000 // auto-hide after 3s
      });
    } catch (err) {
      console.error('Error showing toast:', err);
    }
  }

  //  check is email

  public static isEmail(email: any) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // change icons
  public static changePassowrdIcon(element: any) {
    if (element.type === 'text') element.type = 'password';
    else element.type = 'text';
  }

  //
  public static otpModelManger() {
    const inputs = document.getElementById('inputs') as HTMLInputElement;
    inputs.addEventListener('keyup', function (e) {
      const target = e.target as HTMLInputElement;
      const val = target.value;
      if (isNaN(Number(val))) {
        target.value = '';
        return;
      }
      if (val != '') {
        const next = target.nextElementSibling as HTMLInputElement;
        if (next) {
          next.focus();
        }
      }
    });
    inputs.addEventListener('keyup', function (e) {
      const target = e.target as HTMLInputElement;
      const key = e.key.toLowerCase();
      if (key == 'backspace' || key == 'delete') {
        target.value = '';
        const prev = target.previousElementSibling as HTMLInputElement;
        if (prev) {
          prev.focus();
        }
        return;
      }
    });
  }


  public static authFormId = ['btn1', 'btn2', 'btn3', 'btn4'];

  public static authFormController(id: any) {
    for (let i of this.authFormId)
      document.getElementById(i)!.style.display = 'none';
    if (id == 'btn1')
      document.getElementById(id)!.style.display = 'flex';
    else
      document.getElementById(id)!.style.display = 'block';
  }

  public static months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  public static getYearsArray() {
    let years = [];
    for (let i = 2000; i <= new Date().getFullYear(); i++)
      years.push(i);
    return years;
  }



  public static checkFormValidOrNot(form: FormGroup) {
    Object.keys(form.controls).forEach(key => {
      const control = form.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
    const firstInvalidControl = document.querySelector('input.ng-invalid');
    if (firstInvalidControl) {
      firstInvalidControl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  static imageFormates = ['image/jpeg', 'image/jpg', 'image/png'];
  static imageExtention: string[] = ['.png', '.jpg', '.jpeg'];

  static isImageByType(type: any) {
    for (let format of this.imageFormates) {
      if (type === format)
        return true;
    }
    return false;
  }

  static isImageByName(name: string | undefined | null) {
    if (name) {
      for (let ext of this.imageExtention) {
        if (name.includes(ext))
          return true;
      }
    }
    return false;
  }


  public static isPhoneNumberValid(phoneNumber: any) {
    let number = parsePhoneNumber(AppUtil.COUNTRY_CODE + phoneNumber, 'IN');
    return number.isValid()
  }



  duration: number = 100; // Duration of the animation in milliseconds
  frameDuration: number = 1000 / 220; // How long each frame should last in milliseconds (60fps)
  public counter(finalNumber: any, id: string) {

    let increment: number = 0;
    let currentNumber: number = 0;
    // Determine the increment based on the size of the final number
    if (finalNumber > 1000 && finalNumber <= 10000) {
      increment = 1000 / (this.duration / this.frameDuration);
    } else if (finalNumber > 10000 && finalNumber <= 100000) {
      increment = 10000 / (this.duration / this.frameDuration);
    } else if (finalNumber > 1000000) {
      increment = 1000000 / (this.duration / this.frameDuration);
    } else {
      increment = finalNumber / (this.duration / this.frameDuration);
    }
    //  this.increment = finalNumber / (this.duration / this.frameDuration);
    let counterElement: HTMLElement | null = document.getElementById(id);
    if (counterElement) {
      const interval = setInterval(() => {
        currentNumber += increment;
        counterElement!.textContent = this.numberFormatePipe.transform(Math.round(currentNumber))

        // Stop the animation when we've reached the final number
        if (currentNumber >= finalNumber) {
          clearInterval(interval);
          counterElement!.textContent = this.numberFormatePipe.transform(finalNumber);
        }
      }, this.frameDuration);
    }
  }

}


import { ValidatorFn, AbstractControl } from "@angular/forms";
import { parsePhoneNumber } from "libphonenumber-js";
import { AppUtil } from "./app-util";


export class FormsValidator {

  public static PASSWORD_LENGTH = 8;

  public static formValidCheck(fieldName: string, form: any) {
    const field = form.get(fieldName);
    return field ? field.invalid && field.touched : false;
  }


  // mark as touch to all fields to show errors
  public static formSubmittion(addForm: any) {
    Object.keys(addForm.controls).forEach((key) => {
      const control = addForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
    const firstInvalidControl = document.querySelector('input.ng-invalid');
  }


  // name validator 
  public static nameValidator(): ValidatorFn {
    return (control: AbstractControl): Promise<{ [key: string]: any } | null> => {
      return new Promise((resolve) => {
        const regex = /^(?!\s*$)[a-zA-Z\s]*$/; // Regex to disallow empty or whitespace-only input
        const valid = regex.test(control.value);
        if (valid) {
          resolve(null); // Resolve with null if validation passes
        } else {
          resolve({ 'invalidName': true }); // Resolve with error object if validation fails
        }
      });
    };
  }


  // userName validator
  public static userNameValidator(): ValidatorFn {
    return (control: AbstractControl): Promise<{ [key: string]: any } | null> => {
      return new Promise((resolve) => {
        const regex = /^[a-zA-Z]{3,}@(\d+)$/; // Regex to match the specified pattern
        const valid = regex.test(control.value);
        if (valid) {
          resolve(null); // Resolve with null if validation passes
        } else {
          resolve({ 'invalidUserName': true }); // Resolve with error object if validation fails
        }
      });
    };
  }

  // minimum password length should be 8 
  // password validators
  public static passwordValidator(): ValidatorFn {
    return (control: AbstractControl): Promise<{ [key: string]: any } | null> => {
      const minLength = 8;
      return new Promise((resolve) => {
        if (control.value && control.value.length >= minLength) {
          resolve(null); // Resolve with null if validation passes
        } else {
          resolve({ 'invalidPassword': true }); // Resolve with error object if validation fails
        }
      });
    };
  }

  // email validators
    public static emailValidator(): ValidatorFn {
      return (control: AbstractControl): Promise<{ [key: string]: any } | null> => {
        return new Promise((resolve) => {
          const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex to match the specified pattern
          const valid = regex.test(control.value);
          if (valid) {
            resolve(null); // Resolve with null if validation passes
          } else {
            resolve({ 'invalidEmail': true }); // Resolve with error object if validation fails
          }
        });
      };
    }
  // phone number validators
  public static COUNTRY_CODE: string = "+91"
  public static phoneNumberValidator(): ValidatorFn {
    return (control: AbstractControl): Promise<{ [key: string]: any } | null> => {
      return new Promise((resolve) => {
        let number = parsePhoneNumber(AppUtil.COUNTRY_CODE + control.value, 'IN');
        if (number.isValid()) {
          resolve(null); // Resolve with null if validation passes
        } else {
          resolve({ 'invalidPhoneNumber': true }); // Resolve with error object if validation fails
        }
      });
    };
  }
  // 












  // password strenth check 
  public static checkPasswordStrength(password: string, minLength: number): string {
    // Define criteria for weak and strong passwords
    const weakRegex = new RegExp(`^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{${minLength},})`);
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (strongRegex.test(password)) {
      return "strong";
    } else if (weakRegex.test(password)) {
      return "weak";
    } else {
      return "very weak";
    }
  }

   

}

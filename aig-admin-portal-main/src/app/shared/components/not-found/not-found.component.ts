import { Component } from '@angular/core';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { ComponentsRoutes } from '../../utils/components-routes';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {


  constructor(private authService:AuthService){}

  public navigateToPage(){
    if(this.authService.isTokenExpired()){
      this.authService.navigateToComponent(ComponentsRoutes.LOGIN)
    }else{
      this.authService.navigateToComponent(ComponentsRoutes.ADMIN_HOME);
    }
  }

}

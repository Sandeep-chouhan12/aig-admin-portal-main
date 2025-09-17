import { AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { AddressesService } from '../../services/addresses.service';
import { AppUtil } from 'src/app/shared/utils/app-util';
import { AddressDetails } from '../../models/address-details';
import { ComponentsRoutes } from 'src/app/shared/utils/components-routes';
import { MapUtils } from 'src/app/shared/utils/map-utils';
import { PermissionType } from 'src/app/shared/models/permission-type';
import { PermissionTitle } from 'src/app/shared/models/permission-title';
declare var google: any;

@Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.scss']
})
export class AddressDetailsComponent implements OnInit, OnDestroy,AfterViewInit {


  addressId = 0;
  addressDetails!: AddressDetails;
  appUtil = AppUtil;
  componentRoutes = ComponentsRoutes;
  deleteVoiceDirectionId: any = 0;
  deleteRouteVideoId: any = 0;
  
  audio = new Audio();

  isAudioOn = false;

  audios: any[] = [];
  
  private mapUtils: MapUtils = new MapUtils();
  public location = {
    lat: 22.719568,
    long: 75.857727,
    address: '',
    aigCode: '',
  };
  public passwordVisibilityMap = new Map<any, boolean>();

  permissionTitle = PermissionTitle;
  permissionType = PermissionType;

  constructor(
    private sharedService: SharedService,
    private activatedRoute: ActivatedRoute,
    private addressService: AddressesService,
    private router: Router
  ) { }
  ngAfterViewInit(): void {
    this.stopVideo();
  }

  ngOnDestroy(): void {
    this.hideSideNav(false);
  }

  ngOnInit(): void {
    this.hideSideNav(true);
    this.activatedRoute.params.subscribe((param: any) => {
      this.addressId = param['addressId'];

      this.getAddressDetails();
    });
  }

  hideSideNav(isOn: boolean) {
    this.sharedService.hideSideNav.next(isOn);
  }

  /**
   * Retrieves address details based on the stored addressId.
   */
  public getAddressDetails() {
    if (this.addressId && this.addressId !== 0) {
      this.addressService.getAddressDetails(this.addressId).subscribe({
        next: (data: any) => {
          this.addressDetails = data.address;
          this.location.long = this.addressDetails.longitude;
          this.location.lat = this.addressDetails.latitude;
          this.location.address = this.addressDetails.address;
          this.location.aigCode = this.addressDetails.aigcode;

          setTimeout(() => {
            let element = document.getElementById('map');

            this.mapUtils.initMap(element, this.location);
          }, 100);
        },
        error: (err: any) => {
          AppUtil.openToast('error', err.error.message, 'Error');
        }
      });
    }
  }

  /**
   * Toggles the visibility of passwords based on the provided ID.
   * @param id - The ID of the password to toggle visibility.
   */
  public togglePasswordVisibility(id: any): void {
    const currentVisibility = this.passwordVisibilityMap.get(id) || false;

    this.passwordVisibilityMap.forEach((value, key) => {
      value = false;
      this.passwordVisibilityMap.set(key, value);
    });
    this.passwordVisibilityMap.set(id, !currentVisibility);
  }

  /**
   * Checks if the password with the provided ID is currently visible.
   * @param id - The ID of the password to check visibility.
   * @returns True if the password is visible, otherwise false.
   */
  public isPasswordVisible(id: any): boolean {
    return this.passwordVisibilityMap.get(id) || false;
  }

  /**
   * Deletes a voice direction based on the stored deleteVoiceDirectionId.
   */
  deleteVoiceDirection() {
    if (this.deleteVoiceDirectionId && this.deleteVoiceDirectionId !== 0) {
      this.addressService.deleteVoiceDirection(this.deleteVoiceDirectionId).subscribe({
        next: (data: any) => {
          AppUtil.openToast('success', data.message, 'Success');
          this.getAddressDetails();
        },
        error: (err: any) => {
          AppUtil.openToast('error', err.error.message, 'Error');
        }
      });
    }
  }

  /**
   * Deletes a route video based on the stored deleteRouteVideoId.
   */
  deleteRouteVideo() {
    if (this.deleteRouteVideoId && this.deleteRouteVideoId !== 0) {
      this.addressService.deleteRouteVideo(this.deleteRouteVideoId).subscribe({
        next: (data: any) => {
          AppUtil.openToast('success', data.message, 'Success');
          this.getAddressDetails();
        },
        error: (err: any) => {
          AppUtil.openToast('error', err.error.message, 'Error');
        }
      });
    }
  }

  /**
   * Clears stored deleteVoiceDirectionId and deleteRouteVideoId.
   */
  clearData() {
    this.deleteRouteVideoId = '';
    this.deleteVoiceDirectionId = '';
  }

  /**
   * Navigates to the specified path using Angular Router.
   * @param path - The path to navigate to.
   */
  navigate(path: string) {

    this.router.navigate(['Admin/' + path]);
  }


  public playAudio(src: any, id: any) {
    // Toggle password visibility
    this.togglePasswordVisibility(id);

    // Check if audio with same id is already playing
    if (this.audios.includes(id) && this.isAudioOn) {
      this.stopAudio(); // Stop the audio playback
      this.isAudioOn = false; // Set audio status to off
    } else if (this.audios.includes(id) && !this.isAudioOn) {
      // Start playing audio if audio with same id is paused
      this.audio.play();
      this.isAudioOn = true; // Set audio status to on
      // Remove the id from the list if it's already there
      this.audios = this.audios.filter(f => f == id);
    } else if (!this.audios.includes(id)) {
      // Start playing new audio
      this.audio.src = src;
      this.audio.play();
      this.isAudioOn = true; // Set audio status to on
      // Add new id to the list
      this.audios.push(id);
      // Filter out the id if it's already there
      this.audios = this.audios.filter(f => f == id);
    }

    // Event listener for audio end
    this.audio.addEventListener("ended", () => {
      this.stopAudio(); // Stop the audio playback
      this.audio.currentTime = 0; // Reset audio time
      this.togglePasswordVisibility(0); // Toggle password visibility
    });
}

// Method to stop audio playback
public stopAudio() {
    this.audio.pause(); // Pause the audio playback
    this.isAudioOn = false; // Set audio status to off
}

playVideo(url: string) {
  const video:any = document.getElementById('video');
  const source = document.getElementById('source');

  source?.setAttribute('src',url );
  video?.load()
}

stopVideo(){
  const targetDiv:any = document.getElementById('video');
  const body:any = document.getElementById("video-player");
  const video:any = document.getElementById('video');
// Event listener for clicks on the parent div
body.addEventListener('click', function(event:any) {
    // Check if the click occurred outside the target div
    if (!targetDiv.contains(event.target)) {
        // Call your function when clicked outside the div
        video.pause();
        video.currentTime = 0;
    }
});
}
}

import { AddressVerificationDetails } from "./address-verification-details";
import { PropertyPhotos } from "./property-photos";
import { RouteVideo } from "./route-video";
import { User } from "./user";
import { VoiceDirection } from "./voice-direction";

export class AddressDetails {
    id = 0;

    address = '';
    blockCode = '';
    aigcode = '';
    generalInfo = '';
    zipcode = '';
    addressType = '';
    addressTypeImage = '';
    landmark = '';
    longitude=0
    latitude=0
    user!: User;

    voiceDirections: VoiceDirection[] = [];

    propertyPhotos: PropertyPhotos[] = [];

    routeVideo: RouteVideo[] = [];

    isVerified = false;
    addressVerificationDetails!:AddressVerificationDetails
}

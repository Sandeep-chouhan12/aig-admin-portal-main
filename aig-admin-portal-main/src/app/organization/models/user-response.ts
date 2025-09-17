
import { BusinessInformation } from "./business-information";
import { DirectorInformation } from "./director-information";
import { PersonalInformationResponse } from "./personal-information-response";

export class UserResponse {
    public id: number = 0;
    public email: string = ''
    public phoneNumber: number = 0;
    public profilePicture: any
    public isActive!: Boolean;
    public requestStatus: any
    public personalInformationResponse !: PersonalInformationResponse;
    public businessInformationResponse!: BusinessInformation;
    public directorInformationResponse !: DirectorInformation;

}

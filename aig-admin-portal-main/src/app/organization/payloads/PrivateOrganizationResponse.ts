import { BusinessInformationResponse } from "./BusinessInformationResponse";
import { DirectorInformationResponse } from "./DirectorInformationResponse";
import { PersonalInformationResponse, VerificationType } from "./PersonalInformationResponse";


export class PrivateOrganizationDetailsResponse {
  organizationId!: string;
  personalInformationResponse!: PersonalInformationResponse;
  businessInformationResponse!: BusinessInformationResponse;
  directorInformationResponse!: DirectorInformationResponse;
  type!: VerificationType;
  companyName!: string;
  email!: string;
  phoneNumber!: string;
  profilePicture!: string;
}

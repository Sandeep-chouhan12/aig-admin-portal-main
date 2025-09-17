
import { AuthorizedOfficerDetailsResponse } from "./AuthorizedOfficerDetailsResponse";
import { DocumentationUploadsResponse } from "./DocumentationUploadsResponse ";
import { IdentityVerificationResponse } from "./IdentityVerificationResponse";

export class GovernmentOrganizationDetailResponse {

  identityVerificationResponse!: IdentityVerificationResponse;
  authorizedOfficerResponse: AuthorizedOfficerDetailsResponse=new AuthorizedOfficerDetailsResponse();
  documentationUploadsResponse!: DocumentationUploadsResponse;
  companyName!: string;
  email!: string;
  phoneNumber!: string;
}
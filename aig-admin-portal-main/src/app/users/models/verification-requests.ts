import { VerificationOfficer } from "./verification-officer";
import { VerificationRequestStatus } from "./verification-request-status";

export class VerificationRequests {
     address='';
	 addressType='';
	 addressTypeImage='';
	 aigCode='';
	 transactionDateTime='';
	addressId = 0;
	id=0;
	 status!:VerificationRequestStatus;;
	 verificationOfficer:VerificationOfficer=new VerificationOfficer();
}

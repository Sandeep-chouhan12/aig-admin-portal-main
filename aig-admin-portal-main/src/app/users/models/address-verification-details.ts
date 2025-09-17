import { AddressVerificationSummary } from "./address-verification-summary"

export class AddressVerificationDetails {
    uuid=''
	propertyImage=''
	requestorImage=''
	certificate=''
	businessFileType=''
	ninCard=''
	summary!:AddressVerificationSummary;
}

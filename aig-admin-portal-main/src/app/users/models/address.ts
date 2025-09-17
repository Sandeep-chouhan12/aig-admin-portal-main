import { ColumnConfig } from "src/app/shared/models/column-config";
import { ComponentsRoutes } from "src/app/shared/utils/components-routes";

export class Address {
  id=0

	isVerified=''
	addressType=''
	addressTypeImage=''
	address=''
	aigcode=''
  firstName='';
  surname='';
	buildingNo='';
	locality='';
	landmark='';
	city='';
	state='';
	zipcode='';
	lgaName='';
	
	// user details
	
	userFirstName=''
	lastName=''
	profilePicture=''
	userId=0;
 isDeleted=false;
}

export const  addressTableCol :ColumnConfig[] = [
    {
      name: 'firstName',
      label: 'Address Holder',
      //routerLink:ComponentsRoutes.USER_DETAILS_BASE
    },
    {
      name: 'aigcode',
      label: 'AIG Code',
    },
    {
      name: 'address',
      label: 'Address'
    },
    {
      name: 'addressType',
      label: 'Address Type',
    },
]
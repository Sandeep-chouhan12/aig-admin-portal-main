import { ColumnConfig } from "src/app/shared/models/column-config";
import { ComponentsRoutes } from "src/app/shared/utils/components-routes";
import { UserSettings } from "./user-settings";

export class User {

	userId = 0;

	firstName = '';

	lastName = '';

	email = '';

	phoneNumber = '';

	profilePicture = '';

	createdDate = '';

	updatedDate = '';

	isActive = true;
	settings!: UserSettings;
	isDeleted=false;
	companyName:string=''
	organizationType:any;
	organizationId:any
	

}





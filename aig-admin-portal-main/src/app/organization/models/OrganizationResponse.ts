import { Subscription } from "../models/subscription";
export class OrganizationResponse {

  organizationId!:string;
  email!: string;
  isActive!: boolean;
  isDeleted!: boolean;
  isVerified!: boolean;
  userType!: UserType;
  phoneNumber!: string;
  companyName!: string;
  profilePicture!: string;
  subscription:Subscription=new Subscription();
}

export enum UserType {
  GOVERNMENT = 'GOVERNMENT',
  PRIVATE = 'PRIVATE'
}

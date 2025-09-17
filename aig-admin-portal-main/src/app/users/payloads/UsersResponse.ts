export class OrganizationUser {

  organizationId!:string;
  email!: string;
  isActive!: boolean;
  isDeleted!: boolean;
  isVerified!: boolean;
  userType!: UserType;
  phoneNumber!: string;
  companyName!: string;
  profilePicture!: string;
}

export enum UserType {
  GOVERNMENT = 'GOVERNMENT',
  PRIVATE = 'PRIVATE'
}


export class PersonalInformationResponse {
  firstName!: string;
  lastName!: string;
  userIdentityType!: IdentificationType;
  userIdentityNumber!: string;
  userAddressVerificationType!: PhysicalAddressVerification;
  userPhysicalAddressDetail!: string;
  userPhysicalAddressAIGBlockeCode!: string;
}

// enums/identification-type.ts
export enum IdentificationType {
  NIN_CARD = 'NIN_CARD',
  PASSPORT = 'PASSPORT',
  DRIVERS_LICENCSE = 'DRIVERS_LICENCSE',
}

// enums/physical-address-verification.ts
export enum PhysicalAddressVerification {
  AIG_BLOCK = 'AIG_BLOCKCODE',
  UTILITY_BILL = 'UTILITY_BILL',
}



// enums/verification-type.ts
export enum VerificationType {
  BASIC = 'BASIC',
  ADVANCED = 'ADVANCED'
}

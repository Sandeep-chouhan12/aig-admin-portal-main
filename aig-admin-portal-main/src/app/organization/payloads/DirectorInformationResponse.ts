

export class DirectorInformationResponse {
  directorInformationId!: number;
  directorName!: string;
  directorIdentityType!: IdentificationType;
  directorPhysicalAddress!: string;
  directorIdentityNumber!: string;
}
// enums/identification-type.ts
export enum IdentificationType {
  NATIONAL_ID = 'NATIONAL_ID',
  PASSPORT = 'PASSPORT',
  DRIVER_LICENSE = 'DRIVER_LICENSE',
  OTHER = 'OTHER'
}

// enums/physical-address-verification.ts
export enum PhysicalAddressVerification {
  AIG_BLOCK = 'AIG_BLOCK',
  UTILITY_BILL = 'UTILITY_BILL',
  TENANCY_AGREEMENT = 'TENANCY_AGREEMENT'
}

// enums/request-status.ts
export enum RequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

// enums/verification-type.ts
export enum VerificationType {
  BASIC = 'BASIC',
  ADVANCED = 'ADVANCED'
}

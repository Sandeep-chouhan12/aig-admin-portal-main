

export class BusinessInformationResponse {
  businessInformationId!: number;
  businessName!: string;
  businessPhysicalAddress!: string;
  registrationNumber!: string;
  taxIdentificationNumber!: string;
  businessAddressVerificationType!: PhysicalAddressVerification;
  businessType!: string;
  businessPhysicalAddressDetail!: string;
}

export interface BusinessType {
  id: number | null;
  type: string;
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
   AIG_BLOCK = 'AIG_BLOCKCODE',
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

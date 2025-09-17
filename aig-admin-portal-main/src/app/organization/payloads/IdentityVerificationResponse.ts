

export class IdentityVerificationResponse {
  agencyName!: string;
  email!: string;
  phoneNumber!: string;
  bodyType!: GovermentBodyType;
  tinNumber!: string;
  profilePic!: string;
  rcNumber!: string;
  stateOrLga!: string;
  officialWebsite!: string;
  address!: string;
}
export enum GovermentBodyType {
  FEDERAL_MINISTRY = 'FEDERAL_MINISTRY',
  STATE_MINISTRY = 'STATE_MINISTRY',
  LOCAL_GOVERNMENT_AUTHORITY = 'LOCAL_GOVERNMENT_AUTHORITY',
  PARASTATAL = 'PARASTATAL',
  SECURITY_AGENCY = 'SECURITY_AGENCY',
  OTHER = 'OTHER'
}

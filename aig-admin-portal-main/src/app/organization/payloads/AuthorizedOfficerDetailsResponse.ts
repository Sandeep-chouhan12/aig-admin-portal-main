// import { OfficialIdType } from './official-id-type.enum';

export class AuthorizedOfficerDetailsResponse {
  fullName!: string;
  email!: string;
  phoneNumber!: string;
  designation!: string;
  officialIdType!: OfficialIdType;
  officialUploadPath!: string;
  officialLetter!: string;
  idNumber!: string; 
}
 enum OfficialIdType {
    NATIONAL_ID = 'NATIONAL_ID',
    STAFF_ID='STAFF_ID',
    PASSPORT_BIO_PAGE='PASSPORT_BIO_PAGE',
}

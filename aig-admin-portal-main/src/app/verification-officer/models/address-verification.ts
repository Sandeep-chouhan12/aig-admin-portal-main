import { ColumnConfig } from "src/app/shared/models/column-config";
import { Status } from "src/app/shared/models/status";

export class AddressVerification {
    public verificationOfficerName!: string;
    public profilePic!: string;
    public address!: string;
    public addressType!: string;
    public addressTypeImage!: string;
    public aigCode!: string;
    public transactionDateTime!: any;
    public status!: Status;
    public userId = 0;
    public addressId=0;
    public id=0;
    expanded = false;
}


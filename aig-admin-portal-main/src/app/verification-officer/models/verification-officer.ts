import { ColumnConfig } from 'src/app/shared/models/column-config';
import { State } from './state';

export class VerificationOfficer {
    public userId!: number ;
    public firstName!: string ;
    public lastName!: string ;
    public email!: string ;
    public phoneNumber!: string ;
    public userName!: string ;
    public profilePicture: string='' ;
    public lgaName!: string ;
    public stateId!: any ;
    public address!: string ;
    public isActive!: boolean ;
    public longitude!:string;
    public latitude!:string;
    public placeId!:string;
	public state:State=new State();
    public password!:string;
    public isDeleted=false;
    expanded = false;
}

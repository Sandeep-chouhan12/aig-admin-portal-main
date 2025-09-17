import { EmergencyOfficerResponse } from "./emergency-officer-response"

export class EmergencyRequestHistoryResponse {

    id!: number // UUID of emergency request
    address: string = ''
    emergencyType: string = ''
    emergencyImage: string = ''
    date!: Date
    userId!: number
    firstName: string = ''
    lastName: string = ''
    email: string = ''
    phoneNumber: string = ''
    profilePicture: string = ''
    requestStatus: any
    blockCode: string = ''
    emergencyOfficerResponse = new EmergencyOfficerResponse()
    latitude!:string;
    longitude!:string;
    expanded: boolean = false
}

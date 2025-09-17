import { EmergencyService } from "../models/emergency-service"

export class EmergencyOfficerResponse {
    firstName: string = ''
    lastName: string = ''
    email: string = ''
    phoneNumber!: number
    profilePicture: string = ''
    password: string = ''
    plainpassword: string = ''
    isDeleted!: boolean
    id!: number;
    isActive!: boolean;
   
    emergencyService = new EmergencyService()
}

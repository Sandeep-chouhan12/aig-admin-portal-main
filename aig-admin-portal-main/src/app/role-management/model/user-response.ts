import { Role } from "src/app/organization/payloads/OrganizationUserResponse"

export interface UserResponse {
    id: number
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    isActive: boolean
    roleName: string
    roleId: number
    profilePicture: any
}

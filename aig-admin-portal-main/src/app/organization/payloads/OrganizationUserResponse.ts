import { Subscription } from "../models/subscription";

export class OrganizationUserResponse{

  id!: string;
  name!: string;
  email!: string;
  phoneNumber!: string;
  password?: string | null;
  profilePic?: string | null;
  role!: Role;
  organizationId?: string | null;
  active!: boolean;

}
export class Role {
  roleId!: number;
  roleName!: string;
  isActive?: boolean | null;
}
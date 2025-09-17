import { Permission } from "./permission";

export interface Role {
    roleId: number;
    roleName: string;
    createdDate: string;
    updatedDate: string;
    isActive: boolean;
    permissions: Permission[];
}
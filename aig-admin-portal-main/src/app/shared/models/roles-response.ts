import { PermissionResponse } from "./permission-response";

export class RolesResponse {
    roleId: string = '';
    roleName: string = '';
    isDefault: boolean = false;
    permissions: PermissionResponse[] = [];
}

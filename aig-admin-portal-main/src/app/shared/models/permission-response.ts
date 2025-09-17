import { PermissionTitle } from "./permission-title";
import { PermissionType } from "./permission-type";

export class PermissionResponse {

    permissionId: string = '';
    title!: PermissionTitle;
    canDelete: boolean = false;
    canCreate: boolean = false;
    canUpdate: boolean = false;
    canRead: boolean = false;
}

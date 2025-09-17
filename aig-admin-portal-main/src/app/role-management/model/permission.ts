export interface Permission {
    id: number
    title: string; // enum string
    canRead: boolean;
    canCreate: boolean;
    canDelete: boolean;
    canUpdate: boolean;
    selected: boolean
}   
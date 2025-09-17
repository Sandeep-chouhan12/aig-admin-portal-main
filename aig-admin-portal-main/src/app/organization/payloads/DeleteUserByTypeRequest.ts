export class DeleteUserByTypeRequest
{
    organizationId: string = '';


    userType!: UserType;
}

export enum UserType {
    GOVERNMENT = 'GOVERNMENT',
    PRIVATE = 'PRIVATE'
}

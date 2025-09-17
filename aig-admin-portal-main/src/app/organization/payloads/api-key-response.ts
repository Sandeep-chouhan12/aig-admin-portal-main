export class ApiKeyResponse {
    apiKey: string = '';
    description: string = '';
    lastSevenDaysRequests: number = 0
    todayRequests: number = 0;
    createdDate!: Date
    id: number = 0;
    projectName: string = '';
    updatedDate!: Date;
}

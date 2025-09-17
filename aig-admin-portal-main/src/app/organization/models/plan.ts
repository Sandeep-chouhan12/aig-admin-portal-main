export class Plan {
    id!: number
    planName: string = '';
    description: string = '';
    amount!: number
    totalRequests!: number
     expanded: boolean=false;
}

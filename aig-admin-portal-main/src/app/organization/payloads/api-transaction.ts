export class ApiTransaction {
    userId: number = 0;
    planName: string = '';
    txnId: string = '';
    originalTxnId: string = '';
    amount: number = 0;
    requests: number = 0;
    trxnRef: string = '';
    description: string = '';
    date!:Date

}

import { ColumnConfig } from "src/app/shared/models/column-config";

export class EmerencyRequests {
 emergencyServiceName='';
 emergencyServiceImage='';
 address='';
 requestedDate='';
}

export const emergencyTabCol: ColumnConfig[] = [
    {
      name: 'emergencyServiceImage',
      label: 'Emergency',
      type:'image'
    },
    {
      name: 'emergencyServiceName',
      label: 'Emergency Name',
    },
    {
      name: 'address',
      label: 'Address',
    },
    {
      name: 'requestedDate',
      label: 'Emergency Date & Time',
      type:'date'
    },
  ];
  
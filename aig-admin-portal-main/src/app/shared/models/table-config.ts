import { ModalConfig } from "./modal-config";

export class TableConfig {
  tableHeader!: string; // Table Header

  // On Header displaying Add button, Filter Table button and Table Rows Delete button
  isAdd?: boolean; // Master Screen Add Button

  isDropdown?: boolean; // Master Screen Dropdown Button
  // for dropdown data
  dropdownData?: any[] = [];

  isProfileIcon?: boolean; // for show profile Icon
  profileKey?: string;

  isAddressTypeIcon?: boolean; // for show addrss type Icon
  addressIconKey?: string;

  withPagination?: boolean;

  scroll?: { isScroll?: boolean; class?: string };

  rowActions?: { edit?: boolean; delete?: boolean; view?: boolean }; // In Row Actions Buttons

  rowStatus?: { toggleBtn?: boolean; label?: boolean }; // In Row Status Buttons

}

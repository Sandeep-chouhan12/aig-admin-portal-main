export class ComponentsRoutes {

  /*** Auth ***/
  public static LOGIN = '';

  /*** Base Admin Route ***/
  public static ADMIN_HOME = 'Admin';
  public static NOTIFICATIONS = 'Notifications';

  /*** Dashboard ***/
  public static DASHBOARD = 'Dashboard';

  /*****************************************************************************************
   * USERS
   *****************************************************************************************/
  public static USERS = 'Users';

  // Without Base URL
  public static USER_LIST = 'user-list';
  public static USER_TRANSACTION = 'user-transaction';
  public static USER_ADDRESS = 'user-address';
  public static USER_ANALYTICS = 'user-analytics';
  public static USER_DETAILS = 'user-details';
  public static ADDRESS_DETAILS = 'address-details';

  // With Base URL
  public static USER_LIST_BASE = this.USERS + '/' + this.USER_LIST;
  public static USER_TRANSACTION_BASE = this.USERS + '/' + this.USER_TRANSACTION;
  public static USER_ADDRESS_BASE = this.USERS + '/' + this.USER_ADDRESS;
  public static USER_ANALYTICS_BASE = this.USERS + '/' + this.USER_ANALYTICS;
  public static USER_DETAILS_BASE = this.USERS + '/' + this.USER_DETAILS;
  public static ADDRESS_DETAILS_BASE = this.USERS + '/' + this.ADDRESS_DETAILS;

  /*****************************************************************************************
   * VERIFICATION OFFICER
   *****************************************************************************************/
  public static VERIFICATION_OFFICER = 'Verification-Officer';

  // Without Base URL
  public static VERIFICATION_OFFICER_LIST = 'officer-list';
  public static VERI_OFFI_ADDRESS_VERIFICATION_REQ = 'address-verification-requests';
  public static VERI_OFFI_DETAILS = 'officer-details';
  public static VERI_OFFI_ANALYTICS = 'analytics';

  // With Base URL
  public static VERIFICATION_OFFICER_LIST_BASE = this.VERIFICATION_OFFICER + '/' + this.VERIFICATION_OFFICER_LIST;
  public static VERI_OFFI_ADDRESS_VERIFICATION_REQ_BASE = this.VERIFICATION_OFFICER + '/' + this.VERI_OFFI_ADDRESS_VERIFICATION_REQ;
  public static VERI_OFFI_DETAILS_BASE = this.VERIFICATION_OFFICER + '/' + this.VERI_OFFI_DETAILS;
  public static VERI_OFFI_ANALYTICS_BASE = this.VERIFICATION_OFFICER + '/' + this.VERI_OFFI_ANALYTICS;

  /*****************************************************************************************
   * VERIFICATION PORTAL
   *****************************************************************************************/
  public static VERIFICATION_PORTAL = 'Verification-Portal';

  /*****************************************************************************************
   * EMERGENCY
   *****************************************************************************************/
  public static EMERGENCY = 'Emergency';

  // Without Base URL
  public static EMERGENCY_REQUESTS = 'emergency-requests';
  public static LIST_OF_EMERGENCY_OPERATORS = 'emergency-operators';
  public static OPERATOR_DETAILS = 'operator-details';

  // With Base URL
  public static EMERGENCY_REQUESTS_BASE = this.EMERGENCY + '/' + this.EMERGENCY_REQUESTS;
  public static LIST_OF_EMERGENCY_OPERATORS_BASE = this.EMERGENCY + '/' + this.LIST_OF_EMERGENCY_OPERATORS;

  /*****************************************************************************************
   * ORGANIZATION
   *****************************************************************************************/
  public static ORGANIZATION = 'Organization';
  public static REPRESENTATIVE_DETAILS = 'representative-details';
  public static REPRESENTATIVE_DETAILS_BASE = this.ORGANIZATION + '/' + this.REPRESENTATIVE_DETAILS;

  // Org Details
  static ORGANIZATION_DETAILS = 'OrganizationDetails';
  public static ORGANIZATION_DETAILS_BASE = '/' + this.ADMIN_HOME + '/' + this.ORGANIZATION + '/' + this.ORGANIZATION_DETAILS;

  static PRIVATE_ORGANIZATION_DETAILS = 'privateOrganizationDetails';

  // Create / Update Org
  static ADD_PRIVATE_ORGANIZATION = 'addPrivateOrganization';
  static UPDATE_PRIVATE_ORGANIZATION = 'updatePrivateOrganization';
  static ADD_GOVERNMENT_ORGANIZATION = 'addGovernmentOrganization';
  static UPDATE_GOVERNMENT_ORGANIZATION = 'updateGovernmentOrganization';

  public static ADD_PRIVATE_ORGANIZATION_BASE = '/' + this.ADMIN_HOME + '/' + this.ORGANIZATION + '/' + this.ADD_PRIVATE_ORGANIZATION;
  public static UPDATE_PRIVATE_ORGANIZATION_BASE = '/' + this.ADMIN_HOME + '/' + this.ORGANIZATION + '/' + this.UPDATE_PRIVATE_ORGANIZATION;
  public static ADD_GOVERNMENT_ORGANIZATION_BASE = '/' + this.ADMIN_HOME + '/' + this.ORGANIZATION + '/' + this.ADD_GOVERNMENT_ORGANIZATION;
  public static UPDATE_GOVERNMENT_ORGANIZATION_BASE = '/' + this.ADMIN_HOME + '/' + this.ORGANIZATION + '/' + this.UPDATE_GOVERNMENT_ORGANIZATION;

  /*****************************************************************************************
   * ROLE MANAGEMENT
   *****************************************************************************************/
  static ROLE_MANAGEMENT = 'Role-Management';
  static ROLE_LIST = 'role-list';
  static SUB_ADMIN_LIST = 'sub-admin-list';
  static ROLE_PRIVILIGES = 'privileges';

  public static ROLE_LIST_BASE = this.ROLE_MANAGEMENT + '/' + this.ROLE_LIST;
  public static SUB_ADMIN_LIST_BASE = this.ROLE_MANAGEMENT + '/' + this.SUB_ADMIN_LIST;
  static ROLE_PRIVILGES_BASE_ROUTE = '/' + this.ADMIN_HOME + '/' + this.ROLE_MANAGEMENT + '/' + this.ROLE_PRIVILIGES;

  /*****************************************************************************************
   * CONFIGURATION
   *****************************************************************************************/
  static CONFIGURATOIN = 'Configuration';
  static CONFIG_BASE_ROUTE = this.CONFIGURATOIN;

  public static ADDRESS_TYPE = 'address-type';
  public static GENERAL_SUGGESTION = 'general-suggestion';
  public static AVATAR = 'avatar';
  public static TERMS_AND_CONDITIONS = 'terms-conditions';
  public static PRIVACY_POLICY = 'privacy-policy';

  public static ADDRESS_TYPE_BASE = this.CONFIG_BASE_ROUTE + '/' + this.ADDRESS_TYPE;
  public static GENERAL_SUGGESTION_BASE = this.CONFIG_BASE_ROUTE + '/' + this.GENERAL_SUGGESTION;
  public static AVATAR_BASE = this.CONFIG_BASE_ROUTE + '/' + this.AVATAR;
  public static TERMS_AND_CONDITIONS_BASE = this.CONFIG_BASE_ROUTE + '/' + this.TERMS_AND_CONDITIONS;
  public static PRIVACY_POLICY_BASE = this.CONFIG_BASE_ROUTE + '/' + this.PRIVACY_POLICY;

  // FAQ
  static FAQ = 'faq';
  static ADD_FAQ = 'add-faq';
  static FAQ_BASE_ROUTE =  this.CONFIG_BASE_ROUTE + '/' + this.FAQ;
  static ADD_FAQ_BASE_ROUTE = '/Admin/' + this.CONFIG_BASE_ROUTE + '/' + this.ADD_FAQ;

  /*****************************************************************************************
   * API DOCUMENTATION OR OGRANIZATION  
   *****************************************************************************************/
  public static API_DOCUMENTATION = 'Organization';

  // Without Base URL
  public static API_DOC_USERS = 'users';
  public static API_DOC_PARTNERS = 'partners';
  public static API_DOC_PLANS = 'plans';
  public static API_DOC_ANALYTICS = 'analytics';
  public static API_DOC_USERS_DETAILS = 'api-user-details';
  public static API_DOC_SUPPORT = 'support';
  public static API_DOC_FAQ = 'faq';

  // With Base URL
  public static API_DOC_USERS_BASE = this.API_DOCUMENTATION + '/' + this.API_DOC_USERS;
  public static API_DOC_PARTNERS_BASE = this.API_DOCUMENTATION + '/' + this.API_DOC_PARTNERS;
  public static API_DOC_PLANS_BASE = this.API_DOCUMENTATION + '/' + this.API_DOC_PLANS;
  public static API_DOC_ANALYTICS_BASE = this.API_DOCUMENTATION + '/' + this.API_DOC_ANALYTICS;
  public static API_DOC_SUPPORT_BASE = this.API_DOCUMENTATION + '/' + this.API_DOC_SUPPORT;
  public static API_DOC_FAQ_BASE = this.API_DOCUMENTATION + '/' + this.API_DOC_FAQ;
  public static API_DOC_USERS_DETAILS_BASE = this.ADMIN_HOME + '/' + this.API_DOCUMENTATION + '/' + this.API_DOC_USERS_DETAILS;

  public static ORGANIZATION_TERMS_AND_CONDITIONS = 'terms-conditions';
  public static ORGANIZATION_TERMS_AND_CONDITIONS_BASE = this.API_DOCUMENTATION + '/' + this.ORGANIZATION_TERMS_AND_CONDITIONS;

  public static ORGANIZATION_PRIVACY_POLICY = 'privacy-policy';
  public static ORGANIZATION_PRIVACY_POLICY_BASE = this.API_DOCUMENTATION + '/' + this.ORGANIZATION_PRIVACY_POLICY;

  /*****************************************************************************************
   * WILDCARD ROUTES
   *****************************************************************************************/
  public static NOT_FOUND_PAGE = 'not-Found';
  public static SOMETHING_WENT_WRONG = 'something-went-wrong';
}

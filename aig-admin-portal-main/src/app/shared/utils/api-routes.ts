import { environment } from "src/environments/environment"
import { PageRequest } from "../models/page-request";

export class ApiRoutes {

  public static BASE_URL = environment.hostUrl + '/admin';

  // AUTHENTICATION MODULE ROUTES
  public static ADMIN_LOGIN = this.BASE_URL + '/auth/login-web'
  public static GET_ADMIN = this.BASE_URL + '/auth'
  public static UPDATE_ADMIN = this.BASE_URL + '/auth'
  public static CHANGE_PASSWORD = this.BASE_URL + '/auth/changePassword-web'
  public static SEND_OTP_TO_EMAIL = this.BASE_URL + '/auth/sendOtpToEmail-web'
  public static VERIFY_OTP = this.BASE_URL + '/auth/verifyOtp-web'
  public static SET_NEW_PASSWORD = this.BASE_URL + '/auth/newPassword-web'

  // USERS MODULE ROUTES
  public static GET_ALL_USERS = this.BASE_URL + '/user/getAllUsers-web?status='
  public static UPDATE_USER_STATUS = this.BASE_URL + '/user/status-web'
  public static DELETE_USER = this.BASE_URL + '/user/deleteUser-web?userId='
  public static GET_ALL_TRANSACTION_OF_USER = this.BASE_URL + '/transaction/getTransactionOfUser-web?userId='
  public static GET_ALL_TRANSACTIONS = this.BASE_URL + '/transaction/getAllTransactionOfUser-web'
  public static GET_ALL_ADDRESSES = this.BASE_URL + '/address/getAllAddresses-web?status='
  public static DELETE_ADDRESSES = this.BASE_URL + '/address/deleteAddress-web?id='
  public static GET_ADDRESSES_OF_USER = this.BASE_URL + '/address/getAddressOfUser-web?userId='
  public static GET_ADDRESSES_VERIFICATION_OF_USER = this.BASE_URL + '/addressVerfications/getAddressVerificationOfUser-web?userId='
  public static GET_USER_DETAILS = this.BASE_URL + '/user/getUserDetails-web?userId='
  public static GET_ALL_EMERGENCY_REQUEST_OF_USER = this.BASE_URL + '/emergency/getEmergencyRequestsOfUser-web?userId='
  public static GET_ADDRESS_DETAILS = this.BASE_URL + '/address/getAddressDetails-web?id='
  public static GET_ADDRESS_VERIFICATION_DETAILS = this.BASE_URL + '/address/getAddressVerificationDetails-web?id='
  public static DELETE_VOICE_DIRECTION = this.BASE_URL + '/address/voiceDirections-web?uuid='
  public static DELETE_ROUTE_VIDEO = this.BASE_URL + '/address/routeVideos-web?uuid='
  public static UPDATE_ADDRESS = this.BASE_URL + '/address/updateAddress-web'
  public static GET_USER_ACQUITION = this.BASE_URL + '/user/userStatics-web?i='
  public static GET_ADDRESS_STATICS = this.BASE_URL + '/address/addressStatics-web?key='
  public static GET_VERIFICATION_REQUESTS = this.BASE_URL + "/addressVerfications/verificationRaisedRequestsStatics-web?key="


  // API_DOCUMENTATION MODULE ROUTES 
  public static GET_ALL_API_USERS = this.BASE_URL + '/users/getAllApiUsers-web?status='
  public static DELETE_API_USER = this.BASE_URL + '/users/deleteApiUser'
  public static CHANGE_USER_API_STATUS = this.BASE_URL + '/users/changeUserApiRequestStatus'
  public static GET_ALL_API_PARTNERS = this.BASE_URL + '/partners/getAllApiPartners'
  public static GET_ALL_PLANS = this.BASE_URL + '/plan/getAllPlans-web'
  public static DELETE_API_PLAN = this.BASE_URL + '/plan/deletePlan-web';
  public static UPDATE_PLAN = this.BASE_URL + '/plan/updatePlan-web';
  public static ADD_PLAN = this.BASE_URL + '/plan/createPlans-web';
  public static ADD_CUSTOM_PLAN = this.BASE_URL + '/plan/createCustomPlan-web';
  public static ADD_PARTNER = this.BASE_URL + '/partners/addPartner';
  public static DELETE_PARTNER = this.BASE_URL + '/partners/deleteParter';
  public static UPDATE_PARTNER = this.BASE_URL + '/partners/updatePartner';
  public static UPDATE_USER = this.BASE_URL + '/users/updateUser';
  public static GET_API_USER = this.BASE_URL + '/users/getApiUserById-web?id=';
  public static GET_USER_API_KEYS = this.BASE_URL + '/users/getUserApiKeys'
  public static GET_API_USER_TRANSACTION = this.BASE_URL + '/transaction/getAllTransactionOfApiUser-web';
  public static API_CALL_SUMMARY = this.BASE_URL + '/api-access/apiHistoryStatic-web?key=';
  public static API_USER_ACQUITION = this.BASE_URL + '/users/userStatic-web?key=';
  public static GET_FAQ = this.BASE_URL + '/api-documentation/faq';
  public static ADD_FAQ = this.BASE_URL + '/api-documentation/faq';
  public static UPDATE_FAQ = this.BASE_URL + '/api-documentation/faq';
  public static DELETE_FAQ = this.BASE_URL + '/api-documentation/faq?id=';
  public static GET_SUPPORT = this.BASE_URL + '/api-documentation/support/fetchSupportDetails-web'
  public static DELETE_SUPPORT = this.BASE_URL + '/api-documentation/support/deleteSupport-web?supportId='
  public static TOP_COLLABORATORS = this.BASE_URL + '/users/topCollaborators';
  static REGISTER_PRIVATE_ORGANIZATION: string = this.BASE_URL + '/users/completeRegistration-private-user';
  static REGISTER_GOVERNMENT_ORGANIZATION: string = this.BASE_URL + '/users/completeRegistration-goverment-user';
  static UPDATE_GOVERNMENT_ORGANIZATION: string = this.BASE_URL + '/users/update-goverment-user';
  static UPDATE_PRIVATE_ORGANIZATION: string = this.BASE_URL + '/users/update-private-organization';

  static GET_BUSINESS_TYPES = this.BASE_URL + '/users/' + 'getBusinessType-web';
  static GET_ALL_ORGANIZATION_USERS: string = this.BASE_URL + '/users/users';
  static CHANGE_STATUS_ORGANIZATION: string = this.BASE_URL + '/users/update-status';
  static DELETE_ORGANIZATION: string = this.BASE_URL + '/users/delete';
  static GET_ORGANIZATION_BY_TYPE: string = this.BASE_URL + '/users/user';
  static GET_GOVERNMENT_ORGANIZATION_DETAILS: string = this.BASE_URL + '/users/get-government-user-details';
  static GET_PRIVATE_ORGANIZATION_DETAILS: string = this.BASE_URL + '/users/get-private-user-details';
  static GET_ALL_ORGANIZATION_USERS_BY_ORGANIZATIONID: string = this.BASE_URL + '/users/organization-users-by-id';
  static ADD_ORGANIZATION_USER: string = this.BASE_URL + '/users/add-organization-users';
  static UPDATE_ORGANIZATION_USER: string = this.BASE_URL + '/users/update-organization';
  static GET_ALL_ROLES: string = this.BASE_URL + '/users/getAllRolesExcludeAdmin';
  // static GET_ALL_ROLES_A: string = this.BASE_URL + '/users/getAllRolesExcludeAdmin';
  static GET_API_KEYS_BY_ORGID: string = this.BASE_URL + '/users/getSubscription-web';
  static GET_ALL_TRANSACTION: string = this.BASE_URL + '/transaction/getAllTransactionOfApiUser-web';
  public static UPDATE_ORGANIZATION_USER_STATUS = this.BASE_URL + '/users/status-change'
  public static DELETE_ORGANIZATION_USER = this.BASE_URL + '/users/delete-user'
  public static GET_END_POINTS = this.BASE_URL + '/api-access/get-endpoints'
  public static ENABLE_END_POINTS = this.BASE_URL + '/api-access/enable-endpoints';
  public static CHANGE_USER_STATUS = this.BASE_URL + '/users/status-change'




  // EMERGENCY MODULE ROUTES
  public static GET_ALL_EMERGENCY_HISTORY = this.BASE_URL + '/emergency/emergencyRequestHistory-web?status=';
  public static DELET_EMERGENCY_HISTORY = this.BASE_URL + '/emergency/deleteEmergencyHistory-web?id=';
  public static GET_ALL_EMERGENCY_OPERATORS = this.BASE_URL + '/emergencyOfficer/getAllEmergencyOperators?status=';
  public static CHANGE_EMERGENCY_OPERATORS_ACTIVE_STATUS = this.BASE_URL + '/emergencyOfficer/changeEmergencyOperatorActiveStatus-web?id=';
  public static DELETE_EMERGENCY_OPERATORS = this.BASE_URL + '/emergencyOfficer/deleteEmergencyOperator-web?id=';
  // public static CREATE_EMERGENCY_OPERATORS = environment.hostUrl + '/emergency';
  public static GET_EMERGENCY_OPERATOR_BY_ID = this.BASE_URL + '/emergencyOfficer/getEmergencyOfficerById-web?id=';
  public static ADD_EMERGENCY_OPERATOR = this.BASE_URL + '/emergencyOfficer/addEmergencyOperator'
  public static UPDATE_EMERGENCY_OPERATOR = this.BASE_URL + '/emergencyOfficer/updateEmergencyOfficer-web';
  public static GET_TOTAL_EMERGENCY_OPERATOR_REQUEST = this.BASE_URL + '/emergency/getTotalEmergencyOperatorRequest-web'
  public static GET_TOTAL_EMERGENCY_OPERATOR_PENDING_REQUEST = this.BASE_URL + '/emergency/getTotalEmergencyOperatorPendingRequest-web'


  // VERIFICATION PORTAL OFFICERS 
  public static GET_ALL_VERIFICATION_PORTAL_OFFICERS = this.BASE_URL + '/portalOfficer/getAllVerificationPortalOfficers-web?status=';
  public static ADD_VERIFICATION_PORTAL_OFFICER = this.BASE_URL + '/portalOfficer/addVerificationpPortalOfficer-web';
  public static DELETE_VERIFICATION_PORTAL_OFFICER = this.BASE_URL + '/portalOfficer/deleteVerificationPortalOfficer-web?userId=';
  public static CHANGE_VERIFICATION_PORTAL_OFFICER_STATUS = this.BASE_URL + '/portalOfficer/changeVerificationPortalOfficerStatus-web?userId=';
  public static UPDATE_VERIFICATION_PORTAL_OFFICER = this.BASE_URL + '/portalOfficer/updateVerificationPortalOfficer-web';



  // VERIFICATION OFFICER MODULE ROUTES
  public static GET_ADDRESS_VERIFICATION_REQUESTS = this.BASE_URL + '/addressVerfications/getAddressVerifications-web?status=';
  public static GET_ALL_VERIFICATION_OFFICERS = this.BASE_URL + '/officer/getAllVerificationOfficers-web?status='
  public static UPDATE_VERI_OFFICER_STATUS = this.BASE_URL + '/officer/updateOfficerStatus-web'
  public static DELETE_OFFICER_BY_ID = this.BASE_URL + '/officer/deleteByOfficerId-web?officerId=';
  public static GET_STATES_NIGERIA = environment.hostUrl + "/address/getStatesOfNigeria-web";
  public static GET_LGA_INFO_BY_STATE = environment.hostUrl + "/address/getLgaInfo?stateId=";
  public static GET_COUNT_OF_ALL_REQUEST_WEB = this.BASE_URL + "/addressVerfications/getCountOfAllRequests-web";
  public static GET_VERIFICATION_STATISTICS_MONTHLY_AND_YEARLY = this.BASE_URL + '/addressVerfications/verificationRequestsStatics-web'
  public static ADD_ADDRESS_OFFICER = this.BASE_URL + '/officer/createVerificationOfficer';
  public static VERIFICATION_OFFICER_ACQUITION = this.BASE_URL + '/officer/officerStatic-web?key=';

  // DASHBOARD MODULE ROUTES
  public static GET_TOTAL_COUNT_OF_API_HITS = this.BASE_URL + '/api-access/getTotalNoOfHits-web'
  public static GET_TOP_VERI_OFFICERS = this.BASE_URL + '/officer/getTopVerificationOfficers-web'
  public static GET_VERIFICATION_OFFICER_BY_ID = this.BASE_URL + '/officer/getVerificationOfficerById-web?officerId='
  public static GET_ADDRESS_VERI_REQ_BY_OFFICER = this.BASE_URL + '/addressVerfications/getAddressVerificationRequestsByAssignOfficer-web?status='
  public static GET_PENDING_AND_VERIFIED_ADDRESS_STATISC = this.BASE_URL + '/addressVerfications/addressPendingAndVerifiedStatics-web'

  public static GET_TOTAL_USERS_COUNT = this.BASE_URL + '/auth/usersCount-web'
  public static GET_VERIFICATION_STATISTICS = this.BASE_URL + '/addressVerfications/verificationRequestsStatics-web?month='



  // admin notification routes
  public static GET_ALL_ADMIN_NOTIFICATIONS = this.BASE_URL + '/notification' + '/alladminNotification-web'
  public static DELETE_ADMIN_NOTIFICATION = this.BASE_URL + '/notification' + '/adminNotification-web?notificationId='
  public static ADD_ADMIN_NOTIFICATION = this.BASE_URL + '/notification' + '/adminNotification-web'

  public static GET_ALL_TRANSACTION_COUNT = this.BASE_URL + '/transaction/monthly-transaction';
  public static GET_API_REQUEST_ANALYTICS = this.BASE_URL + "/users/get-api-requests-analytics-admin";


  public static GET_OVERALL_API_REQUEST_ANALYTICS = this.BASE_URL + "/users/get-over-all-api-requests-analytics";



  ///   http://localhost:9090/admin/transaction/generate-pdf
  static GENERATE_INVOICE_PDF = this.BASE_URL + '/transaction/generate-pdf';

  static addressTypeBase = environment.hostUrl + '/addressType';
  static ADD_ADDRESS_TYPE = this.addressTypeBase
  static GET_ALL_ADDRESS_TYPES = this.addressTypeBase + '/get-address-types-with-pagination'
  static DELETE_ADDRESS_TYPE = this.addressTypeBase
  static UPDATE_ADDRESS_TYPE = this.addressTypeBase


  static ADDRESS_BASE = this.BASE_URL + '/address';
  static GET_ALL_GENERAL_SUGGESTION = this.ADDRESS_BASE + '/get-general-suggestion-web'
  static ADD_GENERAL_SUGGESTION = this.ADDRESS_BASE + '/add-general-suggestion'
  static UPDATE_GENERAL_SUGGESTION = this.ADDRESS_BASE + '/update-general-suggestion'
  static DELETE_GENERAL_SUGGESTION = this.ADDRESS_BASE + '/delete-general-suggestion'
  static UPDATE_GENERAL_SUGGESTION_STATUS = this.ADDRESS_BASE + '/update-general-suggestion-status';


  static AUTH_BASE = this.BASE_URL + '/user';
  static GET_ALL_AVATAR = `${this.AUTH_BASE}/user-Avatars-web`;
  static ADD_AVATAR = `${this.AUTH_BASE}/user-Avatar`;
  static UPDATE_AVATAR = `${this.AUTH_BASE}/user-Avatar`;
  static DELETE_AVATAR = `${this.AUTH_BASE}/user-Avatar`;
  static TOGGLE_AVATAR_STATUS = `${this.AUTH_BASE}/user-Avatar/status`;



  // configuration module routes
  // terms and conditoins 
  public static GET_TERMS_AND_POLICY = this.BASE_URL + '/helpContent/get-terms-and-privacy-content';
  public static ADD_TERMS_AND_POLICY = this.BASE_URL + '/helpContent/add-terms-and-privacy-content';
  public static UPDATE_TERMS_AND_POLICY = this.BASE_URL + '/helpContent/update-terms-and-privacy-content';

  //organization module rotes
  // terms and conditoins
  public static ORGANIZATION_GET_TERMS_AND_POLICY = this.BASE_URL + '/organization/helpContent/get-terms-and-privacy-content';
  public static ORGANIZATION_ADD_TERMS_AND_POLICY = this.BASE_URL + '/organization/helpContent/add-terms-and-privacy-content';
  public static ORGANIZATION_UPDATE_TERMS_AND_POLICY = this.BASE_URL + '/organization/helpContent/update-terms-and-privacy-content';

  // admin faq

  static UPDATE_ADMIN_FAQ = this.BASE_URL + '/faq'
  static ADD_ADMIN_FAQ = this.BASE_URL + '/faq'
  static GET_ADMIN_FAQ = this.BASE_URL + '/faq/get-by-faq-id'

  static GET_FAQS_BY_USER_TYPE = this.BASE_URL + '/faq'
  static GET_ALL_FAQS_PAGINATED = this.BASE_URL + '/faq/get-all-faq'
  static GET_ADMIN_FAQS_BY_USER_TYPE = this.BASE_URL + '/faq'
  static DELETE_ADMIN_FAQ = this.BASE_URL + '/faq'
  static UPDATE_ADMIN_FAQ_STATUS = this.BASE_URL + '/faq/update-status'

  // chnage  url's
  public static ROLE_ROUTE = '/roles'
  public static GET_ALL_ROLE = this.BASE_URL + this.ROLE_ROUTE + '/api/v1/roles'
  public static GET_ROLE = this.BASE_URL + this.ROLE_ROUTE + '/api/v1/role-id'
  public static UPDATE_ROLE_PERMISSION = this.BASE_URL + this.ROLE_ROUTE + '/api/v1/update-permissions'
  static HASH_PERMISSION = this.BASE_URL + this.ROLE_ROUTE + '/hasPermission'

  // static FETCH_ROLES = this.BASE_URL + this.ROLE_ROUTE + '/api/v1/roles'
  // static GET_ALL_PERMISSIONS = this.BASE_URL + this.ROLE_ROUTE + '/api/v1/permissions'
  static GET_PERMISSIONS_BY_ROLE_ID = this.BASE_URL + this.ROLE_ROUTE + '/'
}

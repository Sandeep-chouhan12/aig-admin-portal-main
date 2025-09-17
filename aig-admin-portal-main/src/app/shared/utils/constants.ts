export class Constants {

    //SIDE BAR TITLE NAMES 
    public static DASHBOARD: string = 'Dashboard';
    public static USERS: string = 'Users';
    public static VERIFICATION_OFFICER: string = 'Verification Officer';
    public static VERIFICATION_PORTAL: string = 'Verification Portal';
    public static EMERGENCY: string = 'Emergency';
    // public static API_DOCUMENTATION: string = 'API Documentation';
    public static ORGANIZATION: string = 'Organization';
    public static ROLE_MANAGEMENT = 'Role Management'



    // VALIDATION MESSGES
    public static INVALID_EMAIL = 'Please enter valid email.';
    public static INVALID_PHONE_NUMBER = 'Please enter valid phone number.';

    public static INVALID_FIELD = "Field can't be empty.";
    public static PASSWORD_NOT_MATCHED = "Password doesn't match.";
    public static OTP_REQUIRED = "OTP required.";
    public static INVALID_NAME = "Name is invalid. only alphabets are allowed."
    public static INVALID_USER_NAME = "Username is invalid."
    public static MINIMUM_CHARACTER_REQUIRED = 3;
    public static MINIMUM_NAME_CHARACTER_REQUIRED = 'Minimum ' + this.MINIMUM_CHARACTER_REQUIRED + 'required.';
    public static INVALID_PASSWORD_LENGTH = "Password must be at least 8 characters long."
    public static NO_IMAGE_SELECTED = 'Image is required.'
    public static INVALID_FIELD_FORMAT = "Field is invalid.";


    // error messages
    public static NO_INTERNET_CONNECTION_ERROR = 'No Internet Connection.'
    public static UNAUTHORIZED_ERROR = 'Session Expired.'
    public static INTERNAL_SERVER_ERROR = 'Internal Server Error.'
    public static SERVER_DOWN = 'Something went wrong.'

    public static MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "Septembar", "October", "November",
        "December"]

    public static SIDE_BAR_ID = {
        dashboard: 'dashbaord',
        users: 'Users',
        verification_officer: 'Verification-Officer',
        verification_portal: 'Verification-Portal',
        emergency: 'Emergency',
        // api_documentation: 'Api-Documentation',
        Organization: 'Organization',
        Configuration: 'configuration',
        FAQ: 'faq',
        role_management: 'Role-Management'
    };
    static FAQ: 'faq'

    public static CONFIGURATIONS: 'CONFIGURATIONS'



    //NO DATA FOUND MESSAGES //

    public static NO_VERIFICATION_OFFICER_YET = "No Verification Officers Yet";
    public static NO_OPERATORS_YET = "No Operators Yet";
    public static NOT_EMERGENCY_REQUEST = "No Emergency Services History";
    public static NO_VERIFICATION_PORTAL_OFFICERS = "No Verification Portal Officers Yet";
    public static NOT_USERS_YET = "No Users Yet";
    public static NO_SUPPORT_YET = "No Support Yet";
    public static NO_PLAN_YET = "No Plans Yet";
    public static NOT_PARTNERS_YET = "No Partners Yet";
    public static NOT_FAQS_YET = "No FAQ's Yet";
    public static NO_TRANSACTION_AVAILABLE = "No Transactions Available";
    public static NO_API_KEYS_AVAILABLE = "No Api Keys Available";
    public static NO_ROLES_AVAILABLE = "No Roles Available";
    public static NO_PERMISSIONS_AVAILABLE = "No Permissions Available";
    public static NO_ORGANIZATIONS_YET = "No Organizations Yet";

}

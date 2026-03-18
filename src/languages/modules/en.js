export default {
  global: {
    add: "Add",
    create: "Create",
    edit: "Edit",
    view: "View",
    query: "Search",
    query2: "Query",
    reset: "Reset",
    filters: "Filter",
    delete: "Delete",
    deleteBatch: "Batch Delete",
    refresh: "Refresh",
    detail: "Details",
    save: "Save",
    complete: "Complete",
    confirm: "Confirm",
    submit: "Submit",
    cancel: "Cancel",
    back: "Back",
    close: "Close",
    stop: "Stop",
    operation: "Actions",
    createTime: "Created At",
    updateTime: "Updated At",
    download: "Download",
    selected: "Selected",
    tips: "Tips",
    notice: "Notice",
    warning: "Warning",
    prev: "Previous",
    next: "Next",
    toDelete: "Delete",

    all: "All",
    org: "Organization",
    user: "User",
    customer: "Owner",
    orgUser: "Organization User",
    orgCustomer: "Organization Owner",

    placeholderInput: "Enter",
    placeholderSelect: "Select",
    placeholderUpload: "Upload",
    limit200: "Cannot exceed 200 characters",
    limit600: "Cannot exceed 600 characters",

    success: "Success",
    error: "Error",
    removeConfirm: "Are you sure you want to delete?",
    addSuccess: "Added successfully",
    addSuccess2: "Created successfully",
    querySuccess: "Query successful",
    editSuccess: "Edited successfully",
    editSuccess2: "Updated successfully",
    deleteSuccess: "Deleted successfully",
    operationSuccess: "Operation successful",

    notifyTitle: "Prompt",
    empty: "No data",
    empty2: "No records found",
    yes: "Yes",
    no: "No",
    is: "Confirm",
    to: "To",
    year: "Year",
    month: "Month",
    week: "Week",
    day: "Day",
    startTime: "Start Time",
    endTime: "End Time",

    checkRequired: "Please check the submitted form items",

    items: " items",
    total: "Total",
    total2: "Total",
    unit: "Unit",
    number: "Quantity",

    commonTitle: {
      deviceType: "Device Type",
      selectFile: "Select File",
      power: "Power",
      energy: "Energy",
      batchSetting: "Batch Settings"
    }
  },
  hooks: {
    copySuccess: "Copied successfully",
    waitMessage: "If the data is large, the download may be slow. Please be patient!",
    changePrimary: "Theme color has been reset to",
    errorHandler: {
      InternalError: "Internal Javascript engine error",
      ReferenceError: "Object not found",
      TypeError: "Incorrect type or object used",
      RangeError: "Parameter out of range when using built-in object",
      SyntaxError: "Syntax error",
      EvalError: "Incorrect use of Eval",
      URIError: "URI error",
      unknown: "Unknown error",
      undefined: "Undefined",
      CanceledError: "Request cancelled"
    },
    validate: {
      phone: {
        empty: "Enter your phone number",
        invalid: "Enter a valid phone number"
      }
    },
    color: {
      invalidHex: "Invalid hex value entered",
      invalidRgb: "Invalid RGB color value entered",
      invalidHexColor: "Invalid hex color value entered"
    }
  },
  dict: {
    gender: {
      male: "Male",
      female: "Female"
    },
    userStatus: {
      enabled: "Enabled",
      disabled: "Disabled"
    },
    showSubordinateUsers: {
      show: "Show Subordinate Users",
      hide: "Hide Subordinate Users"
    },
    snDeviceStatus: {
      unused: "Not Installed",
      using: "Installed"
    },
    stationType: {
      home: "Home Plant",
      enterprise: "Enterprise Plant",
      professional: "Large Professional Plant"
    },
    stationStatus: {
      normal: "Normal",
      offline: "Offline",
      online: "Online",
      building: "Unfinished",
      alarm: "Alarm",
      noWarning: "No Alarm"
    },
    deviceType: {
      gateway: "EVB",
      inverter: "EVT"
    }
  },
  routers: {
    login: "Login",
    home: "Home",
    403: "403 Page",
    404: "404 Page",
    500: "500 Page",
    noPermission: "No Access Permission",
    noPermissionMessage: "Your account lacks menu permissions. Please contact the system administrator!",
    timeout: "Request timeout! Please try again later.",
    NetworkError: "Network error! Please try again later.",
    NoneFile: "File cannot be empty",
    dataOverview: "Overview",
    customerHome: "Owner Home",
    // Station Management
    stationList: "Plant List",
    stationCreate: "Create Plant",
    stationDetail: "Plant Details",
    stationDetailSetting: "Plant Settings",
    // Device Management
    deviceManagement: "Device Management",
    deviceList: "Device List",
    deviceDetail: "Device Details",
    warningList: "Alarm List",
    dataReport: "Data Reports",
    gridFileManagement: "Grid File Management",
    warrantyManagement: "Warranty Management",
    adminControl: "Admin Control",
    deviceUpgrade: "Device Upgrade",
    // SN Management
    snManagement: "SN Management",
    // Account Management
    accountManagement: "Account Management",
    organizationManagement: "Organization Management",
    userManagement: "User Management",
    ownerManagement: "Owner Management",
    // Operation Records
    operationRecord: "Operation Log",
    replacementRecord: "Replacement History",
    remoteControlHistory: "Remote Control History",
    // Resource Management
    resourceManagement: "Resource Management",
    // Other Functional Pages
    helpDocument: "Help Docs",
    feedback: "Feedback",
    feedbackList: "Feedback History",
    messageNotification: "Notifications",
    messageNotificationAdd: "Send Notification",
    userInfo: "Account Info",
    homeScreen: "Dashboard",

    //public
    WarrantyQuery: "Warranty Query",
    WarrantyRegister: "Warranty Registration",
    PrivacyPolicy: "Privacy Policy",
    Register: "Create Account",
    ForgotPassword: "Forgot Password"
  },
  layouts: {
    tabs: {
      refresh: "Refresh",
      maximize: "Maximize",
      closeCurrent: "Close",
      closeLeft: "Close Left",
      closeRight: "Close Right",
      closeOther: "Close Others",
      closeAll: "Close All"
    },
    header: {
      componentSize: "Component Size",
      language: "Language",
      theme: "Theme",
      layoutConfig: "Layout Settings",
      primary: "Primary",
      darkMode: "Dark Mode",
      greyMode: "Grey Mode",
      weakMode: "Weak Mode",
      fullScreen: "Full Screen",
      exitFullScreen: "Exit Full Screen",
      personalData: "Account Info",
      changePassword: "Change Password",
      logout: "Logout",
      collapse: "Collapse Menu",
      expand: "Expand Menu",
      search: "Search Menu",
      default: "Default",
      large: "Large",
      small: "Small",
      message: "Messages",
      notification: "Notifications",
      logoutConfirm: "Exit current account?",
      logoutSuccess: "Logged out successfully!",
      tip: "Prompt",
      confirm: "Confirm",
      cancel: "Cancel",
      screenUnsupported: "Fullscreen is not supported by your browser",
      searchMenuPlaceholder: "Menu Search: supports menu name, path",
      noMenu: "No menus found",
      personalInfo: "Personal Info",
      accountInfo: "Account Details",
      loginAccount: "Login Account",
      role: "Role",
      lastLoginTime: "Last Login",
      accountStatus: "Account Status",
      normal: "Normal",
      disabled: "Disabled",
      noRecord: "No Record",
      userInfo: "User Information",
      username: "Username",
      phoneNumber: "Phone Number",
      email: "Email",
      organization: "Organization",
      avatarLoadFailed: "Failed to load avatar",
      passwordDialogTitle: "Change Password",
      oldPassword: "Old Password",
      newPassword: "New Password",
      confirmPassword: "Confirm Password",
      pleaseInputOldPassword: "Enter old password",
      pleaseInputNewPassword: "Enter new password",
      pleaseConfirmPassword: "Confirm new password",
      passwordStrength: "Password Strength",
      weak: "Weak",
      medium: "Medium",
      strong: "Strong",
      passwordRequired: "Enter password",
      confirmPasswordRequired: "Confirm password",
      passwordNotMatch: "Passwords do not match",
      oldPasswordRequired: "Enter old password",
      passwordMinLength: "Password must be between 6 and 16 characters",
      passwordTooWeak: "Password strength is too weak. Please use a more complex password.",
      passwordChangeSuccess: "Password changed successfully"
    },
    themeDrawer: {
      title: "Layout Settings",
      layoutStyle: "Layout Style",
      layoutVertical: "Vertical",
      layoutClassic: "Classic",
      layoutTransverse: "Horizontal",
      layoutColumns: "Columns",
      sidebarInverted: "Inverted Sidebar",
      sidebarInvertedTooltip: "Make sidebar colors darker",
      headerInverted: "Inverted Header",
      headerInvertedTooltip: "Make header colors darker",
      globalTheme: "Global Theme",
      themeColor: "Theme Color",
      darkMode: "Dark Mode",
      greyMode: "Grey Mode",
      weakMode: "Weak Mode",
      interfaceSettings: "Interface Settings",
      menuCollapse: "Collapse Menu",
      menuAccordion: "Menu Accordion",
      watermark: "Watermark",
      breadcrumb: "Breadcrumbs",
      breadcrumbIcon: "Breadcrumb Icons",
      tabs: "Tabs",
      tabsIcon: "Tab Icons",
      footer: "Footer"
    },
    menu: {
      common: "General",
      admin: "Admin",
      personalInfo: "Personal Info",
      notify: "Send Notification",
      language: "Language"
    }
  },
  components: {
    ErrorMessage: {
      pageNotFound: "Sorry, the page you are looking for does not exist~",
      permissionDenied: "Sorry, you do not have permission to access this page~",
      networkError: "Sorry, your network is unreachable~",
      goBack: "Go Back"
    },
    ImportExcel: {
      title: "Batch Add",
      templateDownload: "Download Template",
      downloadTemp: "Click to download",
      fileUpload: "File Upload ",
      dragUpload: "Drag file here, or",
      clickUpload: "click to upload",
      uploadTip: "Upload a standard .xls or .xlsx file. Max file size: ",
      uploadTip2: "Uploaded file must be in .xls / .xlsx format!",
      uploadTip3: "Uploaded file size cannot exceed ",
      uploadTip4: "You can only upload one file!",
      uploadTip5: "Upload a standard .xls or .xlsx file",
      uploadError: " failed. Please upload again!",
      uploadSuccess: " succeeded!",
      uploadSuccess2: "Upload successful!"
    },
    ProTable: {
      refresh: "Refresh",
      search: "Toggle Search",
      switchGraph: "Toggle Graph"
    },
    SearchForm: {
      search: "Search",
      reset: "Reset",
      unfold: "Expand",
      fold: "Collapse"
    },
    TreeFilter: {
      search: "Enter keywords to filter",
      all: "All",
      expandAll: "Expand All",
      collapseAll: "Collapse All"
    },
    Upload: {
      edit: "Edit",
      preview: "Preview",
      delete: "Delete",
      invalidType: "The uploaded image format is not supported!",
      limitTip: "Image size cannot exceed ",
      uploadSuccess: "Image uploaded successfully",
      uploadError: "Image upload failed. Please try again."
    }
  },
  feedback: {
    title: "Feedback Details",
    viewHistory: "View Feedback History",
    addFeedback: "Add Feedback Record",
    subject: "Feedback Title",
    description: "Feedback Content",
    descriptionPlaceholder: "Enter a description of at least 10 characters for better service.",
    upload: "Upload Image",
    images: "Images",
    uploadTip: "Optional, max 2 images",
    contactEmail: "Contact Email",
    min10: "Enter at least 10 characters",
    submitSuccess: "Submitted successfully",
    table: {
      createTime: "Feedback Time",
      subject: "Feedback Title",
      sender: "Sender",
      content: "Content",
      email: "Contact Email",
      images: "Images"
    }
  },
  notification: {
    title: "Edit Message",
    detail: "Notification Details",
    viewHistory: "Message History",
    sendTime: "Send Time (UTC)",
    assignUser: "Assign to Users",
    assignRole: "Assign to Roles",
    chooseUser: "Select Users",
    chooseRole: "Select Roles",
    addUser: "Add User",
    addRole: "Add Role",
    users: "Users",
    receiveUser: "Recipient",
    selectLanguages: "Sending language",
    zhTitle: "Chinese Title",
    zhContent: "Chinese Content",
    enTitle: "English Title",
    enContent: "English Content",
    subject: "Title",
    placeholderSubject: "Enter title",
    description: "Content",
    descriptionPlaceholder: "Enter content",
    upload: "Upload Image",
    images: "Images",
    uploadTip: "Optional, max 2 images",
    contactEmail: "Contact Email",
    min10: "Enter at least 10 characters",
    submitSuccess: "Submitted successfully",
    sendStartPlaceholder: "Send Start Time",
    sendEndPlaceholder: "Send End Time",
    sendTimeLimit: "Send time cannot be earlier than the current time",
    userRequired: "Select at least one user",
    roleRequired: "Select at least one role",
    isread: "Message Status",
    read: "Read",
    unread: "Unread",
    allRead: "Mark All as Read",
    allReadConfirm: "Are you sure you want to mark all messages as read?"
  },
  group: {
    parentOrg: "Parent Organization",
    orgName: "Organization Name",
    orgType: "Organization Type",
    country: "Country",
    province: "Region/State",
    city: "City",
    contactor: "Contact Person",
    tel: "Contact Number",
    address: "Address",
    logo: "Organization Logo",
    summary: "Organization Description",
    migration: "Transfer Organization",
    currentLevel: "Current Organization",
    currentTopLevel: "Parent Organization",
    newTopLevel: "New Parent Organization",

    orgDetail: "Organization Details",
    userNumber: "Number of Organization Users",
    ownerNumber: "Number of Owners",
    total: "Number of Plant",
    capacitor: "Number of Capacity",

    orgList: "Organization List",
    loginAccount: "Login Account",
    userName: "Username",
    name: "Full Name",
    email: "Email",
    subordinateUsers: "Subordinate Users",
    pleaseSelectOrg: "Select an organization first",
    password: "Login Password",
    defaultRole: "Default Role",
    extRole: "Extended Role",

    userDetail: "User Details",
    userSource: "User Source",
    userType: "User Type",
    parentOrgName: "Organization",
    stationCount: "Plant Created",
    resetPassword: "Reset Password",
    newPassword: "New Password",
    generatingPassword: "Generating password...",
    regenerate: "Regenerate",
    copy: "Copy",
    resetPasswordTip1: "Are you sure you want to reset the password for user ",
    resetPasswordTip2: " to: ",
    resetPasswordTip3: 'After clicking "Confirm", this password will be activated and copied to your clipboard.',

    copySuccess: "Copied successfully",
    generatePasswordFailed: "Failed to generate password",
    pleaseGeneratePassword: "Generate a password first",
    resetPasswordSuccess: "Password reset successfully",
    passwordNotice: "Inform the user of the new password. They can change it after logging in.",
    migrationTip:
      "After the transfer, this organization and all its substations, plants, and owners will be moved under the new parent organization. Please proceed with caution!",
    placeholder: {
      groupName: "Enter organization name",
      username: "Enter username",
      email: "Enter email"
    },
    rules: {
      email: "Enter email",
      emailFormat: "Enter a valid email address",
      nickname: "Enter full name",
      username: "Enter username",
      password: "Enter initial password",
      passwordLength: "Password must be at least 6 characters long"
    },
    message: {
      del: {
        tip1: "This user is associated with ",
        tip2: " plant and ",
        tip3: " devices.",
        tip4: "You need to: ",
        tip5: "* Remove all devices under this account",
        tip6: "* Delete all plants created by this account",
        tip7: "After completing these steps, the account can be safely deleted."
      }
    }
  },
  home: {
    welcome: {
      title: "Welcome back!",
      subInfo: "A new version is available",
      description: "We've upgraded to a new version. Come check out what's new!",
      see: "View Now",
      createStation: "Create Plant"
    },
    deviceCount: {
      title: "Total Devices",
      EVB: "EVB",
      inverter: "Inverter"
    },
    ecoStats: {
      title: "Carbon emissions",
      coal: "Raw Coal Saved",
      coalUnit: "tons",
      coalUnit2: "kg",
      co2: "CO₂ Emission Reduction",
      co2Unit: "tons",
      co2Unit2: "kg",
      tree: "Equivalent Trees Planted",
      treeUnit: "trees"
    },
    historyChart: {
      title: "Historical Data",
      energy: "Generation",
      power: "Power",
      capacity: "Capacity",
      day: "Month",
      month: "Year",
      year: "Total"
    },
    newDevicesTitle: "New Devices",
    newStationsTitle: "New Plant",
    contactUsTitle: "Contact Us",
    downloadChart: "Download Chart",
    downloadExcel: "Export Excel",
    stationStatus: {
      title: "Plant Status",
      normal: "Normal",
      offline: "Offline",
      building: "Unfinished",
      alarm: "Alarm",
      total: "Total",
      powerGeneration: "Energy",
      totalPowerGeneration: "Total Energy",
      installedCapacity: "Capacity",
      totalInstalledCapacity: "Total Capacity",
      currentMonth: "Current Month",
      allTime: "Lifetime",

      status: "Status",
      number: "Count",
      percentage: "Percentage"
    }
  },
  login: {
    title: "Login",
    welcome: "Welcome",
    username: "Username",
    password: "Password",
    rememberMe: "Remember Me",
    forgotPassword: "Forgot Password?",
    loginButton: "Login",
    register: "Register",
    demoAccount: "Demo Plant",
    usernameRequired: "Enter username/email",
    passwordRequired: "Enter password",
    loginSuccess: "Login successful",
    loginFailed: "Login failed",
    accountLogin: "Account Login",
    phonLogin: "Phone Login",
    qrLogin: "QR Code Login",
    loginCode: "Verification Code",
    getCode: "Get Code",
    inputPhoneNumber: "Enter phone number",
    inputCode: "Enter verification code",
    accountPlaceholder: "Username/Email",
    passwordPlaceholder: "Password",
    codePlaceholder: "Enter code",
    agreement: "I have read and agree to the",
    userAgreement: "User Agreement",
    privacyPolicy: "Privacy Policy",
    warrantyQuery: "Warranty Query",
    warrantyRegister: "Warranty Registration",
    remember: "Remember Me",
    forgotPassword: "Forgot Password",
    downloadApp: "Download App",
    copyright: "© 2024 Envertech Inc.",
    browserTip: "For the best experience, use the latest version of Google Chrome with a resolution of 1366x768 or higher.",
    welcome: "Welcome",
    welcomeLogin: "Welcome",
    securityTip: "Security Tip",
    securityTipMessage:
      "The 'Remember Me' feature stores your login info locally. Ensure you are on a secure device. This info will expire after 30 days.",
    forgotPasswordTip1: "If you are a new installer without an account, please contact your distributor to create one.",
    forgotPasswordTip2:
      "If you are a new distributor, please contact sales or email tech@envertec.com to create a distributor account.",
    forgotPasswordTip3: "If you are an owner without an installer, click Next to create a plant yourself."
  },
  register: {
    title: "Create Account",
    userName: "Username",
    password: "Password",
    email: "Email",
    deviceSN: "Device SN",

    // Validation messages
    userNameRequired: "Enter username",
    userNameLength: "Username must be between 1 and 50 characters",
    passwordRequired: "Enter password",
    passwordLength: "Password must be at least 6 characters long",
    emailRequired: "Enter email address",
    emailFormat: "Enter a valid email address",
    deviceSNRequired: "Enter device SN",

    // Action messages
    registerSuccess: "Registration successful!"
  },
  userInfo: {
    accountInfo: "Account Details",
    loginAccount: "Login Account",
    organization: "Organization",
    userType: "User Type",
    admin: "Admin",
    orgUser: "Organization User",
    orgCustomer: "Organization Owner",
    userRole: "User Role",
    user: "User Information",
    name: "Full Name",
    username: "Username",
    email: "Email",
    phone: "Phone Number",
    password: "Password",
    passwordDialogTitle: "Change Password",
    oldPassword: "Old Password",
    newPassword: "New Password",
    confirmPassword: "Confirm Password",
    edit: "Edit",
    deactivate: "Delete account",
    rules: {
      nickname: "Enter your full name",
      email: "Enter your email",
      tel: "Enter your phone number",
      emailFormat: "Invalid email format",
      telFormat: "Invalid phone number format",
      passwordLength: "Password must be between 6 and 16 characters"
    },
    deactivateBlockTip1: "Delete your Plant before deactivating your account.",
    deactivateBlockTip2: "Deactivating your account will permanently delete all related information and cannot be undone.",
    deactivateWarn1: "Data Backup: Have you backed up important data (e.g., energy records, earnings)?",
    deactivateWarn2:
      "Data Loss: Upon deactivation, all data in your Envertech App (including project info, energy records, earnings, settings, etc.) will be permanently deleted and cannot be recovered.",
    deactivateConfirmTitle1: "Confirm you want to deactivate your account.",
    deactivateConfirmTitle2: "Deactivating your account will delete all its data.",
    deactivateConfirmTitle3: "This action cannot be undone. Please proceed with caution.",
    continueDeactivate: "Continue Deactivation",
    confirmDeactivate: "Confirm Deactivation",
    deactivatedTips: "Account deactivated successfully"
  },
  forgotPassword: {
    title: "Forgot Password",
    userOrEmail: "Username/Email",
    verificationCode: "Verification Code",
    newPassword: "New Password",
    confirmPassword: "Confirm New Password",
    getCode: "Get Code",
    noAccount: "Don't have an account?",
    registerNow: "Register Now",
    noEmail: "No email bound?",
    clickHere: "Click Here",

    // Password strength
    passwordStrength: "Password Strength",
    weak: "Weak",
    medium: "Medium",
    strong: "Strong",
    // Validation messages
    userOrEmailRequired: "Eenter username or email",
    verificationCodeRequired: "Enter verification code",
    passwordRequired: "Enter new password",
    passwordLength: "Password must be at least 6 characters long",
    passwordMaxLength: "Password cannot exceed 20 characters",
    passwordTooWeak: "Password strength is too weak. Please include uppercase and lowercase letters.",
    confirmPasswordRequired: "Confirm new password",
    passwordNotMatch: "Passwords do not match",

    // Action messages
    codeSent: "Verification code sent",
    resetSuccess: "Password reset successfully!",

    // Contact us modal
    contactUs: "Contact Us",
    hi: "Dear User:",
    contactIntro:
      "If you have forgotten your password and do not have an email bound, we can assist you. Please follow these steps:",
    step1: "1. Prepare an email stating your username and the issue you are facing (forgot password & no email bound).",
    step2: "2. Provide the email address you wish to bind to your account.",
    step3: "3. Send the email to: ",
    step3_1: " with the subject 'Request for Password Reset & Email Binding'.",
    notice:
      "Upon receiving your email, we will process your request and send the new password to the provided email address. We will also bind this email to your account for future verification codes and service notifications.",
    thanks: "Thank you for your cooperation. If you have any questions, please feel free to contact customer support.",
    cooperation: "Best regards!"
  },
  warrantyRegister: {
    title: "- Product Registration Form -",
    // User Information
    userInfo: "User Information",
    firstName: "First Name",
    lastName: "Last Name",
    organization: "Organization",
    email: "Email",
    contactPhone: "Contact Phone (incl. area code)",
    // Product Information
    productInfo: "Product Information",
    purchaseDate: "Purchase Date",
    purchaseAddress: "Purchased From",
    registrationDate: "Registration Date",
    selectDate: "Select",
    deviceSerialNumbers: "Device Serial Number(s)",
    deviceSerialNumbersPlaceholder: "Enter device SN",
    deviceSerialNumbersNoneRule: "Enter device SN",
    deviceSerialNumbersNumberRule: "SN must be 8 or 16 digits",
    deviceSerialNumbersFormatRule: "SN must be a combination of letters and numbers",
    // Contact Address
    contactAddress: "Contact Address",
    detailAddress: "Street Address",
    postalCode: "Postal Code",
    // Installation Address
    installAddress: "Installation Address",
    sameAsContactAddress: "Installation Address: Same as Contact Address?",
    sameAsContactAddressTip: "(If yes, the contact address above will be used)",

    // Installer Information
    installerInfo: "Installer Information",
    installerName: "Installer Name",
    installerPhone: "Installer Phone Number",
    installerContactPhone: "Contact Phone (incl. area code)",
    installerOrganization: "Organization",
    // Terms agreement
    agreeTerms1:
      "I agree to receive critical product information regarding the registered product via the email and/or contact details provided above.",
    agreeTerms2: "Would you like to receive product announcements and special offers from us?",
    agreeTermsRequired: "Please agree to the terms",

    // Action messages
    registerSuccess: "Product registered successfully",
    registerFailed: "Product registration failed"
  },
  warranty: {
    title: "Warranty Query",
    titleDetail: "Warranty Details",
    titleManage: "Warranty Management",
    deviceSn: "Device SN",
    deviceType: "Device Type",
    model: "Device Model",
    dealerName: "Distributor",
    status: "Status",
    importStatus: "Import Status",
    produceDate: "Production Date",
    registerDate: "Registration Date",
    warrantyEndDate: "Warranty Expiry Date",
    active: "Active",
    inactive: "Inactive",
    statusLabel: ["Inactive", "Active"],
    deviceSnRequired: "Enter device SN",
    placeholder: {
      deviceSn: "Enter device SN",
      dealerName: "Enter distributor name",
      dealerId: "Select distributor"
    },
    rules: {
      deviceSn: "Enter device SN",
      deviceType: "Select device type",
      productionDate: "Select production date",
      dealerName: "Select distributor",
      inverterSnLength: "SN must be 16 characters"
    },
    // Query result fields
    deviceSnLabel: "Device SN",
    productionDate: "Production Date",
    registrationDate: "Registration Date",
    warrantyExpiryDate: "Warranty Expiry Date",

    label: {
      addTitle: "Add",
      addBatchTitle: "Add Batch",
      deviceType: "Device Type",
      warrantyStatus: "Activation Status",
      model: "Model",
      country: "Country",
      region: "Region",
      city: "City",
      tstreet: "Street Address",
      dealer: "Distributor",
      purchasedFrom: "Purchased From",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      phone: "Phone",
      productionDate: "Production Date",
      registrationDate: "Registration Date",
      warrantyEndDate: "Warranty Expiry Date"
    }
  },
  snImport: {
    title: "Import Devices",
    orgId: "Authorized Organization",
    importFail: "Number of devices that failed to import",
    sn: "SN",
    deviceType: "Device Type",
    model: "Model",
    authOrgName: "Authorized Organization",
    stationName: "Plant",
    installStatus: "Installation Status",
    downloadTemplate: "Download Batch Import Template",
    addSingle: "Add",
    addBatch: "Add Batch",
    placeholder: {
      sn: "Enter SN",
      authOrgName: "Authorized Organization"
    },
    rules: {
      sn: "Enter SN",
      snFormat: "SN must be numeric",
      snLength: "SN must be 8 digits"
    },
    message: {
      delete: "Delete devices"
    }
  },
  deviceUpgrade: {
    title: {
      single: "Single Upgrade",
      batch: "Batch Upgrade"
    },
    label: {
      upgradeStatus: "Upgrade Status",
      addSingle: "Single Upgrade",
      addBatch: "Batch Upgrade",
      fileName: "File Name",
      upgradeProcess: "Upgrade Progress"
    },
    form: {
      sn: "SN",
      uploadFile: "Upload Upgrade File",
      snFile: "Upload SN File",
      upload: "Upload"
    },
    tip: {
      onlyBin: "Supported format: .bin only",
      onlyExcel: "Supported formats: .xls, .xlsx"
    },
    updateStatus: {
      unupgraded: "Not Upgraded",
      upgrading: "Upgrading",
      success: "Upgrade Successful",
      failed: "Upgrade Failed",
      inverterNotExist: "Inverter does not exist",
      inverterOffline: "Inverter is offline"
    },
    message: {
      reupgrade: "Retry Upgrade",
      deleteRecord: "Delete Upgrade Record",
      upgrade: "Upgrade",
      snRequired: "Enter SN",
      fileRequired: "Upload the upgrade file",
      batchIdRequired: "Obtain a batch ID first",
      valTip: "The uploaded file contains invalid data. Batch upgrade failed.",
      batchUpgradeSuccess: "Batch upgrade successful!"
    }
  },
  adminControl: {
    tableCol: {
      stationName: "Plant",
      dealerName: "Distributor",
      distributorName: "Distributor",
      installerName: "Installer",
      ownerName: "Owner"
    },
    label: {
      valRes: "Validation Result",
      powerControl: "Power Control"
    },
    btn: {
      addBatch: "Batch Control",
      downloadTemplate: "Download Batch Power Import Template"
    },
    message: {
      valTip: "The uploaded file contains invalid data. Batch upgrade failed.",
      closeTip: "Closing this window will discard unsaved changes. Are you sure?"
    }
  },
  device: {
    button: {
      maintenance: "Device Maintenance",
      batchMaintenance: "Batch Settings"
    },
    title: {
      modifyPassword: "Change Password",
      powerControl: "Power Control",
      setProductCommand: "Set Product Command",
      setNegativePrice: "Set Negative Price (Netherlands)",
      replaceDevice: "Replace Device",
      deviceOperation: "Device Operations"
    },
    label: {
      device: "Device",
      createTime: "Created At",
      deviceNumber: "Device Count",
      originalSideUpgrade: "Primary Side Upgrade",
      subSideUpgrade: "Secondary Side Upgrade",
      cmd: "Command",
      data: "Data",
      passwordTip: "Hint: Default password is 6-16 characters. Please use only letters and numbers."
    },
    tableCol: {
      deviceStatus: "Device Status",
      stationName: "Plant",
      gatewaySn: "Connected EVB",
      model: "Model",
      bootVer: "Boot Version",
      gatewayVer: "Collector Version",
      mgmVer: "Primary Version",
      mgsVer: "Secondary Version"
    },
    rules: {
      sn: {
        required: "Enter SN",
        length: "SN must be 8 digits",
        validateFail: "Validation failed, please try again"
      },
      deviceType: "Select device type",
      angui: "Select Grid Code",
      password: "Enter new password",
      passwordLength: "Password must be between 6 and 16 characters",
      power: "Select power control option",
      productCode: "Select product command",
      oldSn: "Enter original device SN",
      newSn: "Enter current device SN",
      fileList: "Select firmware file",
      type: "Select upgrade type",
      hexOnly: "Enter hexadecimal characters only",
      upgradeFileType: "Only .bin files are supported"
    },
    operation: {
      restartDevice: "Restart Device",
      modifyPassword: "Change Password",
      rename: "Alias",
      operationDevice: "Operate Device",
      upgradeSecurityCode: "Upgrade Grid Code",
      powerControl: "Control Power",
      wifiUpgrade: "WiFi Upgrade",
      setProductCommand: "Set Product Command",
      setNegativePrice: "Set Negative Price (Netherlands)",
      replaceDevice: "Replace Device",
      upgradeDevice: "Device Upgrade",
      upgradeDevice2: "Firmware Upgrade",
      alarmShielding: "Alarm Suppression",
      antiReverse: "Anti-Reverse",
      phaseSelection: "Phase Selection",
      universalControl: "General Control",
      deleteDevice: "Delete Device"
    },
    operationForm: {
      upgradeSecurityCode: "Grid Code",
      modifyPassword: "New Password",
      powerControl: "Power Control",
      setProductCommand: "Product Command",
      setNegativePrice: "Negative Price",
      replaceDevice: "Original Device SN",
      replaceDeviceNewSn: "Current Device SN",
      upgradeDevice: "Firmware File",
      upgradeDeviceType: "Upgrade Type"
    },
    placeholder: {
      sn: "Enter SN",
      deviceStatus: "Select device status",
      stationName: "Enter plant name",
      upgradeSecurityCode: "Select grid code",
      modifyPassword: "Enter new password",
      powerControl: "Select power control option",
      setProductCommand: "Select product command",
      replaceDevice: "Enter original device SN",
      replaceDeviceNewSn: "Enter current device SN",
      upgradeDeviceType: "Select upgrade type",

      cmd: "Enter command string in hex (e.g., 121A)",
      data: "Enter data in hex (e.g., 000271AE)"
    }
  },
  deviceDetail: {
    title: {
      deviceList: "Device List",
      basicInfo: "Basic Info",
      historyData: "Historical Data",
      connectionDevice: "Connected Devices",
      deviceStatus: "Device Status"
    },
    label: {
      componentData: "Component Data / Metric Comparison",
      selectIndex: "Select Metric",
      power: "Power",
      voltage: "AC Voltage",
      frequency: "AC Frequency",
      componentPower: "Component Power",
      componentVoltage: "Component Voltage",
      componentTemperature: "Component Temperature",
      deviceType: "Device Type",
      sn: "SN",
      createTime: "Created At",
      model: "Model",
      originalSideVersion: "Primary Version",
      bootVersion: "Boot Version",
      subSideVersion: "Secondary Version",
      gatewayVersion: "Collector Version",
      stationName: "Plant",
      connectionEVB: "Connected EVB",
      connectionInverterNumber: "Number of Micros",
      replacementRecord: "Replacement History",
      alarmNumber: "Replacement Records",
      alarmStatus: "Alarm Status"
    },
    message: {
      exportData: "Export Data",
      selectDeviceFirst: "Select devices first"
    },
    placeholder: {
      selectIndex: "Select metric",
      sn: "Enter SN to filter"
    }
  },
  warning: {
    alarmName: "Alarm Name",
    alarmProcessingOpinion: "Alarm Resolution Notes",
    placeholder: {
      handleStatus: "Select status",
      alarmName: "Select Alarm name",
      sn: "Enter SN"
    },
    label: {
      alarmName: "Alarm Name",
      status: "Alarm Status",
      stationName: "Plant",
      alarmTime: "Alarm Time",
      processTime: "Resolution Time"
    },
    status: {
      unhandled: "Unresolved",
      handled: "Resolved"
    },
    message: {
      handleConfirm: "Has this Alarm been resolved?",
      handleSuccess: "Resolved successfully",
      deleteSuccess: "Deleted successfully",
      batchDeleteSuccess: "Batch delete successful",
      deleteConfirm: "Are you sure you want to delete this Alarm?",
      deleteConfirm2: "This Alarm is unresolved. Are you sure you want to delete it?",
      selectData: "Select the data to delete first",
      selectedData1: "Selected ",
      selectedData: " items, including unresolved Alarms. Are you sure you want to delete?",
      deleteConfirm3: "Are you sure you want to delete the selected ",
      deleteConfirm4: " Alarm(s)?"
    }
  },
  report: {
    button: {
      generateReport: "Generate Report",
      downloadReport: "Download Report"
    },
    label: {
      stationName: "Plant Name",
      date: "Date",
      energy: "Energy (kWh)",
      power: "Power (W)"
    },
    placeholder: {
      stationName: "Select Plant"
    }
  },
  gridFile: {
    title: "Grid File Management",
    fileName: "File Name",
    alias: "Alias",
    deviceVersion: "Device Version",
    country: "Country/Region",
    version: "Version",
    placeholder: {
      country: "Select country",
      deviceVersion: "Device version",
      alias: "Enter alias",
      fileName: "Enter file name"
    },
    message: {
      updateAliasSuccess: "Alias updated",
      copySuccess: "Copied",
      deleteConfirm: "Delete selected file",
      download: "Download started"
    }
  },
  record: {
    replace: {
      title: "Device Replacement Log",
      newSn: "Current Device SN",
      oldSn: "Old Device SN",
      stationName: "Plant",
      username: "Operator",
      replaceTime: "Replacement Time",
      placeholder: {
        deviceType: "Select device type",
        stationName: "Enter plant name",
        oldSn: "Enter old device SN",
        newSn: "Enter current device SN"
      }
    },
    control: {
      title: "Remote Control History",
      sn: "SN",
      operator: "Operator",
      operateTime: "Operation Time",
      statusTitle: "Status",
      controlTypeTitle: "Control Type",

      status: ["Pending", "In Progress", "Cancelled", "Success", "Failed"],
      controlType: [
        "Restart",
        "Import Microinverter IDs",
        "Grid Code Upgrade",
        "Add/Remove Microinverter",
        "Power Control",
        "Admin Password Change",
        "WiFi Module Update",
        "AC Battery Output Control",
        "AC Storage Mode",
        "Netherlands Negative Price Handling"
      ],
      placeholder: {
        sn: "Enter SN",
        status: "Select status",
        controlType: "Select control type"
      },
      message: {
        cancelSend: "Cancel this remote command",
        del: "Delete this remote command",
        batchDel: "Remote commands"
      }
    }
  },
  station: {
    stationTitle: "Plant",
    stationName: "Plant Name",
    orgName: "Organization Name",
    username: "Owner",
    stationType: "Plant Type",
    stationAddress: "Plant Address",
    offline: "Offline",
    normal: "Normal",
    alarm: "Alarm",
    building: "Unfinished",

    country: "Country",
    capacity: "Capacity",
    collect: "Favorite",
    cancelCollect: "Unfavorite",
    collectSuccess: "Added to favorites",
    cancelCollectSuccess: "Removed from favorites",
    uploadTip: "Upload images in JPG, JPEG, PNG, or GIF format. Max file size: 5MB.",
    getLocationFail: "Failed to get coordinates. Please try again.",
    title: {
      stationMaintenance: "Plant Settings",
      address: "Address",
      ownerList: "Owner List",
      ownerInfo: "Owner Information",
      noOwner: "No information yet?",
      deviceList: "Device List",
      revenue: "Plant Revenue",
      moreSettings: "More Settings"
    },
    deviceTypeList: {
      wifi: "Wi-Fi Communication",
      wifiType: "Wi-Fi Version:",
      plc: "Power Line Communication",
      plcType: "PLC Version:",
      both: "Both"
    },

    label: {
      myLike: "My Favorites",
      stationStatus: "Plant Status",
      stationCapacity: "Capacity",
      orgName: "Organization Name",
      orgName2: "Organization",
      orgName3: "Organization",
      siteTime: "Installation Date",
      address: "Address",
      stationImage: "Plant Image",
      locationInfo: "Location Info",
      coordinates: "Coordinates",
      timezone: "Timezone",
      currency: "Currency",
      price: "Electricity Price",
      arrangementType: "Layout Type",
      layoutViewDefault: "Default Layout View",
      allowOwnerViewLayout: "Allow Owner to View Layout",
      maxComponentPower: "Max Power per Component"
    },
    step: {
      info: "Basic Info",
      owner: "Add Owner",
      device: "Add Devices",
      layout: "Layout",
      setting: "Other Settings"
    },
    ops: {
      maintenance: "Maintenance",
      setting: "Edit Plant",
      restart: "Restart",
      powerControl: "Power Control",
      delete: "Delete",
      isLoadingDefaultLocation: "Loading...",
      getLocation: "Get Current Location",
      selectOtherOwner: "Select Owner",
      addOwner: "Add Owner",
      skipOwner: "Skip",
      addDevice: "Add Device",
      editDevice: "Edit Device"
    },
    powerControl: {
      adjustmentMethod: "Adjustment Method",
      activePower: "Active Power (%)",
      powerFactor: "Power Factor",
      activePowerPlaceholder: "2 ~ 100",
      powerFactorPlaceholder: "-1.0 ~ -0.8, 0.8 ~ 1.0",
      rules: {
        adjustmentMethod: "Select adjustment method",
        activePower: "Select power control value",
        activePowerInvalid: "Enter a valid number",
        activePowerRange: "Power control must be between 2 and 100",
        powerFactor: "Enter power factor",
        powerFactorInvalid: "Enter a valid number",
        powerFactorRange: "Power factor must be in the ranges -1.0 to -0.8 or 0.8 to 1.0"
      }
    },
    placeholder: {
      name: "Enter plant name",
      orgName: "Enter Organization name",
      userName: "Enter owner",
      SN: "Enter SN",
      sn: "Enter SN",
      status: "Plant status"
    },
    rules: {
      stationname: "Enter plant name",
      capacity: "Enter Capacity",
      capacityRange: "Capacity must be greater than 0",
      orgId: "Select an Organization",
      address: "Enter address",
      country: "Select country",
      timezone: "Select timezone",
      coordinates: "Select location on the map",
      currency: "Select currency",
      price: "Enter electricity Price",
      isFinite: "Enter a valid number",
      valueGroup: "Value must be between 200 and 1000",
      maxComponentPower: "Enter the max power per component"
    },
    message: {
      formValidateFail: "Form validation failed. Please check your input.",
      skipOwner: "Skipped adding owner.",
      selectedOwner: "Owner selected",
      removeOwnerSuccess: "Owner removed successfully",
      deviceType: "Current device type: Microinverter PV System",
      deviceTypeTips:
        "Caution: Modifying or removing existing devices may result in loss of historical data. Please proceed with care.",
      deleteDeviceTips: "Are you sure you want to delete this device? Historical data will be lost!",
      deleteDeviceSuccess: "Device deleted successfully",
      pleaseAddAtLeastOneDevice: "Add at least one device",
      evbSnTips: "Enter the serial number of the communication device (EVB). Refer to the product manual if needed.",
      deviceTypeTips:
        "Select 'Power Line Communication' if your system uses PLC. Select 'Wi-Fi Communication' if it uses Wi-Fi. Select 'Both' if both types exist in your system.",
      restartConfirm: "Are you sure you want to restart the Plant? ",
      pleaseKeepAtLeastOneEvb: "You must keep at least one EVB.",
      pleaseKeepAtLeastOneEvt: "You must keep at least one EVT.",
      pleaseDeleteDeviceFirst: "Dlete all devices from the plant before deleting it.",
      noOrg: "This plant is not assigned to any organization. Please update the basic information."
    },
    options: {
      yes: "Yes",
      no: "No",
      power: "Power",
      voltage: "Voltage",
      energy: "Energy"
    },
    tooltip: {
      maxComponentPower: "Used on the Layout page as the maximum power for a single component."
    }
  },
  stationDetail: {
    title: {
      stationOverview: "Overview",
      stationDevices: "Devices",
      stationLayout: "Layout",
      stationReport: "Reports",
      stationSetting: "Settings",
      baseInfo: "Basic Info",
      info: "Basic Info",
      currentBuildingProcess: "Current Setup Progress",
      energyByDay: "Daily Energy Comparison",
      installInfo: "Installation Info",
      stationInfo: "Plant Info",
      revenueSetting: "Revenue Settings",
      pvInfoDrawer: "Component Details"
    },
    label: {
      createTime: "Created At",
      capacity: "Capacity",
      country: "Country/Region",
      timezone: "Timezone",
      address: "Address",
      installTime: "Installation Date",
      installCompany: "Installer",
      owner: "Owner",
      networkStatus: "Network Status",
      systemStatus: "System Status",
      updateTime: "Updated",
      todayPower: "Today's Energy",
      income: "Revenue",
      noPrice: "Tariff not set",
      powerRatio: "Power Ratio",
      installedCapacity: "Capacity",
      monthlyGeneration: "Monthly Energy",
      annualGeneration: "Annual Energy",
      totalGeneration: "Total Energy",
      physicalLayout: "Physical Layout",
      pvCount: "Number of PV Panels",
      inverterSn: "Connected Microinverter",
      inverterPort: "Port",
      gatewaySn: "Connected EVB",
      inverterStatus: "Network Status",
      power: "PV Power",
      voltage: "PV Voltage",
      current: "PV Current",
      acVoltage: "Grid Voltage",
      acCurrent: "Grid Current",
      frequency: "Grid Frequency",
      temperature: "Temperature",
      updateTime2: "Update Time",
      evbCount: "EVB",
      evtCount: "EVT",
      evtWifiCount: "EVT-WiFi"
    },
    tableCol: {
      deviceSerialNumbers: "Device SN",
      deviceType: "Device Type",
      deviceStatus: "Device Status",
      deviceVersion: "Device Version",
      deviceModel: "Model",
      firmwareVersion: "Grid File Version",
      hardwareVersion: "Hardware Version",
      dspVersion: "Firmware Version",
      allDevices: "All Devices"
    },
    dialog: {
      addEvtTitle: "Add EVT"
    },
    rules: {
      currency: "Select currency",
      price: "Enter electricity Price",
      price2: "Enter a valid tariff",
      evbSn: "Enter EVB SN"
    },
    message: {
      addEvtSuccess: "EVT added successfully",
      atLeastOneEvt: "Keep at least one EVT"
    },
    step: {
      info: "Basic Info",
      infoDesc: "Complete the basic plant information",
      owner: "Add Owner",
      ownerDesc: "Add or link the plant owner's information",
      device: "Add Devices",
      deviceDesc: "Add devices and establish connections",
      layout: "Layout",
      layoutDesc: "Design the plant layout",
      setting: "Other Settings",
      settingDesc: "Configure tariff, plant rules, etc."
    },
    ops: {
      edit: "Edit",
      goToSetting: "Go to Settings",
      zoomIn: "Zoom In (+10%)",
      zoomOut: "Zoom Out (-10%)",
      zoomToFit: "Fit to Canvas",
      resetZoom: "Reset View (100%)"
    }
  },
  stationLayout: {
    title: {
      success: "Congratulations, all components have been placed!",
      tiltAngle: "Tilt Angle",
      help: "Help",
      view: "Preview",
      noMessage: "No information yet?"
    },
    btn: {
      addBackground: "Add Background",
      clearBackground: "Clear Background",
      autoLayout: "Auto Layout",
      clearAll: "Clear All",
      setTiltAngle: "Set Tilt Angle",
      delete: "Delete",
      skip: "Skip"
    },
    btnTooltip: {
      expandSidebar: "Expand Sidebar",
      collapseSidebar: "Collapse Sidebar",
      addBackground: "Add background image to canvas",
      clearBackground: "Clear canvas background image",
      help: "Help",
      zoomIn: "Zoom In",
      zoomOut: "Zoom Out",
      resetZoom: "Fit to Canvas",
      refreshZoom: "Reset Canvas View"
    },
    label: {
      opacity: "Opacity",
      componentCount: "Component Count",
      selected: "Selected",
      position: "Position",
      rotation: "Rotation Angle",
      tiltAngle: "Tilt",
      tempTiltAngle: "Tilt Angle",
      degree: "°",
      range: "(0-90° range)",
      unit: "",
      device: "Device"
    },
    message: {
      tempTiltAngle: "Tilt angle must be between 0 and 90 degrees",
      tempTiltAngleSuccess: "Tilt angle set successfully",
      resetZoomSuccess: "Canvas view reset",
      graphNotInitialized: "Canvas not initialized",
      supportedImageFormat: "Please select a supported image format: JPG, PNG, GIF, BMP, WebP",
      fileSizeLimit: "Image file size cannot exceed 10MB. Current size: ",
      uploadingBackgroundImage: "Uploading background image...",
      uploadSuccess: "Background image set successfully",
      uploadError: "Upload response format error",
      setBackgroundError: "Failed to set background image",
      clearBackgroundSuccess: "Background cleared",
      noAvailableDevice: "No devices available or canvas not initialized",
      allDevicesInCanvas: "All devices are already on the canvas",
      noAvailableDeviceToLayout: "No devices available to layout",
      autoLayoutSuccess: "Auto layout successful",
      autoLayoutError: "Auto layout failed, please try again",
      clearLayoutError: "Failed to clear layout, please try again"
    },
    text: {
      help: {
        dragComponent: {
          title: "Drag and Drop Components",
          item1:
            "Drag components from the device list on the left onto the canvas. Dropped components will be placed at the cursor position.",
          item2:
            "On the canvas, components can be moved and rotated freely. The properties of the selected array are displayed in the bottom-left corner.",
          item3: "Right-click on a component on the canvas to set its tilt angle or delete it.",
          item4: '"Auto Layout" can automatically arrange all components in an array format.'
        },
        canvasOperation: {
          title: "Canvas Operations",
          item1: "Left-click and drag to pan the view. Ctrl + scroll wheel to zoom in/out.",
          item2: 'Click "Add Background" to add a background image. You can adjust its size, opacity, and position.',
          item3:
            'Click "Fit to Canvas" to automatically adjust the view so that all components and the background fit the canvas size.',
          item4: 'Click "Reset Canvas View" to reset the view to its initial state (excluding the background).'
        },
        confirmButton: "Got it"
      }
    }
  },
  supplement: {
    confirmOrganizationPrompt: "Selection cannot be changed after confirmation",
    asyncDeviceBtn: "Sync Local Mode Devices"
  }
};

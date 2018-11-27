import {
  LOGIN_FORM_SUBMIT,
  SIGNUP_FORM_SUBMIT,
  CALCULATE_INVOICE_SUM,
  CALCULATE_INVOICE_DUEDATE,
  ADD_INVOICE_ROW,
  REMOVE_INVOICE_ROW,
  REMOVE_INVOICE,
  EDIT_INVOICE,
  GET_INVOICE_BY_ID_SUCCESS,
  COPY_INVOICE,
  CANCEL_EDIT_INVOICE,
  GET_INVOICES_SUCCESS,
  GET_INVOICES_START,
  GET_SALARIES_START,
  LOAD_INVOICE_REVIEW,
  POST_TAX_CARD,
  SAVE_AND_SEND_INVOICE,
  MIN_DATE_CHANGE,
  MAX_DATE_CHANGE,
  QUANTITY_CHANGE,
  QUANTITY_PRICE_CHANGE,
  ON_INVOICE_REVIEW,
  GET_INVOICES_FAILED,
  SAVE_INVOICE_SUCCESS,
  SAVE_AND_SEND_INVOICE_SUCCESS,
  REVIEW_INVOICE_EDIT_SUCCESS,
  SAVE_INVOICE_FAILED,
  CHECK_AUTH_INFO,
  CHECK_AUTH_INFO_SUCCESS,
  CHECK_AUTH_INFO_FAILED,
  GET_CUSTOMERS_CHART,
  GET_CUSTOMERS_CHART_SUCCESS,
  GET_CUSTOMERS_CHART_FAILED,
  GET_INVOICE_CHART,
  GET_INVOICE_CHART_SUCCESS,
  GET_INVOICE_CHART_FAILED,
  GET_USER_TAX_INFO,
  GET_USER_TAX_INFO_SUCCESS,
  GET_COMPANY_UPDATES,
  GET_COMPANY_UPDATES_SUCCESS,
  GET_INVOICE_AMOUNT_MONTHLY,
  GET_INVOICE_AMOUNT_MONTHLY_CHART_SUCCESS,
  GET_INVOICE_AMOUNT_MONTHLY_CHART_FAILED,
  GET_RENEW_TOKEN,
  TOKEN_VALIDATION,

  ON_PROFILE_UPDATE,
  ON_PASSWORD_UPDATE,
  LOAD_PROFILE_SUCCESS,
  LOAD_PROFILE_FAILED,
  LOAD_PROFILE_START,
  CLOSE_INVOICE_REVIEW_SNACKBAR,
  COPY_INVOICE_SUCCESS,

  NEW_CUSTOMER,
  ADD_CUSTOMER_SUCCESS,
  ADD_CUSTOMER_FAILED,
  REMOVE_CUSTOMER,
  UPDATE_CUSTOMER,
  GET_CUSTOMER_BY_ID_SUCCESS,
  SAVE_CUSTOMER_UPDATE,
  CANCEL_CUSTOMER_UPDATE,
  ADD_NEW_CUSTOMER_INVOICE,
  ADD_NEW_CUSTOMER_INVOICE_SUCCESS,

  GET_CUSTOMERS_START,
  GET_CUSTOMERS_SUCCESS,
  CUSTOMER_PAGE_CHANGE,
  INVOICE_PAGE_CHANGE,
  EMPTY_INVOICE_ROWS,
  SAVE_INVOICE_DRAFT,
  ADD_EXPENSE_ROW,
  REMOVE_EXPENSE_ROW,
  ADD_ALLOWANCE_ROW,
  REMOVE_ALLOWANCE_ROW,
  ADD_PASSENGER_ROW,
  REMOVE_PASSENGER_ROW,
  SHOW_ADDITIONAL_VEHICLE_INFO,
  
  CHANGE_ALLOWANCE_DATE,
  CHANGE_ALLOWANCE_START_DATE,
  CHANGE_ALLOWANCE_END_DATE,
  CHANGE_ALLOWANCE_START_TIME,
  CHANGE_ALLOWANCE_END_TIME,

  POST_TAX_CARD_SUCCESS,
  POST_TAX_CARD_FAILED,
  GET_TAX_CARD_START,
  CHANGE_ADMIN_MENU,
  SEARCH_ADMIN_INVOICE,
  SEARCH_ADMIN_INVOICE_SUCCESS,
  SEARCH_ADMIN_INVOICE_FAILED,
  EXPAND_ADMIN_INVOICE,
  EXPAND_ADMIN_INVOICE_TRUE,
  EXPAND_ADMIN_INVOICE_FALSE,
  CHANGE_INVOICE_BILLING_DATE,
  SEARCH_ADMIN_USERS,
  SEARCH_ADMIN_USERS_SUCCESS,
  SEARCH_ADMIN_USERS_FAILED,
  SEARCH_ADMIN_WAGES_SUCCESS,
  SEARCH_ADMIN_WAGES_FAILED,
  GET_NEW_SALARY_START,
  GET_NEW_SALARY_SUCCESS,
  SELECT_ROW_SALARY,
  GET_SALARY_INFO,
  GET_SALARY_BY_ID_SUCCESS,
  SALARY_PAGE_CHANGE,
  UPDATE_ADMIN_INVOICE,
  UPDATE_ADMIN_INVOICE_RESULT,
  HIDE_ADMIN_SNACKBAR,
  EXPAND_ADMIN_USER,
  EXPAND_ADMIN_USER_TRUE,
  EXPAND_ADMIN_USER_FALSE,
  UPDATE_ADMIN_USER,
  UPDATE_ADMIN_USER_RESULT,
  UPDATE_ADMIN_USER_RESULT_FAILED,
  SAVE_EXPENSE,
  SAVE_EXPENSE_FAILED,
  SAVE_EXPENSE_SUCCESS,
  GET_EXPENSE_START,
  GET_EXPENSE_SUCCESS,
  GET_EXPENSE_FAILED,
  EMPTY_EXPENSE_ROWS,
  CLOSE_EXPENSE_SNACKBAR,
  EXPENSE_CHANGE_PAGE,
  POST_YEL_START,
  SAVE_TRAVELLING_EXPENSE,
  SAVE_TRAVELLING_EXPENSE_FAILED,
  SAVE_TRAVELLING_EXPENSE_SUCCESS,
  LOAD_ALLOWANCE_COST,
  LOAD_ALLOWANCE_COST_SUCCESS,
  LOAD_ALLOWANCE_COST_FAILED,
  ALLOWANCE_CHANGE_PAGE,
  GET_YEL_START,
  GET_YEL_SUCCESS,
  GET_YEL_FAILED,
  SELECT_ROW_SALARY_SUCCESS,
  GET_SALARIES_SUCCESS,
  POST_SALARY,
  SIGNUP_FORM_SUBMIT_SUCCESS,
  SIGNUP_FORM_SUBMIT_FAILED,
  CLOSE_SIGNUP_SNACKBAR,
  LOGIN_FORM_SUBMIT_SUCCESS,
  LOGIN_FORM_SUBMIT_FAILED,
  CLOSE_LOGIN_SNACKBAR,
  CLIENT_SET,
  CLIENT_UNSET,
  DOWNLOAD_PDF_SUCCESS,
  DOWNLOAD_PDF_FAILED,
  GET_PROFESSION,
  GET_PROFESSION_SUCCESS,
  GET_PROFESSION_FAILED,
  GET_FINVOICE_OPERATOR,
  GET_OPERATOR_SUCCESS,
  GET_OPERATOR_FAILED,
  GET_EINVOICE_OPERATOR,
  GET_EOPERATOR_SUCCESS,
  GET_EOPERATOR_FAILED,
  SHOW_TOOLTIP,
  HIDE_TOOLTIP,
  REMOVE_EXPENSE,
  REMOVE_ALLOWANCE,
  EDIT_EXPENSE,
  EDIT_ALLOWANCE,
  GET_EXPENSE_BY_ID_SUCCESS,
  GET_ALLOWANCE_BY_ID_SUCCESS,
  SAVE_EXPENSE_UPDATE,
  CANCEL_EXPENSE_UPDATE,
  EXPENSE_UPDATE_SUCCESS,
  EXPENSE_UPDATE_FAILED,
  SAVE_ALLOWANCE_UPDATE,
  CANCEL_ALLOWANCE_UPDATE,
  CHANGE_PURCHASE_DATE,
  SAVE_SALARY_SLIP,
  FRONT_PAGE_FORM_SUBMIT,
  CONTACT_FORM_SUBMIT,
  CONTACT_FORM_SUBMIT_SUCCESS,
  CONTACT_FORM_SUBMIT_FAILED,
  HIDE_CONTACT_SNACKBAR,
  CLOSE_CUSTOMER_SNACKBAR,
  CLEAR_INVOICE_OPTIONS,
  GENERATE_INVOICE_PDF,
  INVOICE_DOWNLOAD_PDF,
  SAVE_AND_SEND_INVOICE_PDF,
  RESET_PASSWORD_FORM_SUBMIT,
  RESET_PASSWORD_SUBMIT_SUCCESS,
  RESET_PASSWORD_SUBMIT_FAILED,
  HIDE_RESET_PASSWORD_SNACKBAR,
  PASSWORD_UPDATE_SUCCESS,
  PASSWORD_UPDATE_FAILED,
  CLOSE_PASSWORD_SNACKBAR,
  YEL_UPDATE_SUCCESS,
  YEL_UPDATE_FAILED,
  CLOSE_YEL_SNACKBAR,
  GENERATE_INVOICE_PDF_SUCCESS,
  GENERATE_INVOICE_PDF_FAILED,
  SEARCH_ADMIN_WAGES,
  UPDATE_ADMIN_INVOICE_STATUS,
  CANCEL_UPDATE_AMDIN_INVOICE_STATUS,
  CANCEL_UPDATE_AMDIN_SALARY_STATUS,
  UPDATE_ADMIN_SALARY_STATUS,
  INVOICE_SEARCH_PAGE_CHANGE,
  SALARY_SEARCH_PAGE_CHANGE,
  USER_SEARCH_PAGE_CHANGE,
  TIEDOTTEET_SEARCH_PAGE_CHANGE,
  RELEASE_INFO_SEARCH_PAGE_CHANGE,
  WARN_INVOICE_TO_PAY,
  WARN_SALARY_TO_PAY,
  ADD_SALARY_SUCCESS,
  UPDATE_ADMIN_INVOICE_STATUS_SUCCESS,
  UPDATE_ADMIN_SALARY_STATUS_SUCCESS,

  ADMIN_ADD_NEW_UPDATES,
  ADMIN_ADD_NEW_UPDATES_SUCCESS,
  ADMIN_DELETE_COMPANY_UPDATE,
  ADMIN_DELETE_COMPANY_UPDATE_SUCCESS,
  ADMIN_GET_UPDATES,
  ADMIN_GET_UPDATES_SUCCESS,
  NO_PIKAPALKKA,
  SHOW_SALARY_PDF,
  SHOW_INVOICE_PDF,

  ALLOWANCE_UPDATE_SUCCESS,
  ALLOWANCE_UPDATE_FAILED,
  EMPTY_PASSENGER_ROWS,
  EMPTY_ALLOWANCE_INPUT_ROWS,
  INVOICE_EDIT_SUCCESS,
  LANGUAGE_CHANGE  
} from '../constants/index'

export const addInvoiceRow = copy => ({ type: ADD_INVOICE_ROW, copy })
export const removeInvoiceRow = rowNumber => ({ type: REMOVE_INVOICE_ROW, rowNumber })
export const loadInvoiceReview = () => ({ type: LOAD_INVOICE_REVIEW })
export const saveAndSendInvoice = () => ({ type: SAVE_AND_SEND_INVOICE })
export const saveAndSendInvoiceSuccess = (result) => ({ type: SAVE_AND_SEND_INVOICE_SUCCESS, result })
export const saveAndSendInvoicePDF = () => ({ type: SAVE_AND_SEND_INVOICE_PDF })
export const minDateChange = (value, rowNumber) => ({ type: MIN_DATE_CHANGE, value, rowNumber })
export const maxDateChange = (value, rowNumber) => ({ type: MAX_DATE_CHANGE, value, rowNumber })
export const quantityChange = (val, rowNumber) => ({ type: QUANTITY_CHANGE, val, rowNumber})
export const quantityPriceChange = (val, rowNumber) => ({ type: QUANTITY_PRICE_CHANGE, val, rowNumber})
export const onInvoiceReview = () => ({ type: ON_INVOICE_REVIEW })

export const calculateInvoiceSum = key => ({ type: CALCULATE_INVOICE_SUM, key })
export const calculateDuedate = date => ({ type: CALCULATE_INVOICE_DUEDATE, date })

export const postTaxCard = (e) => ({ type: POST_TAX_CARD, e })
export const postTaxCardSuccess = () => ({ type: POST_TAX_CARD_SUCCESS })
export const postTaxCardFailed = () => ({ type: POST_TAX_CARD_FAILED })
export const getTaxCardStart = () => ({ type: GET_TAX_CARD_START })
export const postYelStart = () => ({ type: POST_YEL_START })
export const getYelStart = () => ({ type: GET_YEL_START })
export const getYelSuccess = yels => ({ type: GET_YEL_SUCCESS, yels })
export const getYelFailed = () => ({ type: GET_YEL_FAILED })

export const getInvoicesStart = () => ({ type: GET_INVOICES_START })
export const getInvoicesSuccess = (invoices, customerResult) => ({ type: GET_INVOICES_SUCCESS, invoices, customerResult })
export const getInvoicesFailed = error => ({ type: GET_INVOICES_FAILED, error })

export const getProfessions = () => ({ type: GET_PROFESSION })
export const getFinvoiceOperator = () => ({ type: GET_FINVOICE_OPERATOR })
export const getEinvoiceOperator = () => ({ type: GET_EINVOICE_OPERATOR })
export const getEOperatorSuccess = (operators) => ({ type: GET_EOPERATOR_SUCCESS, operators })
export const getEOperatorFailed = (error) => ({ type: GET_EOPERATOR_FAILED, error })
export const getProfessionSuccess = (professions) => ({ type: GET_PROFESSION_SUCCESS, professions })
export const getOperatorSuccess = (operators) => ({ type: GET_OPERATOR_SUCCESS, operators })
export const getOperatorFailed = error => ({ type: GET_OPERATOR_FAILED, error })
export const getProfessionFailed = error => ({ type: GET_PROFESSION_FAILED, error })

export const saveInvoiceSuccess = result => ({ type: SAVE_INVOICE_SUCCESS, result})
export const reviewInvoiceEditSuccess = result => ({ type: REVIEW_INVOICE_EDIT_SUCCESS, result})
export const invoiceEditSuccess = result => ({ type: INVOICE_EDIT_SUCCESS, result})
export const saveInvoiceFailed = error => ({ type: SAVE_INVOICE_FAILED, error})
export const closeInvoiceReviewSnackBar = () => ({type: CLOSE_INVOICE_REVIEW_SNACKBAR})
export const removeInvoice = invoice_id => ({type: REMOVE_INVOICE, invoice_id})
export const copyInvoice = invoice_id => ({type: COPY_INVOICE, invoice_id})
export const cancelEditInvoice = () => ({type: CANCEL_EDIT_INVOICE})
export const editInvoice = invoice_id => ({type: EDIT_INVOICE, invoice_id})
export const getInvoiceByIdSuccess = result => ({type: GET_INVOICE_BY_ID_SUCCESS, result})
export const copyInvoiceSuccess = result => ({type: COPY_INVOICE_SUCCESS, result})
export const invoicePageChange = selected => ({type: INVOICE_PAGE_CHANGE, selected})
export const emptyInvoiceRows = () => ({type: EMPTY_INVOICE_ROWS})
export const saveInvoiceDraft = () => ({type: SAVE_INVOICE_DRAFT})
export const generateInvoicePDFSuccess = result => ({ type: GENERATE_INVOICE_PDF_SUCCESS, result})
export const generateInvoicePDFFailed = error => ({ type: GENERATE_INVOICE_PDF_FAILED, error})
export const changeInvoiceBillingDate = date => ({type: CHANGE_INVOICE_BILLING_DATE, date})
export const downloadPDFSuccess = () => ({ type: DOWNLOAD_PDF_SUCCESS })
export const downloadPDFFailed = () => ({ type: DOWNLOAD_PDF_FAILED })
export const showTooltip = () => ({ type: SHOW_TOOLTIP })
export const hideTooltip = () => ({ type: HIDE_TOOLTIP })
export const clearInvoiceOptions = () => ({ type: CLEAR_INVOICE_OPTIONS })
export const generateInvoicePDF = (invoice_id) => ({ type: GENERATE_INVOICE_PDF, invoice_id })
export const invoiceDownloadPDF = (invoice_id) => ({ type: INVOICE_DOWNLOAD_PDF, invoice_id })

export const getExpenseStart = () => ({type: GET_EXPENSE_START})
export const getExpenseSuccess = (expenses, allowances) => ({type: GET_EXPENSE_SUCCESS, expenses, allowances})
export const getExpenseFailed = error => ({type: GET_EXPENSE_FAILED, error})
export const addExpenseRow = () => ({type: ADD_EXPENSE_ROW})
export const removeExpenseRow = key => ({type: REMOVE_EXPENSE_ROW, key})
export const addAllowanceRow = () => ({type: ADD_ALLOWANCE_ROW})
export const removeAllowanceRow = key => ({type: REMOVE_ALLOWANCE_ROW, key})
export const addPassengerRow = (check) => ({type: ADD_PASSENGER_ROW, check})
export const removePassengerRow = rowNumber => ({type: REMOVE_PASSENGER_ROW, rowNumber})
export const showAdditionalVehicleInfo = value => ({type: SHOW_ADDITIONAL_VEHICLE_INFO, value})

export const changeAllowanceDate = () => ({type: CHANGE_ALLOWANCE_DATE})
export const changeAllowanceStartDate = (date) => ({type: CHANGE_ALLOWANCE_START_DATE, date})
export const changeAllowanceEndDate = (date) => ({type: CHANGE_ALLOWANCE_END_DATE, date})
export const changeAllowanceStartTime = time => ({type: CHANGE_ALLOWANCE_START_TIME, time})
export const changeAllowanceEndTime = time => ({type: CHANGE_ALLOWANCE_END_TIME, time})

export const saveExpense = () => ({ type: SAVE_EXPENSE })
export const saveExpenseFailure = (error) => ({ type: SAVE_EXPENSE_FAILED, error })
export const saveExpenseSuccess = (result) => ({ type: SAVE_EXPENSE_SUCCESS, result })
export const emptyExpenseRows = () => ({ type: EMPTY_EXPENSE_ROWS })
export const closeExpenseSnackBar = () => ({ type: CLOSE_EXPENSE_SNACKBAR })
export const expensePageChange = selected => ({ type: EXPENSE_CHANGE_PAGE, selected })
export const saveTravellingExpense = () => ({ type: SAVE_TRAVELLING_EXPENSE })
export const saveTravellingExpenseSuccess = (result) => ({ type: SAVE_TRAVELLING_EXPENSE_SUCCESS, result })
export const saveTravellingExpenseFailed = (error) => ({ type: SAVE_TRAVELLING_EXPENSE_FAILED, error })
export const loadAllowanceCost = () => ({ type: LOAD_ALLOWANCE_COST })
export const loadAllowanceCostSuccess = (result) => ({ type: LOAD_ALLOWANCE_COST_SUCCESS, result })
export const loadAllowanceCostFailed = (error) => ({ type: LOAD_ALLOWANCE_COST_FAILED, error })
export const allowancePageChange = selected => ({ type: ALLOWANCE_CHANGE_PAGE, selected })
export const removeExpense = invoice_expense_id => ({type: REMOVE_EXPENSE, invoice_expense_id})
export const removeAllowance = id => ({type: REMOVE_ALLOWANCE, id})
export const editExpense = invoice_expense_id => ({type: EDIT_EXPENSE, invoice_expense_id})
export const editAllowance = id => ({type: EDIT_ALLOWANCE, id})
export const getExpenseByIdSuccess = (result) => ({type: GET_EXPENSE_BY_ID_SUCCESS, result})
export const getAllowanceByIdSuccess = (result) => ({type: GET_ALLOWANCE_BY_ID_SUCCESS, result})
export const saveExpenseUpdate = () => ({type: SAVE_EXPENSE_UPDATE})
export const expenseUpdateSuccess = (result) => ({type: EXPENSE_UPDATE_SUCCESS, result})
export const expenseUpdateFailed = (error) => ({ type: EXPENSE_UPDATE_FAILED, error })
export const allowanceUpdateSuccess = (result) => ({type: ALLOWANCE_UPDATE_SUCCESS, result })
export const allowanceUpdateFailed = (error) => ({type: ALLOWANCE_UPDATE_FAILED, error})
export const cancelExpenseUpdate = () => ({type: CANCEL_EXPENSE_UPDATE})
export const saveAllowanceUpdate = () => ({type: SAVE_ALLOWANCE_UPDATE})
export const cancelAllowanceUpdate = () => ({type: CANCEL_ALLOWANCE_UPDATE})
export const changeExpensePurchaseDate = date => ({type: CHANGE_PURCHASE_DATE, date})
export const emptyPassengerRows = () => ({type: EMPTY_PASSENGER_ROWS})
export const emptyAllowanceInputRows = () => ({type: EMPTY_ALLOWANCE_INPUT_ROWS})

export const newCustomer = () => ({type: NEW_CUSTOMER})
export const addCustomerSuccess = (result) => ({type: ADD_CUSTOMER_SUCCESS, result})
export const addCustomerFailed = (error) => ({type: ADD_CUSTOMER_FAILED, error})
export const removeCustomer = id => ({type: REMOVE_CUSTOMER, id})
export const updateCustomer = id => ({type: UPDATE_CUSTOMER, id})
export const getCustomerByIdSuccess = (result) => ({type: GET_CUSTOMER_BY_ID_SUCCESS, result})
export const saveCustomerUpdate = id => ({type: SAVE_CUSTOMER_UPDATE, id})
export const cancelCustomerUpdate = () => ({type: CANCEL_CUSTOMER_UPDATE})
export const addNewCustomerInvoice = id => ({type: ADD_NEW_CUSTOMER_INVOICE, id})
export const addNewCustomerInvoiceSuccess = result => ({type: ADD_NEW_CUSTOMER_INVOICE_SUCCESS, result})
export const closeCustomerSnackBar = () => ({ type: CLOSE_CUSTOMER_SNACKBAR })

export const getCustomersStart = () => ({type: GET_CUSTOMERS_START})
export const getCustomersSuccess = (result) => ({type: GET_CUSTOMERS_SUCCESS, result})
export const customerPageChange = selected => ({type: CUSTOMER_PAGE_CHANGE, selected})

export const checkAuthInfo = () => ({ type: CHECK_AUTH_INFO })
export const checkAuthInfoSuccess = result => ({ type: CHECK_AUTH_INFO_SUCCESS, result })
export const checkAuthInfoFailed = error => ({ type: CHECK_AUTH_INFO_FAILED, error })
export const getCustomersChart = () => ({ type: GET_CUSTOMERS_CHART })
export const getCustomersChartSuccess = (result) => ({ type: GET_CUSTOMERS_CHART_SUCCESS, result })
export const getCustomersChartFailed = (error) => ({ type: GET_CUSTOMERS_CHART_FAILED, error })
export const getInvoiceChart = () => ({ type: GET_INVOICE_CHART })
export const getInvoiceChartSuccess = (result) => ({ type: GET_INVOICE_CHART_SUCCESS, result })
export const getInvoiceChartFailed = (error) => ({ type: GET_INVOICE_CHART_FAILED, error })
export const getUserTaxInfo = () => ({ type: GET_USER_TAX_INFO })
export const getUserTaxInfoSuccess = (result) => ({ type: GET_USER_TAX_INFO_SUCCESS, result })
export const getCompanyUpdates = () => ({type: GET_COMPANY_UPDATES})
export const getCompanyUpdatesSuccess = (result) => ({type: GET_COMPANY_UPDATES_SUCCESS, result})
export const getInvoiceAmountMonthly = () => ({type: GET_INVOICE_AMOUNT_MONTHLY})
export const getInvoiceAmountByMonthlyChartSuccess = (result) => ({ type: GET_INVOICE_AMOUNT_MONTHLY_CHART_SUCCESS, result })
export const getInvoiceAmountByMonthlyChartFailed = (error) => ({ type: GET_INVOICE_AMOUNT_MONTHLY_CHART_FAILED, error })
export const onRenewToken = (result) => ({ type: GET_RENEW_TOKEN, result})
export const onTokenValidation = (result) => ({ type: TOKEN_VALIDATION, result})

export const profileUpdate = () => ({ type: ON_PROFILE_UPDATE })
export const passwordUpdate = () => ({ type: ON_PASSWORD_UPDATE })
export const passwordUpdateSuccess = result => ({ type: PASSWORD_UPDATE_SUCCESS, result })
export const passwordUpdateFailed = error => ({ type: PASSWORD_UPDATE_FAILED, error })
export const yelUpdateSuccess = result => ({ type: YEL_UPDATE_SUCCESS, result })
export const yelUpdateFailed = error => ({ type: YEL_UPDATE_FAILED, error })
export const loadProfileStart = () => ({ type: LOAD_PROFILE_START })
export const loadProfileSuccess = result => ({ type: LOAD_PROFILE_SUCCESS, result })
export const loadProfileFailed = error => ({ type: LOAD_PROFILE_FAILED, error })
export const closePasswordSnackbar = () => ({type: CLOSE_PASSWORD_SNACKBAR})
export const closeYelSnackbar = () => ({type: CLOSE_YEL_SNACKBAR})

//export const loginFormSubmit = (email, password) => ({ type: LOGIN_FORM_SUBMIT, email, password })

export const loginFormSubmit = () => ({ type: LOGIN_FORM_SUBMIT })

export const loginFormSubmitSuccess = () => ({ type: LOGIN_FORM_SUBMIT_SUCCESS})
export const loginFormSubmitFailed = error => ({ type: LOGIN_FORM_SUBMIT_FAILED, error })
export const closeLoginSnackbar = () => ({ type: CLOSE_LOGIN_SNACKBAR })
export const setClient = (token) => ({ type: CLIENT_SET, token })
export const unsetClient = () => ({ type: CLIENT_UNSET })
export const resetPasswordFormSubmit = (email) => ({ type: RESET_PASSWORD_FORM_SUBMIT, email })
export const resetPasswordSubmitSuccess = () => ({ type: RESET_PASSWORD_SUBMIT_SUCCESS })
export const resetPasswordSubmitFailed = () => ({ type: RESET_PASSWORD_SUBMIT_FAILED })
export const hideResetPasswordSnackbar = () => ({ type: HIDE_RESET_PASSWORD_SNACKBAR })

export const registerFormSubmit = (email, firstname, lastname, password) => ({ type: SIGNUP_FORM_SUBMIT, email, firstname, lastname, password })
export const registerFormSubmitSuccess = (result) => ({ type: SIGNUP_FORM_SUBMIT_SUCCESS, result })
export const registerFormSubmitFailed = error => ({ type: SIGNUP_FORM_SUBMIT_FAILED, error })
export const closeRegisterSnackbar = () => ({ type: CLOSE_SIGNUP_SNACKBAR })

export const signupFormSubmit = (firstname, lastname, email) => ({ type: FRONT_PAGE_FORM_SUBMIT, firstname, lastname, email })
export const contactFormSubmit = () => ({ type: CONTACT_FORM_SUBMIT })
export const contactFormSubmitSuccess = () => ({ type: CONTACT_FORM_SUBMIT_SUCCESS })
export const contactFormSubmitFailed = () => ({ type: CONTACT_FORM_SUBMIT_FAILED })
export const hideContactSnackbar = () => ({type: HIDE_CONTACT_SNACKBAR})

export const changeAdminMenu = (value) => ({ type: CHANGE_ADMIN_MENU, value })
export const searchAdminUsers = () => ({ type: SEARCH_ADMIN_USERS })
export const searchAdminUsersSuccess = result => ({ type: SEARCH_ADMIN_USERS_SUCCESS, result })
export const searchAdminUsersFailed = () => ({ type: SEARCH_ADMIN_USERS_FAILED })
export const searchAdminWagesSuccess = result => ({ type: SEARCH_ADMIN_WAGES_SUCCESS, result })
export const searchAdminWagesFailed = () => ({ type: SEARCH_ADMIN_WAGES_FAILED })
export const expandAdminUser = (expanded, uuid) => ({ type: EXPAND_ADMIN_USER, expanded, uuid})
export const expandAdminUserTrue = result => ({ type: EXPAND_ADMIN_USER_TRUE, result})
export const expandAdminUserFalse = uuid => ({ type: EXPAND_ADMIN_USER_FALSE, uuid})
export const updateAdminUser = (email, uuid) => ({type: UPDATE_ADMIN_USER, email, uuid})
export const updateAdminUserResult = () => ({type: UPDATE_ADMIN_USER_RESULT})
export const updateAdminUserResultFailed = () => ({type: UPDATE_ADMIN_USER_RESULT_FAILED})
export const searchAdminInvoice = () => ({ type: SEARCH_ADMIN_INVOICE })
export const searchAdminInvoiceSuccess = result => ({ type: SEARCH_ADMIN_INVOICE_SUCCESS, result})
export const searchAdminInvoiceFailed = () => ({ type: SEARCH_ADMIN_INVOICE_FAILED})
export const expandAdminInvoice = (expanded, id) => ({ type: EXPAND_ADMIN_INVOICE, expanded, id})
export const expandAdminInvoiceTrue = result => ({ type: EXPAND_ADMIN_INVOICE_TRUE, result})
export const expandAdminInvoiceFalse = id => ({ type: EXPAND_ADMIN_INVOICE_FALSE, id})
export const updateAdminInvoice = id => ({type: UPDATE_ADMIN_INVOICE, id})
export const updateAdminInvoiceResult = result => ({type: UPDATE_ADMIN_INVOICE_RESULT, result})
export const hideAdminSnackbar = () => ({type: HIDE_ADMIN_SNACKBAR})
export const searchAdminWages = () => ({ type: SEARCH_ADMIN_WAGES })
export const updateAdminInvoiceStatus = (invoice_id) => ({type: UPDATE_ADMIN_INVOICE_STATUS, invoice_id})
export const updateAdminSalaryStatus = (id) => ({type: UPDATE_ADMIN_SALARY_STATUS, id})
export const invoiceSearchPageChange = selected => ({type: INVOICE_SEARCH_PAGE_CHANGE, selected})
export const salarySearchPageChange = selected => ({type: SALARY_SEARCH_PAGE_CHANGE, selected})
export const userSearchPageChange = selected => ({type: USER_SEARCH_PAGE_CHANGE, selected})
export const tiedotteetSearchPageChange = selected => ({type: TIEDOTTEET_SEARCH_PAGE_CHANGE, selected})
export const releaseInfoSearchPageChange = selected => ({type: RELEASE_INFO_SEARCH_PAGE_CHANGE, selected})
export const warnInvoiceToPay = selected =>  ({type: WARN_INVOICE_TO_PAY, selected})
export const warnSalaryToPay = selected =>  ({type: WARN_SALARY_TO_PAY, selected})
export const cancelUpdateAdminInvoiceStatus = () => ({type: CANCEL_UPDATE_AMDIN_INVOICE_STATUS})
export const cancelUpdateAdminSalaryStatus = () => ({type: CANCEL_UPDATE_AMDIN_SALARY_STATUS})
export const addSalarySuccess = () => ({type: ADD_SALARY_SUCCESS})
export const updateAdminInvoiceStatusSuccess = () => ({type: UPDATE_ADMIN_INVOICE_STATUS_SUCCESS})
export const updateAdminSalaryStatusSuccess = () => ({type: UPDATE_ADMIN_SALARY_STATUS_SUCCESS})

export const adminAddNewUpdates = () => ({type: ADMIN_ADD_NEW_UPDATES})
export const adminAddNewUpdatesSuccess = () => ({type:ADMIN_ADD_NEW_UPDATES_SUCCESS})
export const adminDeleteCompanyUpdates = (id) => ({type: ADMIN_DELETE_COMPANY_UPDATE, id})
export const adminDeleteCompanyUpdatesSuccess = () => ({type: ADMIN_DELETE_COMPANY_UPDATE_SUCCESS})
export const adminGetUpdates = () => ({type: ADMIN_GET_UPDATES})
export const adminGetUpdatesSuccess = (result) => ({type: ADMIN_GET_UPDATES_SUCCESS, result})
export const noPikapalkka = () => ({type: NO_PIKAPALKKA})
export const showSalaryPDF = (id) => ({type: SHOW_SALARY_PDF, id})
export const showInvoicePDF = (invoice_id) => ({type: SHOW_INVOICE_PDF, invoice_id})

export const getNewSalaryStart = () => ({type: GET_NEW_SALARY_START})
export const getNewSalarySuccess = result => ({type: GET_NEW_SALARY_SUCCESS, result})
export const getSalariesStart = () => ({ type: GET_SALARIES_START })
export const getSalariesSuccess = resultParsed => ({type: GET_SALARIES_SUCCESS, resultParsed})
export const selectRowSalary = selected =>  ({type: SELECT_ROW_SALARY, selected})
export const selectRowSalarySuccess = result => ({type: SELECT_ROW_SALARY_SUCCESS, result})
export const postSalary = selected => ({type: POST_SALARY, selected})
export const getSalaryInfo = id => ({type: GET_SALARY_INFO, id})
export const getSalaryByIdSuccess = result => ({type: GET_SALARY_BY_ID_SUCCESS, result})
export const salaryPageChange = selected => ({type: SALARY_PAGE_CHANGE, selected})
export const saveSalarySlip = id => ({type: SAVE_SALARY_SLIP, id})

export const handleChangeLang = (lang) => ({ type: LANGUAGE_CHANGE, lang })
export const LOGIN_FORM_SUBMIT = 'LOGIN_FORM_SUBMIT'
export const LOGIN_FORM_SUBMIT_SUCCESS = 'LOGIN_FORM_SUBMIT_SUCCESS'
export const LOGIN_FORM_SUBMIT_FAILED = 'LOGIN_FORM_SUBMIT_FAILED'
export const CLOSE_LOGIN_SNACKBAR = 'CLOSE_LOGIN_SNACKBAR'
export const CLIENT_SET = 'CLIENT_SET'
export const CLIENT_UNSET = 'CLIENT_UNSET'
export const RESET_PASSWORD_FORM_SUBMIT = 'RESET_PASSWORD_FORM_SUBMIT'

export const SIGNUP_FORM_SUBMIT = 'SIGNUP_FORM_SUBMIT'
export const SIGNUP_FORM_SUBMIT_SUCCESS = 'SIGNUP_FORM_SUBMIT_SUCCESS'
export const SIGNUP_FORM_SUBMIT_FAILED = 'SIGNUP_FORM_SUBMIT_FAILED'
export const CLOSE_SIGNUP_SNACKBAR = 'CLOSE_SIGNUP_SNACKBAR'

export const FRONT_PAGE_FORM_SUBMIT = 'FRONT_PAGE_FORM_SUBMIT'
export const CONTACT_FORM_SUBMIT = 'CONTACT_FORM_SUBMIT'

export const CHECK_AUTH_INFO = '@@dashboard/CHECK_AUTH_INFO'
export const CHECK_AUTH_INFO_SUCCESS = '@@dashboard/CHECK_AUTH_INFO_SUCCESS'
export const CHECK_AUTH_INFO_FAILED = '@@dashboard/CHECK_AUTH_INFO_FAILED'

export const SWITCH_AUTH_FORM = '@@redux-auth/SWITCH_AUTH_FORM'

export const POST_TAX_CARD = '@@tax-saga/POST_TAX_CARD'
export const GET_TAX_CARD = '@@tax-saga/GET_TAX_CARD'
export const POST_TAX_CARD_SUCCESS = '@@tax/POST_TAX_CARD_SUCCESS'
export const POST_TAX_CARD_FAILED = '@@tax/POST_TAX_CARD_FAILED'
export const GET_TAX_CARD_START = '@@tax/GET_TAX_CARD_START'
export const POST_YEL_START = '@@tax/POST_YEL_START'
export const GET_YEL_START = '@@tax/GET_YEL_START'
export const GET_YEL_SUCCESS = '@@tax/GET_YEL_SUCCESS'
export const GET_YEL_FAILED = '@@tax/GET_YEL_FAILED'
export const CLOSE_PASSWORD_SNACKBAR = '@@tax/CLOSE_PASSWORD_SNACKBAR'

export const GET_INVOICES_START = '@@invoice-saga/GET_INVOICES_START'
export const GET_INVOICES_SUCCESS = '@@invoice-saga/GET_INVOICES_SUCCESS'
export const GET_INVOICES_FAILED = '@@invoice-saga/GET_INVOICE_FAILED'

export const GET_PROFESSION = '@@invoice-saga/GET_PROFESSION'
export const GET_PROFESSION_SUCCESS = '@@invoice-saga/GET_PROFESSION_SUCCESS'
export const GET_PROFESSION_FAILED = '@@invoice-saga/GET_PROFESSION_FAILED'

export const SAVE_INVOICE_SUCCESS = '@@invoice-saga/SAVE_INVOICE_SUCCESS'
export const SAVE_INVOICE_FAILED = '@@invoice-saga/SAVE_INVOICE_FAILED'
export const LOAD_INVOICES_START = '@@invoice-saga/LOAD_INVOICES_START'

export const CHANGE_INVOICE_BILLING_DATE = '@@invoice/CHANGE_INVOICE_BILLING_DATE'
export const COPY_INVOICE = '@@invoice/COPY_INVOICE'
export const COPY_INVOICE_SUCCESS = '@@invoice/COPY_INVOICE_SUCCESS'
export const REMOVE_INVOICE = '@@invoice/REMOVE_INVOICE'
export const EDIT_INVOICE = '@@invoice/EDIT_INVOICE'
export const CANCEL_EDIT_INVOICE = '@@invoice/CANCEL_EDIT_INVOICE'
export const GET_INVOICE_BY_ID_SUCCESS = '@@invoice/GET_INVOICE_BY_ID_SUCCESS'
export const CALCULATE_INVOICE_SUM = '@@invoice/CALCULATE_INVOICE_SUM'
export const CALCULATE_INVOICE_DUEDATE = '@@invoice/CALCULATE_INVOICE_DUEDATE'
export const ADD_INVOICE_ROW = '@@invoice/ADD_INVOICE_ROW'
export const REMOVE_INVOICE_ROW = '@@invoice/REMOVE_INVOICE_ROW'
export const LOAD_INVOICE_REVIEW = '@@invoice/LOAD_INVOICE_REVIEW'
export const SAVE_AND_SEND_INVOICE = '@@invoice/SAVE_AND_SEND_INVOICE'
export const SHOW_TOOLTIP = '@@invoice/SHOW_TOOLTIP'
export const HIDE_TOOLTIP = '@@invoice/HIDE_TOOLTIP'
export const MIN_DATE_CHANGE = '@@invoice/MIN_DATE_CHANGE'
export const MAX_DATE_CHANGE = '@@invoice/MAX_DATE_CHANGE'
export const QUANTITY_CHANGE = '@@invoice/QUANTITY_CHANGE'
export const QUANTITY_PRICE_CHANGE = '@@invoice/QUANTITY_PRICE_CHANGE'
export const ON_INVOICE_REVIEW = '@@invoice/ON_INVOICE_REVIEW'
export const CLOSE_INVOICE_REVIEW_SNACKBAR = '@@invoice/CLOSE_INVOICE_REVIEW_SNACKBAR'
export const EMPTY_INVOICE_ROWS = '@@invoice/EMPTY_INVOICE_ROWS'
export const SAVE_INVOICE_DRAFT = '@@invoice/SAVE_INVOICE_DRAFT'
export const DOWNLOAD_PDF_SUCCESS = '@@invoice/DOWNLOAD_PDF_SUCCESS'
export const DOWNLOAD_PDF_FAILED = '@@invoice/DOWNLOAD_PDF_FAILED'
export const CLEAR_INVOICE_OPTIONS = '@@invoice/CLEAR_INVOICE_OPTIONS'
export const GENERATE_INVOICE_PDF = '@@invoice/GENERATE_INVOICE_PDF'

export const GET_EXPENSE_START = '@@expense/GET_EXPENSE_START'
export const GET_EXPENSE_SUCCESS = '@@expense/GET_EXPENSE_SUCCESS'
export const GET_EXPENSE_FAILED = '@@expense/GET_EXPENSE_FAILED'
export const ADD_EXPENSE_ROW = '@@expense/ADD_EXPENSE_ROW'
export const REMOVE_EXPENSE_ROW = '@@expense/REMOVE_EXPENSE_ROW'
export const ADD_ALLOWANCE_ROW = '@@expense/ADD_ALLOWANCE_ROW'
export const REMOVE_ALLOWANCE_ROW = '@@expense/REMOVE_ALLOWANCE_ROW'
export const ADD_PASSENGER_ROW = '@@expense/ADD_PASSENGER_ROW'
export const REMOVE_PASSENGER_ROW = '@@expense/REMOVE_PASSENGE_ROW'
export const SHOW_ADDITIONAL_VEHICLE_INFO = '@@expense/SHOW_ADDITIONAL_VEHICLE_INFO'
export const CHANGE_ALLOWANCE_DATE = '@@expense/CHANGE_ALLOWANCE_DATE'
export const SAVE_EXPENSE = '@@expense/SAVE_EXPENSE'
export const SAVE_EXPENSE_FAILED = '@@expense/SAVE_EXPENSE_FAILED'
export const SAVE_EXPENSE_SUCCESS = '@@expense/SAVE_EXPENSE_SUCCESS'
export const EMPTY_EXPENSE_ROWS = '@@expense/EMPTY_EXPENSE_ROWS'
export const CLOSE_EXPENSE_SNACKBAR = '@@expense/CLOSE_EXPENSE_SNACKBAR'
export const EXPENSE_CHANGE_PAGE = '@@expense/EXPENSE_CHANGE_PAGE'
export const SAVE_TRAVELLING_EXPENSE = '@@travelling-expense/SAVE_TRAVELLING_EXPENSE'
export const SAVE_TRAVELLING_EXPENSE_SUCCESS = '@@travelling-expense/SAVE_TRAVELLING_EXPENSE_SUCCESS'
export const SAVE_TRAVELLING_EXPENSE_FAILED = '@@travelling-expense/SAVE_TRAVELLING_EXPENSE_FAILED'
export const LOAD_ALLOWANCE_COST = '@@travelling-expense/LOAD_ALLOWANCE_COST'
export const LOAD_ALLOWANCE_COST_SUCCESS = '@@traveling-expense/LOAD_ALLOWANCE_COST_SUCCESS'
export const LOAD_ALLOWANCE_COST_FAILED = '@@travelling-expense/LOAD_ALLOWANCE_COST_FAILED'
export const ALLOWANCE_CHANGE_PAGE = '@@expense/ALLOWANCE_CHANGE_PAGE'
export const REMOVE_EXPENSE = '@@expense/REMOVE_EXPENSE'
export const REMOVE_ALLOWANCE = '@@expense/REMOVE_ALLOWANCE'
export const EDIT_EXPENSE = '@@expense/EDIT_EXPENSE'
export const EDIT_ALLOWANCE = '@@expense/EDIT_ALLOWANCE'
export const GET_EXPENSE_BY_ID_SUCCESS = '@@expense/GET_EXPENSE_BY_ID_SUCCESS'
export const GET_ALLOWANCE_BY_ID_SUCCESS = '@@expense/GET_ALLOWANCE_BY_ID_SUCCESS'
export const SAVE_EXPENSE_UPDATE = '@@expense/SAVE_EXPENSE_UPDATE'
export const CANCEL_EXPENSE_UPDATE = '@@expense/CANCEL_EXPENSE_UPDATE'
export const SAVE_ALLOWANCE_UPDATE = '@@expense/SAVE_ALLOWANCE_UPDATE'
export const CANCEL_ALLOWANCE_UPDATE = '@@expense/CANCEL_ALLOWANCE_UPDATE'
export const CHANGE_PURCHASE_DATE = '@@expense/CHANGE_PURCHASE_DATE'

export const ON_PROFILE_UPDATE = '@@profile/ON_PROFILE_UPDATE'
export const LOAD_PROFILE_SUCCESS = '@@profile/LOAD_PROFILE_SUCCESS'
export const LOAD_PROFILE_FAILED = '@@profile/LOAD_PROFILE_FAILED'
export const LOAD_PROFILE_START = '@@profile/LOAD_PROFILE_START'
export const ON_PASSWORD_UPDATE = '@@profile/ON_PASSWORD_UPDATE'
export const PASSWORD_UPDATE_SUCCESS = '@@profile/PASSWORD_UPDATE_SUCCESS'
export const PASSWORD_UPDATE_FAILED = '@@profile/PASSWORD_UPDATE_FAILED'

export const NEW_CUSTOMER = '@@customer/NEW_CUSTOMER'
export const ADD_CUSTOMER_SUCCESS = '@@customer/ADD_CUSTOMER_SUCCESS'
export const ADD_CUSTOMER_FAILED = '@@customer/ADD_CUSTOMER_FAILED'
export const REMOVE_CUSTOMER = '@@customer-saga/REMOVE_CUSTOMER'
export const UPDATE_CUSTOMER = '@@customer-saga/UPDATE_CUSTOMER'
export const GET_CUSTOMER_BY_ID_SUCCESS = '@@customer-saga/GET_CUSTOMER_BY_ID_SUCCESS'
export const SAVE_CUSTOMER_UPDATE = '@@customer-saga/SAVE_CUSTOMER_UPDATE'
export const CANCEL_CUSTOMER_UPDATE = '@@customer/CANCEL_CUSTOMER_UPDATE'
export const ADD_NEW_CUSTOMER_INVOICE = '@@customer/ADD_NEW_CUSTOMER_INVOICE'
export const ADD_NEW_CUSTOMER_INVOICE_SUCCESS = '@@customer/ADD_NEW_CUSTOMER_INVOICE_SUCCESS'
export const CLOSE_CUSTOMER_SNACKBAR = '@@customer/CLOSE_CUSTOMER_SNACKBAR'

export const GET_CUSTOMERS_START = '@@customer-saga/GET_CUSTOMERS_START'
export const GET_CUSTOMERS_SUCCESS = '@@customer-saga/GET_CUSTOMERS_SUCCESS'

export const CUSTOMER_PAGE_CHANGE = '@@customer/CUSTOMER_PAGE_CHANGE'
export const INVOICE_PAGE_CHANGE = '@@invoice/INVOICE_PAGE_CHANGE'

export const CHANGE_ADMIN_MENU = '@@admin/CHANGE_ADMIN_MENU'
export const SEARCH_ADMIN_USERS = '@@admin/SEARCH_ADMIN_USERS'
export const SEARCH_ADMIN_USERS_SUCCESS = '@@admin/SEARCH_ADMIN_USERS_SUCCESS'
export const SEARCH_ADMIN_USERS_FAILED = '@@admin/SEARCH_ADMIN_USERS_FAILED'
export const EXPAND_ADMIN_USER = '@@admin/EXPAND_ADMIN_USER'
export const EXPAND_ADMIN_USER_TRUE = '@@admin/EXPAND_ADMIN_USER_TRUE'
export const EXPAND_ADMIN_USER_FALSE = '@@admin/EXPAND_ADMIN_USER_FALSE'
export const UPDATE_ADMIN_USER = '@@admin/UPDATE_ADMIN_USER'
export const UPDATE_ADMIN_USER_RESULT = '@@admin/UPDATE_ADMIN_USER_RESULT'
export const SEARCH_ADMIN_INVOICE = '@@admin/SEARCH_ADMIN_INVOICE'
export const SEARCH_ADMIN_INVOICE_SUCCESS = '@@admin/SEARCH_ADMIN_INVOICE_SUCCESS'
export const SEARCH_ADMIN_INVOICE_FAILED = '@@admin/SEARCH_ADMIN_INVOICE_FAILED'
export const EXPAND_ADMIN_INVOICE = '@@admin/EXPAND_ADMIN_INVOICE'
export const EXPAND_ADMIN_INVOICE_TRUE = '@@admin/EXPAND_ADMIN_INVOICE_TRUE'
export const EXPAND_ADMIN_INVOICE_FALSE = '@@admin/EXPAND_ADMIN_INVOICE_FALSE'
export const UPDATE_ADMIN_INVOICE = '@@admin/UPDATE_ADMIN_INVOICE'
export const UPDATE_ADMIN_INVOICE_RESULT = '@@admin/UPDATE_ADMIN_INVOICE_RESULT'
export const HIDE_ADMIN_SNACKBAR = '@@admin/HIDE_ADMIN_SNACKBAR'


export const GET_NEW_SALARY_START = '@@salary/GET_NEW_SALARY_START'
export const GET_NEW_SALARY_SUCCESS = '@@salary/GET_NEW_SALARY_SUCCESS'
export const SELECT_ROW_SALARY = '@@salary/SELECT_ROW_SALARY'
export const SELECT_ROW_SALARY_SUCCESS = '@@salary/SELECT_ROW_SALARY_SUCCESS'
export const GET_SALARIES_START = '@@salary/GET_SALARIES_START'
export const GET_SALARIES_SUCCESS = '@@salary/GET_SALARIES_SUCCESS'
export const POST_SALARY = '@@salary/POST_SALARY'
export const GET_SALARY_INFO = '@@salary/GET_SALARY_INFO'
export const GET_SALARY_BY_ID_SUCCESS = '@@salary/GET_SALARY_BY_ID_SUCCESS'
export const SALARY_PAGE_CHANGE = '@@salary/SALARY_PAGE_CHANGE'
export const SAVE_SALARY_SLIP = '@@salary/SAVE_SALARY_SLIP'

export const LANGUAGE_CHANGE = '@@lang/LANGUAGE_CHANGE'
export const SAVE_AND_SEND_INVOICE_PDF = '@invoice/SAVE_AND_SEND_INVOICE_PDF'


export const OPENID_SERVER = process.env.OPENID_SERVER

//Development Server
export const API_SERVER = 'https://kvtapiserver.azurewebsites.net/api'
export const KVT_IDENTITY_SERVER = 'https://kvt-identityserver.azurewebsites.net/api'

//Staging Server
/* export const API_SERVER = 'https://testkvtapiserver.azurewebsites.net/api'
export const KVT_IDENTITY_SERVER = 'https://kvt-identityserver-staging.azurewebsites.net/api' */
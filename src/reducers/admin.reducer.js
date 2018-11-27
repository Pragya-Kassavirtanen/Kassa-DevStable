import {
  CHANGE_ADMIN_MENU,
  LOCATION_CHANGE,
  SEARCH_ADMIN_INVOICE_SUCCESS,
  SEARCH_ADMIN_INVOICE_FAILED,
  EXPAND_ADMIN_INVOICE_TRUE,
  EXPAND_ADMIN_INVOICE_FALSE,
  EXPAND_ADMIN_USER_TRUE,
  EXPAND_ADMIN_USER_FALSE,
  SEARCH_ADMIN_USERS_SUCCESS,
  SEARCH_ADMIN_USERS_FAILED,
  //UPDATE_ADMIN_INVOICE,
  //UPDATE_ADMIN_INVOICE_RESULT,
  HIDE_ADMIN_SNACKBAR,
  //UPDATE_ADMIN_USER,
  UPDATE_ADMIN_USER_RESULT,
  UPDATE_ADMIN_USER_RESULT_FAILED,
  SEARCH_ADMIN_WAGES_SUCCESS,
  SEARCH_ADMIN_WAGES_FAILED,
  INVOICE_SEARCH_PAGE_CHANGE,
  SALARY_SEARCH_PAGE_CHANGE,
  USER_SEARCH_PAGE_CHANGE,
  TIEDOTTEET_SEARCH_PAGE_CHANGE,
  WARN_INVOICE_TO_PAY,
  WARN_SALARY_TO_PAY,
  UPDATE_ADMIN_INVOICE_STATUS,
  CANCEL_UPDATE_AMDIN_INVOICE_STATUS,
  UPDATE_ADMIN_SALARY_STATUS,
  CANCEL_UPDATE_AMDIN_SALARY_STATUS,
  UPDATE_ADMIN_INVOICE_STATUS_SUCCESS,
  UPDATE_ADMIN_SALARY_STATUS_SUCCESS,
  ADMIN_GET_UPDATES_SUCCESS,
  NO_PIKAPALKKA
} from '../constants'

import DateTimeFormat from '../utils/DateTimeFormat'

import { convertIntToState } from '../utils/invoice.utils'

const initialState = {
  selectedMenuItem: 0,
  //showSpinner: false,
  showAdminSnackbar: false,
  showAdminFailSnackbar: false,
  invoiceSearchRows: [],
  userSearchRows: [],
  salarySearchRows: [],
  releaseSearchRows: [],
  selected: 0,
  isToPayInvoiceId: 0,
  isToPay: false,
  invoicepaid: 0,
  isToPaySalaryId: 0,
  isToLiftSalary: false,
  Status: '',
  newsupdate: '',
  instant_payment:''
}

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_ADMIN_MENU:
      return Object.assign(
        {},
        { ...state },
        { selectedMenuItem: action.value },
        {
          invoiceSearchRows: [],
          userSearchRows: [],
          salarySearchRows: []
        },
        { selected: 0 }
      )

    case LOCATION_CHANGE:
      return Object.assign(
        {},
        { ...state },
        {
          invoiceSearchRows: [],
          userSearchRows: [],
          salarySearchRows: []
        },
        { selectedMenuItem: 0 }
      )

    case SEARCH_ADMIN_INVOICE_SUCCESS:
      const newInvoiceRows = []
      for (let row of action.result) {
        newInvoiceRows.push({ ...row, expanded: false })
      }
      return Object.assign(
        {},
        { ...state },
        { invoiceSearchRows: newInvoiceRows }
      )

    case SEARCH_ADMIN_INVOICE_FAILED:
      return Object.assign({}, { ...state }, {})

    case SEARCH_ADMIN_USERS_SUCCESS:
      const newUserRows = []
      for (let row of action.result) {
        newUserRows.push({ ...row, expanded: false })
      }
      return Object.assign({}, { ...state }, { userSearchRows: newUserRows })

    case SEARCH_ADMIN_USERS_FAILED:
      return Object.assign({}, { ...state }, {})

    case SEARCH_ADMIN_WAGES_SUCCESS:
      const newSalaryRows = []
      //console.log('Inside SEARCH_ADMIN_WAGES_SUCCESS:: ', action.result)
      for (let row of action.result) {
        newSalaryRows.push({ ...row, expanded: false })
      }
      return Object.assign(
        {},
        { ...state },
        { salarySearchRows: newSalaryRows }
      )

    case SEARCH_ADMIN_WAGES_FAILED:
      return Object.assign({}, { ...state }, {})

    case EXPAND_ADMIN_INVOICE_TRUE:
      let result = action.result.data
      const updateRows = []
      for (let row of state.invoiceSearchRows) {
        if (row.id == result.id) {
          result.state = convertIntToState(result.state)

          result.due_date = new DateTimeFormat('fi', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric'
          }).format(new Date(result.due_date))

          result.billing_date = new DateTimeFormat('fi', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric'
          }).format(new Date(result.billing_date))

          result.total_sum = new Intl.NumberFormat('fi-FI', {
            style: 'currency',
            currency: 'EUR'
          }).format(result.total_sum)

          updateRows.push({ ...row, expanded: true, expandData: result })
        } else updateRows.push({ ...row })
      }
      return Object.assign({}, { ...state }, { invoiceSearchRows: updateRows })

    case EXPAND_ADMIN_INVOICE_FALSE:
      const closeUpdateRows = []
      for (let row of state.invoiceSearchRows) {
        row.id == action.id
          ? closeUpdateRows.push({ ...row, expanded: false, expandData: null })
          : closeUpdateRows.push({ ...row })
      }
      return Object.assign(
        {},
        { ...state },
        { invoiceSearchRows: closeUpdateRows }
      )

    case EXPAND_ADMIN_USER_TRUE:
      let userResult = action.result
      //console.log('Inside EXPAND_ADMIN_USER_TRUE:: ',userResult)
      const updateUserRows = []
      for (let row of state.userSearchRows) {
        if (row.email == userResult.email) {
          updateUserRows.push({
            ...row,
            expanded: true,
            expandData: userResult
          })
        } else updateUserRows.push({ ...row })
      }
      return Object.assign({}, { ...state }, { userSearchRows: updateUserRows })

    case EXPAND_ADMIN_USER_FALSE:
      const closeUserUpdateRows = []
      for (let row of state.userSearchRows) {
        row.uuid == action.uuid
          ? closeUserUpdateRows.push({
              ...row,
              expanded: false,
              expandData: null
            })
          : closeUserUpdateRows.push({ ...row })
      }
      return Object.assign(
        {},
        { ...state },
        { userSearchRows: closeUserUpdateRows }
      )

    /* case UPDATE_ADMIN_INVOICE:
      return Object.assign({}, { ...state }, { showSpinner: true })

    case UPDATE_ADMIN_INVOICE_RESULT:
      return Object.assign(
        {},
        { ...state },
        { showSpinner: false, showAdminSnackbar: true }
      ) */

    /* case UPDATE_ADMIN_USER:
      return Object.assign({}, { ...state }, { showSpinner: true }) */

    case UPDATE_ADMIN_USER_RESULT:
      return Object.assign(
        {},
        { ...state },
        { showAdminSnackbar: true }
      )

    case UPDATE_ADMIN_USER_RESULT_FAILED:
      return Object.assign(
        {},
        { ...state },
        { showAdminFailSnackbar: true }
      )

    case HIDE_ADMIN_SNACKBAR:
      return Object.assign({}, { ...state }, { showAdminSnackbar: false, showAdminFailSnackbar: false })

    case INVOICE_SEARCH_PAGE_CHANGE:
      return Object.assign(
        {},
        { ...state },
        { selected: action.selected.selected }
      )

    case SALARY_SEARCH_PAGE_CHANGE:
      return Object.assign(
        {},
        { ...state },
        { selected: action.selected.selected }
      )

    case USER_SEARCH_PAGE_CHANGE:
      return Object.assign(
        {},
        { ...state },
        { selected: action.selected.selected }
      )

    case TIEDOTTEET_SEARCH_PAGE_CHANGE:
      return Object.assign(
        {},
        { ...state },
        { selected: action.selected.selected }
      )

    case WARN_INVOICE_TO_PAY:
      return Object.assign(
        {},
        { ...state },
        {
          isToPayInvoiceId: action.selected,
          isToPay: true,
          invoicepaid: 0
        }
      )

    case CANCEL_UPDATE_AMDIN_INVOICE_STATUS:
      return Object.assign(
        {},
        { ...state },
        {
          isToPayInvoiceId: 0,
          isToPay: false,
          invoicepaid: 0,
          instant_payment: ''
        }
      )

    case UPDATE_ADMIN_INVOICE_STATUS:
      return Object.assign(
        {},
        { ...state },
        {
          isToPay: false,
          instant_payment: 'quick_pay'
        }
      )

    case NO_PIKAPALKKA:
    return Object.assign(
      {},
      { ...state },
      { 
        isToPay: false,       
        instant_payment: ''
      }
    )

    case WARN_SALARY_TO_PAY:
      return Object.assign(
        {},
        { ...state },
        {
          isToPaySalaryId: action.selected,
          isToLiftSalary: true,
          Status: 'paid'
        }
      )

    case CANCEL_UPDATE_AMDIN_SALARY_STATUS:
      return Object.assign(
        {},
        { ...state },
        {
          isToPaySalaryId: 0,
          isToLiftSalary: false,
          Status: 'processing'
        }
      )

    case UPDATE_ADMIN_SALARY_STATUS:
      return Object.assign(
        {},
        { ...state },
        {
          isToLiftSalary: false
        }
      )

    case UPDATE_ADMIN_INVOICE_STATUS_SUCCESS:
      return Object.assign(
        {},
        { ...state },
        {          
          isToPayInvoiceId: 0,
          instant_payment: ''
        }
      )

    case UPDATE_ADMIN_SALARY_STATUS_SUCCESS:
      return Object.assign(
        {},
        { ...state },
        {
          isToPaySalaryId: 0
        }
      )

    case ADMIN_GET_UPDATES_SUCCESS:
      return Object.assign(
        {},
        { ...state },
        { releaseSearchRows: action.result }
      )

    default:
      return state
  }
}

export default adminReducer
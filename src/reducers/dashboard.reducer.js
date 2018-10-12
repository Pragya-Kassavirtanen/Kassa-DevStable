import {
  GET_CUSTOMERS_CHART_SUCCESS,
  GET_CUSTOMERS_CHART_FAILED,
  GET_INVOICE_CHART_SUCCESS,
  GET_INVOICE_CHART_FAILED,
  GET_USER_TAX_INFO_SUCCESS,
  GET_COMPANY_UPDATES_SUCCESS,
  GET_INVOICE_AMOUNT_MONTHLY_CHART_SUCCESS,
  RELEASE_INFO_SEARCH_PAGE_CHANGE
} from '../constants'

const initialState = {
  invoiceChartData: {},
  topCustomers: {},
  invoiceAmountByMonthlyChartData: {},
  userTaxInfo: {},
  releaseInfoSearchRows: [],
  selected: 0
}

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CUSTOMERS_CHART_SUCCESS:
      return Object.assign({}, { ...state }, { topCustomers: action.result })

    case GET_CUSTOMERS_CHART_FAILED:
      return Object.assign({}, { ...state }, { ...action.error })

    case GET_INVOICE_CHART_SUCCESS:
      return Object.assign(
        {},
        { ...state },
        { invoiceChartData: action.result }
      )

    case GET_INVOICE_AMOUNT_MONTHLY_CHART_SUCCESS:
      return Object.assign(
        {},
        { ...state },
        { invoiceAmountByMonthlyChartData: action.result }
      )

    case GET_INVOICE_CHART_FAILED:
      return Object.assign({}, { ...state }, { ...action.error })

    case GET_USER_TAX_INFO_SUCCESS:
      return Object.assign(
        {},
        { ...state },
        {
          userTaxInfo: action.result
        }
      )

    case GET_COMPANY_UPDATES_SUCCESS:
      return Object.assign(
        {},
        { ...state },
        {
          releaseInfoSearchRows: action.result
        }
      )

    case RELEASE_INFO_SEARCH_PAGE_CHANGE:
      return Object.assign(
        {},
        { ...state },
        { selected: action.selected.selected }
      )

    default:
      return state
  }
}

export default dashboardReducer
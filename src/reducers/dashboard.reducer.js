import {
  GET_CUSTOMERS_CHART_SUCCESS,
  GET_CUSTOMERS_CHART_FAILED,
  GET_INVOICE_CHART_SUCCESS,
  GET_INVOICE_CHART_FAILED
} from '../constants'

const initialState = {
  invoiceChartData: {},
  topCustomers: {}
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

    case GET_INVOICE_CHART_FAILED:
      return Object.assign({}, { ...state }, { ...action.error })

    default:
      return state
  }
}

export default dashboardReducer
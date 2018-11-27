import { takeEvery, put, call } from 'redux-saga/effects'

import {
  checkAuthInfoSuccess,
  checkAuthInfoFailed,
  getCustomersChartSuccess,
  getCustomersChartFailed,
  getInvoiceChartSuccess,
  getInvoiceChartFailed,
  getUserTaxInfoSuccess,
  getCompanyUpdatesSuccess,
  getInvoiceAmountByMonthlyChartSuccess,
  getInvoiceAmountByMonthlyChartFailed,
  onRenewToken,
  setClient
} from '../actions'
import {
  CHECK_AUTH_INFO,
  GET_CUSTOMERS_CHART,
  GET_INVOICE_CHART,
  GET_USER_TAX_INFO,
  GET_COMPANY_UPDATES,
  GET_INVOICE_AMOUNT_MONTHLY,
  API_SERVER,
  KVT_IDENTITY_SERVER,
  GET_RENEW_TOKEN,
  TOKEN_VALIDATION
} from '../constants'
import { apiPost, apiManualPost, apiManualRequest, registerPost } from '../utils/request'
import store from '../store'
import { propertyArray } from '../utils/invoice.utils'
import {
  chartDataFormat,
  calcPercent,
  labelInvoiceMonthlyArray,
  labelInvoiceArray
} from '../utils/dashboard.utils'

/**
 * @author Skylar Kong
 */

function* checkAuthInfo() {
  try {
    const url = `${API_SERVER}/user-check`
    const profile = store.getState().oidc.user.profile
    const body = JSON.stringify({
      first_name: profile.given_name,
      last_name: profile.family_name,
      email: profile.email
    })
    const result = yield call(apiPost, url, body)
    yield put(checkAuthInfoSuccess(result.data))
  } catch (e) {
    yield put(checkAuthInfoFailed(e))
  }
}

function* getInvoiceChart() {
  try {
    const url = `${API_SERVER}/GetInfoInvoiceChart`
    const uuid = store.getState().client.user.data[2]
    const body = JSON.stringify({
      uuid: uuid
    })
    const result = yield call(apiManualPost, url, body)
    const resultParsed = JSON.parse(result.data)
    const labels = propertyArray(resultParsed, 'status')
    const convLabels = labelInvoiceArray(labels)
    const data = propertyArray(resultParsed, 'invoicecount')
    const percentData = calcPercent(data)
    const bgColor = [
      'rgba(0, 128, 255, 0.8)',
      'rgba(128, 255, 255, 0.8)',
      'rgba(0, 153, 122, 0.8)',
      'rgba(0, 204, 204, 0.8)'
    ]
    const brColor = [
      'rgba(0, 128, 255, 0.8)',
      'rgba(128, 255, 255, 0.8)',
      'rgba(0, 153, 122, 0.8)',
      'rgba(0, 204, 204, 0.8)'
    ]
    const chartData = chartDataFormat(
      convLabels,
      percentData,
      bgColor,
      brColor,
      10
    )
    yield put(getInvoiceChartSuccess(chartData))
  } catch (e) {
    yield put(getInvoiceChartFailed(e))
  }
}

function* getCustomersChart() {
  try {
    const url = `${API_SERVER}/GetInfoCustomersChart`
    const uuid = store.getState().client.user.data[2]
    const body = JSON.stringify({
      uuid: uuid
    })
    const result = yield call(apiManualPost, url, body)
    const resultParsed = JSON.parse(result.data)
    const labels = propertyArray(resultParsed, 'company_name')
    const data = propertyArray(resultParsed, 'sum')
    const percentData = calcPercent(data)
    const bgColor = [
      'rgba(0, 204, 204, 0.8)',
      'rgba(128, 255, 255, 0.8)',
      'rgba(83, 198, 83, 0.8)',
      'rgba(0, 77, 153, 0.8)',
      'rgba(0, 153, 153, 0.8)'
    ]
    const brColor = [
      'rgba(0, 204, 204, 0.8)',
      'rgba(128, 255, 255, 0.8)',
      'rgba(83, 198, 83, 0.8)',
      'rgba(0, 77, 153, 0.8)',
      'rgba(0, 153, 153, 0.8)'
    ]
    const chartData = chartDataFormat(labels, percentData, bgColor, brColor, 10)
    yield put(getCustomersChartSuccess(chartData))
  } catch (e) {
    yield put(getCustomersChartFailed(e))
  }
}

function* getInvoiceAmountByMonthlyChart() {
  try {
    const url = `${API_SERVER}/GetInvoiceAmountByMonthly`
    const uuid = store.getState().client.user.data[2]
    const body = JSON.stringify({
      uuid: uuid
    })
    const result = yield call(apiManualPost, url, body)
    const resultParsed = JSON.parse(result.data)
    const labels = propertyArray(resultParsed, 'Month')
    const convLabels = labelInvoiceMonthlyArray(labels)
    const data = propertyArray(resultParsed, 'SumwithoutTax')
    const bgColor = 'rgba(0, 204, 204, 0.8)'
    const brColor = 'rgba(0, 0, 0, 0)'
    const chartData = chartDataFormat(convLabels, data, bgColor, brColor, 10)
    yield put(getInvoiceAmountByMonthlyChartSuccess(chartData))
  } catch (e) {
    yield put(getInvoiceAmountByMonthlyChartFailed(e))
  }
}

function* getUserTaxInfo() {
  try {
    const url = `${API_SERVER}/GetUserTaxInfo`
    const uuid = store.getState().client.user.data[2]
    const body = JSON.stringify({
      uuid: uuid
    })
    const result = yield call(apiManualPost, url, body)
    const resultParsed = JSON.parse(result.data)
    //console.log('Inside getUserTaxInfo:: ', resultParsed)
    yield put(getUserTaxInfoSuccess(resultParsed))
  } catch (e) {
    console.warn(e)
  }
}

function* getCompanyUpdates() {
  try {
    const url = `${API_SERVER}/GetCompanyUpdates`
    const result = yield call(apiManualRequest, url)
    const resultParsed = JSON.parse(result.data)
    //console.log('Inside getCompanyUpdates:: ', resultParsed)
    yield put(getCompanyUpdatesSuccess(resultParsed))
  } catch (e) {
    console.warn(e)
  }
}

function* getRenewToken() {
  try {
    const url = `${KVT_IDENTITY_SERVER}/RenewTokens`
    const uuid = store.getState().client.user.data[2]
    const email = store.getState().client.user.data[1]
    const body = JSON.stringify({
      uuid: uuid,
      email: email
    })
    const result = yield call(registerPost, url, body)   
    //console.log('Inside getRenewToken API:: ', result.data)
    yield put(setClient(result.data))
    sessionStorage.setItem('user', JSON.stringify(result.data)) 
  } catch (e) {
    console.warn(e)
  }
}

function* getTokenValidation() {
  try {
    const url = `${API_SERVER}/TokenValidation`
    const resultTokenValidate = yield call(apiManualRequest, url)
    //console.log('Inside getTokenValidation:: ',resultTokenValidate.data) 
    if(resultTokenValidate.data === 'Token expired'){
      const resultRenewToken = yield put(onRenewToken())
      console.log('Inside getTokenValidation:: ', resultRenewToken)
    }
  } catch (e) {
    console.warn(e)
  }
}

export function* watchCheckAuthInfoSaga() {
  yield takeEvery(CHECK_AUTH_INFO, checkAuthInfo)
}

export function* watchCustomersChartSaga() {
  yield takeEvery(GET_CUSTOMERS_CHART, getCustomersChart)
}

export function* watchInvoiceChartSaga() {
  yield takeEvery(GET_INVOICE_CHART, getInvoiceChart)
}

export function* watchGetInvoiceAmountByMonthlySaga() {
  yield takeEvery(GET_INVOICE_AMOUNT_MONTHLY, getInvoiceAmountByMonthlyChart)
}

export function* watchGetUserTaxInfoSaga() {
  yield takeEvery(GET_USER_TAX_INFO, getUserTaxInfo)
}

export function* watchGetCompanyUpdatesSaga() {
  yield takeEvery(GET_COMPANY_UPDATES, getCompanyUpdates)
}

export function* watchGetRenewTokenSaga() {
  yield takeEvery(GET_RENEW_TOKEN, getRenewToken)
}

export function* watchTokenValidationSaga() {
  yield takeEvery(TOKEN_VALIDATION, getTokenValidation)
}
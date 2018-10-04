import { takeEvery, put, call } from 'redux-saga/effects'

import {
  checkAuthInfoSuccess,
  checkAuthInfoFailed,
  getCustomersChartSuccess,
  getCustomersChartFailed
} from '../actions'
import { CHECK_AUTH_INFO, GET_CUSTOMERS_CHART, API_SERVER } from '../constants'
import { apiPost, apiManualPost } from '../utils/request'
import store from '../store'
import { propertyArray } from '../utils/invoice.utils'
import { chartDataFormat, calcPercent } from '../utils/dashboard.utils'

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
      'rgba(0, 170, 255, 0.8)',
      'rgba(0, 230, 230, 0.8)',
      'rgba(0, 153, 0, 0.8)',
      'rgba(0, 119, 179, 0.8)',
      'rgba(102, 178, 178, 0.8)'         
    ]
    const brColor = [
      'rgba(0, 170, 255, 0.8)',
      'rgba(0, 230, 230, 0.8)',
      'rgba(0, 153, 0, 0.8)',
      'rgba(0, 119, 179, 0.8)',
      'rgba(102, 178, 178, 0.8)'
    ]  

    const chartData = chartDataFormat(labels, percentData, bgColor, brColor, 10)
    yield put(getCustomersChartSuccess(chartData))
  } catch (e) {
    console.warn(e)
    yield put(getCustomersChartFailed(e))
  }
}

export function* watchCheckAuthInfoSaga() {
  yield takeEvery(CHECK_AUTH_INFO, checkAuthInfo)
}

export function* watchCustomersChartSaga() {
  yield takeEvery(GET_CUSTOMERS_CHART, getCustomersChart)
}
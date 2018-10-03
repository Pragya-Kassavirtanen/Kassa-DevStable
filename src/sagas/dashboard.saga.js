import { takeEvery, put, call } from 'redux-saga/effects'

import { checkAuthInfoSuccess, checkAuthInfoFailed, getCustomersChartSuccess, getCustomersChartFailed } from '../actions'
import { CHECK_AUTH_INFO, GET_CUSTOMERS_CHART, API_SERVER } from '../constants'
import { apiPost, apiManualPost } from '../utils/request'
import store from '../store'

/**
 * @author Skylar Kong
 */

function* checkAuthInfo() {

  try {

    const url = `${API_SERVER}/user-check`

    const profile = (store.getState()).oidc.user.profile

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

    console.log('Inside getCustomersChart:: ', resultParsed)
    yield put(getCustomersChartSuccess(resultParsed))
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
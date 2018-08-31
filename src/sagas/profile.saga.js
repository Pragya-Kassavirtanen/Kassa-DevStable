import { takeEvery, put, call } from 'redux-saga/effects'
import store from '../store'
import { change, getFormValues } from 'redux-form'

import { LOAD_PROFILE_START, ON_PROFILE_UPDATE, API_SERVER } from '../constants'

import { apiManualPost } from '../utils/request'
import { loadProfileSuccess, loadProfileFailed } from '../actions'

function* loadProfileSaga() {
  try {
    const uuid = store.getState().client.user.data[2]
    if (!!uuid) {
      const url = `${API_SERVER}/GetUserContactDetails`
      const body = JSON.stringify({ uuid: uuid })
      const result = yield call(apiManualPost, url, body)
      const resultParsed = JSON.parse(result.data)
      yield put(loadProfileSuccess(resultParsed))

      //yield is reserved word so forEach is not possible to use
      let keys = Object.keys(resultParsed)
      for (let key of keys) {
        yield put(change('profile', key, resultParsed[key]))
      }

      yield put(change('tax', 'tax_percentage', resultParsed['tax_percentage']))
    }
  } catch (e) {
    yield put(loadProfileFailed(e))
  }
}

function* updateProfileSaga() {
  try {
    const formValues = getFormValues('profile')(store.getState())
    const uuid = store.getState().client.user.data[2]
    const refinedForm = Object.assign({}, { ...formValues }, { uuid: uuid })
    delete refinedForm.show_phone
    const body = JSON.stringify({ ...refinedForm })
    const url = `${API_SERVER}/UpdateUserContactDetails`
    const result = yield call(apiManualPost, url, body)
    const resultParsed = JSON.parse(result.data)
    yield put(loadProfileSuccess(resultParsed))
  } catch (e) {
    console.warn(e)
  }
}

export function* watchLoadProfileSaga() {
  yield takeEvery(LOAD_PROFILE_START, loadProfileSaga)
}

export function* watchUpdateProfileSaga() {
  yield takeEvery(ON_PROFILE_UPDATE, updateProfileSaga)
}

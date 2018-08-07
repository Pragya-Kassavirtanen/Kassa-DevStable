import { takeEvery, put, call } from 'redux-saga/effects'
import store from '../store'
import { change, getFormValues } from 'redux-form'

import {
  LOAD_PROFILE_START, 
  ON_PROFILE_UPDATE,
  ON_PASSWORD_UPDATE,
  ON_RESET_PASSWORD,
  API_SERVER
} from '../constants'

import { apiManualPost } from '../utils/request'
import { loadProfileSuccess, loadProfileFailed } from '../actions'


function* loadProfileSaga() {

  try {
    const uuid = store.getState().client.user.data[2]
    if(!!uuid) {
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
    }
  } catch (e) {
    yield put(loadProfileFailed(e))
  }
}

/* function* updateProfileSaga() {
  try {
    const formValues = getFormValues('profile')(store.getState())
    const uuid = store.getState().client.user.data[2]
    const body = JSON.stringify({...formValues, uuid: uuid})

    const url = `${API_SERVER}/UpdateUserContactDetails`
    const result = yield call(apiManualPost, url, body)
    const resultParsed = JSON.parse(result.data)
    yield put(loadProfileSuccess(resultParsed))
  } catch (e) {
  console.warn(e)
}
} */

function* updateProfileSaga() {
  try {
    const formValues = getFormValues('profile')(store.getState())
    const uuid = store.getState().client.user.data[2]  
    const refinedForm = Object.assign(
      {},
      { ...formValues },
      { uuid: uuid }
    )
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

function* updatePasswordSaga() {
  try {
    const formValues = getFormValues('password')(store.getState())
    const uuid = store.getState().client.user.data[2]
    const body = JSON.stringify({password: formValues.password, uuid: uuid})

    const url = `${API_SERVER}/UpdateUserCredentials`
    const result = yield call(apiManualPost, url, body)
    const resultParsed = JSON.parse(result.data)
    yield put(loadProfileSuccess(resultParsed))
  } catch (e) {
  console.warn(e)
}
}

function* resetPasswordSaga() {
  try {
    const email = store.getState().profile.email
    console.log('Inside resetPasswordSaga:: ',email)
    
    const uuid = store.getState().client.user.data[2]
    const body = JSON.stringify({email: email, uuid: uuid})

    const url = `${API_SERVER}/UserResetPassword`
    yield call(apiManualPost, url, body)    
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

export function* watchUpdatePasswordSaga() {
  yield takeEvery(ON_PASSWORD_UPDATE, updatePasswordSaga)
}

export function* watchResetPasswordSaga() {
  yield takeEvery(ON_RESET_PASSWORD, resetPasswordSaga)
}
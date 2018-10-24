import { takeEvery, call, take, put } from 'redux-saga/effects'
import CryptoJS from 'crypto-js'
import {
  POST_TAX_CARD,
  API_SERVER,
  GET_TAX_CARD_START,
  POST_YEL_START,
  GET_YEL_START,
  ON_PASSWORD_UPDATE,
  LOCATION_CHANGE
} from '../constants'
import {
  createUploadFileChannel,
  apiRequest,
  apiManualPost
} from '../utils/request'
import {
  postTaxCardSuccess,
  getYelSuccess,
  getYelFailed,
  passwordUpdateSuccess,
  passwordUpdateFailed,
  yelUpdateSuccess,
  yelUpdateFailed
} from '../actions/index'
import { getFormValues, change, reset } from 'redux-form'
import store from '../store'

/**
 * @author Skylar Kong
 *
 */

function* postTaxCardSaga(action) {
  try {
    const url = `${API_SERVER}/AddTaxCard`

    const file = action.e.target.files[0]

    if (file) {
      yield put(change('tax', 'taxCard', file.name))
    }

    //const formValues = getFormValues('tax')(store.getState())
    const uuid = store.getState().client.user.data[2]
    const body = {
      uuid: uuid
      //tax_percentage: formValues.tax_percentage
    }

    const channel = yield call(createUploadFileChannel, url, file, body)
    while (true) {
      const { progress = 0, err, success } = yield take(channel)
      if (err) {
        yield put(postTaxCardSuccess())
      }
      if (success) {
        yield put(postTaxCardSuccess())
      }
      console.log(progress)
    }
  } catch (e) {
    console.warn(e)
  }
}

function* getTaxCardSaga() {
  try {
    const uuid = store.getState().profile.uuid
    if (!!uuid) {
      const url = `${API_SERVER}/users/${uuid}/documents`

      const result = yield apiRequest(url)
      yield put(change('tax', 'taxCard', result.data.slice(-1)[0].filename))
    }
  } catch (e) {
    console.warn('no tax card')
  }
}

function* postYelSaga() {
  try {
    const url = `${API_SERVER}/UpdateuserYelInfo`
    const uuid = store.getState().client.user.data[2]
    const formValues = getFormValues('yel')(store.getState())

    //Update for firsttime_enterprenuer == false
    const body = JSON.parse(
      JSON.stringify({
        ...formValues,
        uuid: uuid
      })
    )
    const result = yield call(apiManualPost, url, JSON.stringify(body))
    yield put(reset('yel'))
    if (result.data === 'User yelinfo updated successfully!'){
      yield put(yelUpdateSuccess(result.data))
    }else {
      yield put(yelUpdateFailed(result.data))
    }
  } catch (e) {
    yelUpdateFailed(e)
  }
}

function* getYelSaga() {
  try {
    const year = new Date().getFullYear()
    const url = `${API_SERVER}/yels/${year}`
    const result = yield apiRequest(url)
    yield put(getYelSuccess(result))
  } catch (e) {
    yield put(getYelFailed())
  }
}

function* updatePasswordSaga() {
  try {
    const formValues = getFormValues('password')(store.getState())
    const hashedOldPassword = CryptoJS.SHA256(formValues.current_pw).toString()   
    const hashedPassword = CryptoJS.SHA256(formValues.new_pw).toString()
    const uuid = store.getState().client.user.data[2]
    const body = JSON.stringify({ oldpassword: hashedOldPassword, password: hashedPassword, uuid: uuid })
    const url = `${API_SERVER}/UpdateUserCredentials`
    const result = yield call(apiManualPost, url, body)    
    yield put(reset('password'))
    if (result.data === 'user password updated successfully!') {      
      yield put(passwordUpdateSuccess(result.data))
    } else {
      yield put(passwordUpdateFailed(result.data))
    }
  } catch (e) {
    passwordUpdateFailed(e)
  }
}

function* passwordLocationChangeSaga() {
  try {
    yield put(reset('password'))
    yield put(change('yel','yelSelect', 'yel_self'))
    yield put(change('yel','yel_income',''))
    yield put(change('yel','firsttime_enterprenuer',false))
    yield put(change('yel','age_group',''))  
  } catch (e) {
    console.warn(e)
  }
}

export function* watchTaxSaga() {
  yield takeEvery(POST_TAX_CARD, postTaxCardSaga)
}

export function* watchGetTaxCardStartSaga() {
  yield takeEvery(GET_TAX_CARD_START, getTaxCardSaga)
}

export function* watchPostYelSaga() {
  yield takeEvery(POST_YEL_START, postYelSaga)
}

export function* watchGetYelSaga() {
  yield takeEvery(GET_YEL_START, getYelSaga)
}

export function* watchUpdatePasswordSaga() {
  yield takeEvery(ON_PASSWORD_UPDATE, updatePasswordSaga)
}

export function* watchPasswordLocationChangeSaga() {
  yield takeEvery(LOCATION_CHANGE, passwordLocationChangeSaga)
}
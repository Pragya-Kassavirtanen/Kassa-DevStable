import { takeEvery, call, put } from 'redux-saga/effects'
import {  
  RESET_PASSWORD_FORM_SUBMIT,
  API_SERVER,
  LOCATION_CHANGE
} from '../constants'
import { getFormValues, reset } from 'redux-form'
import store from '../store'
import { registerPost } from '../utils/request'
import {
  resetPasswordSubmitSuccess,
  resetPasswordSubmitFailed
} from '../actions/index'

/**
 * @author Pragya Gupta
 */

function* resetPasswordSaga() {
  try {
    const formValues = getFormValues('resetPassword')(store.getState())
    const email = formValues.email    
    const body = JSON.stringify({email: email})
    const url = `${API_SERVER}/UserResetPassword`
    const result = yield call(registerPost, url, body)    

    if (result.data === 'User password reset successfully') {
      yield put(resetPasswordSubmitSuccess())
    } else {
      yield put(resetPasswordSubmitFailed())
    }
    yield put(reset('resetPassword'))    
  } catch (e) {        
    yield put(resetPasswordSubmitFailed(e))
  }
}

function* ResetPasswordLocationChangeSaga() {
  try {
    yield put(reset('resetPassword'))
  } catch (e) {
    console.warn(e)
  }
}

export function* watchResetPasswordSaga() { 
    yield takeEvery(RESET_PASSWORD_FORM_SUBMIT, resetPasswordSaga)    
}

export function* watchResetPasswordLocationChange() {
  yield takeEvery(LOCATION_CHANGE, ResetPasswordLocationChangeSaga)
}
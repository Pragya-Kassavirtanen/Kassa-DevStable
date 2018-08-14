import { take, fork, call, put } from 'redux-saga/effects'
import {  
  RESET_PASSWORD_FORM_SUBMIT,
  API_SERVER
} from '../constants'
import { getFormValues, reset } from 'redux-form'
import store from '../store'
import { registerPost } from '../utils/request'

/**
 * @author Pragya Gupta
 */

function* resetPasswordSaga() {
  try {
    const formValues = getFormValues('resetPassword')(store.getState())
    const email = formValues.email    
    const body = JSON.stringify({email: email})
    const url = `${API_SERVER}/UserResetPassword`
    yield call(registerPost, url, body)
    yield put(reset('resetPassword'))    
  } catch (e) {    
    console.warn(e)
  }
}

export function* watchResetPasswordSaga() { 
    yield take(RESET_PASSWORD_FORM_SUBMIT)
    yield fork(resetPasswordSaga)
}
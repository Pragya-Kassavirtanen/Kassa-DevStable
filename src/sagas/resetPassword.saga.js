import { take, fork, call } from 'redux-saga/effects'
import {  
  RESET_PASSWORD_FORM_SUBMIT,
  API_SERVER
} from '../constants'
import { getFormValues } from 'redux-form'
import store from '../store'
import { registerPost } from '../utils/request'

/**
 * @author Pragya Gupta
 */

function* resetPasswordSaga() {
  try {
    const formValues = getFormValues('resetPassword')(store.getState())
    const email = formValues.email
    console.log('Inside resetPasswordSaga:: ', email)
    
    const body = JSON.stringify({email: email})

    const url = `${API_SERVER}/UserResetPassword`
    const result = yield call(registerPost, url, body)
    console.log('result:: ',result)
  } catch (e) {
    console.warn(e)
  }
}

export function* watchResetPasswordSaga() { 
    yield take(RESET_PASSWORD_FORM_SUBMIT)
    yield fork(resetPasswordSaga)
}
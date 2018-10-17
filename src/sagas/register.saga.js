import { takeEvery, call, put } from 'redux-saga/effects'
import CryptoJS from 'crypto-js'
import {
  registerFormSubmitSuccess,
  registerFormSubmitFailed
} from '../actions/index'
import {
  SIGNUP_FORM_SUBMIT,
  KVT_IDENTITY_SERVER 
} from '../constants/index'
import { registerPost } from '../utils/request'
import { getFormValues } from 'redux-form'
import store from '../store'

/**
 * @author Skylar Kong
 */

function* sendRegisterInfo() {
  try {
    const url = `${KVT_IDENTITY_SERVER}/RegisterUser`
    const formValues = getFormValues('register')(store.getState())
    const refinedForm = Object.assign({}, { ...formValues })
    const hashedPassword = CryptoJS.SHA256(refinedForm.password).toString()  

    const body = JSON.stringify({
      email: refinedForm.email,
      FirstName: refinedForm.FirstName,
      Lastname: refinedForm.Lastname,      
      password: hashedPassword,
      SubjectId: refinedForm.email
    })

    const result = yield call(registerPost, url, body)    
    if (result.data.Server === 'Success') {
      yield put(registerFormSubmitSuccess(result.data.Server))
    } else {
      yield put(registerFormSubmitFailed(result.data.Server))
    }
  } catch (error) {
    yield put(registerFormSubmitFailed(error))
  }
}

export function* watchSendRegisterInfoSaga() {
  yield takeEvery(SIGNUP_FORM_SUBMIT, sendRegisterInfo)
}
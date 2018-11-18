import { call, put, takeEvery } from 'redux-saga/effects'
import { API_SERVER, CONTACT_FORM_SUBMIT, LOCATION_CHANGE } from '../constants'
import {
  contactFormSubmitSuccess,
  contactFormSubmitFailed
} from '../actions/index'
import { registerPost } from '../utils/request'
import { getFormValues, reset } from 'redux-form'
import store from '../store'

/**
 * @author Pragya Gupta
 */

function* sendContactInfo() {
  try {
    const contactFormValues = getFormValues('contact')(store.getState())
    const body = JSON.stringify({
      email: contactFormValues.email,
      firstname: contactFormValues.name,
      phone: contactFormValues.phone,
      comments: contactFormValues.message
    })
    const url = `${API_SERVER}/LogUserSentMail`
    const result = yield call(registerPost, url, body)
    if (result.data.message === 'Email sent successfully') {
      yield put(contactFormSubmitSuccess())
    } else {
      yield put(contactFormSubmitFailed())
    }
    yield put(reset('contact'))
  } catch (e) {
    yield put(contactFormSubmitFailed(e))
  }
}

function* contactLocationChangeSaga() {
  try {
    yield put(reset('contact'))
  } catch (e) {
    console.warn(e)
  }
}

export function* watchSendContactInfoSaga() {
  yield takeEvery(CONTACT_FORM_SUBMIT, sendContactInfo)
}

export function* watchContactLocationChange() {
  yield takeEvery(LOCATION_CHANGE, contactLocationChangeSaga)
}
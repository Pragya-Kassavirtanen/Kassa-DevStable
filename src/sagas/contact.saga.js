import { take, fork, call } from 'redux-saga/effects'
import { API_SERVER, CONTACT_FORM_SUBMIT } from '../constants'
/* import {
  contactFormSubmitSuccess,
  contactFormSubmitFailed
} from '../actions/index' */
import { registerPost } from '../utils/request'
import { getFormValues } from 'redux-form'
import store from '../store'

/**
 * @author Pragya Gupta
 */

function* sendContactInfo() {
  try {
    const contactFormValues = getFormValues('contact')(store.getState())
    //console.log('Inside sendContactInfo:: ', contactFormValues)
    const body = JSON.stringify({
      email: contactFormValues.email,
      firstname: contactFormValues.name,
      phone: contactFormValues.phone,
      comments: contactFormValues.message
    })
    const url = `${API_SERVER}/LogUserSentMail`
    const result = yield call(registerPost, url, body)
    console.log('Inside sendContactInfo:: ', result)
    /*  if (result.message === 'Email sent successfully') {
      //yield put(contactFormSubmitSuccess)
    } else {
      //yield put(contactFormSubmitFailed)
    } */
  } catch (e) {
    console.warn(e)
    //yield put(contactFormSubmitFailed)
  }
}

export function* watchSendContactInfoSaga() {
  yield take(CONTACT_FORM_SUBMIT)
  yield fork(sendContactInfo)
}
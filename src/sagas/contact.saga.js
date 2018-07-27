import { take, fork } from 'redux-saga/effects'
import {  
  CONTACT_FORM_SUBMIT
} from '../constants'
import { getFormValues } from 'redux-form'
import store from '../store'

/**
 * @author Pragya Gupta
 */

function* sendContactInfo() {
  try {
    const contactFormValues = getFormValues('contact')(store.getState())    
    console.log('contactFormValues:: ',contactFormValues)
  } catch (e) {
    console.warn(e)
  }
}

export function* watchSendContactInfoSaga() { 
    yield take(CONTACT_FORM_SUBMIT)
    yield fork(sendContactInfo)
}
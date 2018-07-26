import { take, put, fork } from 'redux-saga/effects'
import {  
  FRONT_PAGE_FORM_SUBMIT
} from '../constants'
import { getFormValues, change } from 'redux-form'
import store from '../store'

/**
 * @author Pragya Gupta
 */

function* loadRegisterReview() {
  try {
    const signupFormValues = getFormValues('signup')(store.getState())    
    yield put(change('register', 'FirstName', signupFormValues.FirstName))
    yield put(change('register', 'Lastname', signupFormValues.Lastname))
    yield put(change('register', 'email', signupFormValues.email))
  } catch (e) {
    console.warn(e)
  }
}

export function* watchLoadRegisterReviewSaga() { 
    yield take(FRONT_PAGE_FORM_SUBMIT)
    yield fork(loadRegisterReview)
}
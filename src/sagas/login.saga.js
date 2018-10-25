import { take, fork, cancel, call, put, cancelled } from 'redux-saga/effects'
import { browserHistory } from 'react-router'
import CryptoJS from 'crypto-js'
import {
  LOGIN_FORM_SUBMIT,
  CLIENT_UNSET,
  KVT_IDENTITY_SERVER
} from '../constants'
import {
  loginFormSubmitSuccess,
  loginFormSubmitFailed,
  setClient,
  unsetClient
} from '../actions'
import { registerPost } from '../utils/request'
import { getFormValues } from 'redux-form'
import store from '../store'

/**
 * @author Pragya Gupta
 *
 */

function* loginFlow() {
  let user

  try {
    const url = `${KVT_IDENTITY_SERVER}/CheckUser`
    const formValues = getFormValues('login')(store.getState())
    const refinedForm = Object.assign({}, { ...formValues })
    const hashedPassword = CryptoJS.SHA256(refinedForm.password).toString()   

    const body = JSON.stringify({
      email: refinedForm.email,     
      password: hashedPassword,
      SubjectId: refinedForm.email
    })

    user = yield call(registerPost, url, body)

    yield put(setClient(user))
    sessionStorage.setItem('user', JSON.stringify(user))

    if (!!user.data[0].access_token) {
      yield put(loginFormSubmitSuccess())
      browserHistory.push('/dashboard/main')
    } else {
      yield put(loginFormSubmitFailed(user.data[0].error_description))
      yield put(unsetClient())
      sessionStorage.removeItem('user')
      browserHistory.push('/dashboard/login')
    }
  } catch (error) {
    yield put(loginFormSubmitFailed(error))
    yield put(unsetClient())
    sessionStorage.removeItem('user')
    browserHistory.push('/dashboard/login')
  } finally {
    if (yield cancelled()) {
      browserHistory.push('/dashboard/login')
    }
    return user
  }
}

function* logout() {
  yield put(unsetClient())
  sessionStorage.removeItem('user')
  browserHistory.push('/dashboard/login')
}

export function* watchLoginSaga() {
  while (true) {
    yield take(LOGIN_FORM_SUBMIT)
    const task = yield fork(loginFlow)
    const action = yield take([CLIENT_UNSET, loginFormSubmitFailed])
    if (action.type === CLIENT_UNSET) yield cancel(task)
    yield call(logout)
  }
}
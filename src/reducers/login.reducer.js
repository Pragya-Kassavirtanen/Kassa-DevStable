import {
  LOGIN_FORM_SUBMIT,
  LOGIN_FORM_SUBMIT_SUCCESS,
  LOGIN_FORM_SUBMIT_FAILED,
  CLOSE_LOGIN_SNACKBAR
} from '../constants'

/**
 * @author  Pragya Gupta
 *
 */

const initialState = {
  showFailSnackbar: false,
  showSpinner: false
}

const loginForm = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_FORM_SUBMIT:
      return Object.assign(
        {},
        { ...state },
        {
          email: action.email,
          password: action.password
        },
        { showSpinner: true }
      )

    case LOGIN_FORM_SUBMIT_SUCCESS:
      return Object.assign({}, { ...state }, { showSpinner: false })

    case LOGIN_FORM_SUBMIT_FAILED:
      return Object.assign(
        {},
        { ...state },
        { showSpinner: false, showFailSnackbar: true }
      )

    case CLOSE_LOGIN_SNACKBAR:
      return Object.assign({}, state, { showFailSnackbar: false })

    default:
      return state
  }
}

export default loginForm
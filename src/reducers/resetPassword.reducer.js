import { RESET_PASSWORD_FORM_SUBMIT } from '../constants'

/**
 * @author  Pragya Gupta
 *
 */

const initialState = {
  email: ''
}

const resetPassword = (state = initialState, action) => {
  switch (action.type) {
    case RESET_PASSWORD_FORM_SUBMIT:
      return Object.assign(
        {},
        { ...state },
        {
          email: action.email
        }
      )

    default:
      return state
  }
}

export default resetPassword

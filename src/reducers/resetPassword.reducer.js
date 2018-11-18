import { 
  RESET_PASSWORD_FORM_SUBMIT,  
  RESET_PASSWORD_SUBMIT_SUCCESS,
  RESET_PASSWORD_SUBMIT_FAILED,
  HIDE_RESET_PASSWORD_SNACKBAR
 } from '../constants'

/**
 * @author  Pragya Gupta
 *
 */

const initialState = {
  showResetPassSnackbar: false,
  showResetFailSnackbar: false
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
    
    case RESET_PASSWORD_SUBMIT_SUCCESS:
      return Object.assign({}, { ...state }, { showResetPassSnackbar: true })

    case RESET_PASSWORD_SUBMIT_FAILED:
      return Object.assign({}, { ...state }, { showResetFailSnackbar: true })
    
    case HIDE_RESET_PASSWORD_SNACKBAR:
      return Object.assign(
        {},
        { ...state },
        { showResetPassSnackbar: false, showResetFailSnackbar: false }
      )    

    default:
      return state
  }
}

export default resetPassword
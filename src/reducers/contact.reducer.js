import {
  CONTACT_FORM_SUBMIT,
  HIDE_CONTACT_SNACKBAR,
  CONTACT_FORM_SUBMIT_SUCCESS,
  CONTACT_FORM_SUBMIT_FAILED
} from '../constants'

/**
 * @author  Pragya Gupta
 *
 */

const initialState = {
  showContactSnackbar: false,
  showContactFailSnackbar: false
}

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONTACT_FORM_SUBMIT:
      return Object.assign(
        {},
        { ...state },
        {
          email: action.email,
          name: action.name,
          phone: action.phone,
          message: action.message
        }
      )

    case CONTACT_FORM_SUBMIT_SUCCESS:
      return Object.assign({}, { ...state }, { showContactSnackbar: true })

    case CONTACT_FORM_SUBMIT_FAILED:
      return Object.assign({}, { ...state }, { showContactFailSnackbar: true })

    case HIDE_CONTACT_SNACKBAR:
      return Object.assign(
        {},
        { ...state },
        { showContactSnackbar: false, showContactFailSnackbar: false }
      )

    default:
      return state
  }
}

export default contactReducer
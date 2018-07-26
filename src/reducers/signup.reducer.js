import { FRONT_PAGE_FORM_SUBMIT } from '../constants'

/**
 * @author  Pragya Gupta
 *
 */

const initialState = {
  firstname: '',
  lastname: '',
  email:''
}

const signupForm = (state = initialState, action) => {
  switch (action.type) {
    case FRONT_PAGE_FORM_SUBMIT:
      return Object.assign({}, { ...state }, {
        email: action.email, firstname: action.firstname, lastname: action.lastname
      })
      
  default: return state
  }
}

export default signupForm
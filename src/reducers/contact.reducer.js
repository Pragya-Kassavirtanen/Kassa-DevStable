import { CONTACT_FORM_SUBMIT } from '../constants'

/**
 * @author  Pragya Gupta
 *
 */

const initialState = {
  name: '',
  phone: '',
  email:'',
  message:''
}

const contactForm = (state = initialState, action) => {
  switch (action.type) {
    case CONTACT_FORM_SUBMIT:
      return Object.assign({}, { ...state }, {
        email: action.email, name: action.name, phone: action.phone, message: action.message
      })
      
  default: return state
  }
}

export default contactForm
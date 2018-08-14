import{ connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import PasswordComponent from '../../components/tax/password.component'
import {closePasswordSnackbar, passwordUpdate} from '../../actions/index'
import { passwordValidate as validate } from '../validate'

let PasswordContainer = reduxForm({
  form: 'password',
  destroyOnUnmount: false,
  validate
})(PasswordComponent)


const mapStateToProps = state => {

  return {   
    showSnackbar: state.tax.showSnackbar,
    showFailSnackbar: state.tax.showFailSnackbar,
    state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,   
    passwordUpdate: () => dispatch(passwordUpdate()),
    closePasswordSnackbar: () => dispatch(closePasswordSnackbar())    
  }
}

// TODO: employ react-html-email to send a tax card to the administrator
// and save it to the backend
PasswordContainer = connect(mapStateToProps, mapDispatchToProps)(PasswordContainer)

export default PasswordContainer

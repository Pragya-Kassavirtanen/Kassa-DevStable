import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import Login from '../components/account/login.component'
import { closeLoginSnackbar } from '../actions/index'

import { registerValidate as validate } from './validate'
import { registerAsyncValidate as asyncValidate } from './asyncValidate'

/**
 * @author  Pragya Gupta
 *
 */

// Return a new decorated component
let LoginContainer = reduxForm({
  form: 'login',
  validate,
  asyncValidate
})(Login)

const mapStateToProps = state => {
  return {
    loginForm: state.loginForm,
    showSpinner: state.login.showSpinner,
    showFailSnackbar: state.login.showFailSnackbar,
    state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    // loginFormSubmit: (email, password) => dispatch(loginFormSubmit(email, password)),   
    closeLoginSnackbar: () => dispatch(closeLoginSnackbar())    
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) =>
  Object.assign({}, stateProps, dispatchProps, ownProps)

LoginContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(LoginContainer)

export default LoginContainer
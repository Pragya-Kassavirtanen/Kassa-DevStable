import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import ResetPassword from '../components/account/resetPassword.component'
import { resetPasswordValidate as validate } from './validate'
import {
  resetPasswordFormSubmit  
} from '../actions/index'

let ResetPasswordContainer = reduxForm({
  form: 'resetPassword',
  destroyOnUnmount: false,
  initialValues: {    
    email: ''
  }, 
  validate  
})(ResetPassword)

const mapStateToProps = state => {
  return {   
    state    
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    resetPasswordFormSubmit: () => dispatch(resetPasswordFormSubmit())    
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) =>
  Object.assign({}, stateProps, dispatchProps, ownProps)

  ResetPasswordContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ResetPasswordContainer)

export default ResetPasswordContainer
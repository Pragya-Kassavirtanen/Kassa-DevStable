import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import Contact from '../../components/website/contact.component'
import { contactInfoValidate as validate } from '../../containers/validate'
import {
  contactFormSubmit  
} from '../../actions/index'

let ContactContainer = reduxForm({
  form: 'contact',
  destroyOnUnmount: false,
  initialValues: {
    name: '',
    email: ''
  }, 
  validate  
})(Contact)

const mapStateToProps = state => {
  return {   
    state    
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    contactFormSubmit: () => dispatch(contactFormSubmit())    
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) =>
  Object.assign({}, stateProps, dispatchProps, ownProps)

  ContactContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ContactContainer)

export default ContactContainer
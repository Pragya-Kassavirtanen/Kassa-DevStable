import{ connect } from 'react-redux'
import { reduxForm, getFormValues } from 'redux-form'
import { postYelStart, getYelStart, closeYelSnackbar } from '../../actions/index'

import { yelValidate as validate } from '../validate'

import Yel from '../../components/tax/yel.component'

let YelContainer = reduxForm({
  form: 'yel',
  destroyOnUnmount: false,
  initialValues: {
    yel_income: '',    
    yelSelect: 'yel_self',
    firsttime_enterprenuer: false,
    age_group: ''
  },
  validate
})(Yel)

const mapStateToProps = state => {

  const formValues = getFormValues('yel')(state)  

  return {    
    showFirstTimer: formValues.yelSelect === 'yel_recommended' || formValues.yelSelect === 'yel_minimum',
    showYelSnackbar: state.tax.showYelSnackbar,
    showYelFailSnackbar: state.tax.showYelFailSnackbar    
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    postYelStart: () => dispatch(postYelStart()),
    getYelStart: () => dispatch(getYelStart()),
    closeYelSnackbar: () => dispatch(closeYelSnackbar())
  }
}

YelContainer = connect(mapStateToProps, mapDispatchToProps)(YelContainer)

export default YelContainer

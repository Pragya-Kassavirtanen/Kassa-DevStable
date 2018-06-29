import{ connect } from 'react-redux'
import { reduxForm, getFormValues } from 'redux-form'
import { postYelStart, getYelStart } from '../../actions/index'

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
  /* const showSelectors = (
    parseInt(formValues.income) > 7645 &&
    parseInt(formValues.income) < 173625 &&
    /^[0-9]*$/i.test(formValues.income) &&
    !!formValues.ageGroup
  ) */
  /* if (!showSelectors) formValues.yelSelect = 'payByMyself'

  const selectedYelGroup = state.tax.yel.filter(el => formValues.ageGroup === (el.min_age))
                                        .filter(el => !!formValues.firstTimeEntrepreneur === !!el.discount_percent)
                                        .pop()
  const showYelCounter = !!selectedYelGroup */

  return {
    //showYel: showSelectors,   
    //income: formValues.income,
    //showFirstTimer: formValues.yelSelect  === 'payByDefaults' && showSelectors,

    showFirstTimer: formValues.yelSelect === 'yel_recommended' || formValues.yelSelect === 'yel_minimum'
 
    //showYelCounter: showYelCounter,
    //selectedYelGroup: selectedYelGroup
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    postYelStart: () => dispatch(postYelStart()),
    getYelStart: () => dispatch(getYelStart())
  }
}

YelContainer = connect(mapStateToProps, mapDispatchToProps)(YelContainer)

export default YelContainer

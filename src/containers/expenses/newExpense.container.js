import React from 'react'

import { connect } from 'react-redux'
import { reduxForm, change, getFormValues } from 'redux-form'

import { MenuItem } from 'material-ui'

import NewExpenseComponent from '../../components/expenses/newExpense.component'
import DateTimeFormat from '../../utils/DateTimeFormat'

import { expenseValidate as validate } from '../validate'

import {
  addExpenseRow,
  removeExpenseRow,
  saveExpense,
  closeExpenseSnackBar,
  saveExpenseUpdate,
  cancelExpenseUpdate,
  changeExpensePurchaseDate 
} from '../../actions/index'

const date = new Date()
let newExpenseContainer = reduxForm({
  form: 'newfee',
  destroyOnUnmount: false,
  initialValues: {
    invoice: '',
    place_of_purchase: '',   
    date_of_purchase: date,
    expenseInputRow: [{
      description: '',
      sum: '',
      vat: 24,
      key: '0'
    }],
    receipt_picture: ''
  },
  validate  
}
)(NewExpenseComponent)

const mapStateToProps = (state) => {

  const formValues = getFormValues('newfee')(state)
  const expenseInputRow = state.expense.expenseInputRow  

/*   expenseInputRow.forEach(el => {
    if (!formValues['expenseInputRow'][el.key]) {
      formValues['expenseInputRow'][el.key] = {}     
      formValues['expenseInputRow'][el.key][`vat${el.key}`] = 24
    }
  }) */

  if (formValues) {
    formValues['expenseInputRow'] = formValues['expenseInputRow'].filter(x => expenseInputRow.filter(y => y.key === x.key).length > 0)

    expenseInputRow.forEach(el => {
      !formValues['expenseInputRow'][el.key] &&
        (formValues['expenseInputRow'][el.key] = 
        { description :'', sum : '', vat : 24, key : el.key })})
    }else {
      state.expense.expenseInputRow = state.expense.expenseInputRow.slice(0,1) 
    }

    //Filter invoiceNames as per invoicepaid to be False
    const validInvoiceNames = state.invoice.invoices.filter(el => el.invoicepaid === 0)    
    const invoiceNames = validInvoiceNames.map((item, index) =>
    <MenuItem key={index} value={item} primaryText={item.company_name + ' ' + new DateTimeFormat('fi', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
  }).format(new Date(item.due_date)) + ' ' + item.total_sum + '€'}/>)
  return {
    user: state.oidc.user,
    invoices: invoiceNames,    
    //expenseRows: state.expense.expenseInputRow,
    expenseRows: expenseInputRow,
    showSpinner: state.expense.showSpinner,
    showSnackbar: state.expense.showSnackbar,    
    isEdit: state.expense.isEdit    
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    addExpenseRow: () => dispatch(addExpenseRow()),
    removeExpenseRow: (key) => dispatch(removeExpenseRow(key)),
    saveExpense: () => dispatch(saveExpense()),
    expensePictureUpload: fileName => dispatch(change('newfee', 'receipt_picture', fileName)),
    closeSnackbar: () => dispatch(closeExpenseSnackBar()),
    saveExpenseUpdate: () => dispatch(saveExpenseUpdate()),
    cancelExpenseUpdate: () => dispatch(cancelExpenseUpdate()),
    changeExpensePurchaseDate: (date) => dispatch(changeExpensePurchaseDate(date))    
  }
}

const mergeProps = ( stateProps, dispatchProps, ownProps ) => Object.assign({}, stateProps, dispatchProps, ownProps)

newExpenseContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(newExpenseContainer)

export default newExpenseContainer

import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import {
  newCustomer,
  getCustomersStart,
  customerPageChange,
  removeCustomer,
  updateCustomer,
  getCustomerByIdSuccess,
  saveCustomerUpdate,
  cancelCustomerUpdate,
  addNewCustomerInvoice,
  closeCustomerSnackBar,
  getEinvoiceOperator
} from '../../actions/index'

import { customerValidate as validate } from '../validate'
import CustomerComponent from '../../components/customer/customer.component'

import { countryItems, invoiceItems } from '../../utils/invoice.utils'

let CustomerContainer = reduxForm({
  form: 'customer',
  destroyOnUnmount: false,
  initialValues: {
    country: 'Suomi',
    delivery_method: ''
  }, 
  validate  
})(CustomerComponent)

const mapStateToProps = state => {
  return {
    countryItems,
    invoiceItems,
    customerRows: state.customer.customerRows,
    customerPages: !!state.customer.customers
      ? Math.ceil(state.customer.customers.length / 10)
      : 0,
    isEdit: state.customer.isEdit,  
    customer_id: state.customer.customerEdit.customer_id,
    showSnackbar: state.customer.showSnackbar,
    showFailSnackbar: state.customer.showFailSnackbar,
    eInvoiceOperators: state.customer.eInvoiceOperators,
    state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    newCustomer: () => dispatch(newCustomer()),    
    getCustomersStart: () => dispatch(getCustomersStart()),
    customerPageChange: selected => dispatch(customerPageChange(selected)),
    removeCustomer: customer_id => dispatch(removeCustomer(customer_id)),
    updateCustomer: customer_id => dispatch(updateCustomer(customer_id)),
    getCustomerByIdSuccess: result => dispatch(getCustomerByIdSuccess(result)),
    saveCustomerUpdate: customer_id => dispatch(saveCustomerUpdate(customer_id)),
    cancelCustomerUpdate: () => dispatch(cancelCustomerUpdate()),
    addNewCustomerInvoice: customer_id => dispatch(addNewCustomerInvoice(customer_id)),
    closeCustomerSnackBar: () => dispatch(closeCustomerSnackBar()),
    getEinvoiceOperator: () => dispatch(getEinvoiceOperator())
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) =>
  Object.assign({}, stateProps, dispatchProps, ownProps)

CustomerContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  CustomerContainer
)

export default CustomerContainer

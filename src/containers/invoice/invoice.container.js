import { connect } from 'react-redux'
import { reduxForm, getFormValues, change } from 'redux-form'

import NewInvoice from '../../components/invoice/invoice.component'

import { invoiceValidate as validate } from '../validate'

import {
  addInvoiceRow,
  removeInvoiceRow,
  getInvoicesStart,
  getProfessions,
  getFinvoiceOperator,
  onInvoiceReview,
  invoicePageChange,
  changeInvoiceBillingDate,
  editInvoice,
  getInvoiceByIdSuccess,
  cancelEditInvoice,
  clearInvoiceOptions,
  showTooltip,
  hideTooltip
} from '../../actions'
import DateTimeFormat from '../../utils/DateTimeFormat'
import {
  countryItems,
  invoiceItems,
  unitItems,
  overdueItems,
  alvItems,
  alvPercentageItems
} from '../../utils/invoice.utils'

/**
 * The high order container for the invoice component
 *
 * @author  Skylar Kong
 *
 */

let date = new Date()
let NewInvoiceContainer = reduxForm({
  form: 'invoice',
  destroyOnUnmount: false,
  initialValues: {
    description: '',
    job_title: 'Tapaturmavakuutus',
    invoice_reference: '',
    billing_date: new Date(),
    due_date: new DateTimeFormat('fi', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    }).format(date.setDate(date.getDate() + 14)),
    overdue: 14,
    instant_payment: '',
    status: 0,
    country: 'Suomi',
    company_name: '',
    business_id: '',
    person_to_contact: '',
    person_to_contact_email: '',
    delivery_address: '',
    zip_code: '',
    city: '',
    web_invoice: '',
    delivery_method: 'Sähköposti',
    rows: [
      {
        description: '',
        quantity: '',
        unit: 'kpl',
        quantity_price: '',
        vat_percent: 24,
        sum_tax_free: new Intl.NumberFormat('fi-FI', {
          style: 'currency',
          currency: 'EUR'
        }).format(0)
      }
    ]
  },
  validate
})(NewInvoice)

// To be called every time when the store is updated
const mapStateToProps = state => {
  const formValues = getFormValues('invoice')(state)
  const invoiceInputRows = state.invoice.invoiceInputRows
  const billingDate = !!state.invoice.billing_date
    ? state.invoice.billing_date
    : new Date()
  formValues.billing_date = billingDate
  formValues.due_date = dueDate(formValues.overdue, billingDate)
  // FIXME: TO BE REFACTORED
  let totalSum = 0

  for (let r of Object.keys(formValues['rows'])) {
    !invoiceInputRows.reduce((sum, value) => {
      return value.key === r || sum
    }, false) && delete formValues['rows'][r]
  }

  invoiceInputRows.forEach(el => {
    if (!formValues['rows'][el.key]) {
      formValues['rows'][el.key] = {}
      formValues['rows'][el.key]['description'] = ''
      formValues['rows'][el.key]['quantity'] = ''
      formValues['rows'][el.key]['unit'] = 'kpl'
      formValues['rows'][el.key]['quantity_price'] = ''
      formValues['rows'][el.key]['vat_percent'] = 24
    }

    const quantity = formValues['rows'][el.key]['quantity'] || '0'
    const formQuantity = parseFloat(quantity.replace(/,/g, '.'))

    const quantityPrice = formValues['rows'][el.key]['quantity_price'] || '0'
    const formQuantityPrice = parseFloat(quantityPrice.replace(/,/g, '.'))

    const sum = formQuantity * formQuantityPrice
    const vat = formValues['rows'][el.key]['vat_percent'] / 100

    formValues['rows'][el.key]['sum_tax_free'] = new Intl.NumberFormat(
      'fi-FI',
      {
        style: 'currency',
        currency: 'EUR'
      }
    ).format(sum)

    formValues['rows'][el.key]['vat'] = new Intl.NumberFormat('fi-FI', {
      style: 'currency',
      currency: 'EUR'
    }).format(sum * vat)

    formValues['rows'][el.key]['sum_with_vat'] = new Intl.NumberFormat(
      'fi-FI',
      {
        style: 'currency',
        currency: 'EUR'
      }
    ).format(sum * (vat + 1))

    formValues['rows'][el.key]['vat_percent_description'] = `${
      formValues['rows'][el.key]['vat_percent']
    } %`
    //TODO figure out if vat is wanted to be shown or not
    totalSum += sum * (vat + 1)
  })

  formValues['total_sum'] = totalSum

  return {
    user: state.oidc.user,
    invoiceInputRows: invoiceInputRows,
    invoiceRows: state.invoice.invoiceRows,
    customers: state.invoice.customers,
    countryItems,
    invoiceItems,
    overdueItems,
    unitItems,
    alvItems,
    alvPercentageItems,
    titleItems: state.invoice.titleItems,
    invoiceOperators: state.invoice.invoiceOperators,
    invoicePages: Math.ceil(state.invoice.invoices.length / 10),
    isEdit: state.invoice.isEdit,
    noMenu: state.customer.noMenu,
    hoveredTooltip: state.invoice.hoveredTooltip
  }
}

const dueDate = (overdue, billingDate) => {
  let date = new Date(billingDate.valueOf())
  return new DateTimeFormat('fi', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
  }).format(date.setDate(billingDate.getDate() + overdue))
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    getInvoicesStart: () => dispatch(getInvoicesStart()),
    getProfessions: () => dispatch(getProfessions()),
    getFinvoiceOperator: () => dispatch(getFinvoiceOperator()),
    addInvoiceRow: copy => dispatch(addInvoiceRow(copy)),
    removeInvoiceRow: () => dispatch(removeInvoiceRow()),
    onInvoiceReview: () => dispatch(onInvoiceReview()),
    invoicePageChange: selected => dispatch(invoicePageChange(selected)),
    changeInvoiceBillingDate: date => dispatch(changeInvoiceBillingDate(date)),
    selectInvoiceCustomer: customer =>
      Object.keys(customer).forEach(key =>
        dispatch(change('invoice', key, customer[key]))
      ),
    editInvoice: invoice_id => dispatch(editInvoice(invoice_id)),
    cancelEditInvoice: () => dispatch(cancelEditInvoice()),
    getInvoiceByIdSuccess: result => dispatch(getInvoiceByIdSuccess(result)),
    clearInvoiceOptions: () => dispatch(clearInvoiceOptions()),
    showTooltip: () => dispatch(showTooltip()),
    hideTooltip: () => dispatch(hideTooltip())
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) =>
  Object.assign({}, stateProps, dispatchProps, ownProps)

NewInvoiceContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(NewInvoiceContainer)

export default NewInvoiceContainer
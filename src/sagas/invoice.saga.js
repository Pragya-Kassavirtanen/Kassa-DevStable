import { takeEvery, put, call } from 'redux-saga/effects'
import { getFormValues, reset, change } from 'redux-form'
import {
  GET_INVOICES_START,
  API_SERVER,
  SAVE_AND_SEND_INVOICE,
  COPY_INVOICE,
  REMOVE_INVOICE,
  SAVE_INVOICE_DRAFT,
  EDIT_INVOICE,
  CANCEL_EDIT_INVOICE
} from '../constants'
import {
  getInvoicesSuccess,
  getInvoicesFailed,
  saveInvoiceSuccess,
  saveInvoiceFailed,
  emptyInvoiceRows,
  addInvoiceRow,
  //saveAndSendInvoice,
  getInvoiceByIdSuccess,
  copyInvoiceSuccess
  //downloadPDFSuccess
} from '../actions/index'
import { apiManualPost, apiManualRequest, apiBlobPost 
} from '../utils/request'
import { formatFiToISO } from '../utils/DateTimeFormat'
import DateTimeFormat from '../utils/DateTimeFormat'
import { nestProperties } from '../utils/invoice.utils'
import store from '../store'

/**
 * @author Skylar Kong
 */

function* getInvoiceSaga() {
  try {
    const invoiceUrl = `${API_SERVER}/GetInvoices`
    const customerUrl = `${API_SERVER}/GetCustomers`
    const invoiceResult = yield apiManualRequest(invoiceUrl)
    const customerResult = yield apiManualRequest(customerUrl)

    if (invoiceResult.data && customerResult.data)
      yield put(getInvoicesSuccess(invoiceResult.data, customerResult.data))
  } catch (e) {
    yield put(getInvoicesFailed(e))
  }
}

function* saveAndSendInvoiceSaga() {
  try {
    const url = `${API_SERVER}/AddInvoice`
    const formValues = getFormValues('invoiceReview')(store.getState())

    formValues.due_date = formatFiToISO(formValues.due_date.split('.'))
    formValues.billing_date = formatFiToISO(formValues.billing_date.split('.'))

    const rows = formValues.rows

    rows[Symbol.iterator] = function*() {
      const keys = Reflect.ownKeys(this)
      for (const key of keys) {
        yield this[key]
      }
    }

    const body = JSON.parse(
      JSON.stringify({
        ...formValues
      })
    )

    body.instant_payment = !!formValues.instant_payment

    let bodyRows = []
    const l = Array.isArray(body.rows)
      ? body.rows.length
      : Object.keys(body.rows).length
    for (let i = 0; i < l; i++) {
      body.rows[i].description = body.rows[i]['description']
      body.rows[i].quantity = body.rows[i]['quantity']
      body.rows[i].quantity_price = parseFloat(
        body.rows[i]['quantity_price'].replace(/,/g, '.')
      ).toString()
      body.rows[i].sum_tax_free = parseFloat(
        body.rows[i]['sum_tax_free'].replace(/,/g, '.').replace(/\s/g, '')
      ).toString()
      body.rows[i].sum_tax_vat = body.rows[i]['sum_tax_vat']
      body.rows[i].unit = body.rows[i]['unit']
      body.rows[i].vat_percent = body.rows[i]['vat_percent']
      body.rows[i].vat = parseFloat(
        body.rows[i].vat.replace(/,/g, '.').replace(/\s/g, '')
      )
      body.rows[i].vat_percent_description =
        body.rows[i]['vat_percent_description']
      body.rows[i].start_date = formatFiToISO(
        new DateTimeFormat('fi', {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric'
        })
          .format(new Date(body.rows[i]['start_date']))
          .split('.')
      )
      body.rows[i].end_date = formatFiToISO(
        new DateTimeFormat('fi', {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric'
        })
          .format(new Date(body.rows[i]['end_date']))
          .split('.')
      )

      bodyRows[i] = body.rows[i]
    }

    body.rows = bodyRows

    const nestedBody = nestProperties(body, 'Invoice', [
      'description',
      'job_title',
      'invoice_reference',
      'billing_date',
      'due_date',
      'overdue',
      'total_sum',
      'instant_payment',
      'status',
      'rows'
    ])

    // FIXME: prevent success happening when error occures
    const result = yield call(apiManualPost, url, JSON.stringify(nestedBody))

    yield put(reset('invoice'))
    yield put(change('invoice', 'rows', {}))
    yield put(emptyInvoiceRows())
    yield put(saveInvoiceSuccess(result))
  } catch (e) {
    yield put(saveInvoiceFailed(e))
  }
}

/* function* saveInvoiceDraft() {
  yield put(change('invoiceReview', 'status', 0))
  yield put(change('invoice', 'status', 0))
  yield put(saveAndSendInvoice())
} */

 function* saveInvoiceDraft({ invoice_id }) {  
  try {
    const url = `${API_SERVER}/GenerateInvoicePDF`
    const body = JSON.stringify({
      invoice_id: invoice_id
    })
    yield call(apiBlobPost, url, body)
  } catch (e) {
    console.warn(e)
  }
}

function* removeInvoiceSaga({ invoice_id }) {
  try {
    const url = `${API_SERVER}/DeleteInvoice`
    const body = JSON.stringify({
      invoice_id: invoice_id
    })
    yield call(apiManualPost, url, body)
  } catch (e) {}
}

function* editInvoiceSaga({ invoice_id }) {
  try {
    const url = `${API_SERVER}/GetInvoiceByInvoiceID`
    const body = JSON.stringify({
      invoice_id: invoice_id
    })
    const result = yield call(apiManualPost, url, body)
    if (result.data) yield put(getInvoiceByIdSuccess(result.data))

    const invoiceResult = JSON.parse(result.data)

    const customerInfoKeys = Object.keys(invoiceResult[0]).filter(
      key => key !== 'Invoice'
    )

    //dispatch customer data to redux form
    for (let key of customerInfoKeys) {
      yield put(change('invoice', key, invoiceResult[0][key]))
    }

    const invoiceInfoKeys = Object.keys(invoiceResult[0].Invoice[0]).filter(
      key => key !== 'rows'
    )

    //dispatch invoice data to redux form
    for (let key of invoiceInfoKeys) {
      yield put(change('invoice', key, invoiceResult[0].Invoice[0][key]))
    }

    yield put(change('invoice', 'status', 1))

    yield put(emptyInvoiceRows())

    const occurences = invoiceResult[0].Invoice[0].rows.filter(
      el => el.invoice_item_id
    ).length

    //dispatch invoice rows to redux form
    const l = invoiceResult[0].Invoice[0].rows.slice(0, occurences).length

    for (let i = 0; i < l; i++) {
      yield put(addInvoiceRow(true))
      yield put(
        change(
          'invoice',
          `rows.${i}.description`,
          invoiceResult[0].Invoice[0].rows.slice(0, occurences)[i].description
        )
      )
      yield put(
        change(
          'invoice',
          `rows.${i}.end_date`,
          new Date(
            invoiceResult[0].Invoice[0].rows.slice(0, occurences)[i].end_date
          )
        )
      )
      yield put(
        change(
          'invoice',
          `rows.${i}.start_date`,
          new Date(
            invoiceResult[0].Invoice[0].rows.slice(0, occurences)[i].start_date
          )
        )
      )
      yield put(
        change(
          'invoice',
          `rows.${i}.quantity`,
          JSON.stringify(
            invoiceResult[0].Invoice[0].rows.slice(0, occurences)[i].quantity
          )
        )
      )
      yield put(
        change(
          'invoice',
          `rows.${i}.quantity_price`,
          JSON.stringify(
            invoiceResult[0].Invoice[0].rows.slice(0, occurences)[i]
              .quantity_price
          )
        )
      )
      yield put(
        change(
          'invoice',
          `rows.${i}.unit`,
          invoiceResult[0].Invoice[0].rows.slice(0, occurences)[i].unit
        )
      )
      yield put(
        change(
          'invoice',
          `rows.${i}.vat_percent`,
          invoiceResult[0].Invoice[0].rows.slice(0, occurences)[i].vat_percent
        )
      )
    }
  } catch (e) {}
}

function* copyInvoiceSaga({ invoice_id }) {
  try {
    const invoiceUrl = `${API_SERVER}/CopyInvoiceByInvoiceID`
    const body = JSON.stringify({
      invoice_id: invoice_id
    })

    //api calls for invoice data
    const result = yield call(apiManualPost, invoiceUrl, body)

    if (result.data) yield put(copyInvoiceSuccess(result.data))

    const invoiceResult = JSON.parse(result.data)

    const customerInfoKeys = Object.keys(invoiceResult[0]).filter(
      key => key !== 'Invoice'
    )

    //dispatch customer data to redux form
    for (let key of customerInfoKeys) {
      yield put(change('invoice', key, invoiceResult[0][key]))
    }

    const invoiceInfoKeys = Object.keys(invoiceResult[0].Invoice[0]).filter(
      key => key !== 'rows'
    )

    //dispatch invoice data to redux form
    for (let key of invoiceInfoKeys) {
      yield put(change('invoice', key, invoiceResult[0].Invoice[0][key]))
    }

    yield put(change('invoice', 'status', 1))

    yield put(emptyInvoiceRows())

    const occurences = invoiceResult[0].Invoice[0].rows.filter(
      el => el.invoice_item_id
    ).length

    //dispatch invoice rows to redux form
    const l = invoiceResult[0].Invoice[0].rows.slice(0, occurences).length

    for (let i = 0; i < l; i++) {
      yield put(addInvoiceRow(true))
      yield put(
        change(
          'invoice',
          `rows.${i}.description`,
          invoiceResult[0].Invoice[0].rows.slice(0, occurences)[i].description
        )
      )
      yield put(
        change(
          'invoice',
          `rows.${i}.end_date`,
          new Date(
            invoiceResult[0].Invoice[0].rows.slice(0, occurences)[i].end_date
          )
        )
      )
      yield put(
        change(
          'invoice',
          `rows.${i}.start_date`,
          new Date(
            invoiceResult[0].Invoice[0].rows.slice(0, occurences)[i].start_date
          )
        )
      )
      yield put(
        change(
          'invoice',
          `rows.${i}.quantity`,
          JSON.stringify(
            invoiceResult[0].Invoice[0].rows.slice(0, occurences)[i].quantity
          )
        )
      )
      yield put(
        change(
          'invoice',
          `rows.${i}.quantity_price`,
          JSON.stringify(
            invoiceResult[0].Invoice[0].rows.slice(0, occurences)[i]
              .quantity_price
          )
        )
      )
      yield put(
        change(
          'invoice',
          `rows.${i}.unit`,
          invoiceResult[0].Invoice[0].rows.slice(0, occurences)[i].unit
        )
      )
      yield put(
        change(
          'invoice',
          `rows.${i}.vat_percent`,
          invoiceResult[0].Invoice[0].rows.slice(0, occurences)[i].vat_percent
        )
      )
    }
  } catch (e) {
    console.warn(e)
  }
}

function* cancelEditInvoiceSaga() {
  try {    
     yield put(reset('invoice'))
  } catch (e) {
   console.warn(e)
  }    
}

// Spawn a new getInvoiceSaga task on each GET_INVOICES_START
export function* watchGetInvoiceSaga() {
  yield takeEvery(GET_INVOICES_START, getInvoiceSaga)
}

export function* watchSaveAndSendInvoiceSaga() {
  yield takeEvery(SAVE_AND_SEND_INVOICE, saveAndSendInvoiceSaga)
}

export function* watchRemoveInvoiceSaga() {
  yield takeEvery(REMOVE_INVOICE, removeInvoiceSaga)
}

export function* watchCopyInvoice() {
  yield takeEvery(COPY_INVOICE, copyInvoiceSaga)
}

export function* watchSaveInvoiceDraft() {
  yield takeEvery(SAVE_INVOICE_DRAFT, saveInvoiceDraft)
}

export function* watchEditInvoice() {
  yield takeEvery(EDIT_INVOICE, editInvoiceSaga)
}

export function* watchCancelEditInvoice() {
  yield takeEvery(CANCEL_EDIT_INVOICE, cancelEditInvoiceSaga)
}
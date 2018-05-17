import { takeEvery, put, call } from 'redux-saga/effects'
import { getFormValues, reset, change } from 'redux-form'
import {
  GET_INVOICES_START,
  API_SERVER,
  SAVE_AND_SEND_INVOICE,
  COPY_INVOICE,
  REMOVE_INVOICE,
  SAVE_INVOICE_DRAFT} from '../constants'
import { getInvoicesSuccess,
         getInvoicesFailed,
         saveInvoiceSuccess,
         saveInvoiceFailed,
         emptyInvoiceRows,
         addInvoiceRow,
         saveAndSendInvoice
} from '../actions/index'
import { apiPost, apiRequest, apiManualPost, apiManualRequest } from '../utils/request'
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

    formValues.due_date = formatFiToISO((formValues.due_date).split('.'))
    formValues.billing_date = formatFiToISO((formValues.billing_date).split('.'))

    const rows = formValues.rows
   
    rows[Symbol.iterator] = function* () {
      const keys = Reflect.ownKeys(this)
      for (const key of keys) {
        yield this[key]
      }
    }    

    const body = JSON.parse(JSON.stringify({
      ...formValues     
    }))
   

    body.instant_payment = !!formValues.instant_payment    

    let bodyRows = []
    const l = Array.isArray(body.rows) ? body.rows.length : Object.keys(body.rows).length
    for(let i = 0; i < l; i++) {
      body.rows[i].description = body.rows[i]['description']
      body.rows[i].quantity = body.rows[i]['quantity']     
      body.rows[i].quantity_price = parseFloat(body.rows[i]['quantity_price'].replace(/,/g, '.')).toString()
      body.rows[i].sum_tax_free =  parseFloat(body.rows[i]['sum_tax_free'].replace(/,/g, '.').replace(/\s/g, '')).toString()     
      body.rows[i].sum_tax_vat = body.rows[i]['sum_tax_vat']
      body.rows[i].unit = body.rows[i]['unit']
      body.rows[i].vat_percent = body.rows[i]['vat_percent']
      body.rows[i].vat = body.rows[i]['vat']
      body.rows[i].vat_percent_description = body.rows[i]['vat_percent_description']
      body.rows[i].start_date = formatFiToISO((new DateTimeFormat('fi', {day: 'numeric', month: 'numeric', year: 'numeric'}).format(new Date(body.rows[i]['start_date']))).split('.'))
      body.rows[i].end_date = formatFiToISO((new DateTimeFormat('fi', {day: 'numeric', month: 'numeric', year: 'numeric'}).format(new Date(body.rows[i]['end_date']))).split('.'))
      
      bodyRows[i] = body.rows[i]
    }    
    
    body.rows = bodyRows      

    const nestedBody = nestProperties(body,'customer', [ 
      'country',
      'company_name',
      'business_id',
      'person_to_contact',
      'person_to_contact_email',
      'delivery_address',
      'zip_code',
      'city',
      'web_invoice',
      'delivery_method'
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

function* saveInvoiceDraft() {
  yield put(change('invoiceReview', 'status', 0))
  yield put(change('invoice', 'status', 0))
  yield put(saveAndSendInvoice())
}

function* removeInvoiceSaga({ id }) {
  try {
    //TODO: send request to backend to remove invoice
    const url = `${API_SERVER}/invoices`
    const body = JSON.stringify({ id: id,
      user_info_uuid: (store.getState()).profile.uuid
    })
    yield call(apiPost, url, body, 'DELETE')
  } catch (e) {

  }
}

function* copyInvoiceSaga({ id }) {
  try {
    const uuid = (store.getState()).profile.uuid
    const invoiceUrl = `${API_SERVER}/users/${uuid}/invoices/${id}`
    //api calls for invoice data
    const invoiceResult = yield call(apiRequest, invoiceUrl)
    const invoiceKeys = Object.keys(invoiceResult.data).filter(key => key !== 'rows')

    //to remove ghost elements in rowResult
    const occurences = invoiceResult.data.rows.filter(el => el.id).length

    //dispatch invoice datas to redux forms
    for(let key of invoiceKeys) {
      yield put(change('invoice', key, invoiceResult.data[key]))
    }
    yield put(change('invoice', 'status', 1))

    yield put(emptyInvoiceRows())
    //dispatch invoice rows to redux form
    const l = invoiceResult.data.rows.slice(0, occurences).length
    for (let i = 0; i < l; i++) {
      yield put(addInvoiceRow(true))
      yield put(change('invoice', `rows.${i}.description${i}`, invoiceResult.data.rows.slice(0, occurences)[i].description))
      yield put(change('invoice', `rows.${i}.end_date${i}`, new Date(invoiceResult.data.rows.slice(0, occurences)[i].end_date)))
      yield put(change('invoice', `rows.${i}.start_date${i}`, new Date(invoiceResult.data.rows.slice(0, occurences)[i].start_date)))
      yield put(change('invoice', `rows.${i}.quantity${i}`, JSON.stringify(invoiceResult.data.rows.slice(0, occurences)[i].quantity)))
      yield put(change('invoice', `rows.${i}.quantity_price${i}`, JSON.stringify(invoiceResult.data.rows.slice(0, occurences)[i].quantity_price)))
      yield put(change('invoice', `rows.${i}.unit${i}`, invoiceResult.data.rows.slice(0, occurences)[i].unit))
      yield put(change('invoice', `rows.${i}.vat_percent${i}`, invoiceResult.data.rows.slice(0, occurences)[i].vat_percent))
    }

  } catch(e) {
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

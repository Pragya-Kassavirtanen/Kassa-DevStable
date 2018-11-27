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
  CANCEL_EDIT_INVOICE,
  GET_PROFESSION,
  GET_FINVOICE_OPERATOR,
  CLEAR_INVOICE_OPTIONS,
  GENERATE_INVOICE_PDF,
  INVOICE_DOWNLOAD_PDF,
  SAVE_AND_SEND_INVOICE_PDF,
  LOCATION_CHANGE
} from '../constants'
import {
  getInvoicesSuccess,
  getInvoicesFailed,
  saveInvoiceSuccess,
  saveAndSendInvoiceSuccess,
  reviewInvoiceEditSuccess,
  saveInvoiceFailed,
  emptyInvoiceRows, 
  addInvoiceRow,
  getProfessionSuccess,
  getProfessionFailed,
  getOperatorSuccess,
  getOperatorFailed,
  saveAndSendInvoice,
  getInvoiceByIdSuccess,
  copyInvoiceSuccess,
  generateInvoicePDFSuccess,
  generateInvoicePDFFailed,
  changeInvoiceBillingDate,
  cancelEditInvoice
} from '../actions/index'
import { apiManualPost, apiManualRequest, apiBlobPost } from '../utils/request'
import { formatFiToISO } from '../utils/DateTimeFormat'
import DateTimeFormat from '../utils/DateTimeFormat'
import { nestProperties, propertyArray } from '../utils/invoice.utils'
import store from '../store'

/**
 * @author Pragya Gupta
 */

function* getInvoiceSaga() {
  try {
    const invoiceUrl = `${API_SERVER}/GetInvoices`
    const customerUrl = `${API_SERVER}/GetCustomers`

    const uuid = store.getState().client.user.data[2]
    const body = JSON.stringify({
      uuid: uuid
    })

    const invoiceResult = yield call(apiManualPost, invoiceUrl, body)
    const customerResult = yield call(apiManualPost, customerUrl, body)

    if (invoiceResult.data.status === true && customerResult.data)
      yield put(
        getInvoicesSuccess(invoiceResult.data.data, customerResult.data)
      )
  } catch (e) {
    yield put(getInvoicesFailed(e))
  }
}

function* getProfessionSaga() {
  try {
    const professionUrl = `${API_SERVER}/GetProffession`
    const professionResult = yield apiManualRequest(professionUrl)
    const parRes = JSON.parse(professionResult.data)
    const parsedResult = propertyArray(parRes, 'profession')
    if (parsedResult) yield put(getProfessionSuccess(parsedResult))
  } catch (e) {
    yield put(getProfessionFailed(e))
  }
}

function* clearInvoiceOptionSaga() {
  try {
    yield put(change('invoice', 'instant_payment', ''))
  } catch (e) {
    console.warn(e)
  }
}

function* saveAndSendInvoiceSaga() {
  try {
    const invoiceEdit = store.getState().invoice.invoiceEdit
    //console.log('saveAndSendInvoiceSaga invoiceEdit:: ', invoiceEdit)

    let url
    let invoice_id

    if (invoiceEdit.length > 0) {
      invoice_id = invoiceEdit[0].Invoice[0].invoice_id
      //console.log('invoice_id:: ', invoice_id)

      if (!!invoice_id) {
        url = `${API_SERVER}/UpdateInvoice`
      }
    } else if (invoiceEdit.length <= 0) {
      url = `${API_SERVER}/AddInvoice`
    }

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

    const uuid = store.getState().client.user.data[2]

    const body = JSON.parse(
      JSON.stringify({
        ...formValues,
        uuid: uuid
      })
    )

    const isSaveInvoiceDraft = store.getState().invoiceReviews
      .isSaveInvoiceDraft
    //console.log('isSaveInvoiceDraft:: ', isSaveInvoiceDraft)

    body.instant_payment = formValues.instant_payment
    //console.log('body.instant_payment:: ', body.instant_payment)

    //Handling SaveAsDraft & SaveAndSendInvoice Status for AddInvoice & UpdateInvoice
    if (
      isSaveInvoiceDraft === false &&
      (body.instant_payment === 'invoice_reminder' ||
        body.instant_payment === '')
    ) {
      body.status = 1
      //console.log('body.status:: ', body.status)
    } else if (
      isSaveInvoiceDraft === false &&
      body.instant_payment === 'quick_pay'
    ) {
      body.status = 3
      //console.log('body.status:: ', body.status)
    } else {
      body.status = 0
      //console.log('body.status:: ', body.status)
    }

    //console.log('Inside Saveandsend:: ', body.rows)

    const filteredBody = body.rows.filter((obj) =>(obj))

    //console.log('Inside filter:: ', body.rows.filter((obj) =>(obj)))

    let bodyRows = []
    const l = Array.isArray(filteredBody)
      ? filteredBody.length
      : Object.keys(filteredBody).length
    //console.log('Inside SAndS l: ', l)
    for (let i = 0; i < l; i++) {
      //console.log('before desc::',filteredBody[i]['description'])
      filteredBody[i].description = filteredBody[i]['description']
      //console.log('after desc:: ',filteredBody[i].description)
      filteredBody[i].quantity = parseFloat(
        filteredBody[i]['quantity'].replace(/,/g, '.')
      ).toString()
      filteredBody[i].quantity_price = parseFloat(
        filteredBody[i]['quantity_price'].replace(/,/g, '.')
      ).toString()
      filteredBody[i].sum_tax_free = parseFloat(
        filteredBody[i]['sum_tax_free'].replace(/,/g, '.').replace(/\s/g, '')
      ).toString()
      filteredBody[i].sum_tax_vat = filteredBody[i]['sum_tax_vat']
      filteredBody[i].unit = filteredBody[i]['unit']
      filteredBody[i].vat_percent = filteredBody[i]['vat_percent']
      filteredBody[i].vat = parseFloat(
        filteredBody[i].vat.replace(/,/g, '.').replace(/\s/g, '')
      )
      filteredBody[i].vat_percent_description =
        filteredBody[i]['vat_percent_description']
      filteredBody[i].start_date = formatFiToISO(
        new DateTimeFormat('fi', {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric'
        })
          .format(new Date(filteredBody[i]['start_date']))
          .split('.')
      )
      filteredBody[i].end_date = formatFiToISO(
        new DateTimeFormat('fi', {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric'
        })
          .format(new Date(filteredBody[i]['end_date']))
          .split('.')
      )

      bodyRows[i] = filteredBody[i]
    }

    body.rows = bodyRows

    let nestedBody
    if (!!invoice_id) {
      body.invoice_id = invoice_id
      nestedBody = nestProperties(body, 'Invoice', [
        'description',
        'invoice_id',
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
    } else {
      nestedBody = nestProperties(body, 'Invoice', [
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
    }

    // FIXME: prevent success happening when error occures
    const result = yield call(apiManualPost, url, JSON.stringify(nestedBody))

    if (result.data === 'Invoice updated successfully') {
      yield put(reviewInvoiceEditSuccess())
    } else if (isSaveInvoiceDraft === true){      
      const resultParsed = JSON.parse(result.data)
      yield put(saveInvoiceSuccess(resultParsed[0].invoice_id))
    } else {
      const resultParsed = JSON.parse(result.data)
      yield put(saveAndSendInvoiceSuccess(resultParsed[0].invoice_id))
    }    

    const isGenerateInvoice = store.getState().invoiceReviews.isGenerateInvoice

    if (isGenerateInvoice === true) {
      if (invoiceEdit.length <= 0) {
        invoice_id = store.getState().invoiceReviews.invoice_id
      } else if (invoiceEdit.length > 0) {
        invoice_id = invoiceEdit[0].Invoice[0].invoice_id
        //console.log('invoice_id:: ', invoice_id)
      }

      //Calling GenerateInvoicePDF API....
      const generateInvoicePDFUrl = `${API_SERVER}/GenerateInvoicePDF`
      const generateInvoicePDFBody = JSON.stringify({
        invoice_id: invoice_id,
        uuid: uuid
      })

      const generateInvoicePDFResult = yield call(
        apiManualPost,
        generateInvoicePDFUrl,
        generateInvoicePDFBody
      )
      //console.log('generateInvoicePDFResult:: ', generateInvoicePDFResult)

      if (generateInvoicePDFResult.data === 'Invoice Pdf sent successfully') {
        yield put(generateInvoicePDFSuccess(generateInvoicePDFResult.data))
      } else {
        yield put(generateInvoicePDFFailed(generateInvoicePDFResult.data))
      }
    }
    yield put(emptyInvoiceRows())
    yield put(addInvoiceRow(true))
    yield put(reset('invoiceReview'))
    yield put(reset('invoice'))    
  } catch (e) {
    yield put(saveInvoiceFailed(e))
  }
}

function* saveInvoiceDraft() {
  yield put(saveAndSendInvoice())
}

function* saveAndSendInvoicePDF() {
  yield put(saveAndSendInvoice())
}

function* generateInvoicePDF({ invoice_id }) {
  try {
    const url = `${API_SERVER}/GenerateInvoicePDF`
    const uuid = store.getState().client.user.data[2]
    const body = JSON.stringify({
      invoice_id: invoice_id,
      uuid: uuid
    })
    yield call(apiManualPost, url, body)
  } catch (e) {
    console.warn(e)
  }
}

function* invoiceDownloadPDF({ invoice_id }) {
  try {
    const url = `${API_SERVER}/InvoiceDownloadPDF`
    const uuid = store.getState().client.user.data[2]
    const body = JSON.stringify({
      invoice_id: invoice_id,
      uuid: uuid
    })
    yield call(apiBlobPost, url, body)
  } catch (e) {
    console.warn(e)
  }
}

function* removeInvoiceSaga({ invoice_id }) {
  try {
    const url = `${API_SERVER}/DeleteInvoice`
    const uuid = store.getState().client.user.data[2]
    const body = JSON.stringify({
      invoice_id: invoice_id,
      uuid: uuid
    })
    yield call(apiManualPost, url, body)
  } catch (e) {}
}

function* editInvoiceSaga({ invoice_id }) {
  try {
    //To clear the Customer Dropdown
    yield put(reset('invoice'))

    //Get Edit Invoice Info
    const url = `${API_SERVER}/GetInvoiceByInvoiceID`
    const uuid = store.getState().client.user.data[2]
    const body = JSON.stringify({
      invoice_id: invoice_id,
      uuid: uuid
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

    let billDate = invoiceResult[0].Invoice[0].billing_date
    let renewBillDate = new Date(billDate)
    yield put(change('invoice', 'billing_date', renewBillDate))
    yield put(changeInvoiceBillingDate(renewBillDate))

    let overDue = invoiceResult[0].Invoice[0].overdue
    yield put(change('invoice', 'overdue', overDue))

    let dueDate = invoiceResult[0].Invoice[0].due_date
    yield put(change('invoice', 'due_date', dueDate))

    let invoiceReference = invoiceResult[0].Invoice[0].invoice_reference
    yield put(change('invoice', 'invoice_reference', invoiceReference))

    let desc = invoiceResult[0].Invoice[0].description
    yield put(change('invoice', 'description', desc))

    let jobTitle = invoiceResult[0].Invoice[0].job_title
    yield put(change('invoice', 'job_title', jobTitle))

    let instantPayment = invoiceResult[0].Invoice[0].instant_payment
    yield put(change('invoice', 'instant_payment', instantPayment))

    let invoiceStatus = invoiceResult[0].Invoice[0].status
    yield put(change('invoice', 'status', invoiceStatus))

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

function* invoiceLocationChangeSaga() {
  try {
    const pathname = store.getState().routing.locationBeforeTransitions.pathname
    let invoiceEdit = []
    invoiceEdit = store.getState().invoice.invoiceEdit
    let isEdit = false
    isEdit = store.getState().invoice.isEdit
    if (pathname === '/dashboard/invoice/review') {
      //console.log('Need not to clear the invoice form..........')
    } else if (isEdit === true) {
      const customerInfoKeys = Object.keys(invoiceEdit[0]).filter(
        key => key !== 'Invoice'
      )
      //dispatch customer data to redux form
      for (let key of customerInfoKeys) {
        yield put(change('invoice', key, ''))
      }
      let renewBillDate = new Date()
      yield put(change('invoice', 'billing_date', renewBillDate))
      yield put(changeInvoiceBillingDate(renewBillDate))
      yield put(change('invoice', 'overdue', 14))

      let date = new Date()
      let due_date = new DateTimeFormat('fi', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
      }).format(date.setDate(date.getDate() + 14))

      yield put(change('invoice', 'due_date', due_date))

      yield put(change('invoice', 'invoice_reference', ''))
      yield put(change('invoice', 'description', ''))      
      yield put(change('invoice', 'instant_payment', ''))
      yield put(change('invoice', 'status', ''))
      yield put(emptyInvoiceRows())
      const occurences = invoiceEdit[0].Invoice[0].rows.filter(
        el => el.invoice_item_id
      ).length

      //dispatch invoice rows to redux form
      const l = invoiceEdit[0].Invoice[0].rows.slice(0, occurences).length
      let sum_tax_free = new Intl.NumberFormat('fi-FI', {
        style: 'currency',
        currency: 'EUR'
      }).format(0)

      for (let i = 0; i < l; i++) {
        yield put(addInvoiceRow(true))
        yield put(change('invoice', `rows.${i}.description`, ''))
        yield put(change('invoice', `rows.${i}.end_date`, ''))
        yield put(change('invoice', `rows.${i}.start_date`, ''))
        yield put(change('invoice', `rows.${i}.quantity`, ''))
        yield put(change('invoice', `rows.${i}.quantity_price`, ''))
        yield put(change('invoice', `rows.${i}.unit`, 'kpl'))
        yield put(change('invoice', `rows.${i}.vat_percent`, 24))
        yield put(change('invoice', `rows.${i}.sum_tax_free`, sum_tax_free))
      }
      yield put(cancelEditInvoice())
    } else {
      const formValues = getFormValues('invoice')(store.getState())

      const infoKeys = Object.keys(formValues).filter(key => key !== 'rows')

      for (let key of infoKeys) {
        yield put(change('invoice', key, ''))
      }

      yield put(change('invoice', 'country', 'Suomi'))
      yield put(change('invoice', 'delivery_method', 'Sähköposti'))
      yield put(change('invoice', 'job_title', 'Tapaturmavakuutus'))
      let renewBillDate = new Date()
      yield put(change('invoice', 'billing_date', renewBillDate))
      yield put(changeInvoiceBillingDate(renewBillDate))
      yield put(change('invoice', 'overdue', 14))

      let date = new Date()
      let due_date = new DateTimeFormat('fi', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
      }).format(date.setDate(date.getDate() + 14))

      yield put(change('invoice', 'due_date', due_date))

      yield put(emptyInvoiceRows())
      yield put(addInvoiceRow(true))

      const l = formValues.rows.length
      let sum_tax_free = new Intl.NumberFormat('fi-FI', {
        style: 'currency',
        currency: 'EUR'
      }).format(0)

      for (let i = 0; i < l; i++) {
        yield put(change('invoice', `rows.${i}.description`, ''))
        yield put(change('invoice', `rows.${i}.end_date`, ''))
        yield put(change('invoice', `rows.${i}.start_date`, ''))
        yield put(change('invoice', `rows.${i}.quantity`, ''))
        yield put(change('invoice', `rows.${i}.quantity_price`, ''))
        yield put(change('invoice', `rows.${i}.unit`, 'kpl'))
        yield put(change('invoice', `rows.${i}.vat_percent`, 24))
        yield put(change('invoice', `rows.${i}.sum_tax_free`, sum_tax_free))
      }
    }
  } catch (e) {
    console.warn(e)
  }
}

function* copyInvoiceSaga({ invoice_id }) {
  try {
    const invoiceUrl = `${API_SERVER}/CopyInvoiceByInvoiceID`
    const uuid = store.getState().client.user.data[2]
    const body = JSON.stringify({
      invoice_id: invoice_id,
      uuid: uuid
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

    let billDate = invoiceResult[0].Invoice[0].billing_date
    let renewBillDate = new Date(billDate)
    yield put(change('invoice', 'billing_date', renewBillDate))
    yield put(changeInvoiceBillingDate(renewBillDate))

    let overDue = invoiceResult[0].Invoice[0].overdue
    yield put(change('invoice', 'overdue', overDue))

    let dueDate = invoiceResult[0].Invoice[0].due_date
    yield put(change('invoice', 'due_date', dueDate))

    let invoiceReference = invoiceResult[0].Invoice[0].invoice_reference
    yield put(change('invoice', 'invoice_reference', invoiceReference))

    let desc = invoiceResult[0].Invoice[0].description
    yield put(change('invoice', 'description', desc))

    let jobTitle = invoiceResult[0].Invoice[0].job_title
    yield put(change('invoice', 'job_title', jobTitle))

    let instantPayment = invoiceResult[0].Invoice[0].instant_payment
    yield put(change('invoice', 'instant_payment', instantPayment))

    let invoiceStatus = invoiceResult[0].Invoice[0].status
    yield put(change('invoice', 'status', invoiceStatus))

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
    yield put(emptyInvoiceRows())
    yield put(addInvoiceRow(true))
    yield put(reset('invoice'))
  } catch (e) {
    console.warn(e)
  }
}

function* getFinvoiceOperatorsSaga() {
  try {
    const url = `${API_SERVER}/GetFinInvoiceOperators`
    const result = yield apiManualRequest(url)
    const parRes = JSON.parse(result.data)
    const parsedResult = propertyArray(parRes, 'operator_name')
    if (parsedResult) yield put(getOperatorSuccess(parsedResult))
  } catch (e) {
    yield put(getOperatorFailed(e))
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

export function* watchGetProfession() {
  yield takeEvery(GET_PROFESSION, getProfessionSaga)
}

export function* watchClearInvoiceOption() {
  yield takeEvery(CLEAR_INVOICE_OPTIONS, clearInvoiceOptionSaga)
}

export function* watchGenerateInvoicePDF() {
  yield takeEvery(GENERATE_INVOICE_PDF, generateInvoicePDF)
}

export function* watchSaveAndSendInvoicePDF() {
  yield takeEvery(SAVE_AND_SEND_INVOICE_PDF, saveAndSendInvoicePDF)
}

export function* watchInvoiceDownloadPDF() {
  yield takeEvery(INVOICE_DOWNLOAD_PDF, invoiceDownloadPDF)
}

export function* watchFinvoiceOperators() {
  yield takeEvery(GET_FINVOICE_OPERATOR, getFinvoiceOperatorsSaga)
}

export function* watchInvoiceLocationChangeSaga() {
  yield takeEvery(LOCATION_CHANGE, invoiceLocationChangeSaga)
}
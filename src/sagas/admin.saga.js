import { takeEvery, call, put } from 'redux-saga/effects'
import store from '../store'
import { getFormValues, reset } from 'redux-form'
import { formatFiToISO } from '../utils/DateTimeFormat'

import {
  SEARCH_ADMIN_INVOICE,
  API_SERVER,
  EXPAND_ADMIN_INVOICE,
  SEARCH_ADMIN_USERS,
  //CHANGE_ADMIN_MENU,
  UPDATE_ADMIN_INVOICE,
  EXPAND_ADMIN_USER,
  UPDATE_ADMIN_USER,
  SEARCH_ADMIN_WAGES,
  UPDATE_ADMIN_INVOICE_STATUS,
  UPDATE_ADMIN_SALARY_STATUS,
  ADMIN_ADD_NEW_UPDATES,
  ADMIN_DELETE_COMPANY_UPDATE,
  ADMIN_GET_UPDATES,
  NO_PIKAPALKKA,
  SHOW_SALARY_PDF,
  SHOW_INVOICE_PDF
} from '../constants'

import { convertStateToInt, nestProperties } from '../utils/invoice.utils'

import { apiPost, apiRequest, apiManualPost, apiManualRequest, apiBlobPost } from '../utils/request'

import {
  searchAdminInvoiceSuccess,
  searchAdminInvoiceFailed,
  searchAdminWagesSuccess,
  searchAdminWagesFailed,
  searchAdminInvoice,
  expandAdminInvoiceTrue,
  expandAdminInvoiceFalse,
  searchAdminUsersSuccess,
  updateAdminInvoiceResult,
  searchAdminUsersFailed,
  expandAdminUserFalse,
  expandAdminUserTrue,
  updateAdminUserResult,
  updateAdminUserResultFailed,
  updateAdminInvoiceStatusSuccess,
  searchAdminWages,
  updateAdminSalaryStatusSuccess,
  //adminAddNewUpdatesSuccess,  
  adminGetUpdatesSuccess,
  adminGetUpdates
} from '../actions/index'

import DateTimeFormat from '../utils/DateTimeFormat'

function* adminInvoiceSearchSaga() {
  try {
    const url = `${API_SERVER}/SearchInvoices`   
    let nestedBody, instant_payment
    const formValues = getFormValues('admin')(store.getState())

    if (formValues === undefined) {
      nestedBody = {}
    } else {
      instant_payment = formValues.instant_payment

      if (instant_payment === true) {
        instant_payment = 'quick_pay'
      }

      const body = {
        company_name: formValues.company_name,
        invoice_id: formValues.invoice_id,
        invoice_reference: formValues.invoice_reference,
        minSum: formValues.minSum,
        maxsum: formValues.maxsum,
        instant_payment: instant_payment        
      }

      nestedBody = nestProperties(body, 'Invoice', [
        'invoice_id',
        'invoice_reference',
        'minSum',
        'maxsum',
        'instant_payment'
      ])
    }

    const result = yield call(apiManualPost, url, JSON.stringify(nestedBody))

    const invoices = []

    result[Symbol.iterator] = function*() {
      const keys = Reflect.ownKeys(this)
      for (const key of keys) {
        yield this[key]
      }
    }

    for (const invoice of JSON.parse(result.data)) {
      invoices.push(invoice)
    }

    yield put(searchAdminInvoiceSuccess(invoices))
  } catch (e) {
    yield put(searchAdminInvoiceFailed(e))
  }
}

function* adminUsersSearchSaga() {
  try {
    const url = `${API_SERVER}/SearchCustomers`
    const formValues = getFormValues('admin')(store.getState())

    let body
    if (formValues === undefined) {
      body = {}
    } else {
      body = {
        firstname: formValues.firstname,
        lastname: formValues.lastname,
        email: formValues.email
      }
    }

    const result = yield call(apiManualPost, url, JSON.stringify(body))

    const parsedResult = JSON.parse(result.data)

    yield put(searchAdminUsersSuccess(parsedResult))
  } catch (e) {
    yield put(searchAdminUsersFailed(e))
  }
}

function* adminWagesSearchSaga() {
  try {
    const url = `${API_SERVER}/SearchSalaries`
    const formValues = getFormValues('admin')(store.getState())

    let body
    if (formValues === undefined) {
      body = {}
    } else {
      let start_date
      if (formValues.start_date !== undefined) {
        start_date = formatFiToISO(
          new DateTimeFormat('fi', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric'
          })
            .format(new Date(formValues.start_date))
            .split('.')
        )
      }

      let end_date
      if (formValues.end_date !== undefined) {
        end_date = formatFiToISO(
          new DateTimeFormat('fi', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric'
          })
            .format(new Date(formValues.end_date))
            .split('.')
        )
      }

      let statusPaid
      if (formValues.statusPaid !== undefined) {
        statusPaid = formValues.statusPaid
        if (statusPaid === true) {
          statusPaid = 'Paid'
        }
      }

      let StatusProcessing
      if (formValues.StatusProcessing !== undefined) {
        StatusProcessing = formValues.StatusProcessing
        if (StatusProcessing === true) {
          StatusProcessing = 'processing'
        }
      }

      body = {
        firstname: formValues.firstname,
        start_date: start_date,
        end_date: end_date,
        statusPaid: statusPaid,
        StatusProcessing: StatusProcessing
      }
    }

    const result = yield call(apiManualPost, url, JSON.stringify(body))

    const wages = []

    result[Symbol.iterator] = function*() {
      const keys = Reflect.ownKeys(this)
      for (const key of keys) {
        yield this[key]
      }
    }

    for (const wage of JSON.parse(result.data)) {
      wages.push(wage)
    }
    yield put(searchAdminWagesSuccess(wages))
  } catch (e) {
    yield put(searchAdminWagesFailed(e))
  }
}

function* adminUserExpandSaga({ expanded, uuid }) {
  try {
    if (!expanded) {
      yield put(expandAdminUserFalse(uuid))
    } else {
      const invoiceUrl = `${API_SERVER}/GetUserContactDetails`
      const invoiceBody = JSON.stringify({ uuid: uuid })
      const invoiceResult = yield call(apiManualPost, invoiceUrl, invoiceBody)
      //console.log('Inside adminUserExpandSaga:: ', invoiceResult)
      yield put(expandAdminUserTrue(JSON.parse(invoiceResult.data)))
    }
  } catch (e) {
    console.warn(e)
  }
}

function* adminInvoiceExpandSaga({ expanded, id }) {
  try {
    if (!expanded) {
      yield put(expandAdminInvoiceFalse(id))
    } else {
      const uuid = store.getState().profile.uuid
      const invoiceUrl = `${API_SERVER}/users/${uuid}/invoices/${id}`
      const invoiceResult = yield call(apiRequest, invoiceUrl)
      yield put(expandAdminInvoiceTrue(invoiceResult))
    }
  } catch (e) {
    console.warn(e)
  }
}

function* adminInvoiceUpdateSaga({ id }) {
  try {
    const uuid = store.getState().profile.uuid
    const formValues = getFormValues(`AdminInvoiceForm_${id}`)(store.getState())
    const invoiceUrl = `${API_SERVER}/invoices`
    const body = JSON.parse(
      JSON.stringify({
        id: id,
        user_info_uuid: uuid,
        description: formValues.description,
        business_id: formValues.business_id,
        job_title: formValues.job_title,
        invoice_reference: formValues.invoice_reference,
        billing_date: formatFiToISO(formValues.billing_date.split('.')),
        due_date: formatFiToISO(formValues.due_date.split('.')),
        overdue: formValues.overdue,
        person_to_contact: formValues.person_to_contact,
        person_to_contact_email: formValues.person_to_contact_email,
        finvoice_address: formValues.finvoice_address,
        finvoice_operator: formValues.finvoice_operator,
        delivery_address: formValues.delivery_address,
        zip_code: formValues.zip_code,
        city: formValues.city,
        country: formValues.country,
        total_sum: parseFloat(
          formValues.total_sum.replace(/,/g, '.').replace(/\s/g, '')
        ).toString(),
        company_name: formValues.company_name,
        instant_payment: formValues.instant_payment,
        state: convertStateToInt(formValues.state),
        delivery_method: formValues.delivery_method
      })
    )
    yield call(apiPost, invoiceUrl, JSON.stringify(body), 'PUT')
    yield put(updateAdminInvoiceResult(true))
  } catch (e) {
    console.warn(e)
    yield put(updateAdminInvoiceResult(false))
  }
}

function* adminUserUpdateSaga({ email, uuid }) {
  try {
    const formValues = getFormValues(`AdminUserForm_${email.replace('.', '')}`)(
      store.getState()
    )    
    const refinedForm = Object.assign({}, { ...formValues }, { uuid: uuid })
    const invoiceUrl = `${API_SERVER}/UpdateUserContactDetails`
    /* const body = JSON.parse(
      JSON.stringify({
        uuid: uuid,
        tax_percent: parseFloat(formValues.tax_percent),
        service_fee: parseFloat(formValues.service_fee)
      })
    ) */
    const body = JSON.stringify({ ...refinedForm })
    const result = yield call(apiManualPost, invoiceUrl, body)

    if(result.data === 'User contact information updated successfully!'){
      yield put(updateAdminUserResult())
    } else {
      yield put(updateAdminUserResultFailed())
    }  
  } catch (e) {
    console.warn(e)    
  }
}

/* function* adminChangeMenuSaga({ value, email }) {
  try {
    console.log('Inside adminChangeMenuSaga::',email)
    if (value === 0 && !!email) {
      yield put(searchAdminInvoice())
    } else if (value === 1 ) {
      yield put(searchAdminUsers())
    }
  } catch (e) {
    console.warn(e)
  }
} */

function* adminUpdateInvoiceStatusSaga({ invoice_id }) {
  try {
    const url = `${API_SERVER}/UpdateInvoiceStatus`
    const id = invoice_id.split('$$')
    const uuid = id[0]
    const inv_id = id[1]
    const body = JSON.stringify({
      uuid: uuid,
      invoice_id: inv_id,
      invoicePaid: store.getState().admin.invoicepaid,
      instant_payment: store.getState().admin.instant_payment
    })
    const result = yield call(apiManualPost, url, body)

    if (result.data === 'Invoice status updated Successfully') {
      yield put(updateAdminInvoiceStatusSuccess(result.data))
    } else {
      console.warn(result.data)
    }
    yield put(searchAdminInvoice())
  } catch (e) {
    console.warn(e)
  }
}

function* noPikapalkkaSaga() {
  try {
    //console.log('Inside noPikapalkkaSaga:: ',invoice_id)
    const invoice_id = store.getState().admin.isToPayInvoiceId
    const url = `${API_SERVER}/UpdateInvoiceStatus`
    const id = invoice_id.split('$$')
    const uuid = id[0]
    const inv_id = id[1]
    const body = JSON.stringify({
      uuid: uuid,
      invoice_id: inv_id,
      invoicePaid: store.getState().admin.invoicepaid,
      instant_payment: store.getState().admin.instant_payment
    })
    const result = yield call(apiManualPost, url, body)

    if (result.data === 'Invoice status updated Successfully') {
      yield put(updateAdminInvoiceStatusSuccess(result.data))
    } else {
      console.warn(result.data)
    }
    yield put(searchAdminInvoice())
  } catch (e) {
    console.warn(e)
  }
}

function* adminUpdateSalaryStatusSaga({ id }) {
  try {
    const url = `${API_SERVER}/UpdateSalaryStatus`
    const sal_id = id.split('$$')
    const uuid = sal_id[0]
    const salary_id = sal_id[1]
    const body = JSON.stringify({
      uuid: uuid,      
      id: salary_id,
      Status: store.getState().admin.Status
    })
    const result = yield call(apiManualPost, url, body)        

    if (result.data === 'Salary status updated Successfully') {
      yield put(updateAdminSalaryStatusSuccess(result.data))
    } else {
      console.warn(result.data)
    }
    yield put(searchAdminWages())
  } catch (e) {
    console.warn(e)
  }
}

function* adminAddNewUpdatesSaga() {
  try {
    const url = `${API_SERVER}/AddNewUpdates`
    const formValues = getFormValues('adminUpdates')(store.getState())
    const body = JSON.stringify({
      newsupdate : formValues.company_update
    })
    const result = yield call(apiManualPost, url, body)     

    if (result.data === 'company update added successfully') {
      //yield put(adminAddNewUpdatesSuccess(result.data))
      yield put(reset('adminUpdates'))
      yield put(adminGetUpdates())
    } else {
      yield put(reset('adminUpdates'))
      console.warn(result.data)
    }    
  } catch (e) {
    console.warn(e)
  }
}

function* adminDeleteCompanyUpdatesSaga({id}) {
  try {
    const url = `${API_SERVER}/DeleteCompanyUpdate`
    const body = JSON.stringify({
      id: id     
    })
    const result = yield call(apiManualPost, url, body)    
    //console.log('Inside adminDeleteCompanyUpdatesSaga:: ', result)

    if (result.data === 'company update deleted successfully') {            
      yield put(adminGetUpdates())
    } else {
      console.warn(result.data)
    }   
  } catch (e) {
    console.warn(e)
  }
}

function* adminGetUpdatesSaga() {
  try {
    const url = `${API_SERVER}/GetCompanyUpdates`    
    const result = yield call(apiManualRequest, url)
    const resultParsed = JSON.parse(result.data)
    //console.log('Inside adminGetUpdatesSaga:: ', resultParsed)
    yield put(adminGetUpdatesSuccess(resultParsed))      
  } catch (e) {
    console.warn(e)
  }
}

function* showSalaryPDFSaga({ id }) {  
  try {
    const url = `${API_SERVER}/GenerateSalaryPDF`
    const sal_id = id.split('$$')
    const uuid = sal_id[0]
    const salary_id = sal_id[1]    
    const body = JSON.stringify({
      id: salary_id,
      uuid: uuid
    })
    yield call(apiBlobPost, url, body)
  } catch (e) {
    console.warn(e)
  }
}

function* showInvoicePDFSaga({ invoice_id }) {  
  try {
    const url = `${API_SERVER}/InvoiceDownloadPDF`
    const id = invoice_id.split('$$')
    const uuid = id[0]
    const inv_id = id[1]
    const body = JSON.stringify({
      invoice_id: inv_id,
      uuid: uuid
    })
    yield call(apiBlobPost, url, body)
  } catch (e) {
    console.warn(e)
  }
}

/* export function* watchAdminChangeMenuSaga() {
  yield takeEvery(CHANGE_ADMIN_MENU, adminChangeMenuSaga)
} */

export function* watchAdminUsersSearchSaga() {
  yield takeEvery(SEARCH_ADMIN_USERS, adminUsersSearchSaga)
}

export function* watchAdminInvoiceSearchSaga() {
  yield takeEvery(SEARCH_ADMIN_INVOICE, adminInvoiceSearchSaga)
}

export function* watchAdminInvoiceExpandSaga() {
  yield takeEvery(EXPAND_ADMIN_INVOICE, adminInvoiceExpandSaga)
}

export function* watchAdminInvoiceUpdateSaga() {
  yield takeEvery(UPDATE_ADMIN_INVOICE, adminInvoiceUpdateSaga)
}

export function* watchAdminUserExpandSaga() {
  yield takeEvery(EXPAND_ADMIN_USER, adminUserExpandSaga)
}

export function* watchAdminUserUpdateSaga() {
  yield takeEvery(UPDATE_ADMIN_USER, adminUserUpdateSaga)
}

export function* watchAdminWagesSearchSaga() {
  yield takeEvery(SEARCH_ADMIN_WAGES, adminWagesSearchSaga)
}

export function* watchAdminUpdateInvoiceStatusSaga() {
  yield takeEvery(UPDATE_ADMIN_INVOICE_STATUS, adminUpdateInvoiceStatusSaga)
}

export function* watchAdminNoPikapalkkaSaga() {
  yield takeEvery(NO_PIKAPALKKA, noPikapalkkaSaga)
}

export function* watchAdminUpdateSalaryStatusSaga() {
  yield takeEvery(UPDATE_ADMIN_SALARY_STATUS, adminUpdateSalaryStatusSaga)
}

export function* watchAdminAddNewUpdatesSaga() {
  yield takeEvery(ADMIN_ADD_NEW_UPDATES, adminAddNewUpdatesSaga)
}

export function* watchAdminDeleteCompanyUpdateSaga() {
  yield takeEvery(ADMIN_DELETE_COMPANY_UPDATE, adminDeleteCompanyUpdatesSaga)
}

export function* watchAdminGetUpdatesSaga() {
  yield takeEvery(ADMIN_GET_UPDATES, adminGetUpdatesSaga)
}

export function* watchShowSalaryPDFSaga() {
  yield takeEvery(SHOW_SALARY_PDF, showSalaryPDFSaga)
}

export function* watchShowInvoicePDFSaga() {
  yield takeEvery(SHOW_INVOICE_PDF, showInvoicePDFSaga)
}
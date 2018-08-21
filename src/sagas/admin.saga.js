import { takeEvery, call, put } from 'redux-saga/effects'

import store from '../store'
import { getFormValues } from 'redux-form'

import { formatFiToISO } from '../utils/DateTimeFormat'

import {
  SEARCH_ADMIN_INVOICE,
  API_SERVER,
  EXPAND_ADMIN_INVOICE,
  SEARCH_ADMIN_USERS,
  CHANGE_ADMIN_MENU,
  UPDATE_ADMIN_INVOICE,
  EXPAND_ADMIN_USER,
  UPDATE_ADMIN_USER,
  SEARCH_ADMIN_WAGES,
  UPDATE_ADMIN_INVOICE_STATUS,
  UPDATE_ADMIN_SALARY_STATUS
} from '../constants'

import { convertStateToInt, nestProperties } from '../utils/invoice.utils'

import { apiPost, apiRequest, apiManualPost } from '../utils/request'

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
  updateAdminUserResult 
} from '../actions/index'

import DateTimeFormat from '../utils/DateTimeFormat'

/* function* adminInvoiceSearchSaga() {
  try {

    const url = `${API_SERVER}/user-invoices`
    const body = JSON.stringify({ user_info_uuid: (store.getState()).profile.uuid })
    const result = yield call(apiPost, url, body)
    const invoices = []


    result[Symbol.iterator] = function* () {
      const keys = Reflect.ownKeys(this)
      for (const key of keys) {
        yield this[key]
      }
    }

    for (const invoice of result.data) {
      invoices.push(invoice)
    }

    yield put(searchAdminInvoiceSuccess(invoices))

  } catch (e) {
    yield put(searchAdminInvoiceFailed())
  }

} */

function* adminInvoiceSearchSaga() {
  try {
    const url = `${API_SERVER}/SearchInvoices`
    const formValues = getFormValues('admin')(store.getState())

    let instant_payment = formValues.instant_payment
    
    if (instant_payment===true){
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

    const nestedBody = nestProperties(body, 'Invoice', [
      'invoice_id',
      'invoice_reference',
      'minSum',
      'maxsum',     
      'instant_payment'
    ])    

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
    yield put(searchAdminInvoiceFailed())   
  }
}


//TODO: admin users route
/* function* adminUsersSearchSaga() {
  try {
    const url = `${API_SERVER}/admin/users`
    const result = yield call(apiRequest, url)
    console.log(result)
    yield put(searchAdminUsersSuccess(result))

  } catch (e) {
    yield put(searchAdminUsersFailed)
  }
} */

function* adminUsersSearchSaga() {
  try {
    const url = `${API_SERVER}/SearchCustomers`
    const formValues = getFormValues('admin')(store.getState())
    //console.log('Inside adminUsersSearchSaga::',formValues)
    const body = JSON.stringify({
      firstname: formValues.firstname,
      lastname: formValues.lastname,
      email: formValues.email
    })
    const result = yield call(apiManualPost, url, body)
    const parsedResult = JSON.parse(result.data)    
    yield put(searchAdminUsersSuccess(parsedResult))
  } catch (e) {
    yield put(searchAdminUsersFailed)
  }
}

function* adminWagesSearchSaga() {
  try {
    const url = `${API_SERVER}/SearchSalaries`
    const formValues = getFormValues('admin')(store.getState())   

    const start_date = formatFiToISO(
      new DateTimeFormat('fi', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
      })
        .format(new Date(formValues.start_date))
        .split('.')
    )
  
    const end_date = formatFiToISO(
      new DateTimeFormat('fi', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
      })
        .format(new Date(formValues.end_date))
        .split('.')
    )

    let statusPaid = formValues.statusPaid    
    if (statusPaid===true){
      statusPaid = 'Paid'
    }

    let StatusProcessing = formValues.StatusProcessing    
    if (StatusProcessing===true){
      StatusProcessing = 'processing'
    }

    const body = JSON.stringify({
      firstname: formValues.firstname,      
      start_date: start_date,     
      end_date: end_date,
      statusPaid: statusPaid,
      StatusProcessing: StatusProcessing
    })
    const result = yield call(apiManualPost, url, body)   

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

/* function* adminUserExpandSaga({ expanded, uuid }) {
  try {
    if (!expanded) {
      yield put(expandAdminUserFalse(uuid))
    } else {
      const invoiceUrl = `${API_SERVER}/users/${uuid}`
      const invoiceResult = yield call(apiRequest, invoiceUrl)
      yield put(expandAdminUserTrue(invoiceResult))
    }
  } catch (e) {
    console.warn(e)
  }
} */

function* adminUserExpandSaga({ expanded, uuid }) {
  try {    
    if (!expanded) {
      yield put(expandAdminUserFalse(uuid))
    } else {
      const invoiceUrl = `${API_SERVER}/GetUserContactDetails`
      const invoiceBody = JSON.stringify({ uuid: uuid })
      const invoiceResult = yield call(apiManualPost, invoiceUrl, invoiceBody)      
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

function* adminUserUpdateSaga({ uuid, email }) {
  try {
    const formValues = getFormValues(`AdminUserForm_${email.replace('.', '')}`)(
      store.getState()
    )
    const invoiceUrl = `${API_SERVER}/admin/user-update`
    const body = JSON.parse(
      JSON.stringify({
        user_info_uuid: uuid,
        tax_percent: parseFloat(formValues.tax_percent),
        service_fee: parseFloat(formValues.service_fee)
      })
    )
    yield call(apiPost, invoiceUrl, JSON.stringify(body), 'PUT')
    yield put(updateAdminUserResult(true))
  } catch (e) {
    console.warn(e)
    yield put(updateAdminUserResult(false))
  }
}

function* adminChangeMenuSaga({ value, email }) {
  try {
    if (value === 0 && !!email) {
      yield put(searchAdminInvoice())
    }
  } catch (e) {
    console.warn(e)
  }
}

function* adminUpdateInvoiceStatusSaga(invoice_id) {
  try {
    const url = `${API_SERVER}/UpdateInvoiceStatus`
    const formValues = getFormValues('admin')(store.getState())
    const body = JSON.stringify({
      invoice_id: invoice_id,
      invoicepaid: formValues.invoicepaid      
    })
    const result = yield call(apiManualPost, url, body)
    const parsedResult = JSON.parse(result.data)
    console.log('Inside adminUpdateInvoiceStatusSaga:: ', parsedResult)
    //yield put(searchAdminUsersSuccess(parsedResult))
  } catch (e) {
    //yield put(searchAdminUsersFailed)
    console.warn(e)
  }
}

function* adminUpdateSalaryStatusSaga(id) {
  try {
    const url = `${API_SERVER}/UpdateSalaryStatus`
    const formValues = getFormValues('admin')(store.getState())
    const body = JSON.stringify({
      id: id,
      Status: formValues.Status
    })
    const result = yield call(apiManualPost, url, body)
    const parsedResult = JSON.parse(result.data)
    console.log('Inside adminUpdateSalaryStatusSaga:: ', parsedResult)
    //yield put(searchAdminUsersSuccess(parsedResult))
  } catch (e) {
    //yield put(searchAdminUsersFailed)
    console.warn(e)
  }
}

export function* watchAdminChangeMenuSaga() {
  yield takeEvery(CHANGE_ADMIN_MENU, adminChangeMenuSaga)
}

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

export function* watchAdminUpdateSalaryStatusSaga() {
  yield takeEvery(UPDATE_ADMIN_SALARY_STATUS, adminUpdateSalaryStatusSaga)
}
import { takeEvery, put, call } from 'redux-saga/effects'
import {
  NEW_CUSTOMER,
  GET_CUSTOMERS_START,
  API_SERVER,
  REMOVE_CUSTOMER,
  UPDATE_CUSTOMER,
  SAVE_CUSTOMER_UPDATE,
  CANCEL_CUSTOMER_UPDATE,
  LOCATION_CHANGE,
  ADD_NEW_CUSTOMER_INVOICE,
  GET_EINVOICE_OPERATOR
} from '../constants'

import {
  getCustomersSuccess,
  getCustomerByIdSuccess,
  addNewCustomerInvoiceSuccess,
  addCustomerSuccess,
  addCustomerFailed,
  getEOperatorSuccess,
  getEOperatorFailed
} from '../actions/index'

import { getFormValues, change, reset } from 'redux-form'

import { propertyArray } from '../utils/invoice.utils'

import store from '../store'

import { apiManualPost, apiManualRequest } from '../utils/request'

function* newCustomerSaga() {
  try {
    const url = `${API_SERVER}/CreateCustomer`
    const formValues = getFormValues('customer')(store.getState())
    const uuid = store.getState().client.user.data[2]

    const body = JSON.stringify({
      uuid: uuid,
      country: formValues.country,
      delivery_method: formValues.delivery_method,
      company_name: formValues.company_name,
      business_id: formValues.business_id,
      person_to_contact: formValues.person_to_contact,
      person_to_contact_email: formValues.person_to_contact_email,
      delivery_address: formValues.delivery_address,
      zip_code: formValues.zip_code,
      city: formValues.city,
      web_invoice: formValues.web_invoice,
      finvoice_operator: formValues.finvoice_operator
    })

    const resultAddCustomer = yield call(apiManualPost, url, body)

    if (resultAddCustomer.data === 'Customer Data saved successfully!') {
      yield put(addCustomerSuccess(resultAddCustomer.data))
    } else {
      yield put(addCustomerFailed(resultAddCustomer.data))
    }

    yield put(reset('customer'))

    //Update Customer Grid after Add Customer
    const getCustomerUrl = `${API_SERVER}/GetCustomers`
    const getCustomerBody = JSON.stringify({ uuid: uuid })
    const result = yield call(apiManualPost, getCustomerUrl, getCustomerBody)

    if (result.data) yield put(getCustomersSuccess(result.data))
  } catch (e) {
    yield put(addCustomerFailed(e))
  }
}

function* getCustomersSaga() {
  try {
    const url = `${API_SERVER}/GetCustomers`
    const uuid = store.getState().client.user.data[2]
    const body = JSON.stringify({
      uuid: uuid
    })
    const result = yield call(apiManualPost, url, body)
    if (result.data) yield put(getCustomersSuccess(result.data))
  } catch (e) {
    console.warn(e)
  }
}

function* getCustomerByIdSaga(customer_id) {
  try {
    const url = `${API_SERVER}/GetCustomersByCustomerID`
    const body = JSON.stringify({ customer_id: customer_id.id })

    const result = yield call(apiManualPost, url, body)
    if (result.data) yield put(getCustomerByIdSuccess(result.data))

    const customerResult = result.data
    const customerKeys = Object.keys(customerResult)

    //dispatch customer data to redux form
    for (let key of customerKeys) {
      yield put(change('customer', key, customerResult[key]))
    }
  } catch (e) {
    console.warn(e)
  }
}

function* getCustomerToAddInvoiceSaga(customer_id) {
  try {
    const url = `${API_SERVER}/GetCustomersByCustomerID`
    const body = JSON.stringify({ customer_id: customer_id.id })
    const result = yield call(apiManualPost, url, body)

    if (result.data) yield put(addNewCustomerInvoiceSuccess(result.data))
    const customerInvoiceResult = result.data
    const customerInvoiceKeys = Object.keys(customerInvoiceResult)

    for (let key of customerInvoiceKeys) {
      yield put(change('invoice', key, customerInvoiceResult[key]))
    }
  } catch (e) {
    console.warn(e)
  }
}

function* saveCustomerUpdateSaga() {
  try {
    const url = `${API_SERVER}/UpdateCustomer`
    const formValues = getFormValues('customer')(store.getState())
    const uuid = store.getState().client.user.data[2]

    const body = JSON.stringify({
      uuid: uuid,
      customer_id: formValues.customer_id,
      country: formValues.country,
      delivery_method: formValues.delivery_method,
      company_name: formValues.company_name,
      business_id: formValues.business_id,
      person_to_contact: formValues.person_to_contact,
      person_to_contact_email: formValues.person_to_contact_email,
      delivery_address: formValues.delivery_address,
      zip_code: formValues.zip_code,
      city: formValues.city,
      web_invoice: formValues.web_invoice,
      finvoice_operator: formValues.finvoice_operator
    })

    yield call(apiManualPost, url, body)
    yield put(reset('customer'))

    //Update Customer Grid after Edit Customer
    const getCustomerUrl = `${API_SERVER}/GetCustomers`
    const getCustomerBody = JSON.stringify({ uuid: uuid })
    const result = yield call(apiManualPost, getCustomerUrl, getCustomerBody)

    if (result.data) yield put(getCustomersSuccess(result.data))
  } catch (e) {
    console.warn(e)
  }
}

function* cancelCustomerUpdateSaga() {
  try {
    yield put(reset('customer'))    
  } catch (e) {
    console.warn(e)
  }
}

function* removeCustomerSaga(customer_id) {
  try {
    const url = `${API_SERVER}/DeleteCustomer`
    const body = JSON.stringify({ customer_id: customer_id.id })
    yield call(apiManualPost, url, body)
  } catch (e) {}
}

function* customerLocationChangeSaga() {
  try {
    yield put(reset('customer'))
  } catch (e) {
    console.warn(e)
  }
}

function* getEinvoiceOperatorsSaga() {
  try {
    const url = `${API_SERVER}/GetFinInvoiceOperators`
    const result = yield apiManualRequest(url)
    const parRes = JSON.parse(result.data)
    const parsedResult = propertyArray(parRes, 'operator_name')
    if (parsedResult) yield put(getEOperatorSuccess(parsedResult))
  } catch (e) {
    yield put(getEOperatorFailed(e))
  }
}

export function* watchNewCustomerSaga() {
  yield takeEvery(NEW_CUSTOMER, newCustomerSaga)
}

export function* watchGetCustomersSaga() {
  yield takeEvery(GET_CUSTOMERS_START, getCustomersSaga)
}

export function* watchGetCustomerByIdSaga() {
  yield takeEvery(UPDATE_CUSTOMER, getCustomerByIdSaga)
}

export function* watchSaveCustomerSaga() {
  yield takeEvery(SAVE_CUSTOMER_UPDATE, saveCustomerUpdateSaga)
}

export function* watchCancelCustomerSaga() {
  yield takeEvery(CANCEL_CUSTOMER_UPDATE, cancelCustomerUpdateSaga)
}

export function* watchRemoveCustomerSaga() {
  yield takeEvery(REMOVE_CUSTOMER, removeCustomerSaga)
}

export function* watchGetCustomerToAddInvoiceSaga() {
  yield takeEvery(ADD_NEW_CUSTOMER_INVOICE, getCustomerToAddInvoiceSaga)
}

export function* watchEInvoiceOperators() {
  yield takeEvery(GET_EINVOICE_OPERATOR, getEinvoiceOperatorsSaga)
}

export function* watchCustomerLocationChange() {
  yield takeEvery(LOCATION_CHANGE, customerLocationChangeSaga)
}
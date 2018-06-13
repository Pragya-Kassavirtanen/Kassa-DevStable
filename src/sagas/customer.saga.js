import { takeEvery, put, call } from 'redux-saga/effects'
import {
  NEW_CUSTOMER,
  GET_CUSTOMERS_START,
  ADD_CUSTOMER_SUCCESS,
  ADD_CUSTOMER_FAILED,
  API_SERVER,
  REMOVE_CUSTOMER,
  UPDATE_CUSTOMER,
  SAVE_CUSTOMER_UPDATE,
  CANCEL_CUSTOMER_UPDATE,
  ADD_NEW_CUSTOMER_INVOICE
} from '../constants'

import { getCustomersSuccess, getCustomerByIdSuccess, addNewCustomerInvoiceSuccess } from '../actions/index'

import { getFormValues, change, reset } from 'redux-form'
import store from '../store'

import { apiManualPost, apiManualRequest } from '../utils/request'

function* newCustomerSaga() {

  try {

    const url = `${API_SERVER}/CreateCustomer`

    const formValues = getFormValues('customer')(store.getState())

    const body = JSON.stringify({
      country: formValues.country,
      delivery_method: formValues.delivery_method,
      company_name: formValues.company_name,
      business_id: formValues.business_id,
      person_to_contact: formValues.person_to_contact,
      person_to_contact_email: formValues.person_to_contact_email,
      delivery_address: formValues.delivery_address,
      zip_code: formValues.zip_code,
      city: formValues.city,
      web_invoice: formValues.web_invoice
    })

    yield call(apiManualPost, url, body)

    yield put({ type: ADD_CUSTOMER_SUCCESS })

  } catch (e) {

    yield put({ type: ADD_CUSTOMER_FAILED, e })

  }
}


function* getCustomersSaga() {
  try {
    const url = `${API_SERVER}/GetCustomers`
    const result = yield apiManualRequest(url)
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

    const body = JSON.stringify({
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
      web_invoice: formValues.web_invoice
    })

    yield call(apiManualPost, url, body)
    yield put(reset('customer'))

    const customerUrl = `${API_SERVER}/GetCustomers`   
    const result = yield apiManualRequest(customerUrl)
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
  } catch (e) {

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
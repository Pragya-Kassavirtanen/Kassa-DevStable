import { takeEvery, put, call } from 'redux-saga/effects'
import {
  API_SERVER,
  GET_NEW_SALARY_START,
  SELECT_ROW_SALARY,
  POST_SALARY,
  GET_SALARY_INFO,
  SAVE_SALARY_SLIP
} from '../constants/index'
import {
  getNewSalarySuccess,
  selectRowSalarySuccess,
  getSalariesSuccess,
  getSalaryByIdSuccess,
  addSalarySuccess
} from '../actions/index'
import store from '../store'
import { apiManualPost, apiBlobPost } from '../utils/request'

function* getNewSalarySaga() {
  try {
    const url = `${API_SERVER}/GetInvoiceInfoForWages`

    const uuid = store.getState().client.user.data[2]    
    const body = JSON.stringify({     
      uuid: uuid
    })
    
    const result = yield call(apiManualPost, url, body)
    
    const resultParsed = JSON.parse(result.data)

    resultParsed[Symbol.iterator] = function* () {
      const keys = Reflect.ownKeys(this)
      for (const key of keys) {
        yield this[key]
      }
    }

    yield put(getNewSalarySuccess(resultParsed))

  } catch (e) {
    console.warn(e)
  }
}

function* postSalarySaga({ selected }) {
  try {       
    let bills = []
    selected.map( el => bills.push({'invoice_id':el}))    
    const salarySummary = store.getState().salary.newSalarySummary
    //console.log('salarySummary:: ',salarySummary)
    const uuid = store.getState().client.user.data[2]    
    const body = JSON.stringify({
      uuid: uuid,
      invoices: bills,
      gross_salary: salarySummary.gross_sum,
      net_salary: salarySummary.net_sum,
      service_cost:salarySummary.service_cost,
      expenses_cost: salarySummary.allowances_cost,
      reimbursment_cost:salarySummary.expenses_cost,
      take_home_pay: salarySummary.paid_sum,
      tax_cost: salarySummary.tax_percentage,
      yel_cost: salarySummary.yel_insurance,
      accidental_insurance: salarySummary.acc_insurance,
      social_contribution: salarySummary.social_contri,
      sumWithoutTax: salarySummary.sumwithoutTax,
      palkka: salarySummary.palkka,
      deductions_sum: salarySummary.deductions_sum
    })
    const url = `${API_SERVER}/AddSalary`   
    const resultAddSalary = yield call(apiManualPost, url, body)
    
    if (resultAddSalary.data === 'Salary saved successfully!') {
      yield put(addSalarySuccess(resultAddSalary.data))      
    } else {
      console.warn('Inside Failed AddSalary:: ',resultAddSalary.data)
    }

    //Update Salary Grid after Add Salary
    const getSalaryUrl = `${API_SERVER}/GetSalaries`    
    const getSalaryBody = JSON.stringify({ uuid: uuid })
    const resultGetSalaries = yield call(apiManualPost, getSalaryUrl, getSalaryBody)  
    const resultParsed = JSON.parse(resultGetSalaries.data)
    yield put(getSalariesSuccess(resultParsed))
    
    //Update Invoice Info Grid after Add Salary
    const invoiceInfoUrl = `${API_SERVER}/GetInvoiceInfoForWages`     
    const invoiceInfoBody = JSON.stringify({     
      uuid: uuid
    })    
    const resultInvoiceInfo = yield call(apiManualPost, invoiceInfoUrl, invoiceInfoBody)    
    const resultParsedInvoiceInfo = JSON.parse(resultInvoiceInfo.data)
    //console.log('Inside postSalarySaga resultParsedInvoiceInfo:: ',resultParsedInvoiceInfo)
    yield put(getNewSalarySuccess(resultParsedInvoiceInfo))    
  } catch (e) {
    console.warn(e)
  }
}

function* getSalariesSaga() {
  try {
    const url = `${API_SERVER}/GetSalaries`

    const uuid = store.getState().client.user.data[2]    
    const body = JSON.stringify({     
      uuid: uuid
    })    

    const result = yield call(apiManualPost, url, body)
    const resultParsed = JSON.parse(result.data)
    //console.log('getSalariesSaga:: ', resultParsed)

    yield put(getSalariesSuccess(resultParsed))

  } catch (e) {
    console.warn(e)
  }
}

function* selectRowSalarySaga() {
  try {
    const uuid = store.getState().client.user.data[2]
    const taxUrl = `${API_SERVER}/GetSalaryTaxPercentagesbyUUID`
    const body = JSON.stringify({ uuid: uuid })
    const taxResult = yield call(apiManualPost, taxUrl, body)
    const resultParsed = JSON.parse(taxResult.data)

    yield put(
      selectRowSalarySuccess({
        taxResult: resultParsed
      })
    )
  } catch (e) {
    console.warn(e)
  }
}

function* getSalaryByIdSaga({ id }) {
  try {
    const url = `${API_SERVER}/GetSalaryByID`
    const uuid = store.getState().client.user.data[2]
    const body = JSON.stringify({ id: id, uuid: uuid })
    const result = yield call(apiManualPost, url, body)
    const resultParsed = JSON.parse(result.data)
    yield put(getSalaryByIdSuccess(resultParsed))
  } catch (e) {
    console.warn(e)
  }
}

function* saveSalarySlip({ id }) {  
  try {
    const url = `${API_SERVER}/GenerateSalaryPDF`
    const uuid = store.getState().client.user.data[2]
    const body = JSON.stringify({
      id: id,
      uuid: uuid
    })
    yield call(apiBlobPost, url, body)
  } catch (e) {
    console.warn(e)
  }
}

export function* watchGetNewSalarySaga() {
  yield takeEvery(GET_NEW_SALARY_START, getNewSalarySaga)
}

export function* watchSelectRowSalarySaga() {
  yield takeEvery(SELECT_ROW_SALARY, selectRowSalarySaga)
}

export function* watchPostSalarySaga() {
  yield takeEvery(POST_SALARY, postSalarySaga)
}

export function* watchGetSalariesSaga() {
  yield takeEvery(GET_NEW_SALARY_START, getSalariesSaga)
}

export function* watchGetSalaryByIdSaga() {
  yield takeEvery(GET_SALARY_INFO, getSalaryByIdSaga)
}

export function* watchSaveSalarySlipSaga() {
  yield takeEvery(SAVE_SALARY_SLIP, saveSalarySlip)
}
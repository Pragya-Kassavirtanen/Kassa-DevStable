import { takeEvery, put, call } from 'redux-saga/effects'
import {
  API_SERVER,
  GET_NEW_SALARY_START,
  SELECT_ROW_SALARY,
  POST_SALARY 
} from '../constants/index'
import {
  getNewSalarySuccess,
  selectRowSalarySuccess,
  getSalariesSuccess  
} from '../actions/index'
import store from '../store'
import { apiPost, apiManualRequest, apiManualPost } from '../utils/request'

function* getNewSalarySaga() {
  try {
    const url = `${API_SERVER}/GetInvoiceInfoForWages`
    const result = yield call(apiManualRequest, url)
    const resultParsed = JSON.parse(result.data)
    resultParsed[Symbol.iterator] = function*() {
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
    const uuid = store.getState().profile.uuid
    if (!!uuid) {
      const body = JSON.stringify({
        user_info_uuid: uuid,
        invoices: selected
      })
      const url = `${API_SERVER}/salaries`

      console.log(body)
      console.log(url)
      yield call(apiPost, url, body)
    }
  } catch (e) {
    console.warn(e)
  }
}

function* getSalariesSaga() {
  try {
      const url = `${API_SERVER}/GetSalaries`
      const result = yield call(apiManualRequest, url)
      const resultParsed = JSON.parse(result.data)
      console.log('getSalariesSaga:: ',resultParsed)
      yield put(getSalariesSuccess(resultParsed))   
  } catch (e) {
    console.warn(e)
  }
}

/*  function* selectRowSalarySaga() {
  try {
    const uuid = store.getState().profile.uuid
    if (!!uuid) {
      const selected = store
        .getState()
        .salary.selectedRows.map(a => store.getState().salary.newSalary[a].id)
      const body = JSON.stringify({
        id_list: selected,
        user_info_uuid: uuid
      })

      const expensesUrl = `${API_SERVER}/expense-invoices/sum`
      const allowancesUrl = `${API_SERVER}/allowances/sum`

      let allowancesResult = yield call(apiPost, allowancesUrl, body)
      let expensesResult = yield call(apiPost, expensesUrl, body)

      console.log(allowancesResult, expensesResult)

      yield put(
        selectRowSalarySuccess({
          allowancesResult: allowancesResult,
          expensesResult: expensesResult
        })
      )
    }
  } catch (e) {
    console.warn(e)
  }
} */

 function* selectRowSalarySaga() {
  try {   
       /* const selected = store
        .getState()
        .salary.selectedRows.map(a => store.getState().salary.newSalary[a].id)
      const body = JSON.stringify({
        id_list: selected      
      })

       const expensesUrl = `${API_SERVER}/expense-invoices/sum`
      const allowancesUrl = `${API_SERVER}/allowances/sum` 

       let allowancesResult = yield call(apiPost, allowancesUrl, body)
      let expensesResult = yield call(apiPost, expensesUrl, body) 

     console.log(allowancesResult, expensesResult) */

     const uuid = store.getState().client.user.data[2]    
     const taxUrl = `${API_SERVER}/GetSalaryTaxPercentagesbyUUID`
     const body = JSON.stringify({ uuid: uuid })
     const taxResult = yield call(apiManualPost, taxUrl, body)
     const resultParsed = JSON.parse(taxResult.data)

      yield put(
        selectRowSalarySuccess({
           taxResult: resultParsed,
           //allowancesResult: allowancesResult,
           allowancesResult: '149',
          //expensesResult: expensesResult 
          expensesResult: '169'                  
        })
      )   
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
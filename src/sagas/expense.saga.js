import { takeEvery, put, take, call } from 'redux-saga/effects'


import {
  saveExpenseFailure,
  saveExpenseSuccess,
  getExpenseSuccess,
  getExpenseFailed,
  emptyExpenseRows,
  loadAllowanceCostSuccess,
  saveTravellingExpenseSuccess} from '../actions/index'
import { SAVE_EXPENSE, API_SERVER, GET_EXPENSE_START, SAVE_TRAVELLING_EXPENSE, LOAD_ALLOWANCE_COST, REMOVE_EXPENSE } from '../constants/index'
import { apiManualRequest, apiManualPost, createUploadFileChannel } from '../utils/request'
import store from '../store'
import { getFormValues, reset } from 'redux-form'
import { formatFiDateToISO, formatFiTimeToISO } from '../utils/DateTimeFormat'

/**
 * @author Skylar Kong
 */

function* getExpenseStartSaga() {
  try {
      const expenseUrl = `${API_SERVER}/GetExpenses`
      const expResult = yield apiManualRequest(expenseUrl)
      const expenseResult = JSON.parse(expResult.data)

      console.log('expenseResult:: ',expenseResult)
      const expenses = []

      for (const expense of expenseResult) {
        expenses.push(expense)
      }

      console.log('expenses:: ',expenses)

      const allowanceUrl = `${API_SERVER}/GetAllowances`
      const allowResult = yield apiManualRequest(allowanceUrl)
      const allowanceResult = JSON.parse(allowResult.data)

      console.log('allowanceResult:: ',allowanceResult)

      const allowances = []

      for (const allowance of allowanceResult) {
        allowances.push(allowance)
      }
      
      console.log('allowances:: ',allowances)

     // yield put(getExpenseSuccess(expenses, allowances))
      yield put(getExpenseSuccess(expenses))
  } catch (e) {
    yield put(getExpenseFailed(e))
  }
}

function* saveExpenseSaga() {  
  const url = `${API_SERVER}/AddExpenses`  
  const formValues = getFormValues('newfee')(store.getState())

  formValues.date_of_purchase = formatFiDateToISO(formValues.date_of_purchase)
  const file = formValues.inputFile[0]  

  const rows = formValues.expenseInputRow

  rows[Symbol.iterator] = function* () {
    const keys = Reflect.ownKeys(this)
    for (const key of keys) {
      yield this[key]
    }
  }

  const body = {    
    invoice_id: formValues.invoice.invoice_id,
    place_of_purchase: formValues.place_of_purchase,
    date_of_purchase: formValues.date_of_purchase    
  }

  body.rows = rows.map((el, ind) => {
    el.description = el['description' + ind]
    el.sum = el['sum' + ind]
    el.vat = el['vat' + ind] / 100    

    delete el['vat' + ind]
    delete el['description' + ind]
    delete el['sum' + ind]
    return el
  })

  try {
    const channel = yield call(createUploadFileChannel, url, file, body)
    while (true) {
      const {progress = 0, err, success} = yield take(channel)
      if (err) {
        yield put(saveExpenseFailure(err))
      }
      if (success) {
        yield put(saveExpenseSuccess(success))
        yield put(emptyExpenseRows())
        yield put(reset('newfee'))
      }
      console.log(progress)
    }
  } catch (e) {
    console.log(e)
  }
}

function* saveTravellingExpense() {

  const url = `${API_SERVER}/AddAllowances`

  const formValues = getFormValues('newallowance')(store.getState())

  const uuid = store.getState().client.user.data[2]

  const allowanceCost = (store.getState()).expense.allowanceCost
  const refinedForm = Object.assign({}, {...formValues}, {
    invoice_id:                 formValues.invoice.invoice_id,
    uuid:                       uuid,
    routes:                     formValues.allowanceInputRow.filter(el => el),
    start_date:                 formatFiDateToISO(formValues.start_date),
    end_date:                   formatFiDateToISO(formValues.end_date),
    start_time:                 formatFiTimeToISO(formValues.start_time),
    end_time:                   formatFiTimeToISO(formValues.end_time),
    vehicle_type_id:            !!formValues.vehicle_type ? allowanceCost[formValues.vehicle_type]['id'] : '1',
    additional_vehicle_cost_id: !!formValues.additional_vehicle_cost ? allowanceCost[formValues.additional_vehicle_cost]['id'] : '2',
    passengers:                 !!formValues.allowancePassenger ? formValues.allowancePassenger.filter(el => el) : [],
    pay_mileage:                !!formValues.pay_mileage,
    pay_allowance:              !!formValues.pay_allowance
  })

  delete refinedForm.invoice
  delete refinedForm.allowanceInputRow
  delete refinedForm.allowancePassenger

  const result = yield call(apiManualPost, url, JSON.stringify({ ...refinedForm }))
  yield put(saveTravellingExpenseSuccess(result))
}

function* loadAllowanceCost() {
  const thisYear = (new Date()).getFullYear()   
  const url = `${API_SERVER}/GetAllowanceCostbyYear?year=${thisYear}`
  const result = yield call(apiManualRequest, url)
  const allowanceCostResult = JSON.parse(result.data)
  console.log('Inside loadAllowanceCost:: ',allowanceCostResult)
  yield put(loadAllowanceCostSuccess(allowanceCostResult))
}

function* removeExpenseSaga({invoice_expense_id}) {
  try {
    const url = `${API_SERVER}/DeleteExpenses`
    const body = JSON.stringify({ invoice_expense_id: invoice_expense_id })
    yield call(apiManualPost, url, body)
  } catch (e) {
    console.warn(e)
  }
}

export function* watchSaveExpenseSaga() {
  yield takeEvery(SAVE_EXPENSE, saveExpenseSaga)
}

export function* watchGetExpenseStartSaga() {
  yield takeEvery(GET_EXPENSE_START, getExpenseStartSaga)
}

export function* watchSaveTravellingExpenseSaga() {
  yield takeEvery(SAVE_TRAVELLING_EXPENSE, saveTravellingExpense)
}

export function* watchLoadAllowanceCostSaga() {
  yield takeEvery(LOAD_ALLOWANCE_COST, loadAllowanceCost)
}

export function* watchRemoveExpenseSaga() {
  yield takeEvery(REMOVE_EXPENSE, removeExpenseSaga)
}


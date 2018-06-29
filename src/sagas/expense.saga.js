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
import { apiRequest, apiManualRequest, apiPost, apiManualPost, createUploadFileChannel } from '../utils/request'
import store from '../store'
import { getFormValues, reset } from 'redux-form'
import { formatFiDateToISO } from '../utils/DateTimeFormat'

/**
 * @author Skylar Kong
 */

function* getExpenseStartSaga() {
  try {

   // const uuid = (store.getState()).profile.uuid

   // if(!!uuid) {
      const expenseUrl = `${API_SERVER}/GetExpenses`
      const expResult = yield apiManualRequest(expenseUrl)
      const expenseResult = JSON.parse(expResult.data)

      console.log('expenseResult:: ',expenseResult)
      const expenses = []

/*       expenseResult[Symbol.iterator] = function*() {
        const keys = Reflect.ownKeys(this)
        for (const key of keys) {
          yield this[key]
        }
      } */

      for (const expense of expenseResult) {
        expenses.push(expense)
      }

      console.log('expenses:: ',expenses)

      /* const allowanceUrl = `${API_SERVER}/users/${uuid}/allowances`
      const allowanceResult = yield apiRequest(allowanceUrl)

      const allowances = []

      allowanceResult[Symbol.iterator] = function* () {
        const keys = Reflect.ownKeys(this)
        for (const key of keys) {
          yield this[key]
        }
      }

      for (const allowance of allowanceResult.data) {
        allowances.push(allowance)
      } */

      //yield put(getExpenseSuccess(expenses, allowances))
      yield put(getExpenseSuccess(expenses))
   // }

  } catch (e) {
    yield put(getExpenseFailed(e))
  }
}

//AddExpense Body::
/* {  
  "uuid":
 "invoice_id": "Saksa",
  "place_of_purchase": "jayapradha oy",
  "date_of_purchase": "date",
   "path": "dfg",
   filename;
   filetype:
  "InvoiceExpensesItems":[
        {
           description
           sum
           vat     
        }, {
           description
           sum
           vat
           }    
      ]
  } */

function* saveExpenseSaga() {
  
  const url = `${API_SERVER}/AddExpenses`

  //const user_uuid = (store.getState()).profile.uuid
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
    //user_info_uuid: user_uuid,
    date_of_purchase: formValues.date_of_purchase,
    place_of_purchase: formValues.place_of_purchase,
    invoice_id: formValues.invoice.id
  }

  body.rows = rows.map((el, ind) => {
    el.vat = el['vat' + ind] / 100
    el.description = el['description' + ind]
    el.sum = el['sum' + ind]

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

  const url = `${API_SERVER}/allowances`

  const formValues = getFormValues('newallowance')(store.getState())

  const allowanceCost = (store.getState()).expense.allowanceCost
  const refinedForm = Object.assign({}, {...formValues}, {
    routes:                     formValues.allowanceInputRow.filter(el => el),
    start_date:                 formatFiDateToISO(formValues.start_date),
    end_date:                   formatFiDateToISO(formValues.end_date),
    invoice_id:                 formValues.invoice.id,
    vehicle_type_id:            !!formValues.vehicle_type ? allowanceCost[formValues.vehicle_type]['id'] : '1',
    additional_vehicle_cost_id: !!formValues.additional_vehicle_cost ? allowanceCost[formValues.additional_vehicle_cost]['id'] : '2',
    passengers:                 !!formValues.allowancePassenger ? formValues.allowancePassenger.filter(el => el) : [],
    pay_mileage:                !!formValues.pay_mileage,
    pay_allowance:              !!formValues.pay_allowance
  })

  delete refinedForm.invoice
  delete refinedForm.allowanceInputRow
  delete refinedForm.allowancePassenger


  const result = yield call(apiPost, url, JSON.stringify({ ...refinedForm }))
  yield put(saveTravellingExpenseSuccess(result))
}

function* loadAllowanceCost() {

  const thisYear = (new Date()).getFullYear()
  const url = `${API_SERVER}/allowances/costs/${thisYear}`

  const result = yield call(apiRequest, url)
  yield put(loadAllowanceCostSuccess(result.data))
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


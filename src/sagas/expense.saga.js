import { takeEvery, put, take, call } from 'redux-saga/effects'
import {
  saveExpenseFailure,
  saveExpenseSuccess,
  getExpenseSuccess,
  getExpenseFailed,
  emptyExpenseRows,
  loadAllowanceCostSuccess,
  saveTravellingExpenseSuccess,
  getExpenseByIdSuccess,
  getAllowanceByIdSuccess,
  expenseUpdateSuccess,
  expenseUpdateFailed,
  addExpenseRow,
  addPassengerRow,
  allowanceUpdateSuccess,
  allowanceUpdateFailed,
  emptyPassengerRows
} from '../actions/index'
import {
  SAVE_EXPENSE,
  API_SERVER,
  GET_EXPENSE_START,
  SAVE_TRAVELLING_EXPENSE,
  LOAD_ALLOWANCE_COST,
  REMOVE_EXPENSE,
  REMOVE_ALLOWANCE,
  EDIT_EXPENSE,
  EDIT_ALLOWANCE,
  SAVE_EXPENSE_UPDATE,
  CANCEL_EXPENSE_UPDATE,
  SAVE_ALLOWANCE_UPDATE,
  CANCEL_ALLOWANCE_UPDATE
} from '../constants/index'
import {
  apiManualRequest,
  apiManualPost,
  createUploadFileChannel
} from '../utils/request'
import store from '../store'
import { getFormValues, reset, change } from 'redux-form'
import { formatFiDateToISO, formatFiTimeToISO } from '../utils/DateTimeFormat'
//import { reverseDate } from '../utils/invoice.utils'

/**
 * @author Skylar Kong
 */

function* getExpenseStartSaga() {
  try {
    const expenseUrl = `${API_SERVER}/GetExpenses`

    const uuid = store.getState().client.user.data[2]
    const body = JSON.stringify({
      uuid: uuid
    })

    const expResult = yield call(apiManualPost, expenseUrl, body)
    const expenseResult = JSON.parse(expResult.data)

    //console.log('expenseResult:: ', expenseResult)
    const expenses = []

    for (const expense of expenseResult) {
      expenses.push(expense)
    }

    //console.log('expenses:: ', expenses)

    const allowanceUrl = `${API_SERVER}/GetAllowances`

    const allowResult = yield call(apiManualPost, allowanceUrl, body)
    const allowanceResult = JSON.parse(allowResult.data)

    //console.log('allowanceResult:: ', allowanceResult)

    const allowances = []

    for (const allowance of allowanceResult) {
      allowances.push(allowance)
    }

    //console.log('allowances:: ', allowances)

    yield put(getExpenseSuccess(expenses, allowances))
  } catch (e) {
    yield put(getExpenseFailed(e))
  }
}

function* saveExpenseSaga() {
  const url = `${API_SERVER}/AddExpenses`
  const formValues = getFormValues('newfee')(store.getState())

  formValues.date_of_purchase = formatFiDateToISO(formValues.date_of_purchase)
  const file = formValues.inputFile[0]

  const expenseInputRow = formValues.expenseInputRow

  expenseInputRow[Symbol.iterator] = function*() {
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

  body.expenseInputRow = expenseInputRow.map((el, ind) => {
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
      const { progress = 0, err, success } = yield take(channel)
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

  const allowanceCost = store.getState().expense.allowanceCost
  const refinedForm = Object.assign(
    {},
    { ...formValues },
    {
      invoice_id: formValues.invoice.invoice_id,
      uuid: uuid,
      allowanceInputRow: formValues.allowanceInputRow.filter(el => el),
      start_date: formatFiDateToISO(formValues.start_date),
      end_date: formatFiDateToISO(formValues.end_date),
      start_time: formatFiTimeToISO(formValues.start_time),
      end_time: formatFiTimeToISO(formValues.end_time),
      vehicle_type_id: !!formValues.vehicle_type
        ? allowanceCost[formValues.vehicle_type]['id']
        : '1',
      additional_vehicle_cost_id: !!formValues.additional_vehicle_cost
        ? allowanceCost[formValues.additional_vehicle_cost]['id']
        : '2',
      allowancePassenger: !!formValues.allowancePassenger
        ? formValues.allowancePassenger.filter(el => el)
        : [],
      pay_mileage: !!formValues.pay_mileage,
      pay_allowance: !!formValues.pay_allowance
    }
  )

  delete refinedForm.invoice
  //delete refinedForm.allowanceInputRow
  //delete refinedForm.allowancePassenger

  const result = yield call(
    apiManualPost,
    url,
    JSON.stringify({ ...refinedForm })
  )
  yield put(saveTravellingExpenseSuccess(result))
}

function* loadAllowanceCost() {
  const thisYear = new Date().getFullYear()
  const url = `${API_SERVER}/GetAllowanceCostbyYear?year=${thisYear}`
  const result = yield call(apiManualRequest, url)
  const allowanceCostResult = JSON.parse(result.data)
  console.log('Inside loadAllowanceCost:: ', allowanceCostResult)
  yield put(loadAllowanceCostSuccess(allowanceCostResult))
}

function* removeExpenseSaga({ invoice_expense_id }) {
  try {
    const url = `${API_SERVER}/DeleteExpenses`
    const body = JSON.stringify({ invoice_expense_id: invoice_expense_id })
    yield call(apiManualPost, url, body)
  } catch (e) {
    console.warn(e)
  }
}

function* removeAllowanceSaga({ id }) {
  try {
    const url = `${API_SERVER}/DeleteAllowances`
    const body = JSON.stringify({ id: id })
    yield call(apiManualPost, url, body)
  } catch (e) {
    console.warn(e)
  }
}

function* editExpenseSaga({ invoice_expense_id }) {
  try {
    const url = `${API_SERVER}/GetExpensesByExpenseID`
    const body = JSON.stringify({ invoice_expense_id: invoice_expense_id })
    const result = yield call(apiManualPost, url, body)
    const expenseResult = JSON.parse(result.data)

    if (expenseResult) yield put(getExpenseByIdSuccess(expenseResult))

    let purchaseDate = store.getState().expense.expenseEdit[0].date_of_purchase

    yield put(change('newfee', 'date_of_purchase', purchaseDate))

    let invoicePopId = store.getState().expense.expenseEdit[0].invoice_id

    let invoicePop = store
      .getState()
      .invoice.invoices.filter(el => el.invoice_id === invoicePopId)
    yield put(change('newfee', 'invoice', invoicePop[0]))

    const purchasePlace = store.getState().expense.expenseEdit[0]
      .place_of_purchase
    yield put(change('newfee', 'place_of_purchase', purchasePlace))

    console.log('Inside editExpenseSaga:: ', expenseResult)

    const occurences = expenseResult[0].expenseInputRow.filter(
      el => el.invoice_expense_item_id
    ).length

    const l = expenseResult[0].expenseInputRow.slice(0, occurences).length
    for (let i = 0; i < l; i++) {
      yield put(addExpenseRow(true))
      yield put(
        change(
          'newfee',
          `expenseInputRow.${i}.description${i}`,
          expenseResult[0].expenseInputRow.slice(0, occurences)[i].description
        )
      )
      yield put(
        change(
          'newfee',
          `expenseInputRow.${i}.sum${i}`,
          expenseResult[0].expenseInputRow.slice(0, occurences)[i].sum
        )
      )
      yield put(
        change(
          'newfee',
          `expenseInputRow.${i}.vat${i}`,
          expenseResult[0].expenseInputRow.slice(0, occurences)[i].vat
        )
      )
    }
  } catch (e) {
    console.warn(e)
  }
}

function* editAllowanceSaga({ id }) {
  try {
    const url = `${API_SERVER}/GetAllowancesByAllowanceID`
    const body = JSON.stringify({ id: id })
    const result = yield call(apiManualPost, url, body)
    const allowanceResult = JSON.parse(result.data)

    if (allowanceResult) yield put(getAllowanceByIdSuccess(allowanceResult))

    console.log('allowanceResult:: ',allowanceResult[0])
    
    let startDate = store.getState().expense.allowanceEdit[0].start_date
    //startDate = reverseDate(startDate)    
    yield put(change('newallowance', 'start_date', startDate))

    let endDate = store.getState().expense.allowanceEdit[0].end_date
    //endDate = reverseDate(endDate)    
    yield put(change('newallowance', 'end_date', endDate))

    let startTime = store.getState().expense.allowanceEdit[0].start_time
    //startTime = startTime.slice(0, startTime.lastIndexOf(':'))    
    yield put(change('newallowance', 'start_time', startTime))

    let endTime = store.getState().expense.allowanceEdit[0].end_time
    //endTime = endTime.slice(0, endTime.lastIndexOf(':'))    
    yield put(change('newallowance', 'end_time', endTime))

    let vehicleType = allowanceResult[0].vehicle_Info[0].vehicle_type
    yield put(change('newallowance', 'vehicle_type', vehicleType))

    let additionalVehicleType =
      allowanceResult[0].additional_vehicle_Info[0].additional_vehicle_type
    yield put(
      change('newallowance', 'additional_vehicle_cost', additionalVehicleType)
    )

    let invoicePopId = store.getState().expense.allowanceEdit[0].invoice_id
    let invoicePop = store
      .getState()
      .invoice.invoices.filter(el => el.invoice_id === invoicePopId)
    yield put(change('newallowance', 'invoice', invoicePop[0]))    

    const occurencesRoute = allowanceResult[0].allowanceInputRow.filter(
      el => el.route
    ).length
    const l = allowanceResult[0].allowanceInputRow.slice(0, occurencesRoute)
      .length
    for (let i = 0; i < l; i++) {
      yield put(
        change(
          'newallowance',
          `allowanceInputRow.${i}.route`,
          allowanceResult[0].allowanceInputRow.slice(0, occurencesRoute)[i]
            .route
        )
      )
    }

    yield put(emptyPassengerRows())

 const occurencesPassenger = allowanceResult[0].allowancePassenger.filter(
      el => el.id
    ).length

    console.log('Inside editAllowanceSaga occurencesPassenger:: ',occurencesPassenger)

    const k = allowanceResult[0].allowancePassenger.slice(
      0,
      occurencesPassenger
    ).length

    console.log('Inside editAllowanceSaga k:: ',k)

    for (let j = 0; j < k; j++) {
      yield put(addPassengerRow(true))
      yield put(
        change(
          'newallowance',
          `allowancePassenger.${j}.passenger`,
          allowanceResult[0].allowancePassenger.slice(0, occurencesPassenger)[j].passenger
        )
      )
    }  

    const allowanceInfoKeys = Object.keys(allowanceResult[0]).filter(
      key =>
        key !== 'allowanceInputRow' &&
        'allowancePassenger' &&
        'vehicle_Info' &&
        'additional_vehicle_Info' &&
        'invoice_id'
    )
    for (let key of allowanceInfoKeys) {
      yield put(change('newallowance', key, allowanceResult[0][key]))
    }
  } catch (e) {
    console.warn(e)
  }
}

function* saveExpenseUpdateSaga() {
  const url = `${API_SERVER}/UpdateExpenses`
  const formValues = getFormValues('newfee')(store.getState())
  const invoice_expense_id = store.getState().expense.expenseEdit[0]
    .invoice_expense_id

  //@@ToDo :: Need to reverse the date like below....
  //const reversedPurchaseDate = reverseDate(formValues.date_of_purchase)
  //console.log('reversedPurchaseDate:: ',reversedPurchaseDate)
  //const date_of_purchase = new Date('2018.8.31')
  //const purchaseDate = formatFiDateToISO(date_of_purchase)

  const expenseInputRow = formValues.expenseInputRow

  console.log('Inside saveExpenseUpdateSaga BEFORE:: ',expenseInputRow)

/*   expenseInputRow[Symbol.iterator] = function*() {
    const keys = Reflect.ownKeys(this)
    for (const key of keys) {
      yield this[key]
    }
  } */

  const body = {
    invoice_id: formValues.invoice.invoice_id,
    invoice_expense_id: invoice_expense_id,
    place_of_purchase: formValues.place_of_purchase,
    date_of_purchase: formValues.date_of_purchase
  }

  body.expenseInputRow = expenseInputRow.map((el, ind) => {
    el.description = el['description' + ind]
    el.sum = el['sum' + ind]
    el.vat = el['vat' + ind] / 100

    delete el['vat' + ind]
    delete el['description' + ind]
    delete el['sum' + ind]
    return el
  })

  console.log('Inside saveExpenseUpdateSaga AFTER:: ', body.expenseInputRow)

  const file = formValues.inputFile[0]

  try {
    const channel = yield call(createUploadFileChannel, url, file, body)
    while (true) {
      const { progress = 0, err, success } = yield take(channel)
      if (err) {
        yield put(expenseUpdateFailed(err))
        yield put(emptyExpenseRows())
        yield put(reset('newfee'))     
      }
      if (success) {
        yield put(expenseUpdateSuccess(success))
        yield put(emptyExpenseRows())
        yield put(reset('newfee'))
      }
      console.log(progress)
    }
  } catch (e) {
    expenseUpdateFailed(e)
  }
}

function* cancelExpenseUpdateSaga() {
  try {
    yield put(reset('newfee'))
  } catch (e) {
    console.warn(e)
  }
}

function* saveAllowanceUpdateSaga() {
  try {
    const url = `${API_SERVER}/UpdateAllowances`
    const formValues = getFormValues('newallowance')(store.getState())
    const uuid = store.getState().client.user.data[2]

    const id = store.getState().expense.allowanceEdit[0].id

    const allowanceCost = store.getState().expense.allowanceCost
    const refinedForm = Object.assign(
      {},
      { ...formValues },
      {
        id: id,
        invoice_id: formValues.invoice.invoice_id,
        uuid: uuid,
        allowanceInputRow: formValues.allowanceInputRow.filter(el => el),

        /* start_date: formatFiDateToISO(formValues.start_date),
        end_date: formatFiDateToISO(formValues.end_date),
        start_time: formatFiTimeToISO(formValues.start_time),
        end_time: formatFiTimeToISO(formValues.end_time), */

        start_date: formValues.start_date,
        end_date: formValues.end_date,
        start_time: formValues.start_time,
        end_time: formValues.end_time,

        vehicle_type_id: !!formValues.vehicle_type
          ? allowanceCost[formValues.vehicle_type]['id']
          : '1',
        additional_vehicle_cost_id: !!formValues.additional_vehicle_cost
          ? allowanceCost[formValues.additional_vehicle_cost]['id']
          : '2',
        allowancePassenger: !!formValues.allowancePassenger
          ? formValues.allowancePassenger.filter(el => el)
          : [],
        pay_mileage: !!formValues.pay_mileage,
        pay_allowance: !!formValues.pay_allowance
      }
    )

    delete refinedForm.invoice
    delete refinedForm.deleted
    delete refinedForm.deleted_at
    delete refinedForm.created
    delete refinedForm.last_modified_date   

   const result =  yield call(apiManualPost, url, JSON.stringify({ ...refinedForm }))

   if(result.data === 'Allowances updated successfully!'){
     yield put(allowanceUpdateSuccess(result.data))
   }else{
    yield put(allowanceUpdateFailed(result.data))
   }
    yield put(reset('newallowance'))
  } catch (e) {
    allowanceUpdateFailed(e)
  }
}

function* cancelAllowanceUpdateSaga() {
  try {
    yield put(reset('newallowance'))
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

export function* watchEditExpenseSaga() {
  yield takeEvery(EDIT_EXPENSE, editExpenseSaga)
}

export function* watchRemoveAllowanceSaga() {
  yield takeEvery(REMOVE_ALLOWANCE, removeAllowanceSaga)
}

export function* watchEditAllowanceSaga() {
  yield takeEvery(EDIT_ALLOWANCE, editAllowanceSaga)
}

export function* watchSaveExpenseUpdateSaga() {
  yield takeEvery(SAVE_EXPENSE_UPDATE, saveExpenseUpdateSaga)
}

export function* watchCancelExpenseUpdateSaga() {
  yield takeEvery(CANCEL_EXPENSE_UPDATE, cancelExpenseUpdateSaga)
}

export function* watchSaveAllowanceUpdateSaga() {
  yield takeEvery(SAVE_ALLOWANCE_UPDATE, saveAllowanceUpdateSaga)
}

export function* watchCancelAllowanceUpdateSaga() {
  yield takeEvery(CANCEL_ALLOWANCE_UPDATE, cancelAllowanceUpdateSaga)
}

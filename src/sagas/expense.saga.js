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
  emptyAllowanceInputRows,
  emptyPassengerRows,
  cancelExpenseUpdate,
  cancelAllowanceUpdate,
  changeExpensePurchaseDate,
  changeAllowanceDate,
  changeAllowanceStartDate,
  changeAllowanceEndDate,
  changeAllowanceStartTime,
  changeAllowanceEndTime
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
  CANCEL_ALLOWANCE_UPDATE,
  LOCATION_CHANGE,
  CHANGE_ALLOWANCE_DATE
} from '../constants/index'
import {
  apiManualRequest,
  apiManualPost,
  createUploadFileChannel
} from '../utils/request'
import store from '../store'
import { getFormValues, reset, change } from 'redux-form'
import {
  formatFiDateToISO,
  formatFiTimeToISO
} from '../utils/DateTimeFormat'

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

  const body = {
    invoice_id: formValues.invoice.invoice_id,
    place_of_purchase: formValues.place_of_purchase,
    date_of_purchase: formValues.date_of_purchase,
    expenseInputRow: !!formValues.expenseInputRow
      ? formValues.expenseInputRow.filter(el => el)
      : []
  }

  let bodyExpenseRows = []

  const l = Array.isArray(body.expenseInputRow) ? body.expenseInputRow.length : Object.keys(body.expenseInputRow).length

  for (let i = 0; i < l; i++) {
    body.expenseInputRow[i].description = body.expenseInputRow[i]['description']
    body.expenseInputRow[i].sum = parseFloat(body.expenseInputRow[i]['sum'].replace(/,/g, '.')).toString()
    body.expenseInputRow[i].vat = body.expenseInputRow[i]['vat']

    bodyExpenseRows[i] = body.expenseInputRow[i]
  }

  body.expenseInputRow = bodyExpenseRows

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
      allowancePassenger: !!formValues.passengerInputRow
        ? formValues.passengerInputRow.filter(el => el)
        : [],
      mileage_allowance: !!formValues.mileage_allowance,
      day_allowance: !!formValues.day_allowance
    }
  )

  delete refinedForm.invoice
  //delete refinedForm.allowanceInputRow
  delete refinedForm.passengerInputRow

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
  //console.log('Inside loadAllowanceCost:: ', allowanceCostResult)
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
    //console.log('purchaseDate:: ', purchaseDate)

    let renewPurchaseDate = new Date(purchaseDate)
    //console.log('renewPurchaseDate:: ', renewPurchaseDate)

    yield put(change('newfee', 'date_of_purchase', renewPurchaseDate))
    yield put(changeExpensePurchaseDate(renewPurchaseDate))

    let invoicePopId = store.getState().expense.expenseEdit[0].invoice_id

    let invoicePop = store
      .getState()
      .invoice.invoices.filter(el => el.invoice_id === invoicePopId)
    yield put(change('newfee', 'invoice', invoicePop[0]))

    const purchasePlace = store.getState().expense.expenseEdit[0]
      .place_of_purchase
    yield put(change('newfee', 'place_of_purchase', purchasePlace))

    //console.log('Inside editExpenseSaga:: ', expenseResult)

    const occurences = expenseResult[0].expenseInputRow.filter(
      el => el.invoice_expense_item_id
    ).length

    const l = expenseResult[0].expenseInputRow.slice(0, occurences).length
    for (let i = 0; i < l; i++) {
      yield put(addExpenseRow())
      yield put(
        change(
          'newfee',
          `expenseInputRow.${i}.description`,
          expenseResult[0].expenseInputRow.slice(0, occurences)[i].description
        )
      )
      yield put(
        change(
          'newfee',
          `expenseInputRow.${i}.sum`,
          expenseResult[0].expenseInputRow.slice(0, occurences)[i].sum
        )
      )
      yield put(
        change(
          'newfee',
          `expenseInputRow.${i}.vat`,
          expenseResult[0].expenseInputRow.slice(0, occurences)[i].vat
        )
      )
    }
  } catch (e) {
    console.warn(e)
  }
}

function* expenseLocationChangeSaga() {
  try {
    let expenseEdit = []
    expenseEdit = store.getState().expense.expenseEdit
    let purchaseDate = new Date()
    yield put(change('newfee', 'date_of_purchase', purchaseDate))
    yield put(change('newfee', 'invoice', ''))
    yield put(change('newfee', 'place_of_purchase', ''))
    const occurences = expenseEdit[0].expenseInputRow.filter(
      el => el.invoice_expense_item_id
    ).length
    const l = expenseEdit[0].expenseInputRow.slice(0, occurences).length
    for (let i = 0; i < l; i++) {
      yield put(addExpenseRow())
      yield put(change('newfee', `expenseInputRow.${i}.description`, ''))
      yield put(change('newfee', `expenseInputRow.${i}.sum`, ''))
      yield put(change('newfee', `expenseInputRow.${i}.vat`, 24))
    }
    yield put(cancelExpenseUpdate())
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

    let startDate = store.getState().expense.allowanceEdit[0].start_date
    let renewStartDate = new Date(startDate)
    yield put(change('newallowance', 'start_date', renewStartDate))
    yield put(changeAllowanceStartDate(renewStartDate))

    let endDate = store.getState().expense.allowanceEdit[0].end_date
    let renewEndDate = new Date(endDate)
    yield put(change('newallowance', 'end_date', renewEndDate))
    yield put(changeAllowanceEndDate(renewEndDate))
    yield put(changeAllowanceDate())

    let startTime = store.getState().expense.allowanceEdit[0].start_time
    let renewStartTime = new Date(`${startDate}T${startTime}`)
    yield put(change('newallowance', 'start_time', renewStartTime))
    yield put(changeAllowanceStartTime(renewStartTime))

    let endTime = store.getState().expense.allowanceEdit[0].end_time
    let renewEndTime = new Date(`${endDate}T${endTime}`)
    yield put(change('newallowance', 'end_time', renewEndTime))
    yield put(changeAllowanceEndTime(renewEndTime))

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

    yield put(emptyAllowanceInputRows())

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
    const k = allowanceResult[0].allowancePassenger.slice(
      0,
      occurencesPassenger
    ).length

    for (let j = 0; j < k; j++) {
      yield put(addPassengerRow(true))
      yield put(
        change(
          'newallowance',
          `passengerInputRow.${j}.passenger`,
          allowanceResult[0].allowancePassenger.slice(0, occurencesPassenger)[j]
            .passenger
        )
      )
    }

    const filterKeys = [
      'allowanceInputRow',
      'allowancePassenger',
      'vehicle_Info',
      'additional_vehicle_Info',
      'invoice_id',
      'start_date',
      'start_time',
      'end_date',
      'end_time'
    ]
    const allowanceInfoKeys = Object.keys(allowanceResult[0])
    const conditions = allowanceInfoKeys.filter(f => !filterKeys.includes(f))

    for (let key of conditions) {
      yield put(change('newallowance', key, allowanceResult[0][key]))
    }
  } catch (e) {
    console.warn(e)
  }
}

function* allowanceLocationChangeSaga() {
  try {
    let allowanceEdit = []
    allowanceEdit = store.getState().expense.allowanceEdit

    yield put(change('newallowance', 'start_date', ''))
    yield put(change('newallowance', 'end_date', ''))
    yield put(change('newallowance', 'start_time', ''))
    yield put(change('newallowance', 'end_time', ''))
    yield put(change('newallowance', 'vehicle_type', ''))
    yield put(change('newallowance', 'additional_vehicle_cost', ''))
    yield put(change('newallowance', 'invoice', ''))

    yield put(emptyAllowanceInputRows())

    const occurencesRoute = allowanceEdit[0].allowanceInputRow.filter(
      el => el.route
    ).length
    const l = allowanceEdit[0].allowanceInputRow.slice(0, occurencesRoute)
      .length
    for (let i = 0; i < l; i++) {
      yield put(change('newallowance', `allowanceInputRow.${i}.route`, ''))
    }

    yield put(emptyPassengerRows())

    const occurencesPassenger = allowanceEdit[0].allowancePassenger.filter(
      el => el.id
    ).length

    const k = allowanceEdit[0].allowancePassenger.slice(0, occurencesPassenger)
      .length

    for (let j = 0; j < k; j++) {
      yield put(addPassengerRow(true))
      yield put(change('newallowance', `passengerInputRow.${j}.passenger`, ''))
    }

    const filterKeys = [
      'allowanceInputRow',
      'allowancePassenger',
      'vehicle_Info',
      'additional_vehicle_Info',
      'invoice_id',
      'start_date',
      'start_time',
      'end_date',
      'end_time'
    ]
    const allowanceInfoKeys = Object.keys(allowanceEdit[0])
    const conditions = allowanceInfoKeys.filter(f => !filterKeys.includes(f))

    for (let key of conditions) {
      yield put(change('newallowance', key, ''))
    }
    yield put(cancelAllowanceUpdate())
  } catch (e) {
    console.warn(e)
  }
}

function* saveExpenseUpdateSaga() {
  const url = `${API_SERVER}/UpdateExpenses`
  const formValues = getFormValues('newfee')(store.getState())
  const invoice_expense_id = store.getState().expense.expenseEdit[0]
    .invoice_expense_id

  const body = {
    invoice_id: formValues.invoice.invoice_id,
    invoice_expense_id: invoice_expense_id,    
    place_of_purchase: formValues.place_of_purchase,
    date_of_purchase: formValues.date_of_purchase,
    expenseInputRow: !!formValues.expenseInputRow
      ? formValues.expenseInputRow.filter(el => el)
      : []
  }

  let bodyExpenseRows = []

  const l = Array.isArray(body.expenseInputRow) ? body.expenseInputRow.length : Object.keys(body.expenseInputRow).length

  for (let i = 0; i < l; i++) {
    body.expenseInputRow[i].description = body.expenseInputRow[i]['description']
    body.expenseInputRow[i].sum = parseFloat(body.expenseInputRow[i]['sum'].toString().replace(/,/g, '.')).toString()
    body.expenseInputRow[i].vat = body.expenseInputRow[i]['vat']

    bodyExpenseRows[i] = body.expenseInputRow[i]
  }

  body.expenseInputRow = bodyExpenseRows

  const file = formValues.inputFile[0]

  try {
    const channel = yield call(createUploadFileChannel, url, file, body)
    while (true) {
      const { progress = 0, err, success } = yield take(channel)
      if (err) {
        yield put(expenseUpdateFailed(err))        
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
        allowancePassenger: !!formValues.passengerInputRow
          ? formValues.passengerInputRow.filter(el => el)
          : [],
        mileage_allowance: !!formValues.mileage_allowance,
        day_allowance: !!formValues.day_allowance
      }
    )

    delete refinedForm.invoice
    delete refinedForm.deleted
    delete refinedForm.deleted_at
    delete refinedForm.created
    delete refinedForm.last_modified_date
    delete refinedForm.passengerInputRow

    const result = yield call(
      apiManualPost,
      url,
      JSON.stringify({ ...refinedForm })
    )

    if (result.data === 'Allowances updated successfully!') {
      yield put(allowanceUpdateSuccess(result.data))
    } else {
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

function* changeAllowanceDateSaga() {
  try {
    const full_time_allowance = getFormValues('newallowance')(store.getState()).full_time_allowance
    const days = store.getState().expense.days

    if (full_time_allowance > days) {
      yield put(change('newallowance','full_time_allowance', 0))
      yield put(change('newallowance','part_time_allowance', 0))
      yield put(change('newallowance','meal_allowance', 0))
    }
    //console.log('Retain all day_allowance values')

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

export function* watchExpenseLocationChangeSaga() {
  yield takeEvery(LOCATION_CHANGE, expenseLocationChangeSaga)
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

export function* watchAllowanceLocationChangeSaga() {
  yield takeEvery(LOCATION_CHANGE, allowanceLocationChangeSaga)
}

export function* watchChangeAllowanceDateSaga() {
  yield takeEvery(CHANGE_ALLOWANCE_DATE, changeAllowanceDateSaga)
}
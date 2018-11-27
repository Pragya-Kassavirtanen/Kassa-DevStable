import React from 'react'

import ExpenseInputRow from '../components/expenses/newExpenseInputRow.component'
import ExpenseRow from '../components/expenses/expenseRow.component'
import AllowanceRow from '../components/expenses/allowanceRow.component'
import AllowanceInputRow from '../components/expenses/newAllowanceInputRow.component'
import PassengerInputRow from '../components/expenses/newPassengerInputRow.component'

import { getFormValues } from 'redux-form'
import store from '../store'

import DateTimeFormat from '../utils/DateTimeFormat'

import {
  ADD_EXPENSE_ROW,
  REMOVE_EXPENSE_ROW,
  REMOVE_EXPENSE,
  REMOVE_ALLOWANCE,
  ADD_ALLOWANCE_ROW,
  REMOVE_ALLOWANCE_ROW,
  ADD_PASSENGER_ROW,
  REMOVE_PASSENGER_ROW,
  SHOW_ADDITIONAL_VEHICLE_INFO,
  CHANGE_ALLOWANCE_DATE,
  GET_EXPENSE_SUCCESS,
  EMPTY_EXPENSE_ROWS,
  SAVE_EXPENSE,
  SAVE_EXPENSE_SUCCESS,
  CLOSE_EXPENSE_SNACKBAR,
  EXPENSE_CHANGE_PAGE,
  LOAD_ALLOWANCE_COST_SUCCESS,
  ALLOWANCE_CHANGE_PAGE,
  SAVE_TRAVELLING_EXPENSE,
  SAVE_TRAVELLING_EXPENSE_SUCCESS,
  GET_EXPENSE_BY_ID_SUCCESS,
  GET_ALLOWANCE_BY_ID_SUCCESS,
  SAVE_EXPENSE_UPDATE,
  EXPENSE_UPDATE_SUCCESS,
  EXPENSE_UPDATE_FAILED,
  CANCEL_EXPENSE_UPDATE,
  CANCEL_ALLOWANCE_UPDATE,
  CHANGE_PURCHASE_DATE,
  SAVE_ALLOWANCE_UPDATE,
  ALLOWANCE_UPDATE_SUCCESS,
  ALLOWANCE_UPDATE_FAILED,
  EMPTY_PASSENGER_ROWS,
  EMPTY_ALLOWANCE_INPUT_ROWS,
  CHANGE_ALLOWANCE_START_TIME,
  CHANGE_ALLOWANCE_END_TIME,
  CHANGE_ALLOWANCE_START_DATE,
  CHANGE_ALLOWANCE_END_DATE
} from '../constants/index'
const initialState = {
  expenseInputRow: [
    <ExpenseInputRow key={0}
      description={`expenseInputRow[${0}][description]`}
      sum={`expenseInputRow[${0}][sum]`}
      vat={`expenseInputRow[${0}][vat]`}     
    />
  ],
  allowanceInputRow: [
    <AllowanceInputRow route={`allowanceInputRow[${0}][route]`} key={0} />,
    <AllowanceInputRow route={`allowanceInputRow[${1}][route]`} key={1} />
  ],
  passengerInputRow: [
    <PassengerInputRow
      passenger={`passengerInputRow[${0}][passenger]`}
      key={0}
    />
  ],
  expenses: [],
  expenseRow: [],
  expenseRowCounter: 1,
  allowanceRowCounter: 2,
  passengerRowCounter: 1,
  allowances: [],
  allowanceRow: [],
  rowKeys: [],
  showAdditionalInfo: false,
  days: 0,
  passengerPrice: 0,
  selected: 0,
  allowanceSelected: 0,
  showSpinner: false,
  showSnackbar: false,
  expenseEdit: [],
  allowanceEdit: [],
  isEdit: false,
  isChangeComponent: false
}

const expenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EXPENSE_SUCCESS:
      return Object.assign(
        {},
        { ...state },
        {
          expenseRow: _createExpenseRow(action.expenses, state.selected),
          expenses: action.expenses,
          allowanceRow: _createAllowanceRow(
            action.allowances,
            state.allowanceSelected,
            state.allowanceCost
          ),
          allowances: action.allowances
        }
      )

    case ADD_EXPENSE_ROW:
      const expenseRowState = state.expenseInputRow
      return Object.assign({}, state, {
        expenseInputRow: expenseRowState.concat(
          _createExpenseInputRow(state.expenseRowCounter)
        ),
        expenseRowCounter: state.expenseRowCounter + 1
      })

    case SAVE_EXPENSE:
      return Object.assign({}, state, { showSpinner: true })

    case SAVE_EXPENSE_UPDATE:
      return Object.assign({}, state, { showSpinner: true })

    case SAVE_EXPENSE_SUCCESS:
      return Object.assign({}, state, {
        showSpinner: false,
        showSnackbar: true
      })

    case CLOSE_EXPENSE_SNACKBAR:
      return Object.assign({}, state, {
        showSnackbar: false
      })

    case EMPTY_EXPENSE_ROWS:
      return Object.assign({}, state, {
        expenseInputRow: [
          <ExpenseInputRow key={0}
            description={`expenseInputRow[${0}][description]`}
            sum={`expenseInputRow[${0}][sum]`}
            vat={`expenseInputRow[${0}][vat]`}            
          />
        ],
        expenseRowCounter: 1
      })

    case EMPTY_PASSENGER_ROWS:
      return Object.assign({}, state, {
        passengerInputRow: [],
        passengerRowCounter: 0
      })

    case EMPTY_ALLOWANCE_INPUT_ROWS:
      return Object.assign({}, state, {       
        allowanceInputRow: [
          <AllowanceInputRow route={`allowanceInputRow[${0}][route]`} key={0} />,
          <AllowanceInputRow route={`allowanceInputRow[${1}][route]`} key={1} />
        ],
        allowanceRowCounter: 2
      })

    case REMOVE_EXPENSE_ROW:
      return Object.assign({}, state, {
        expenseInputRow: state.expenseInputRow.filter(
          (el, index) => index !== action.key
        )
      })

    case REMOVE_EXPENSE:
      return Object.assign({}, state, {
        expenses: state.expenses.filter(
          el => el.invoice_expense_id !== action.invoice_expense_id
        ),
        expenseRow: _createExpenseRow(
          state.expenses.filter(
            el => el.invoice_expense_id !== action.invoice_expense_id
          ),
          state.selected
        )
      })

    case REMOVE_ALLOWANCE:
      return Object.assign({}, state, {
        allowances: state.allowances.filter(el => el.id !== action.id),
        allowanceRow: _createAllowanceRow(
          state.allowances.filter(el => el.id !== action.id),
          state.selected
        )
      })

    case ADD_ALLOWANCE_ROW:
      const allowanceRowState = state.allowanceInputRow
      return Object.assign({}, state, {
        allowanceInputRow: allowanceRowState.concat(
          _createAllowanceInputRow(state.allowanceRowCounter)
        ),
        allowanceRowCounter: state.allowanceRowCounter + 1
      })

    case REMOVE_ALLOWANCE_ROW:
      return state.allowanceInputRow.length > 2
        ? Object.assign({}, state, {
            allowanceInputRow: state.allowanceInputRow.filter(
              (el, index) => index !== action.key
            )
          })
        : state

    case ADD_PASSENGER_ROW:
      const check = action.check
      const allowancePassengerState = state.passengerInputRow
      return Object.assign({}, state, {
        passengerInputRow: allowancePassengerState.concat(
          _createPassengerRow(state.passengerRowCounter, check)
        ),
        passengerRowCounter: state.passengerRowCounter + 1,
        passengerPrice:
          state.passengerPrice +
          store.getState().expense.allowanceCost.passenger_cost.value
      })

    case REMOVE_PASSENGER_ROW:
      return Object.assign({}, state, {
        passengerInputRow: state.passengerInputRow.filter(
          (el, index) => index !== action.rowNumber
        ),
        passengerPrice:
          state.passengerPrice -
          store.getState().expense.allowanceCost.passenger_cost.value
      })

    case SHOW_ADDITIONAL_VEHICLE_INFO:
      return Object.assign({}, state, {
        showAdditionalInfo: action.value === 'o'
      })

    case CHANGE_ALLOWANCE_START_DATE:
      return Object.assign({}, state, { start_date: action.date })

    case CHANGE_ALLOWANCE_END_DATE:
      return Object.assign({}, state, { end_date: action.date })

    case CHANGE_ALLOWANCE_START_TIME:
      return Object.assign({}, state, { start_time: action.time })

    case CHANGE_ALLOWANCE_END_TIME:
      return Object.assign({}, state, { end_time: action.time })

    case CHANGE_ALLOWANCE_DATE:
      try {
        const start_date = getFormValues('newallowance')(store.getState())
          .start_date

        const end_date = getFormValues('newallowance')(store.getState())
          .end_date

        const difference = Math.ceil(
          (new Date(end_date) - new Date(start_date)) / (1000 * 60 * 60 * 24)
        )

        if (!!difference)
          return Object.assign({}, state, {
            days: difference
          })
        else
          return Object.assign({}, state, {
            days: 0            
          })
      } catch (e) {
        return Object.assign({}, state, { days: 0 })
      }

    case EXPENSE_CHANGE_PAGE:
      return Object.assign(
        {},
        { ...state },
        {
          expenseRow: _createExpenseRow(
            state.expenses,
            action.selected.selected
          ),
          selected: action.selected.selected
        }
      )

    case LOAD_ALLOWANCE_COST_SUCCESS:
      const allowanceCost = action.result.reduce((allCost, el) => {
        allCost[el.type] = { id: el.id, value: el.value, year: el.year }
        return allCost
      }, {})
      return Object.assign({}, state, {
        allowanceCost: { ...allowanceCost, select: { id: 'select', value: 0 } }
      })

    case ALLOWANCE_CHANGE_PAGE:
      return Object.assign(
        {},
        { ...state },
        {
          allowanceRow: _createAllowanceRow(
            state.allowances,
            action.selected.selected,
            state.allowanceCost
          ),
          allowanceSelected: action.selected.selected
        }
      )

    case SAVE_TRAVELLING_EXPENSE:
      return Object.assign({}, state, { showSpinner: true })

    case SAVE_TRAVELLING_EXPENSE_SUCCESS:
      return Object.assign({}, state, {
        showSpinner: false,
        showSnackbar: true
      })

    case GET_EXPENSE_BY_ID_SUCCESS:
      //console.log('result:: ', action.result)
      return Object.assign(
        {},
        { ...state },
        {
          expenseEdit: action.result,
          isEdit: true
        }
      )

    case GET_ALLOWANCE_BY_ID_SUCCESS:
      //console.log('result:: ', action.result)
      return Object.assign(
        {},
        { ...state },
        {
          allowanceEdit: action.result,
          isEdit: true
        }
      )

    case EXPENSE_UPDATE_SUCCESS:
      return Object.assign(
        {},
        { ...state },
        {
          showSpinner: false,
          showSnackbar: true,
          expenseEdit: [],
          isEdit: false,
          expenseInputRow: [
            <ExpenseInputRow key={0}
              description={`expenseInputRow[${0}][description]`}
              sum={`expenseInputRow[${0}][sum]`}
              vat={`expenseInputRow[${0}][vat]`}              
            />
          ],
          expenseRowCounter: 1
        }
      )

    case EXPENSE_UPDATE_FAILED:
      return Object.assign(
        {},
        { ...state },
        {
          expenseEdit: [],
          isEdit: false,
          expenseInputRow: [
            <ExpenseInputRow key={0}
              description={`expenseInputRow[${0}][description]`}
              sum={`expenseInputRow[${0}][sum]`}
              vat={`expenseInputRow[${0}][vat]`}              
            />
          ],
          expenseRowCounter: 1
        }
      )

    case CANCEL_EXPENSE_UPDATE:
      return Object.assign(
        {},
        { ...state },
        {
          expenseEdit: [],
          isEdit: false,
          expenseInputRow: [
            <ExpenseInputRow key={0}
              description={`expenseInputRow[${0}][description]`}
              sum={`expenseInputRow[${0}][sum]`}
              vat={`expenseInputRow[${0}][vat]`}              
            />
          ],
          expenseRowCounter: 1
        }
      )

    case SAVE_ALLOWANCE_UPDATE:
      return Object.assign({}, state, { showSpinner: true })

    case ALLOWANCE_UPDATE_SUCCESS:
      return Object.assign(
        {},
        { ...state },
        {
          showSpinner: false,
          showSnackbar: true,
          allowanceEdit: [],
          isEdit: false,
          passengerInputRow: [],
          passengerRowCounter: 0,
          passengerPrice: 0,
          allowanceInputRow: [
            <AllowanceInputRow route={`allowanceInputRow[${0}][route]`} key={0} />,
            <AllowanceInputRow route={`allowanceInputRow[${1}][route]`} key={1} />
          ],
          allowanceRowCounter: 2
        }
      )

    case ALLOWANCE_UPDATE_FAILED:
      return Object.assign(
        {},
        { ...state },
        {
          showSpinner: false,
          showSnackbar: true,
          allowanceEdit: [],
          isEdit: false,
          allowanceInputRow: [
            <AllowanceInputRow route={`allowanceInputRow[${0}][route]`} key={0} />,
            <AllowanceInputRow route={`allowanceInputRow[${1}][route]`} key={1} />
          ],
          allowanceRowCounter: 2,
          passengerInputRow: [],
          passengerRowCounter: 0,
          passengerPrice: 0
        }
      )

    case CANCEL_ALLOWANCE_UPDATE:
      return Object.assign(
        {},
        { ...state },
        {
          allowanceEdit: [],
          isEdit: false,
          passengerInputRow: [],
          passengerRowCounter: 0,
          passengerPrice: 0,
          allowanceInputRow: [
            <AllowanceInputRow route={`allowanceInputRow[${0}][route]`} key={0} />,
            <AllowanceInputRow route={`allowanceInputRow[${1}][route]`} key={1} />
          ],
          allowanceRowCounter: 2
        }
      )

    case CHANGE_PURCHASE_DATE:
      return Object.assign({}, state, { date_of_purchase: action.date })

    default:
      return state
  }
}

const _createExpenseRow = (expenses, selected) =>
  expenses.slice(selected * 10, selected * 10 + 10).map(el => (
    <ExpenseRow
      key={el.invoice_expense_id}
      company_name={el.company_name}
      date_of_purchase={new DateTimeFormat('fi', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
      }).format(new Date(el.date_of_purchase))}
      place_of_purchase={el.place_of_purchase}
      sum={new Intl.NumberFormat('fi-FI', {
        style: 'currency',
        currency: 'EUR'
      }).format(el.sum)}
      invoice_expense_id={el.invoice_expense_id}
    />
  ))

const _createAllowanceRow = (allowances, selected) =>
  allowances.slice(selected * 10, selected * 10 + 10).map(el => (
    <AllowanceRow
      key={el.id}
      id={el.id}
      company_name={el.company_name}
      start_date={new DateTimeFormat('fi', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
      }).format(new Date(el.start_date))}
      end_date={new DateTimeFormat('fi', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
      }).format(new Date(el.end_date))}
      sum={new Intl.NumberFormat('fi-FI', {
        style: 'currency',
        currency: 'EUR'
      }).format(el.sum_total_allowance)}
    />
  ))

const _createExpenseInputRow = index => [
  <ExpenseInputRow key={index}
    autoFocusIndex={`${index}`}
    description={`expenseInputRow[${index}][description]`}
    sum={`expenseInputRow[${index}][sum]`}
    vat={`expenseInputRow[${index}][vat]`}    
  />
]

const _createAllowanceInputRow = index => [
  <AllowanceInputRow route={`allowanceInputRow[${index}][route]`} key={index} />
]

const _createPassengerRow = (index, check) => [
  <PassengerInputRow
    passenger={`passengerInputRow[${index}][passenger]`}
    key={index}
    autoFocusIndex={`${index}`}
    check={check}
  />
]

export default expenseReducer
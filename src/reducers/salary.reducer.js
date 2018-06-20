import React from 'react'
import SalaryRow from '../components/salary/salaryRow.component'

import {
  GET_NEW_SALARY_SUCCESS,
  SELECT_ROW_SALARY,
  SELECT_ROW_SALARY_SUCCESS,
  GET_SALARIES_SUCCESS
} from '../constants/index'

import DateTimeFormat from '../utils/DateTimeFormat'

//TODO: get tax percent from somewhere
const initialState = {
  newSalary: [],
  selectedRows: [],
  salaryAllowances: [],
  salaryRows: [],
  taxPercent: 0.10,
  newSalarySummary: {
    //total_sum: 0,
    sumwithoutTax: 0,
    service_cost: 12,
    salary_sum: 0,
    employer_cost: 0,
    gross_sum: 0,
    tax: 0,
    net_sum: 0,
    other_cost: 0,
    allowances_cost: 0,
    expenses_cost: 0,
    paid_sum: 0
  },
  salaryTaxPercentage: []
}

const salaryReducer = (state = initialState, action) => {

  switch (action.type) {

    case GET_NEW_SALARY_SUCCESS:
      return Object.assign({}, { ...state }, { newSalary: action.result })

    case GET_SALARIES_SUCCESS:
      return Object.assign({}, { ...state }, { salaryRows: _createSalaryRows(action.resultParsed) })

    case SELECT_ROW_SALARY:
      return Object.assign({}, { ...state }, {
        selectedRows: action.selected
      })

    case SELECT_ROW_SALARY_SUCCESS:

      const salaryTaxPercent = action.result.taxResult     
      let service_percentage = salaryTaxPercent[0].service_payment
      const standard_social_tax = salaryTaxPercent[0].standard_social_tax
      const yel_percentage = salaryTaxPercent[0].yel_percentage
      console.log('standard_social_tax:: ',standard_social_tax)
      const sum = state.selectedRows.reduce((a, b) => a + state.newSalary[b].sumwithoutTax, 0)      

      if (service_percentage <= 0) {       
        switch (true) {          
          case (sum <= 50000):           
            service_percentage = 4.5
          break
          case (sum > 50000):
            service_percentage = 4
          break
          case (sum > 100000):
            service_percentage = 3
          break
          case (sum > 200000):
            service_percentage = 2
          break                    
        }
      }    
         
      const service_cost = sum * service_percentage * 0.01      
      const salary_sum = sum - service_cost
      
      const social_contribution = sum * standard_social_tax
      console.log('social_contribution:: ',social_contribution)

      const gross_sum = salary_sum - state.newSalarySummary.employer_cost
      const tax = gross_sum * state.taxPercent
      const net_sum = gross_sum - tax
      const yel = gross_sum * yel_percentage
      /* const allowances_cost_sum = action.result.allowancesResult.data.coalesce
      const expenses_cost_sum = action.result.expensesResult.data.coalesce */

      const allowances_cost_sum = action.result.allowancesResult
      const expenses_cost_sum = action.result.expensesResult

      const paid_sum = net_sum - allowances_cost_sum - expenses_cost_sum
      return Object.assign({}, { ...state }, {
        salaryAllowances: action.result,
        newSalarySummary: {
          //total_sum: sum,
          sumwithoutTax: sum,
          service_cost: service_cost,
          salary_sum: salary_sum,
          employer_cost: state.newSalarySummary.employer_cost,
          gross_sum: gross_sum,
          tax: tax,
          net_sum: net_sum,
          other_cost: 0,
          allowances_cost: allowances_cost_sum,
          expenses_cost: expenses_cost_sum,
          paid_sum: paid_sum,
          social_contri: social_contribution,
          yel_insurance: yel
        },
        salaryTaxPercentage:salaryTaxPercent
      })

    default:
      return state
  }
}

const _createSalaryRows = salaries => salaries.map((el, index) =>
  <SalaryRow key={index}
    date={new DateTimeFormat('fi', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    }).format(new Date(el.created))}
    gross_sum={new Intl.NumberFormat('fi-FI', {
      style: 'currency',
      currency: 'EUR'
    }).format(el.gross_salary)}
    net_sum={new Intl.NumberFormat('fi-FI', {
      style: 'currency',
      currency: 'EUR'
    }).format(el.net_salary)}
    service_cost={new Intl.NumberFormat('fi-FI', {
      style: 'currency',
      currency: 'EUR'
    }).format(el.service_cost)}
    allowance_cost={new Intl.NumberFormat('fi-FI', {
      style: 'currency',
      currency: 'EUR'
    }).format(el.expenses_cost)}
    expense_cost={new Intl.NumberFormat('fi-FI', {
      style: 'currency',
      currency: 'EUR'
    }).format(el.reimbursment_cost)} />)

export default salaryReducer

import React from 'react'
import SalaryRow from '../components/salary/salaryRow.component'

import {
  GET_NEW_SALARY_SUCCESS,
  SELECT_ROW_SALARY,
  SELECT_ROW_SALARY_SUCCESS,
  GET_SALARIES_SUCCESS,
  GET_SALARY_BY_ID_SUCCESS,
  SALARY_PAGE_CHANGE,
  ADD_SALARY_SUCCESS
} from '../constants/index'

import DateTimeFormat from '../utils/DateTimeFormat'
import { convertNameToState } from '../utils/invoice.utils'

const initialState = {
  newSalary: [],
  selectedRows: [],
  salaryAllowances: [],
  salaryRows: [],
  allSalaries: [],
  selected: 0,
  newSalaryInfo: [],
  newSalarySummary: {
    sumwithoutTax: 0,
    service_cost: 12,
    salary_sum: 0,
    gross_sum: 0,
    net_sum: 0,
    allowances_cost: 0,
    expenses_cost: 0,
    paid_sum: 0
  },
  salaryTaxPercentage: [],
  isSalaryInfo: false
}

const salaryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NEW_SALARY_SUCCESS:
      return Object.assign({}, { ...state }, { newSalary: action.result })

    case GET_SALARIES_SUCCESS:
      return Object.assign(
        {},
        { ...state },
        {
          allSalaries: action.resultParsed,
          salaryRows: _createSalaryRows(action.resultParsed, state.selected)
        }
      )

    case SALARY_PAGE_CHANGE:
      return Object.assign(
        {},
        { ...state },
        {
          salaryRows: _createSalaryRows(
            state.allSalaries,
            action.selected.selected
          ),
          selected: action.selected.selected
        }
      )

    case SELECT_ROW_SALARY:
      return Object.assign(
        {},
        { ...state },
        {
          selectedRows: action.selected,
          isSalaryInfo: false
        }
      )

    case ADD_SALARY_SUCCESS:
      return Object.assign(
        {},
        { ...state },
        {
          selectedRows: []          
        }
      )

    case GET_SALARY_BY_ID_SUCCESS:
      return Object.assign(
        {},
        { ...state },
        {
          newSalaryInfo: action.result,
          isSalaryInfo: true
        }
      )

    case SELECT_ROW_SALARY_SUCCESS:
      const salaryTaxPercent = action.result.taxResult
      let service_percentage = salaryTaxPercent[0].service_payment
      const standard_social_tax = salaryTaxPercent[0].standard_social_tax
      const yel_option = salaryTaxPercent[0].yelselect
      const total_gross = salaryTaxPercent[0].Totalgross
      const yel_percentage = salaryTaxPercent[0].yel_percentage * 0.01
      const personal_tax_percentage = salaryTaxPercent[0].tax_percentage * 0.01
      const sum = state.selectedRows.reduce(
        (a, b) => a + state.newSalary[b].sumwithoutTax,
        0
      )

/*       if (service_percentage <= 0) {
        switch (true) {
          case sum <= 100000:
            service_percentage = 4
            break
          case sum > 100000:
            service_percentage = 3.5
            break
          case sum > 150000:
            service_percentage = 3
            break          
        }
      } */

      const quick_pay_percentage = salaryTaxPercent[0].quick_pay_percentage
      //console.log('quick_pay_percentage:: ', quick_pay_percentage)

      const inst_pay = state.selectedRows.map(
        el => state.newSalary[el].instant_payment
      )
      //console.log('Instant Payment as per the selected invoice:: ',inst_pay)
      
      const inst_pay_final = []
      for (var i=0; i < inst_pay.length ; i++) {
        if (inst_pay[i] === 'quick_pay'){
          inst_pay_final.push(quick_pay_percentage)
        } else {
          inst_pay_final.push(0)
        }
      }
      //console.log('inst_pay_final:: ',inst_pay_final)     

      const ser_per_final = []
      for (var i=0; i < inst_pay_final.length; i++) {
        ser_per_final.push(inst_pay_final[i] + service_percentage)
      }
      //console.log('ser_per_final:: ',ser_per_final)

      const inv_sum = state.selectedRows.map(
        el => state.newSalary[el].sumwithoutTax
      )
      //console.log('sumwithoutTax as per the selected invoice:: ',inv_sum)

      const ser_cost = []
      for (var i = 0; i < inv_sum.length ; i++) {
        ser_cost.push(inv_sum[i] * ser_per_final[i] * 0.01 * 1.24 )
      }
      const service_cost = ser_cost.reduce((a,b) => a + b, 0)
      //console.log('service_cost_final:: ',service_cost)   
      
      const salary_sum = sum - service_cost
      //console.log('salary_sum:: ',salary_sum)

      const palvelu = []
      for (var i = 0; i < inv_sum.length ; i++) {
        palvelu.push(inv_sum[i] * service_percentage * 0.01 * 1.24 )
      }
      const palvelu_final = palvelu.reduce((a,b) => a + b, 0)      
      //console.log('palvelu_final:: ',palvelu_final)

      const pikapalkka = []
      for (var i = 0; i < inv_sum.length ; i++) {
        pikapalkka.push(inv_sum[i] * inst_pay_final[i] * 0.01 * 1.24 )
      }
      const pikapalkka_final = pikapalkka.reduce((a,b) => a + b, 0)      
      //console.log('pikapalkka_final:: ',pikapalkka_final)

      //changed
      const palkka = state.selectedRows.map(
        el =>
          state.newSalary[el].sumwithoutTax -
          state.newSalary[el].expenses -
          state.newSalary[el].allowances
      )

      const palkka_sum = palkka.reduce((a, b) => a + b, 0)

      const grossPerInvoice = []
      for (var i = 0; i < palkka.length; i++) {
        grossPerInvoice.push(palkka[i])
      }

      const gross_sum = grossPerInvoice.reduce((a, b) => a + b, 0)

      const total_sum = total_gross + gross_sum

      let yel = gross_sum * yel_percentage
      if (yel_option === 'yel_minimum') {
        if (total_sum > 7656.26) {
          const difference = 7656.26 - total_gross
          yel = difference * yel_percentage
        }
      }

      const prof_tax = state.selectedRows.map(
        el => state.newSalary[el].professionaltax
      )

      //changed
      const insurance = []
      for (var i = 0; i < grossPerInvoice.length; i++) {
        insurance.push(grossPerInvoice[i] * prof_tax[i] * 0.01 * 1.24)
      }

      const accidental_insurance = insurance.reduce((a, b) => a + b, 0)

      //changed
      const social_tax = []
      for (var i = 0; i < grossPerInvoice.length; i++) {
        social_tax.push(grossPerInvoice[i] * standard_social_tax * 0.01 * 1.24)
      }

      const social_contribution = social_tax.reduce((a, b) => a + b, 0)

      const personal_tax = gross_sum * personal_tax_percentage

      //changed
      const net_sum = gross_sum - personal_tax

      //Total Deductions
      const deductions_sum =
        yel + service_cost + social_contribution + accidental_insurance

      const expense = state.selectedRows.map(el => state.newSalary[el].expenses)

      const expenses_cost_sum = expense.reduce((a, b) => a + b, 0)

      const allowance = state.selectedRows.map(
        el => state.newSalary[el].allowances
      )

      const allowances_cost_sum = allowance.reduce((a, b) => a + b, 0)

      //changed
      const paid_sum =
        net_sum - deductions_sum + allowances_cost_sum + expenses_cost_sum

      return Object.assign(
        {},
        { ...state },
        {
          salaryAllowances: action.result,
          newSalarySummary: {
            sumwithoutTax: sum,
            service_cost: service_cost,
            palvelu: palvelu_final,
            quick_pay_cost: pikapalkka_final,
            salary_sum: salary_sum,
            gross_sum: gross_sum,
            net_sum: net_sum,
            allowances_cost: allowances_cost_sum,
            expenses_cost: expenses_cost_sum,
            paid_sum: paid_sum,
            social_contri: social_contribution,
            yel_insurance: yel,
            tax_percentage: personal_tax,
            acc_insurance: accidental_insurance,
            palkka: palkka_sum,
            deductions_sum: deductions_sum
          },
          salaryTaxPercentage: salaryTaxPercent
        }
      )

    default:
      return state
  }
}

const _createSalaryRows = (allSalaries, selected) =>
  allSalaries.slice(selected * 10, selected * 10 + 10).map(el => (
    <SalaryRow
      key={el.id}
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
/*       service_cost={new Intl.NumberFormat('fi-FI', {
        style: 'currency',
        currency: 'EUR'
      }).format(el.service_cost)} */
      allowance_cost={new Intl.NumberFormat('fi-FI', {
        style: 'currency',
        currency: 'EUR'
      }).format(el.expenses_cost)}
      expense_cost={new Intl.NumberFormat('fi-FI', {
        style: 'currency',
        currency: 'EUR'
      }).format(el.reimbursment_cost)}
      status={convertNameToState(el.status)}
      id={el.id}
    />
  ))

export default salaryReducer

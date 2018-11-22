import React from 'react'
import {
  LOAD_INVOICE_REVIEW,
  SAVE_INVOICE_SUCCESS,
  REVIEW_INVOICE_EDIT_SUCCESS,
  SAVE_INVOICE_FAILED,
  CLOSE_INVOICE_REVIEW_SNACKBAR, 
  SAVE_AND_SEND_INVOICE_SUCCESS,
  SAVE_AND_SEND_INVOICE_PDF,
  SAVE_INVOICE_DRAFT,
  GENERATE_INVOICE_PDF_SUCCESS,
  GENERATE_INVOICE_PDF_FAILED  
} from '../constants'
import { getFormValues } from 'redux-form'
import ReviewInvoiceRow from '../components/invoice/reviewInvoiceRow.component'
import store from '../store'

const reviewInvoice = (
  state = {
    apiSuccess: false,
    apiFailed: false,
    showSpinner: false,
    isSaveAndSend: false,
    isSaveInvoiceDraft: false,
    isGenerateInvoice: false,
    invoice_id: 0
  },
  action
) => {
  switch (action.type) {
    case LOAD_INVOICE_REVIEW:
      const invoiceInputRows = store.getState().invoice.invoiceInputRows
      const form = getFormValues('invoice')(store.getState())
      for (let row of Object.keys(invoiceInputRows)) {
        if (!Object.keys(form.rows).includes(invoiceInputRows[row].key)) {
          delete invoiceInputRows[row]
        }
      }
      const reviewRows = invoiceInputRows.map(el => (
        <ReviewInvoiceRow key={el.key} {...el.props} />
      ))

      return Object.assign({}, state, {
        reviewRows: reviewRows
      })

    case SAVE_AND_SEND_INVOICE_SUCCESS:
      return Object.assign({}, state,
        {       
          apiSuccess: true,
          invoice_id: action.result,
          isSaveInvoiceDraft: false,
          isSaveAndSend: false,
          showSpinner: false,
          isGenerateInvoice: true               
        })      

    case SAVE_INVOICE_SUCCESS:
      return Object.assign({}, state, {       
        apiSuccess: true,
        invoice_id: action.result,
        isSaveInvoiceDraft: false,
        isSaveAndSend: false,
        showSpinner: false,
        isGenerateInvoice: false                 
      })

    case REVIEW_INVOICE_EDIT_SUCCESS:
      return Object.assign({}, state,
        {
          apiSuccess: true,
          showSpinner: false,         
          isSaveInvoiceDraft: false,
          isSaveAndSend: false,
          isGenerateInvoice: true
      })

    case SAVE_INVOICE_FAILED:
      return Object.assign({}, state, {        
        apiSuccess: false,
        invoice_id: 0,
        isSaveInvoiceDraft: false,
        isSaveAndSend: false,
        showSpinner: false,
        isGenerateInvoice: false
      })

    case CLOSE_INVOICE_REVIEW_SNACKBAR:
      return Object.assign({}, state, { apiSuccess: false, apiFailed: false })

    case SAVE_INVOICE_DRAFT:
      return Object.assign({}, state, { isSaveInvoiceDraft: true })    

    case SAVE_AND_SEND_INVOICE_PDF:
      return Object.assign({}, state, { showSpinner: true, isSaveAndSend: true })

    case GENERATE_INVOICE_PDF_SUCCESS:
      return Object.assign({}, state, { isSaveAndSend: false, showSpinner: false, isGenerateInvoice: false })

    case GENERATE_INVOICE_PDF_FAILED:
      return Object.assign({}, state, { isSaveAndSend: false, showSpinner: false, isGenerateInvoice: false })

    default:
      return state
  }
}

export default reviewInvoice
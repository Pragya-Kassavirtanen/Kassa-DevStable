import { connect } from 'react-redux'
import Admin from '../../components/admin/admin.component'
import {
  changeAdminMenu,
  expandAdminInvoice,
  hideAdminSnackbar,
  expandAdminUser,
  invoiceSearchPageChange,
  salarySearchPageChange,
  userSearchPageChange, 
  adminDeleteCompanyUpdates,  
  tiedotteetSearchPageChange,
  warnInvoiceToPay,
  warnSalaryToPay,
  noPikapalkka,
  showSalaryPDF,
  showInvoicePDF,
  updateAdminInvoiceStatus,
  cancelUpdateAdminInvoiceStatus,
  updateAdminSalaryStatus,
  cancelUpdateAdminSalaryStatus,
  adminGetUpdates
} from '../../actions/index'

let AdminContainer = Admin

const mapStateToProps = state => {
  return {
    selectedMenuItem: state.admin.selectedMenuItem,

    selected: state.admin.selected,

    isToPay: state.admin.isToPay,

    isToLiftSalary: state.admin.isToLiftSalary,

    isToPayInvoiceId: state.admin.isToPayInvoiceId,

    isToPaySalaryId: state.admin.isToPaySalaryId,

    invoiceSearchRows: state.admin.invoiceSearchRows,

    userSearchRows: state.admin.userSearchRows,

    salarySearchRows: state.admin.salarySearchRows,

    releaseSearchRows: state.admin.releaseSearchRows,

    showSpinner: state.admin.showSpinner,

    showAdminSnackbar: state.admin.showAdminSnackbar,

    invoiceSearchPages: !!state.admin.invoiceSearchRows
      ? Math.ceil(state.admin.invoiceSearchRows.length / 10)
      : 0,

    userSearchPages: !!state.admin.userSearchRows
      ? Math.ceil(state.admin.userSearchRows.length / 10)
      : 0,

    salarySearchPages: !!state.admin.salarySearchRows
      ? Math.ceil(state.admin.salarySearchRows.length / 10)
      : 0,
     
    tiedotteetSearchPages: !!state.admin.releaseSearchRows
      ? Math.ceil(state.admin.releaseSearchRows.length / 10)
      : 0
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,

    changeAdminMenu: (value, email) => dispatch(changeAdminMenu(value, email)),

    expandAdminInvoice: (expanded, id) =>
      dispatch(expandAdminInvoice(expanded, id)),

    hideAdminSnackbar: () => dispatch(hideAdminSnackbar()),

    expandAdminUser: (expanded, uuid) =>
      dispatch(expandAdminUser(expanded, uuid)),

    invoiceSearchPageChange: selected =>
      dispatch(invoiceSearchPageChange(selected)),

    salarySearchPageChange: selected =>
      dispatch(salarySearchPageChange(selected)),

    userSearchPageChange: selected => dispatch(userSearchPageChange(selected)),
    
    tiedotteetSearchPageChange: selected => dispatch(tiedotteetSearchPageChange(selected)),

    warnInvoiceToPay: selected => dispatch(warnInvoiceToPay(selected)),

    warnSalaryToPay: selected => dispatch(warnSalaryToPay(selected)),

    noPikapalkka: () => dispatch(noPikapalkka()),

    showSalaryPDF: (id) => dispatch(showSalaryPDF(id)),

    showInvoicePDF: (invoice_id) => dispatch(showInvoicePDF(invoice_id)),

    updateAdminInvoiceStatus: invoice_id =>
      dispatch(updateAdminInvoiceStatus(invoice_id)),

    cancelUpdateAdminInvoiceStatus: () =>
      dispatch(cancelUpdateAdminInvoiceStatus()),

    updateAdminSalaryStatus: id => dispatch(updateAdminSalaryStatus(id)),

    cancelUpdateAdminSalaryStatus: () =>
      dispatch(cancelUpdateAdminSalaryStatus()),   

    adminDeleteCompanyUpdates: (id) => dispatch(adminDeleteCompanyUpdates(id)),

    adminGetUpdates: () => dispatch(adminGetUpdates())
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) =>
  Object.assign({}, stateProps, dispatchProps, ownProps)

AdminContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(AdminContainer)

export default AdminContainer

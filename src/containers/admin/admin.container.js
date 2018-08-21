import{ connect } from 'react-redux'
import Admin from '../../components/admin/admin.component'
import { changeAdminMenu, expandAdminInvoice, hideAdminSnackbar, expandAdminUser, invoiceSearchPageChange } from '../../actions/index'

let AdminContainer = Admin

const mapStateToProps = state => {
  return {
    selectedMenuItem: state.admin.selectedMenuItem,
    selected: state.admin.selected,
    invoiceSearchRows: state.admin.invoiceSearchRows,
    userSearchRows: state.admin.userSearchRows,
    salarySearchRows: state.admin.salarySearchRows,
    showSpinner: state.admin.showSpinner,
    showAdminSnackbar: state.admin.showAdminSnackbar,
    invoiceSearchPages: !!state.admin.invoiceSearchRows
      ? Math.ceil(state.admin.invoiceSearchRows.length / 10)
      : 0
  }
}


const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    changeAdminMenu: (value, email) => dispatch(changeAdminMenu(value, email)),
    expandAdminInvoice: (expanded, id) => dispatch(expandAdminInvoice(expanded, id)),
    hideAdminSnackbar: () => dispatch(hideAdminSnackbar()),
    expandAdminUser: (expanded, uuid) => dispatch(expandAdminUser(expanded, uuid)),
    invoiceSearchPageChange: selected => dispatch(invoiceSearchPageChange(selected))
  }
}

const mergeProps = ( stateProps, dispatchProps, ownProps ) => Object.assign({}, stateProps, dispatchProps, ownProps)

AdminContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(AdminContainer)

export default AdminContainer

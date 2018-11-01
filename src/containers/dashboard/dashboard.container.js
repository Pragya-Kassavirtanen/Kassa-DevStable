import { connect } from 'react-redux'

import DashboardComponent from '../../components/dashboard/dashboard.component'
import { getCustomersChart, getInvoiceChart, getUserTaxInfo, getCompanyUpdates, getInvoiceAmountMonthly } from '../../actions'

const mapStateToProps = state => {
  return {
    state,  
    topCustomers: state.dashboard.topCustomers,
    invoiceChartData: state.dashboard.invoiceChartData,
    invoiceAmountByMonthlyChartData: state.dashboard.invoiceAmountByMonthlyChartData   
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    //checkAuthInfo: () => dispatch(checkAuthInfo()),
    getCustomersChart: () => dispatch(getCustomersChart()),
    getInvoiceChart: () => dispatch(getInvoiceChart()),
    getUserTaxInfo: () => dispatch(getUserTaxInfo()),
    getCompanyUpdates: () => dispatch(getCompanyUpdates()),
    getInvoiceAmountMonthly: () => dispatch(getInvoiceAmountMonthly())
    //onTokenValidation: () => dispatch(onTokenValidation())
  }
}

const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(DashboardComponent)

export default DashboardContainer
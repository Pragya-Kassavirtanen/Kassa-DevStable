import { connect } from 'react-redux'

import DashboardComponent from '../components/dashboard/dashboard.component'
import { getCustomersChart, getInvoiceChart } from '../actions'

const mapStateToProps = state => {
  return {
    state,  
    topCustomers: state.dashboard.topCustomers,
    invoiceChartData: state.dashboard.invoiceChartData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    //checkAuthInfo: () => dispatch(checkAuthInfo()),
    getCustomersChart: () => dispatch(getCustomersChart()),
    getInvoiceChart: () => dispatch(getInvoiceChart())
  }
}

const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(DashboardComponent)

export default DashboardContainer
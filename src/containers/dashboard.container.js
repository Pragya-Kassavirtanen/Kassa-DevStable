import { connect } from 'react-redux'

import DashboardComponent from '../components/dashboard/dashboard.component'
import { getCustomersChart } from '../actions'

const mapStateToProps = state => {
  return {
    state,  
    topCustomers: state.dashboard.topCustomers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    //checkAuthInfo: () => dispatch(checkAuthInfo()),
    getCustomersChart: () => dispatch(getCustomersChart())
  }
}

const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(DashboardComponent)

export default DashboardContainer
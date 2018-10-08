import { connect } from 'react-redux'
import OwnInfo from '../../components/dashboard/ownInfo.component'

const mapStateToProps = state => {
  return {   
    userTaxInfo: state.dashboard.userTaxInfo
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch    
  }
}

const OwnInfoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OwnInfo)

export default OwnInfoContainer
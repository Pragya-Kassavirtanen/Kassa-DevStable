import { connect } from 'react-redux'
import ReleaseInfo from '../../components/dashboard/releaseInfo.component'
import { releaseInfoSearchPageChange } from '../../actions/index'

const mapStateToProps = state => {
  return {
    releaseInfoSearchRows: state.dashboard.releaseInfoSearchRows,

    selected: state.dashboard.selected,

    releaseInfoSearchPages: !!state.dashboard.releaseInfoSearchRows
      ? Math.ceil(state.dashboard.releaseInfoSearchRows.length / 10)
      : 0  
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    releaseInfoSearchPageChange: selected => dispatch(releaseInfoSearchPageChange(selected))
  }
}

const ReleaseInfoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReleaseInfo)

export default ReleaseInfoContainer
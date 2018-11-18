import { connect } from 'react-redux'
import Yhteystiedot from '../../components/website/yhteystiedot.component'
import {
  hideContactSnackbar  
} from '../../actions/index'

let YhteystiedotContainer = Yhteystiedot

const mapStateToProps = state => {
  return {    
    showContactSnackbar: state.contact.showContactSnackbar,
    showContactFailSnackbar: state.contact.showContactFailSnackbar
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    hideContactSnackbar: () => dispatch(hideContactSnackbar())    
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) =>
  Object.assign({}, stateProps, dispatchProps, ownProps)

  YhteystiedotContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(YhteystiedotContainer)

export default YhteystiedotContainer
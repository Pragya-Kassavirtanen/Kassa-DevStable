import{ connect } from 'react-redux'
import AdminUpdateForm from '../../components/admin/adminUpdateForm.component'
import { reduxForm } from 'redux-form'
import { adminAddNewUpdates } from '../../actions/index'

let AdminUpdateFormContainer = reduxForm({
  form: 'adminUpdates'
})(AdminUpdateForm)

const mapStateToProps = state => {
  return {
    state,
    newsupdate: state.admin.newsupdate
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,    
    adminAddNewUpdates: (newsupdate) => dispatch(adminAddNewUpdates(newsupdate))  
  }
}

const mergeProps = ( stateProps, dispatchProps, ownProps ) => Object.assign({}, stateProps, dispatchProps, ownProps)

AdminUpdateFormContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(AdminUpdateFormContainer)

export default AdminUpdateFormContainer
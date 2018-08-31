import{ connect } from 'react-redux'
import AdminUserForm from '../../components/admin/adminUserForm.component'
import { reduxForm } from 'redux-form'
import { updateAdminUser } from '../../actions/index'

let AdminUserFormContainer = reduxForm({
  fields: [
    'account_number',
    'address',
    'firstname',
    'lastname',
    'phone',
    'address',
    'city',
    'market_name',
    'job_title',
    'tax_percentage',
    'service_payment'
  ]
})(AdminUserForm)

const mapStateToProps = state => {
  return {
    state
  }
}


const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    updateAdminUser: (email, uuid) => dispatch(updateAdminUser(email, uuid))    
  }
}

const mergeProps = ( stateProps, dispatchProps, ownProps ) => Object.assign({}, stateProps, dispatchProps, ownProps)

AdminUserFormContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(AdminUserFormContainer)

export default AdminUserFormContainer

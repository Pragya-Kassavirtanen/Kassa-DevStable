import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { RaisedButton } from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { resetPasswordFormSubmit } from '../../actions'
import store from '../../store'
import { resetPasswordValidate as validate } from '../../containers/validate'
import { renderTextField } from '../../utils/wrappers'

/**
 * The Website Reset Password View
 *
 * @author  Pragya Gupta
 */

class ResetPasswordComponent extends Component {
  onFormSubmit = values => {
    this.props.resetPasswordFormSubmit(values)
  }

  render() {
    const { handleSubmit, invalid } = this.props

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <form onSubmit={handleSubmit(this.onFormSubmit)}>
          <div className="panel-body">
            <div className="formSplit">
              <Field
                name="email"
                label="Sähköpostiosoite"
                component={renderTextField}
              />
            </div>
          </div>
          <div className="clearfix">
            <div className="button-pull">
              {invalid ? (
                <RaisedButton
                  type="submit"
                  label="Palauta salasana"
                  primary={true}
                />
              ) : (
                <RaisedButton
                  type="submit"
                  label="Palauta salasana"
                  primary={true}
                  onClick={() => {
                    store.dispatch(resetPasswordFormSubmit())
                  }}
                />
              )}
            </div>
          </div>
        </form>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = state => {
  return {
    resetPassword: state.resetPassword,
    state
  }
}

const resetPassword = connect(
  mapStateToProps,
  { resetPasswordFormSubmit }
)(ResetPasswordComponent)

export default reduxForm({
  form: 'resetPassword',
  validate
})(resetPassword)

import React, { Component } from 'react'
import { Field } from 'redux-form'
import { RaisedButton } from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { renderTextField } from '../../utils/wrappers'

/**
 * The Website Reset Password View
 *
 * @author  Pragya Gupta
 */

export default class ResetPasswordComponent extends Component {
  render() {
    return <ResetPassword {...this.props} />
  }
}

const _onFormSubmit = () => {
  return false
}

const ResetPassword = ({ handleSubmit, resetPasswordFormSubmit, invalid }) => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <form onSubmit={handleSubmit(_onFormSubmit)}>
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
              onClick={resetPasswordFormSubmit}
            />
          )}
        </div>
      </div>
    </form>
  </MuiThemeProvider>
)
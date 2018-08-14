import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { TextField, RaisedButton } from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { resetPasswordFormSubmit } from '../../actions'
import store from '../../store'

/**
 * The Website sign-up view
 *
 * @author  Pragya Gupta
 */

const renderTextField = ({
  input,
  label,
  hintText,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    inputStyle={{ height: '40px', marginTop: '15px' }}
    hintText={hintText}
    underlineStyle={{ display: 'none' }}
    style={{ textAlign: 'left' }}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

class ResetPasswordComponent extends Component {
  onFormSubmit = values => {
    this.props.resetPasswordFormSubmit(values)
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <form
          className="form-inline"
          onSubmit={handleSubmit(this.onFormSubmit)}
        >
          <div>
            <div className="content">
              <div>
                <Field
                  name="email"
                  label="Sähköpostiosoite"
                  component={renderTextField}
                />
              </div>
              <div className="form-login-button">
                <RaisedButton
                  type="submit"
                  label="Palauta salasana"
                  primary={true}
                  onClick={() => {
                    store.dispatch(resetPasswordFormSubmit())
                  }}
                />
              </div>
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
  form: 'resetPassword'
})(resetPassword)

import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { TextField, RaisedButton } from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { registerValidate as validate } from '../../containers/validate'
import { registerAsyncValidate as asyncValidate } from '../../containers/asyncValidate'
import { signupFormSubmit } from '../../actions'
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
    hintText={hintText}
    style={{ textAlign: 'left' }}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

class SignUpComponent extends Component {
  onFormSubmit = values => {
    this.props.signupFormSubmit(values)
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div className="signup-form form form-inline">
          <form onSubmit={handleSubmit(this.onFormSubmit)}>
            <div>
              <div className="form-group mb-2 mr-sm-3">
                <Field
                  name="FirstName"
                  component={renderTextField}
                  label="Etunimi*"
                  type="text"
                />
              </div>
              <div className="form-group mb-2 mr-sm-3">
                <Field
                  name="Lastname"
                  component={renderTextField}
                  label="Sukunimi*"
                  type="text"
                />
              </div>
              <div className="form-group mb-2 mr-sm-3">
                <Field
                  name="email"
                  component={renderTextField}
                  label="Sähköposti*"
                  type="text"
                />
              </div>
              <div className="signupButton btn form-group mb-2 mr-sm-3">
                <Link to="/dashboard/register">
                  <RaisedButton
                    label="Liity nyt"
                    primary={true}
                    type="submit"
                    onClick={() => {
                      store.dispatch(signupFormSubmit())
                    }}
                  />
                </Link>
              </div>
            </div>
          </form>
        </div>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = state => {
  return {
    signupForm: state.signupForm,
    state
  }
}

const signup = connect(
  mapStateToProps,
  { signupFormSubmit }
)(SignUpComponent)

export default reduxForm({
  form: 'signup',
  validate,
  asyncValidate
})(signup)

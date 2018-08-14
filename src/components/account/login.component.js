import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Panel } from 'react-bootstrap'
import {
  TextField,
  RaisedButton,
  Checkbox,
  FlatButton,
  Dialog,
  Snackbar
} from 'material-ui'
import FontAwesome from 'react-fontawesome'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import { registerValidate as validate } from '../../containers/validate'
import { registerAsyncValidate as asyncValidate } from '../../containers/asyncValidate'
import Spinner from 'react-spinner-material'

import userManager from '../../utils/PHZUserManager'
import { loginFormSubmit } from '../../actions'
import { faqFunction } from '../../utils/website.utils'
import ResetPassword from './resetPassword.component'

/**
 * The login view component
 *
 * @author  Pragya Gupta
 */

/****** TO BE REFACTORED ***/

const _handleGoogleLogin = e => {
  e.preventDefault()
  userManager.signinRedirect()
  console.log('done')
}

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

const renderCheckbox = ({ input, label }) => (
  <Checkbox label={label} checked={!!input.value} onCheck={input.onChange} />
)

class LoginComponent extends Component {
  onFormSubmit = values => {    
    this.props.loginFormSubmit(values)
  }

  render() {
    const { handleSubmit, showSpinner, showFailSnackbar } = this.props

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div className="form-login-container">
          <form onSubmit={handleSubmit(this.onFormSubmit)}>
            <div>
              <Panel className="form-login-content">
                <div>
                  <FlatButton
                    backgroundColor="#3F5B96"
                    hoverColor="#3F7796"
                    icon={
                      <FontAwesome
                        style={{ color: 'white' }}
                        name="facebook-square"
                        size="2x"
                      />
                    }
                  />
                </div>
                <div className="form-register-oauth">
                  <FlatButton
                    backgroundColor="#F32E06"
                    onClick={_handleGoogleLogin}
                    hoverColor="#F25805"
                    icon={
                      <FontAwesome
                        style={{ color: 'white' }}
                        name="google-plus-square"
                        size="2x"
                      />
                    }
                  />
                </div>
                <div className="form-hr-before">
                  <hr className="form-hr" />
                </div>
                <div>
                  <Field
                    label="Sähköposti*"
                    hintText="oma.tunnus@email.fi"
                    name="email"
                    type="text"
                    component={renderTextField}
                  />
                </div>
                <div>
                  <Field
                    label="Salasana*"
                    type="password"
                    name="password"
                    component={renderTextField}
                  />
                </div>
                <div className="form-login-checkbox">
                  <Field
                    name="checkbox"
                    label="Muista minut"
                    component={renderCheckbox}
                  />
                </div>
                <div className="form-login-button">
                  <RaisedButton label="Kirjaudu" primary={true} type="submit" />
                </div>
              </Panel>
              <div className="form-login-registerLink">
                <Panel className="form-login-register">
                  <p>
                    Eikö sinulla ole tunnusta?{' '}
                    <Link to="/dashboard/register"> Luo tunnus.</Link>{' '}
                  </p>
                </Panel>
              </div>
            </div>
          </form>

          <div className="form-login-resetPassword">
            <Panel className="faqpanels">
              <div className="collapsepanel">
                <div className="title" onClick={faqFunction}>
                  Salasana hukassa? Resetoi se tästä »
                </div>
                <div className="content">
                  <ResetPassword />
                </div>
              </div>
            </Panel>
          </div>

          <Snackbar
            open={showFailSnackbar}
            message="Kirjautuminen epäonnistui, tarkista kentät"
            autoHideDuration={4000}
            bodyStyle={{ backgroundColor: 'red', opacity: 0.8 }}
          />
          <Dialog
            title="Kirjaudutaan"
            contentStyle={{
              width: '350px',
              height: '150px',
              textAlign: 'center'
            }}
            modal={true}
            open={showSpinner}
          >
            <Spinner
              width={100}
              height={120}
              spinnerColor={'#44C0CC'}
              spinnerWidth={2}
              show={showSpinner}
            />
          </Dialog>
        </div>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = state => {
  return {
    loginForm: state.loginForm,
    showSpinner: state.login.showSpinner,
    showFailSnackbar: state.login.showFailSnackbar,
    state
  }
}

const attached = connect(
  mapStateToProps,
  { loginFormSubmit }
)(LoginComponent)

export default reduxForm({
  form: 'login',
  validate,
  asyncValidate
})(attached)
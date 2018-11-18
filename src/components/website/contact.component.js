import React, { Component } from 'react'
import { Field } from 'redux-form'
import { TextField, RaisedButton } from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

/**
 * The Website contact view
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

export default class ContactComponent extends Component {
  render() {
    return <Contact {...this.props} />
  }
}

const _onFormSubmit = () => {
  return false
}

const Contact = ({ handleSubmit, contactFormSubmit, invalid }) => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <form className="form" onSubmit={handleSubmit(_onFormSubmit)}>
      <div>
        <div className="form-group">
          <Field
            className="yhteystiedot-input form-input-field form-control"
            name="name"
            component={renderTextField}
            label="Nimi:"
            type="text"
          />
        </div>
        <div className="form-group">
          <Field
            className="yhteystiedot-input form-input-field form-control"
            name="phone"
            component={renderTextField}
            label="Puhelin:"
            type="text"
          />
        </div>
        <div className="form-group">
          <Field
            className="yhteystiedot-input form-input-field form-control"
            name="email"
            component={renderTextField}
            label="Sähköposti:"
            type="text"
          />
        </div>
        <div className="form-group">
          <Field
            className="yhteystiedot-input form-input-field form-control"
            name="message"
            component={renderTextField}
            label="Viesti:"
            type="text"
            multiLine={true}
            rows={10}
          />
        </div>
        <div className="form-group">
          {invalid ? (
            <RaisedButton
              className="contactButton"
              label="Lähetä"
              primary={true}
              type="submit"
            />
          ) : (
            <RaisedButton
              className="contactButton"
              label="Lähetä"
              primary={true}
              type="submit"
              onClick={contactFormSubmit}
            />
          )}
        </div>
      </div>
    </form>
  </MuiThemeProvider>
)
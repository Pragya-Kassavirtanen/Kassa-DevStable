import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { TextField, RaisedButton } from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { contactFormSubmit } from '../../actions'
import store from '../../store'
//import { contactInfoValidate as validate } from '../../containers/validate'

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

class ContactComponent extends Component {
  onFormSubmit = values => {
    this.props.contactFormSubmit(values)
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <form className="form"        
          onSubmit={handleSubmit(this.onFormSubmit)}
        >
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
                <RaisedButton
                  className="contactButton"
                  label="Lähetä"
                  primary={true}
                  type="submit"
                  onClick={() => {
                    store.dispatch(contactFormSubmit())
                  }}
                />             
            </div>
          </div>
        </form>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = state => {
  return {
    contactForm: state.contactForm,
    state
  }
}

const contact = connect(
  mapStateToProps,
  { contactFormSubmit }
)(ContactComponent)

export default reduxForm({
  form: 'contact'
  //validate
})(contact)

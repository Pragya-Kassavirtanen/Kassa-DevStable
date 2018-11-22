import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {
  renderTextField,
  renderRadioButtonGroup 
} from '../../utils/wrappers'
import { Field } from 'redux-form'
import { MenuItem, RadioButton, RaisedButton, Snackbar, Checkbox } from 'material-ui'
import { SelectField } from 'redux-form-material-ui'

class Yel extends React.Component {
  componentWillMount() {
    this.props.getYelStart()
  }

  render() {
    return <YelComponent {...this.props} />
  }
}

const _onFormSubmit = () => {
  return false
}

const YelComponent = ({
  showFirstTimer,
  postYelStart,
  handleSubmit,
  invalid,
  submitFailed,
  showYelSnackbar,  
  closeYelSnackbar
}) => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <div>
      <form onSubmit={handleSubmit(_onFormSubmit)}>
        <div className="container-fluid">
          <div className="row">
            <div className="dashboard-content-header">
              <div className="col-xs-12 col-sm-6 col-lg-6">
                <div className="panel panel-default">
                  <div className="panel-heading">Määritä YEL</div>
                  <div className="panel-body">
                    <Field
                      name="yelSelect"
                      defaultSelected="yel_self"
                      component={renderRadioButtonGroup}
                    >
                      <RadioButton
                        value="yel_self"
                        label={'Maksan Yel-vakuutuksen itse tai tienaan tänä vuonna alle 7652,26 €'}
                      />
                      <RadioButton
                        value="yel_recommended"
                        label={'Maksetaan Yel-vakuutus tulojen mukaan 24,10 %'}
                      />
                      <RadioButton
                        value="yel_minimum"
                        label={'Maksa minimi Yel-vakuutuksen (7656,26 €)'}
                      />
                    </Field>
                    {showFirstTimer && (
                      <div>                                                  
                        <Field
                          name="firsttime_enterprenuer"
                          label="Olen toiminut yrittäjänä alle neljä vuotta"
                          component={renderCheckbox}                          
                        />                        
                        <Field
                          name="yel_income"
                          style={{ verticalAlign: 'bottom' }}
                          label="Arvioi vuotuiset työtulosi"
                          component={renderTextField}
                        />
                        <Field
                          name="age_group"
                          component={SelectField}
                          style={{ verticalAlign: 'bottom' }}
                          floatingLabelText="Valitse ikäsi"
                        >
                          <MenuItem
                            key={1}
                            value={'18-52 vuotias'}
                            primaryText={'18-52 vuotias'}
                          />
                          <MenuItem
                            key={2}
                            value={'53-62 vuotias'}
                            primaryText={'53-62 vuotias'}
                          />
                          <MenuItem
                            key={3}
                            value={'63-67 vuotias'}
                            primaryText={'63-67 vuotias'}
                          />
                        </Field>
                      </div>
                    )}
                    <div>
                      {invalid ? (
                        <RaisedButton
                          label="Päivitä YEL-tiedot"
                          primary={true}
                          type="submit"
                          className="pull-right"
                        />
                      ) : (
                        <RaisedButton
                          label="Päivitä YEL-tiedot"
                          primary={true}
                          type="submit"
                          onClick={postYelStart}
                          className="pull-right"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <Snackbar
        open={showYelSnackbar}
        message="YEL päivitetään onnistuneesti!"
        autoHideDuration={2000}
        bodyStyle={{ backgroundColor: 'forestGreen', opacity: 0.8 }}
        onRequestClose={() => {
          closeYelSnackbar()
        }}
      />
      <Snackbar
        open={submitFailed && invalid}
        message="YEL-päivitys epäonnistui, tarkista kentät"
        autoHideDuration={4000}
        bodyStyle={{ backgroundColor: 'red', opacity: 0.8 }}        
      />
    </div>
  </MuiThemeProvider>
)

const renderCheckbox = ({
  input,
  label,
  disabled,
  meta: { touched, error },
  ...custom
}) => (
  <Checkbox
    label={label}
    style={{
      borderBottom: touched && error ? '2px solid red' : 'none',
      textAlign: 'left',
      fontSize: '16px',
      width: '400px',
      height: '40px',
      display: 'inline-block',
      marginTop: '50px'
    }}
    checked={!!input.value}
    onCheck={input.onChange}
    disabled={disabled}
    {...custom}
  />
)

export default Yel
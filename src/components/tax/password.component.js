import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { renderTextField } from '../../utils/wrappers'
import { Field } from 'redux-form'
import { RaisedButton, Snackbar } from 'material-ui'

class Password extends React.Component {
  render() {
    return <PasswordComponent {...this.props} />
  }
}

const _onFormSubmit = () => {
  return false
}

const PasswordComponent = ({
  handleSubmit,
  passwordUpdate,
  showSnackbar,
  showFailSnackbar,
  closePasswordSnackbar,
  invalid
}) => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <div className="dashboard-content-header">
      <div className="col-xs-8 col-sm-8 col-lg-8">
        <div className="panel panel-default">
          <form onSubmit={handleSubmit(_onFormSubmit)}>
            <div className="panel-body">
              <div className="formSplit">
                <Field
                  name="current_pw"
                  label="Nykyinen salasana"
                  type="password"
                  component={renderTextField}
                />
                <Field
                  name="new_pw"
                  label="Uusi salasana"
                  type="password"
                  component={renderTextField}
                />
                <Field
                  name="check_pw"
                  label="Toista uusi salasana"
                  type="password"
                  component={renderTextField}
                />
              </div>
              <div className="clearfix">
                <div className="button-pull">
                  {invalid ? (
                    <RaisedButton
                      label="Vaihda salasana"
                      primary={true}
                      type="submit"
                    />
                  ) : (
                    <RaisedButton
                      label="Vaihda salasana"
                      primary={true}
                      type="submit"
                      onClick={passwordUpdate}
                    />
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="col-xs-4 col-sm-4 col-lg-4">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Ohjeet</h3>
          </div>
          <div className="panel-body">
            <p>Salasanan tulee sisältää vähintään:</p>
            <ul>
              <li>8 merkkiä</li>
              <li>pieniä ja isoja kirjaimia</li>
              <li>numeroita</li>
            </ul>
          </div>
        </div>
      </div>
      <Snackbar
        open={showSnackbar}
        message="Salasana päivitettiin onnistuneesti!"
        autoHideDuration={2000}
        bodyStyle={{ backgroundColor: 'forestGreen', opacity: 0.8 }}       
        onRequestClose={() => {
          closePasswordSnackbar()
        }}
      />
      <Snackbar
        open={showFailSnackbar}
        message="Salasanan päivitys epäonnistui, tarkista kentät"
        autoHideDuration={4000}
        bodyStyle={{ backgroundColor: 'red', opacity: 0.8 }}        
        onRequestClose={() => {
          closePasswordSnackbar()
        }}
      />
    </div>
  </MuiThemeProvider>
)

export default Password

import React from 'react'
import { Field } from 'redux-form'

import RaisedButton from 'material-ui/RaisedButton'

import { renderTextField } from '../../utils/wrappers'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import TaxContainer from '../../containers/tax/tax.container'

import PasswordContainer from '../../containers/tax/password.container'

export default class ProfileComponent extends React.Component {
  componentWillMount() {
    this.props.loadProfileStart()
  }

  render() {
    return <Profile {...this.props} />
  }
}

const Profile = ({ handleSubmit, onProfileUpdate, invalid }) => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <div className="container-fluid">
      <div className="row">
        <div className="dashboard-content-header">
          <h1>Muokkaa omia tietojasi</h1>
        </div>
      </div>
      <div className="dashboard-content-header">
        <hr />
      </div>
      <div className="row">
        <div className="dashboard-content-header">
          <div className="col-xs-8 col-sm-8 col-lg-8">
            <div className="panel panel-default">
              <form onSubmit={handleSubmit(() => onProfileUpdate())}>
                <div className="panel-body">
                  <div className="formSplit">
                    <Field
                      name="lastname"
                      label="Sukunimi*"                      
                      component={renderTextField}
                    />
                    <Field
                      name="firstname"
                      label="Etunimi*"                      
                      component={renderTextField}
                    />
                    <Field
                      name="phone"
                      label="Puhelinnumero*"
                      component={renderTextField}
                    />
                    <Field
                      name="account_number"
                      label="Tilinumero IBAN-muodossa*"
                      component={renderTextField}
                    />
                    <Field
                      name="ssn"
                      label="Henkilötunnus*"
                      component={renderTextField}
                    />
                  </div>
                  <div className="formSplit">
                    <Field
                      name="address"
                      label="Osoite*"
                      component={renderTextField}
                    />
                    <Field
                      name="zip_code"
                      label="Postinumero*"
                      component={renderTextField}
                    />
                    <Field
                      name="city"
                      label="Postitoimipaikka*"
                      component={renderTextField}
                    />
                    <Field
                      name="market_name"
                      label="Markkinointinimi"
                      component={renderTextField}
                    />
                    <Field
                      name="job_title"
                      label="Ammattinimike"
                      component={renderTextField}
                    />
                  </div>
                  <div className="clearfix">
                  <div className="button-pull">{submitButton(invalid)}</div>
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
                <p>
                  Syötä yhteystietosi lomakkeelle. Syötä myös
                  markkinointinimesi, jos haluat sen näkymään laskulle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <TaxContainer />
      </div>
      <div className="row">
        <div className="dashboard-content-header">
          <h1>Vaihda salasana</h1>
        </div>
      </div>
      <div className="dashboard-content-header">
        <hr />
      </div>
      <div className="row">
        <PasswordContainer />
      </div>
    </div>
  </MuiThemeProvider>
)

const submitButton = invalid => (
  <div>
    {invalid ? (
      <RaisedButton label="Päivitä yhteystiedot" primary={true} type="submit" />
    ) : (
      <RaisedButton label="Päivitä yhteystiedot" primary={true} type="submit" />
    )}
  </div>
)

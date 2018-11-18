import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { Snackbar } from 'material-ui'
import Contact from '../../containers/website/contact.container'

const yhteystiedot_banner = require('../../images/yhteystiedot-banner.png')

export default class Yhteystiedot extends Component {
  render() {
    return <YhteystiedotComponent {...this.props} />
  }
}

const YhteystiedotComponent = ({
  showContactSnackbar,
  hideContactSnackbar,
  showContactFailSnackbar
}) => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <div className="container-fluid cover">
      <div className="cover">
        <img
          src={yhteystiedot_banner}
          alt="Kassavirtanen_yhteystiedot_banner"
          style={{ width: '100%', height: '300px' }}
        />
      </div>
      <div className="container-fluid content">
        <div className="row justify-content-around">
          <div className="col-lg-5" style={{ marginLeft: '75px' }}>
            <div className="firstBox">
              <h1>Kassavirtanen</h1>
              <p>
                Palvelemme arkisin klo 8:00 - 16:00.
                <br />
                Asiakaspalvelumme vastaa myös chatin kautta 24h sisällä.
              </p>
            </div>
            <div className="secondBox red">
              <h1>Osoite</h1>
              <p>
                Salomonkatu 17,
                <br /> 00100 Helsinki{' '}
              </p>
            </div>
            <div className="thirdBox">
              <h1>Y-tunnus</h1>
              <p>2803711-2</p>
            </div>
            <div className="fourthBox red">
              <h1>Asiakaspalvelu</h1>
              <p>Puh. 020 734 6905</p>
              <p>Sähköposti: asiakaspalvelu@kassavirtanen.fi</p>
            </div>
          </div>
          <div className="col-lg-5" style={{ marginLeft: '75px' }}>
            <h1 className="red">Ota yhteyttä</h1>
            <Contact />
          </div>
        </div>
      </div>
      <Snackbar
        open={showContactSnackbar}
        message="Tiedot lähetetään onnistuneesti"
        bodyStyle={{ backgroundColor: 'forestGreen', opacity: 0.8 }}
        contentStyle={{ textAlign: 'center' }}
        autoHideDuration={2000}
        onRequestClose={hideContactSnackbar}
      />
      <Snackbar
        open={showContactFailSnackbar}
        message="Tietoja ei lähetetty"
        autoHideDuration={4000}
        bodyStyle={{ backgroundColor: 'red', opacity: 0.8 }}
        onRequestClose={() => {
          hideContactSnackbar()
        }}
      />
    </div>
  </MuiThemeProvider>
)
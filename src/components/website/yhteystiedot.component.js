import React from 'react'
import Contact from './contact.component'

const yhteystiedot_banner = require('../../images/yhteystiedot-banner.png')

const Yhteystiedot = () => (
  <div className="container-fluid cover">
    <div className="cover">
      <img
        src={yhteystiedot_banner}
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
            <p>Puh. 020 734 6900</p>
            <p>Sähköposti: asiakaspalvelu@kassavirtanen.fi</p>
          </div>
        </div>
        <div className="col-lg-5" style={{ marginLeft: '75px' }}>
          <h1 className="red">Ota yhteyttä</h1>
          <Contact />
        </div>
      </div>
    </div>
  </div>
)

export default Yhteystiedot
import React from 'react'

const yhteystiedot_banner = require('../../images/yhteystiedot-banner.png')

const Yhteystiedot = () => (

  <div>
    <div className="container-fluid cover">
      <img src={yhteystiedot_banner} style={{ width: '100%', height: '300px' }} />
    </div>
    <div className="container-fluid content">
      <div className="row justify-content-around">
        <div className="col-lg-5">
          <div className="firstBox">
            <h1>Kassavirtanen</h1>
            <p>Palvelemme arkisin klo x-x. Asiakaspalvelumme vastaa myös chatin kautta 24h sisällä.</p>
          </div>
          <div className="secondBox red">
            <h1>Osoite</h1>
            <p>Salomonkatu 17,
        <br /> 00100 Helsinki </p>
          </div>
          <div className="thirdBox">
            <h1>Y-tunnus</h1>
            <p>xxx</p>
          </div>
          <div className="fourthBox red">
            <h1>Asiakaspalvelu</h1>
            <p>Puh. xxx</p>
            <p>Sähköposti: xxx</p>
          </div>
        </div>
        <div className="col-lg-5">
          <h1 className="red">Ota yhteyttä</h1>
          <form className="form" action="">
            <div className="form-group mb-2 mr-sm-3">
              <label className="sr-only" for="name">Nimi:</label>
              <input type="text" className="yhteystiedot-input form-input-field form-control" placeholder="Nimi" />
            </div>
            <div className="form-group mb-2 mr-sm-3">
              <label className="sr-only" for="phone">Puhelin:</label>
              <input type="text" className="yhteystiedot-input form-input-field form-control" placeholder="Puhelin" />
            </div>
            <div className="form-group mb-2 mr-sm-3">
              <label className="sr-only" for="email">Sähköposti:</label>
              <input type="email" className="yhteystiedot-input form-input-field form-control" id="email" placeholder="Sähköposti" />
            </div>
            <div className="form-group mb-2 mr-sm-3">
              <label className="sr-only" for="message">Message:</label>
              <textarea className="yhteystiedot-input form-input-field form-control" placeholder="Viesti" rows="7"></textarea>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn mb-2 mr-sm-3 button">Lähetä</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
)

export default Yhteystiedot
import React from 'react'
import { Link } from 'react-router'

const yrityksille_banner = require('../../images/yritykset-yksityiset-banner.png')

const Yrityksille = () => (
  <div className="container-fluid cover">
    <div className="cover">
      <img
        src={yrityksille_banner}
        alt="Kassavirtanen_yrityksille_banner"
        style={{ width: '100%', height: '300px' }}
      />
    </div>
    <div className="whitebackground">
      <h6>Yksityishenkilöille</h6>
      <br />
      <p>
        Yksityishenkilönä laskutat helposti ja turvallisesti ilman omaa
        yritystä, eikä sinun tarvitse huolehtia yrittäjiin kohdistuvasta
        byrokratiasta tai velvoitteista. <br />
        Kassavirtanen huolehtii puolestasi siitä, että voit keskittyä tärkeimpään.
      </p>
    </div>
    <div className="bluebackground">
      <h6>Yrityksille</h6>
      <br />
      <p>
        Tiesitkö, että yritykseen voi palkata kevytyrittäjän ilman sitovia
        velvoitteita? Kun käytät Kassavirtasen palvelua, voit ketterästi hankkia
        lisätyövoimaa <br />
        esimerkiksi kausipohjaisesti tai projektipohjaisesti.
        <br />
        <br />
        Voit myös hankkia uutta työvoimaa ilman suuria taloudellisia riskejä.
        Sen kuuluisan ensimmäisen työntekijän palkkaaminen muuttuu näin
        joustavaksi <br />
        toimenpiteeksi niin yrityksellesi kuin työntekijällekin.
      </p>
    </div>
    <div className="whitebackground">
      <h6>Ala kuin ala</h6>
      <br />
      <p>
        Voit olla opiskelija, asiantuntija, bloggaaja, IT-tukihenkilö,
        nurmikonleikkaaja, artisti, graafikko…
        <br />
        Mikä on sinun intohimosi?
        <br />
        <br />
        Kun tarvitset hyvän osaajan palveluita, tarjoa hänelle Kassavirtasen
        kautta toimivaa laskutusta.
        <br />
        <br /> Maksat koko palvelun yhdellä laskulla ilman muita työnantajan
        velvoitteita.
      </p>
      <p>
        Kysy lisää palvelusopimuksesta
        <br />
        <Link to="/home/yhteystiedot">asiakaspalvelustamme!</Link>
      </p>
    </div>
  </div>
)

export default Yrityksille
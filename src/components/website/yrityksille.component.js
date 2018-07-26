import React from 'react'

const yrityksille_banner = require('../../images/yritykset-yksityiset-banner.png')

const Yrityksille = () => (
  <div>
    <div className="container-fluid cover">
      <img src={yrityksille_banner} style={{ width: '100%', height: '300px' }} />
    </div>
    <div className="container whitebackground col-md-8 col-md-offset-8">
      <h6>Yksityishenkilöille</h6>
      <br />
      <p>Yksityishenkilönä laskutat helposti ja turvallisesti ilman omaa yritystä, eikä sinun tarvitse huolehtia yrittäjiin kohdistuvasta
        byrokratiasta tai velvoitteista. Kassavirtanen huolehtii puolestasi siitä, että voit keskittyä siihen mikä sinulle
      on tärkeää.</p>
    </div>
    <div className="container-fluid bluebackground">
      <h6>Ala kuin ala</h6>
      <br />
      <p>Voit olla opiskelija, asiantuntija, bloggaaja, IT-tukihenkilö, nurmikonleikkaaja, artisti, graafikko…
      <br />Mikä on sinun intohimosi?</p>
    </div>
    <div className="container whitebackground col-md-8 col-md-offset-8">
      <h6>Yrityksille</h6>
      <br />
      <p>Tiesitkö, että yritykseen voi palkata kevytyrittäjän ilman sitovia velvoitteita? Kun käytät Kassavirtasen palvelua, voit
        ketterästi hankkia lisätyövoimaa esimerkiksi kausipohjaisesti tai projektipohjaisesti. Voit myös hankkia uutta työvoimaa
        ilman suuria taloudellisia riskejä. Sen kuuluisan ensimmäisen työntekijän palkkaaminen muuttuu näin joustavaksi toimenpiteeksi
      niin yrityksellesi kuin työntekijällekin.</p>
    </div>
    <div className="container-fluid bluebackground">
      <h6>Ota yhteyttä</h6>
      <br />
      <p>Kun tarvitset hyvän osaajan palveluita, tarjoa hänelle Kassavirtasen kautta toimivaa laskutusta.
      <br /> Maksat koko palvelun yhdellä laskulla ilman muita työnantajan velvoitteita.</p>
      <p>Kysy lisää palvelusopimuksesta
      <a href="">asiakaspalvelustamme!</a>
      </p>
    </div>
  </div>
)

export default Yrityksille
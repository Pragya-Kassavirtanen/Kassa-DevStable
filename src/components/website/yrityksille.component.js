import React from 'react'
import {Helmet} from 'react-helmet'
import { Link } from 'react-router'

const yrityksille_banner = require('../../images/yritykset-yksityiset-banner.png')

const Yrityksille = () => (
  <div className="container-fluid cover">
    <Helmet>
      <title>kassavirtanen – ryhdy kevytyrittäjäksi helposti</title>
      <meta name="description" 
      content="Kevytyrittäjänä toimit kuin yrittäjä, laskutat vain tekemästäsi työstä laskutuspalvelun avulla. Yrittäjänä palkkaat myös kevytyrittäjän nopeasti ja helposti, ilman velvoitteita." />
    </Helmet>
    <div className="cover">
      <img
        className="img-fluid"
        src={yrityksille_banner}
        alt="Kassavirtanen_yrityksille_banner"
        style={{ width: '100%', height: 'auto' }}
      />
    </div>
    <div className="whitebackground">
      <h6>Kevytyrittäjyys</h6>
      <br />
      <p>
        Kevytyrittäjyys on jatkuvasti kasvava itsensä työllistämisen muoto,
        jossa toimitaan yrittäjämäisesti oman alan parissa, ilman huolia
        kirjanpidosta, laskutuksesta tai verotuksesta. Palvelu sopii parhaiten
        henkilölle, joka ei vielä halua perustaa omaa yritystä ja haluaa
        kokeilla oman liikeideansa toimivuutta tai jos toiminta on
        sivu/pienimuotoista.
      </p>
    </div>
    <div className="bluebackground">
      <h6>Yksityishenkilöille</h6>
      <br />
      <p>
        Yksityishenkilönä laskutat helposti ja turvallisesti ilman omaa
        yritystä, eikä sinun tarvitse huolehtia yrittäjiin kohdistuvasta
        byrokratiasta tai velvoitteista. <br />
        Kassavirtanen huolehtii puolestasi siitä, että voit keskittyä
        tärkeimpään.       
      </p>
    </div>
    <div className="whitebackground">
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
    <div className="bluebackground">
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
        <Link to="yhteystiedot">asiakaspalvelustamme!</Link>
      </p>
    </div>
    <div className="whitebackground">
      <h6>Ryhdy Kevytyrittäjäksi</h6>
      <br />
      <p>
        Kevytyrittäjäksi ryhtyminen on helppoa, sillä erillistä yrityksen
        perustamisilmoitusta ei tarvita, joten palveluun rekisteröityminen
        riittää. Palveluun voi rekisteröityä ilmaiseksi, eikä se sido
        rekisteröitynyttä mihinkään.
      </p>
    </div>
  </div>
)

export default Yrityksille
import React from 'react'
import {Helmet} from 'react-helmet'
import SignUp from './signup.component'

/**
 * Bootstrap styled Front Page
 *
 * @author Pragya Gupta
 */

const herravirtanen_etusivu = require('../../images/herravirtanen_etusivu.jpg')
const woman_etusivu = require('../../images/woman_etusivu.png')
const man_etusivu = require('../../images/man_etusivu.png')

const FrontPage = () => (
  <div className="container-fluid cover">
    <Helmet>
      <title>kassavirtanen - laskuta ilman yritystä</title>
      <meta name="description" 
      content="Kassavirtanen on edullinen ja helppokäyttöinen laskutuspalvelu kevytyrittäjille. Ei kiinteitä maksuja tai sitoutumisia. Kokeile, kuinka helppoa se voi olla!" />
    </Helmet>
    <div className="cover">
      <img
        className="img-fluid"
        src={herravirtanen_etusivu}
        alt="Kassavirtanen_herravirtanen_etusivu"
        style={{ width: '100%', height: 'auto' }}
      />
    </div>
    <div className="frontpage-intro col-xs-12 col-sm-12 col-lg-12">
      <h6>Kevytyrittäjä - Laskuta ilman yritystä</h6>
      <br />
      <p>
        Kassavirtanen on palvelu, joka mahdollistaa laskuttamisen edullisesti ja
        helposti ilman omaa yritystä. Kassavirtasen avulla nostat palkkaa, mutta
        toimit kuten itsenäinen yrittäjä, ilman byrokratian aiheuttamia huolia.
        Laskutus on helppoa, säästää aikaasi eikä sido sinua mihinkään.
      </p>
      <br />
      <a href="yrityksille">
        <button type="button" className="frontLinkButton">
          YKSITYISHENKILÖILLE
        </button>
      </a>
    </div>
    <div className="frontpage-intro col-xs-12 col-sm-12 col-lg-12">
      <h6>Yrittäjä – Työllistä Kevytyrittäjä</h6>
      <br />
      <p>
        Kassavirtasen palvelu sopii erinomaisesti yrittäjille, jotka haluavat
        palkata osaajan töihin helposti kausi- tai projektipohjaisesti.
        Laskutuspalvelu huolehtii puolestanne kaikista työnantajan ja tekijän
        velvoitteista.
      </p>
      <br />
      <a href="yrityksille">
        <button type="button" className="frontLinkButton" style={{paddingLeft:'62px',paddingRight:'62px'}}>
          YRITYKSILLE
        </button>
      </a>
    </div>
    <div className="frontpage-signup col-xs-12 col-sm-12 col-lg-12">
      <h6>Rekisteröityminen</h6>
      <p>Rekisteröidy käyttäjäksi. Se on maksutonta.</p>
      <br />
      <div className="row justify-content-center">
        <SignUp />
      </div>
    </div>
    <div className="laskutus">
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-lg-6">
          <img
            className="img-fluid"
            src={woman_etusivu}
            alt="Kassavirtanen_woman_etusivu"
            style={{ width: '100%', marginTop: '70px', height: 'auto' }}
          />
          <h6>Laskutus</h6>
          <br />
          <p>
            Luo laskuja helpon laskutuspohjamme avulla ja lähetä ne
            asiakkaillesi.
          </p>
        </div>
        <div className="col-xs-12 col-sm-6 col-lg-6">
          <img
            className="img-fluid"
            src={man_etusivu}
            alt="Kassavirtanen_man_etusivu"
            style={{ width: '100%', marginTop: '70px', height: 'auto' }}
          />
          <h6>Palkan nostaminen</h6>
          <br />
          <p>Nosta itsellesi palkkaa ilman huolta byrokratian kiemuroista.</p>
        </div>
      </div>
    </div>
    <div className="frontpage-halvempi">
      <div className="row justify-content-center">
        <div className="col-xs-12 col-sm-12 col-lg-12">
          <h6>Kevytyrittäjyyttä Edullisesti</h6>
          <br />
          <p>
            Tarjoamme palvelut lompakkoystävällisin hinnoin, jotta arkesi
            kevytyrittäjänä olisi entistä kevyempi. Palkkasi yhteydessä ovat
            kulut vain 3-4,0% palkan arvonlisäverottomasta summasta. Laskun
            lähettäminen, muistutukset ja perintä ovat käyttäjälle ilmaisia.
          </p>
          <br />
          <h6 style={{ color: '#ff3297' }}>TARJOUS</h6>
          <br />
          <p style={{ color: '#ff3297', fontWeight: 'bold' }}>
            Tarjoamme uusille asiakkaille 2% palvelumaksun helmikuun loppuun!
          </p>
        </div>
      </div>
    </div>
    <div className="frontpage-jouheva col-xs-12 col-sm-12 col-lg-12">
      <h6>Palkka tilille jopa samana päivänä</h6>
      <br />
      <p>
        Saat palkkasi nopeammin kuin toimeksiantajasi ehtii maksamaan!
        Kassavirtanen maksaa palkkiosi, ennen toimeksiantajasi maksusuoritusta.
        Pikapalkkana saat rahat parhaimmassa tapauksessa tilillesi jo samana
        päivänä. Pikapalkan palvelumaksu on vain 2,5% normaaliveloituksen
        lisäksi.
      </p>
    </div>
  </div>
)

export default FrontPage
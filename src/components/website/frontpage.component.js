import React from 'react'
import SignUp from './signup.component'

/**
 * Bootstrap styled Front Page
 *
 * @author Pragya Gupta
 */

const herravirtanen_etusivu = require('../../images/herravirtanen_etusivu.png')
const woman_etusivu = require('../../images/woman_etusivu.png')
const man_etusivu = require('../../images/man_etusivu.png')

const FrontPage = () => (
  <div className="container-fluid cover">
    <div className="cover">
      <img src={herravirtanen_etusivu} style={{width:'100%', height:'300px'}} />
      <div className="frontpage-cover-heading">
        Laskuta ilman yritystä.
        <br />Kevytyrittäjän uusi, entistä helpompi arki.
      </div>
    </div>
    <div className="frontpage-intro col-xs-12 col-sm-12 col-lg-12">
      <h6>Helppoa kuin heinän teko</h6>
      <br />
      <p>
        Kassavirtanen on palvelu, joka mahdollistaa laskuttamisen ilman omaa
        yritystä. Kassavirtasen avulla nostat palkkaa, mutta toimit kuten
        itsenäinen yrittäjä, ilman byrokratian aiheuttamia huolia.
        <br /> Laskutus on helppoa, säästää aikaasi eikä sido sinua mihinkään.
      </p>
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
          <img src={woman_etusivu} style={{width:'360px'}} />
          <h6>Laskutus</h6>
          <br />
          <p>
            Luo laskuja helpon laskutuspohjamme avulla ja lähetä ne
            asiakkaillesi.
          </p>
        </div>
        <div className="col-xs-12 col-sm-6 col-lg-6">
          <img src={man_etusivu} style={{width:'360px'}} />
          <h6>Palkan nostaminen</h6>
          <br />
          <p>Nosta itsellesi palkkaa ilman huolta byrokratian kiemuroista.</p>
        </div>
      </div>
    </div>
    <div className="frontpage-halvempi">
      <div className="row justify-content-center">
        <div className="col-xs-12 col-sm-12 col-lg-12">
          <h6>Eli ei kallis, vaan halvempi</h6>
          <br />
          <p>
            Palkka nopeammin kuin toimeksiantajasi ehtii maksamaan! Pikapalkan
            palvelumaksu on vain 2,5% normaaliveloituksen lisäksi, ja saat rahat
            parhaimmassa tapauksessa samana päivänä tilille.
          </p>
        </div>
      </div>
    </div>
    <div className="frontpage-jouheva col-xs-12 col-sm-12 col-lg-12">
      <h6>Paitsi jouheva, kassavirtanen on myös edullinen</h6>
      <br />
      <p>
        Maksat vain 2-4,5% palkan arvonlisäverottomasta summasta. Laskun
        lähettäminen, muistutukset ja perintä ovat ilmaisia.
      </p>
    </div>
  </div>
)

export default FrontPage
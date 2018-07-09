import React from 'react'

/**
 * Bootstrap styled Front Page
 *
 * @author Pragya Gupta
 */

const herravirtanen_etusivu = require('../../images/herravirtanen_etusivu.png')
const woman_etusivu = require('../../images/woman_etusivu.png')
const man_etusivu = require('../../images/man_etusivu.png')

const FrontPage = () => (
  <div>
    <div class="container-fluid frontpage-cover">
      <img src={herravirtanen_etusivu} style="width:100%; height:300px" />
      <div class="frontpage-cover-heading">
        Laskuta ilman yritystä.
        <br />Kevytyrittäjän uusi, entistä helpompi arki.
      </div>
    </div>
    <div class="container-fluid frontpage-intro col-md-8 col-md-offset-8">
      <h6>Helppoa kuin heinän teko</h6>
      <br />
      <p>
        Kassavirtanen on palvelu, joka mahdollistaa laskuttamisen ilman omaa
        yritystä. Kassavirtasen avulla nostat palkkaa, mutta toimit kuten
        itsenäinen yrittäjä, ilman byrokratian aiheuttamia huolia.
        <br /> Laskutus on helppoa, säästää aikaasi eikä sido sinua mihinkään.
      </p>
    </div>
    <div class="container frontpage-signup">
      <h6>Rekisteröityminen</h6>
      <p>Rekisteröidy käyttäjäksi. Se on maksutonta.</p>
      <br />
      <div class="row justify-content-center">
        <form class="form form-inline" action="">
          <div class="form-group mb-2 mr-sm-3">
            <label class="sr-only" for="etunimi">
              Etunimi:
            </label>
            <input
              type="text"
              class="form-input-field form-control"
              placeholder="Etunimi"
            />
          </div>
          <div class="form-group mb-2 mr-sm-3">
            <label class="sr-only" for="sukunimi">
              Sukunimi:
            </label>
            <input
              type="text"
              class="form-input-field form-control"
              placeholder="Sukunimi"
            />
          </div>
          <div class="form-group mb-2 mr-sm-3">
            <label class="sr-only" for="email">
              Sähköposti:
            </label>
            <input
              type="email"
              class="form-input-field form-control"
              id="email"
              placeholder="Sähköposti"
            />
          </div>
          <button type="submit" class="btn btn mb-2 mr-sm-3 button-background">
            Liity nyt
          </button>
        </form>
      </div>
    </div>
    <div class="container-fluid laskutus">
      <div class="row">
        <div class="col-lg">
          <img src={woman_etusivu} style="width:360px" />
          <h6>Laskutus</h6>
          <br />
          <p>
            Luo laskuja helpon laskutuspohjamme avulla ja lähetä ne
            asiakkaillesi.
          </p>
        </div>
        <div class="col-lg">
          <img src={man_etusivu} style="width:360px" />
          <h6>Palkan nostaminen</h6>
          <br />
          <p>Nosta itsellesi palkkaa ilman huolta byrokratian kiemuroista.</p>
        </div>
      </div>
    </div>
    <div class="container frontpage-halvempi">
      <div class="row justify-content-center">
        <div class="col-9">
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
    <div class="container-fluid frontpage-jouheva col-md-8 col-md-offset-8">
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
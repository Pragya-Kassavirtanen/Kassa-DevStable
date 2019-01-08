import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router'

const tuki_banner = require('../../images/kassavirtanen_tuki.jpg')

const Tuki = () => (
  <div className="container-fluid cover">
    <Helmet>
      <title>Tuki - Apua myynnin ja markkinoinnin kehittämiseen</title>
      <meta
        name="description"
        content="Kuinka kasvatat kevytyrittäjänä myyntiäsi kohti yrittäjyyttä? Tarjoamme apua liikeideasi suunnitteluun, hinnoitteluun, myyntiin ja markkinointiin."
      />
    </Helmet>
    <div className="cover">
      <img
        className="img-fluid"
        src={tuki_banner}
        alt="Kassavirtanen_kevytyrittäjä_tuki_myynti_ja_markkinointi"
        style={{ width: '100%', height: 'auto' }}
      />
    </div>
    <div className="whitebackground">
      <h6>KASSAVIRTANEN TUKI</h6>
      <br />
      <br />
      <h6>KEHITÄ ITSEÄSI JA KASVATA MYYNTIÄSI</h6>
      <br />
      <p>
        Tarvitsetko apua työsi hinnoittelussa, myynnin tai markkinoinnin
        suunnittelussa? Meiltä löytyy asiantuntijat, jotka ovat apuna ja tukena
        kaikissa kevytyrittäjyyden vaiheissa
        <br />
        <br />
        Laskutuspalvelun lisäksi tarjoamme sinulle asiantuntijapalvelut, jotta
        voisit kevytyrittäjänä toimia mahdollisimman huolettomasti kasvattaen
        myyntiäsi. Kannattavalla ja toimivalla liikeidealla mahdollistat
        myöhemmin myös yrittäjyyden pienemmillä riskeillä, kun toimit ensin
        kevytyrittäjänä taloudellisesti tuloksekkaasti.
      </p>
    </div>
    <div className="bluebackground">
      <h6>SUUNNITTELU</h6>
      <br />
      <p>
        Onko sinulla idea, mitä haluaisit tehdä, mutta idean toteuttaminen
        käytännössä on vielä auki? Tarjoamme asiantuntijoiden avulla sinulle
        tarvitsemaasi neuvonantoa, jonka avulla pääset erottumaan markkinoilla
        toimivista kilpailijoista ja maksimoimaan taloudellisen tuloksesi.
      </p>
    </div>
    <div className="whitebackground">
      <h6>HINNOITTELU</h6>
      <br />
      <p>
        Onko sinulla jo idea, mitä haluat tehdä, mutta palvelun oikeanlainen
        hinnoittelu kustannuksiin ja kilpailijoihin nähden on tuottanut
        päänvaivaa? Kassavirtasen asiantuntijat suunnittelevat kanssasi sopivan
        hinnoittelumallin, joka sopii tilanteeseesi parhaiten.
      </p>
    </div>
    <div className="bluebackground">
      <h6>MYYNTI JA MARKKINOINTI</h6>
      <br />
      <p>
        Onko sinulla jo toimiva liikeidea, ja jo muutama asiakas, mutta
        haluaisit kasvattaa toimintaasi lisäämällä myyntiäsi? Asiantuntijamme
        kartoittavat sinulle potentiaalisimman kohderyhmän, parhaan
        markkinointikanavan, teettävät toiminnallesi kokonaan uuden graafisen
        ilmeen tai nettisivut palveluillesi
      </p>
    </div>
    <div className="whitebackground">
      <h6>SOPIMUKSET</h6>
      <br />
      <p>
        Kevytyrittäjänä on hyvä sopia toimeksiantajan kanssa työstä erillisellä
        kirjallisella sopimuksella. Kassavirtasen Tuki tarjoaa kevytyrittäjälle
        tarvittaessa valmiit sopimuspohjat eri tilanteisiin ja vastaa
        mahdollisiin toimeksiantoihin liittyviin kysymyksiin.
      </p>
      <br />
      <br />
      <p>
        Ota yhteyttä <Link to="yhteystiedot">asiakaspalveluumme</Link> ja kysy
        lisää!
      </p>
    </div>
  </div>
)

export default Tuki
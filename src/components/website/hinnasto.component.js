import React from 'react'

const hinnasto_banner = require('../../images/hinnasto-banner.png')

const Hinnasto = () => (
  <div className="container-fluid cover">
    <div className="cover">
      <img src={hinnasto_banner} style={{ width: '100%', height: '300px' }} />
    </div>
    <div className="hinnasto-content col-xs-12 col-sm-12 col-lg-12">
      <div className="hinnasto-intro">
        <h6>Ei kallis vaan edullisempi</h6>
        <br />
        <p>Kassavirtasen käyttöönottaminen ja rekisteröinti on maksutonta. Kassavirtasen laskutuspalvelua käyttäessäsi maksat
          vain 2-4,5% palkan arvonlisäverottomasta summasta palkanmaksun yhteydessä. Kassavirtasen palvelumaksu kattaa kaiken
        laskutuksesta maksunvalvontaan asti.</p>
      </div>
    </div>
    <div className="container">
      <div className="row justify-content-around">
        <div className="hinnasto-palkka col-xs-12 col-sm-6 col-lg-6">
          <p className="hinnasto-palkka-heading">Palkka</p>
          <h1 className="percentage">2 - 4,5%</h1>
          <div className="hinnasto-palkka-content">
            <p>Nosta palkkaa tehdyistä töistä.</p>
            <ul>
              <li className="list1">&lt; 50 000 € - 4,5%</li>
              <li className="list2">&gt; 50 000 € - 4%</li>
              <li>&gt; 100 000 € - 3%</li>
              <li>&gt; 200 000 € - 2%</li>
            </ul>
          </div>
        </div>
        <div className="hinnasto-pikapalkka col-xs-12 col-sm-6 col-lg-6">
          <p className="hinnasto-pikapalkka-heading">Pikapalkka</p>
          <div className="percentage">
            <h1>2,5%</h1>
            <p className="italic">(normaaliveloituksen lisäksi)</p>
          </div>
          <p className="hinnasto-pikapalkka-content">Valitse Kassavirtasen pikapalkka, kun haluat saada palkkasi nopeammin kuin toimeksiantajasi ehtii maksaa! Pikapalkan
            palvelumaksu on vain 2,5% normaaliveloituksen lisäksi, ja parhaimmassa tapauksessa palkka on samana päivänä tililläsi.
        </p>
        </div>
      </div>
    </div>
    <div className="container hinnasto-sivukulut col-xs-12 col-sm-12 col-lg-12">
      <h6>Sivukulut</h6>
      <br />
      <p>Arvonlisävero: kulutusvero, joka maksetaan myynnistä. Yleisesti käytössä oleva arvonlisäverokanta on 24%. Työntekijän
        pidätyksiä ovat ennakonpidätys sekä sosiaaliturvamaksu. Huomioithan, että Kassavirtasen kautta laskuttaessa YEL-maksuista
      huolehtimisesta sinulla on mahdollisuus päättää itse! </p>
    </div>
    <div className="container hinnasto-ehdot col-xs-12 col-sm-12 col-lg-12">
      <h6>Pikapalkan ehdot</h6>
      <br />
      <p>Pikapalkka-palvelun käyttö on mahdollista, kun laskutetaan yrityksiä, yhteisöjä, kuntia ja valtioita. Yksityishenkilöiden
        laskuttamiseen pikapalkka ei siis sovellu. Toimeksiantajan tulee olla vakavarainen ja laskun tulee olla riidaton. Laskulle
        voidaan mahdollisesti pyytää hyväksyntä sähköpostitse tai puhelimitse. Pikapalkkoja voi nostaa ja niihin kohdistuvia
        laskuja voi olla avoinna vain yksi kerrallaan ja laskun loppusumma voi olla korkeintaan 4000 euroa. Jos lasku on suurempi,
        maksetaan pikapalkkaa vain 4000 euron edestä, loput suorituksen saavuttua. Mikäli emme saa suoritusta toimeksiantajaltasi
      osittain, sinun tulee palauttaa palkka vastaavalta osin.</p>
      <br />
      <p>Kevytyrittäjälle kuluttomat muistutus- ja perintäkulut: jos toimeksiantajasi unohtaa maksaa lähettämäsi laskun, ei hätää,
        lähetämme muistutukset puolestasi. Jos lasku jää vielä muistutustenkin jälkeen maksamatta, otamme yhteyttä toimeksiantajaasi
        ja selvitämme maksukyvyn ja -halukkuuden. Tarvittaessa ryhdymme perintätoimenpiteisiin ja oikeudelliseen perintään
        asti perintäyhtiön kautta. Tämä on Kassavirtasen käyttäjälle kulutonta, sillä perintäkulut maksaa laskun saaja. Muistutus-
      ja perintäpalvelumme ovat asialliset ja tähtäävät laskun maksamiseen aiheuttamatta turhia ongelmia toimeksiantajallesi.</p>
    </div>
  </div>
)

export default Hinnasto
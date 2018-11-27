import React from 'react'

const hinnasto_banner = require('../../images/hinnasto-banner.png')
const palkka_hinnasto = require('../../images/palkka.png')
const pikapalkka_hinnasto = require('../../images/pikapalkka.png')

const Hinnasto = () => (
  <div className="container-fluid cover">
    <div className="cover">
      <img 
      src={hinnasto_banner} 
      alt="Kassavirtanen_hinnasto_banner"
      style={{ width: '100%', height: '300px' }} />
    </div>
    <div className="hinnasto-content col-xs-12 col-sm-12 col-lg-12">
      <div className="hinnasto-intro">
        <h6>Ei kallis vaan edullinen</h6>
        <br />
        <p>
          Kassavirtasen käyttöönottaminen ja rekisteröinti on maksutonta.
          <br />
          Kassavirtasen laskutuspalvelua käyttäessäsi maksat vain 3-4,0% palkan
          arvonlisäverottomasta summasta palkanmaksun yhteydessä.
          <br />
          <br />
          Kassavirtasen palvelumaksu kattaa kaiken laskutuksesta
          maksunvalvontaan asti.
        </p>
      </div>
    </div>
    <div className="container">
      <div className="row justify-content-around">
        <div className="hinnasto-palkka col-xs-12 col-sm-6 col-lg-6">
          <img
            src={palkka_hinnasto}
            alt="Kassavirtanen_palkka_hinnasto"
            style={{ width: '360px', marginTop: '30px' }}
          />
          <h1 className="percentage">PALKKA 3-4,0%</h1>
          <div className="hinnasto-palkka-content">
            <p>Laskutat vain tekemästäsi työstä, 
              ja me veloitamme palvelumaksun suoraan toimeksiantajaltasi. 
              Mitä enemmän laskutat vuodessa, sitä edullisempi palvelumaksumme on!
            </p>
            <ul>
              <li className="list2">&lt; 100 000 € - 4,0%</li>
              <li className="list2">&gt; 100 000 € - 3,5%</li>
              <li className="list2">&gt; 150 000 € - 3%</li>              
            </ul>
          </div>
        </div>
        <div className="hinnasto-pikapalkka col-xs-12 col-sm-6 col-lg-6">
          <img
            src={pikapalkka_hinnasto}
            alt="Kassavirtanen_pikapalkka_hinnasto"
            style={{ width: '360px', marginTop: '28px' }}
          />
          <div className="percentage">
            <h1>PIKAPALKKA 2,5%</h1>
            <p>(Palvelumaksun lisäksi)</p>
          </div>
          <p className="hinnasto-pikapalkka-content">
            Valitse Kassavirtasen pikapalkka, kun haluat <br />
            saada palkkasi nopeammin <br />
            kuin toimeksiantajasi ehtii maksamaan! <br />
            <br />
            Pikapalkan palvelumaksu on vain 2,5% <br />
            palvelumaksun lisäksi, ja parhaimmassa <br />
            tapauksessa palkka on tililläsi jo samana päivänä.
          </p>
        </div>
      </div>
    </div>
    <div className="container hinnasto-sivukulut col-xs-12 col-sm-12 col-lg-12">
      <h6>Sivukulut</h6>
      <br />
      <p>
        Arvonlisävero: kulutusvero, joka maksetaan myynnistä. Yleisesti käytössä
        oleva arvonlisäverokanta on 24%. <br />
        Työntekijän pidätyksiä ovat ennakonpidätys sekä sosiaaliturvamaksu.
        <br /> <br />
        Huomioithan, että Kassavirtasen kautta laskuttaessa YEL-maksuista
        huolehtimisesta sinulla on mahdollisuus päättää itse!{' '}
      </p>
    </div>
    <div className="container hinnasto-ehdot col-xs-12 col-sm-12 col-lg-12">
      <h6>Pikapalkan ehdot</h6>
      <br />
      <p>
        Pikapalkka-palvelun käyttö on mahdollista, kun laskutetaan yrityksiä,
        yhteisöjä, kuntia ja valtioita. <br />
        Yksityishenkilöiden laskuttamiseen pikapalkka ei siis sovellu.
        <br />
        <br /> Toimeksiantajan tulee olla vakavarainen ja laskun tulee olla
        riidaton. Laskulle voidaan mahdollisesti pyytää hyväksyntä sähköpostitse
        tai puhelimitse.
        <br />
        <br />
        Pikapalkkoja voi nostaa ja niihin kohdistuvia laskuja voi olla avoinna
        vain yksi kerrallaan ja laskun loppusumma voi olla korkeintaan 4000
        euroa. <br />
        Jos lasku on suurempi, maksetaan pikapalkkaa vain 4000 euron edestä,
        loput suorituksen saavuttua. <br />
        Mikäli emme saa suoritusta toimeksiantajaltasi osittain, tulee sinun
        palauttaa palkka vastaavalta osin.
      </p>
    </div>
    <div className="container hinnasto-sivukulut col-xs-12 col-sm-12 col-lg-12">
      <h6>Perintä</h6>
      <br />
      <p>
        Kevytyrittäjälle kuluttomat muistutus- ja perintäkulut: jos
        toimeksiantajasi unohtaa maksaa lähettämäsi laskun, ei hätää, lähetämme{' '}
        <br />
        muistutukset puolestasi. Jos lasku jää vielä muistutustenkin jälkeen
        maksamatta, otamme yhteyttä toimeksiantajaasi ja selvitämme maksukyvyn
        ja -halukkuuden.
        <br />
        Tarvittaessa ryhdymme perintätoimenpiteisiin ja oikeudelliseen perintään
        asti perintäyhtiön kautta. <br />
        <br />
        Tämä on Kassavirtasen käyttäjälle kulutonta, sillä perintäkulut maksaa
        velallinen. Muistutus- ja perintäpalvelumme ovat asialliset ja
        tähtäävät <br />
        laskun maksamiseen aiheuttamatta turhia ongelmia toimeksiantajallesi.
      </p>
    </div>
  </div>
)

export default Hinnasto
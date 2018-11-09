import React from 'react'
import { faqFunction } from '../../utils/website.utils'

const usein_kysyttya_banner = require('../../images/usein-kysyttya-banner.png')

const FAQ = () => (
  <div className="container-fluid cover">
    <div className="cover">
      <img
        src={usein_kysyttya_banner}
        alt="Kassavirtanen_usein_kysyttya_banner"
        style={{ width: '100%', height: '300px' }}
      />
    </div>
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1 className="largetitle">USEIN KYSYTYT KYSYMYKSET</h1>
        </div>
      </div>
      <div className="faqpanels">
        <div className="collapsepanel">
          <div className="title" onClick={ faqFunction }>
            Aloitus ja käyttö
            <div className="icon">
              <i className="fa fa-fw" />
            </div>
          </div>
          <div className="content">
            <div>
              <h6>Paljonko palvelun aloittaminen ja käyttö maksavat?</h6>
              <div>
                <p>
                  Palvelun aloittaminen on maksutonta, maksat palvelun käytöstä
                  vain palkkaa nostaessasi; 4,0% palkan arvonlisäverottomasta
                  summasta.
                </p>
              </div>
            </div>
            <div>
              <h6>Mihin sitoudun?</h6>
              <div>
                <p>
                  Sitoutumisaikaa ei ole. Palvelun käyttäjät sitoutuvat
                  noudattamaan Kassavirtasen käyttöehtoja.
                </p>
              </div>
            </div>
            <div>
              <h6>Voinko toimia monella alalla?</h6>
              <div>
                <p>Kyllä voit, juuri niin monella kuin itse haluat!</p>
              </div>
            </div>
          </div>
        </div>
        <div className="collapsepanel">
          <div className="title">
            Laskut
            <div className="icon">
              <i className="fa fa-fw" />
            </div>
          </div>
          <div className="content">
            <div>
              <h6>Miten laskutus käytännössä toimii?</h6>
              <div>
                <p>
                  Laskutus on yksinkertaista helpon laskutuspohjamme ansiosta.
                  Pohjaan syötetään laskutettavan tiedot, sekä täydennetään
                  laskun lähettäjän tietoja. Pohja antaa laskun tekoon selkeät
                  ohjeet, joita noudattamalla laskuttaminen on helppoa ja
                  nopeaa!
                </p>
              </div>
            </div>
            <div>
              <h6>Kuinka nopeasti lasku lähtee eteenpäin?</h6>
              <div>
                <p>
                  Kassavirtanen tarkastaa laskun tiedot ennen lähettämistä.
                  Tästäkin syystä laskut kannattaa tehdä mahdollisimman
                  huolellisesti, ettei selvitystyö viivästytä laskun
                  lähetysprosessia!
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="collapsepanel">
          <div className="title">
            Palkka ja verotus
            <div className="icon">
              <i className="fa fa-fw" />
            </div>
          </div>
          <div className="content">
            <div>
              <h6>Milloin palkkani maksetaan?</h6>
              <div>
                <p>
                  Palkkasi maksetaan heti maksusuoritusten saavuttua Kassavirtasen kautta tilillesi, ellei
                  palkkaa erikseen valita pikapalkaksi.
                </p>
              </div>
            </div>
            <div>
              <h6>
                Korvataanko minulle mahdolliset aiheutuneet lisäkustannukset?
              </h6>
              <div>
                <p>
                  Aiheutuneet lisäkustannukset korvataan asianmukaisia
                  tositteita vastaan. Mikäli siis haluat palkan päälle
                  maksettavan lisäkorvauksia, toimitathan tositteet
                  Kassavirtasen palkanlaskentaan. Tämä onnistuu helposti 
                  lähettämällä tositteet joko sähköpostitse tai suoraan palveluun!
                </p>
              </div>
            </div>
            <div>
              <h6>
                Miten toimitan verokortin, ja mitä verokorttia minun tulisi
                käyttää?
              </h6>
              <div>
                <p>
                  Voit skannata verokorttisi Kassavirtasen järjestelmään. Mikäli
                  teet kaikki työsi Kassavirtasen kautta, lähetä meille
                  päätuloverokorttisi. Huomioithan, että päätuloverokortti voi
                  olla ainoastaan yhdellä palkanmaksajalla kerrallaan.
                  <br />Oletko päivätöissä? Mikäli olet, on päätuloverokorttisi
                  siis työnantajallasi. Skannaa meille tässä tapauksessa
                  sivutuloverokorttisi. Voit skannata meille myös
                  Freelancer-verokorttisi, jossa ei ole tulorajoja.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="collapsepanel">
          <div className="title">
            Vakuutukset ja eläke
            <div className="icon">
              <i className="fa fa-fw" />
            </div>
          </div>
          <div className="content">
            <div>
              <h6>Tarvitsenko vakuutuksia toimiessani kauttanne?</h6>
              <div>
                <p>
                  Et tarvitse erillisiä vakuutuksia toimiessasi Kassavirtasen
                  kautta.
                </p>
              </div>
            </div>
            <div>
              <h6>Kerrytänkö eläkettä?</h6>
              <div>
                <p>
                  Kassavirtasen käyttäjät ovat YEL:n alaisia. Tämä tarkoittaa,
                  että palvelun käyttäjä on itse vastuussa eläkkeen
                  karttumisesta ja YEL-maksujen hoitamisesta. Kassavirtasen
                  kautta laskutettaessa eläkkeesi ei siis automaattisesti kerry.
                </p>
              </div>
            </div>
            <div>
              <h6>Mikä on YEL?</h6>
              <div>
                <p>
                  YEL tarkoittaa yrittäjän eläkevakuutusta. Mikäli työtulosi
                  1.5.2017 alkaen ylittävät 7645,25 euroa seuraavan 12 kuukauden
                  aikana, olet 18-67-vuotias etkä saa työeläkelakien mukaista
                  vanhuuseläkettä ja lähetät laskuja toistuvasti Kassavirtasen
                  kautta, on sinun otettava YEL-vakuutus. Kirjautuessasi
                  palveluun löydät omista tiedoistasi YEL-kohdan, jossa voit
                  päättää, miten haluat huolehtia YEL-maksuistasi!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default FAQ

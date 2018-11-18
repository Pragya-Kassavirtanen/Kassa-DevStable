import React from 'react'
import { Field } from 'redux-form'
import {
  Dialog,
  RaisedButton,
  Snackbar,
  TextField,
  Checkbox
} from 'material-ui'
import Spinner from 'react-spinner-material'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { browserHistory } from 'react-router'
import { Panel } from 'react-bootstrap'
import { faqFunction } from '../../utils/website.utils'

/**
 * The register view
 *
 * @author  Skylar Kong
 */

class Register extends React.Component {
  render() {
    return <RegisterComponent {...this.props} />
  }
}

const _onFormSubmit = () => {
  return false
}

const RegisterComponent = ({
  handleSubmit,
  registerFormSubmit,
  showSnackbar,
  showSpinner,
  closeRegisterSnackbar,
  showFailSnackbar,
  invalid
}) => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <div>
      <form onSubmit={handleSubmit(_onFormSubmit)}>
        <div className="form-register-container">
          <div className="panel panel-default panel-register">
            <div className="panel-heading">
              <h3 className="panel-title">REKISTERÖI KÄYTTÄJÄ</h3>
            </div>
            <div style={{ marginBottom: '30px' }} className="panel-body">
              <div>
                <Field
                  name="email"
                  component={renderTextField}
                  label="Sähköposti*"
                  type="text"
                />
              </div>
              <div>
                <Field
                  name="FirstName"
                  component={renderTextField}
                  label="Etunimi*"
                  type="text"
                />
              </div>
              <div>
                <Field
                  name="Lastname"
                  component={renderTextField}
                  label="Sukunimi*"
                  type="text"
                />
              </div>
              <div>
                <Field
                  name="password"
                  component={renderTextField}
                  label="Salasana*"
                  type="password"
                />
              </div>
              <div>
                <Field
                  name="passwordConfirmation"
                  component={renderTextField}
                  label="Vahvista salasana*"
                  type="password"
                />
              </div>

              <div>
                <Field
                  name="agree_to_terms"
                  label="Hyväksyn käyttöehdot*"
                  component={renderCheckbox}
                />
              </div>
              <div className="form-register-btn">
                {invalid ? (
                  <RaisedButton
                    label="Rekisteröidy palveluun"
                    primary={true}
                    className="form-register-button"
                    type="submit"
                  />
                ) : (
                  <RaisedButton
                    label="Rekisteröidy palveluun"
                    primary={true}
                    className="form-register-button"
                    type="submit"
                    onClick={registerFormSubmit}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
      <Snackbar
        open={showSnackbar}
        message="Käyttäjä rekisteröity"
        autoHideDuration={2500}
        bodyStyle={{ backgroundColor: 'forestGreen', opacity: 0.8 }}
        onRequestClose={() => {
          closeRegisterSnackbar()
          browserHistory.push('/dashboard/login')
        }}
      />
      <div className="form-login-resetPassword">
        <Panel className="faqpanels">
          <div className="collapsepanel">
            <div className="title" onClick={faqFunction}>
              Palvelun käyttöehdot »
            </div>
            <div className="terms">
              <p>
                1. Kassavirtanen.fi- palvelun tuottaa Kassavirtanen Oy (y-tunnus
                2803711-2, IP-osoite: www.kassavirtanen.fi). Hallintoyrityksellä
                tarkoitetaan Kassavirtanen Oy:tä tai Kassavirtanen Oy:n
                rekisteröimää aputoiminimeä. Palvelun käyttäjällä tarkoitetaan
                työn suorittajaa, joka sopii itsenäisesti toimeksiantajansa
                kanssa työtehtävistä sekä hinnoittelusta.
              </p>
              <p>
                2. Hallintoyritys ei pääsääntöisesti markkinoi tai myy palvelun
                käyttäjien työsuorituksia. Myynninedistämisen toimenpiteistä
                sekä kattomarkkinoinnista on sovittava erikseen
                henkilökohtaisesti Hallintoyrityksen ja palvelun käyttäjän
                kesken.
              </p>
              <p>
                3. Palvelun käyttöönotto edellyttää tunnusten luomista
                kassavirtanen.fi -sivulle. Tunnusten luominen on masutonta eikä
                sido käyttäjää mihinkään. Hallintoyritys vahvistaa tunnusten
                toimivuuden palvelun käyttäjälle erillisellä ilmoituksella:
                ”Kiitos rekisteröitymisestä. Voit nyt kirjautua sisään
                palveluun”.
              </p>
              <p>
                4. Hallintoyritys ei ole miltään osin vastuussa käyttäjiensä
                työsuoritteisiin liittyvistä vastuista tai velvoitteista.
                Vastuut ja velvoitteet käsittävät tässä yhteydessä käyttäjän
                työsuoritteen aikana, tai sen jälkeen ilmeneviä virheitä,
                viivästyksiä tai puutteita. Palvelun käyttäjän tulee sopia
                työsuoritusta koskevat erimielisyydet itsenäisesti
                toimeksiantajansa kanssa. Mikäli palvelun käyttäjä ei suostu,
                pysty tai muuten kykene korjaamaan aiheuttamaansa virhettä, on
                Hallintoyrityksellä oikeus korjauttaa virheellinen työsuorite ja
                periä kustannukset palvelun käyttäjältä. Palvelun käyttäjän on
                huolehdittava siitä, että toimeksiantaja sekä mahdolliset muut
                kolmannet osapuolet ovat täysin tietoisia Hallintoyrityksen
                asemasta sekä vastuiden jakautumisesta osapuolten välillä.
              </p>
              <p>
                5. Palvelun käyttäjä on vakuutettu lakisääteisillä
                vakuutuksilla. Hallintoyrityksellä on vastuuvakuutus 1.000.000
                euroon asti, joka korvaa vakuutusehtojen mukaisesti ja niiden
                rajoissa toimeksiantajalle tai kolmansille osapuolille työn
                aikana tapahtuneet henkilö- ja esinevahingot. Palvelun käyttäjä
                on vastuussa vakuutuskorvauksen omavastuuosuuden
                suorittamisesta. Vakuutus ei korvaa epäammattimaisesta
                työnteosta aiheutuneita vahinkoja. Jos ammattialaa, jolla
                palvelun käyttäjä toimii, valvotaan viranomaisten toimesta, on
                Hallintoyritykselle toimitettava riittävät ja oikeat todistukset
                sekä dokumentit palvelun käyttäjän ammatillisesta pätevyydestä.
              </p>
              <p>
                6. Hallintoyritys huolehtii palvelun käyttäjien tietosuojasta
                henkilötietolain (523/1999) sekä sähköisen viestinnän
                tietosuojalain (516/2004) mukaisesti. Palvelun käyttäjällä ei
                ole oikeutta tehdä ostoja laskulla, luotto-, osamaksu-, tai
                alihankintasopimuksia Hallintoyrityksen nimissä. Palvelun
                käyttäjän sopimukset on tehtävä siinä mielessä, että
                Hallintoyritys on hallinnollinen yritys ja palvelun käyttäjä
                vastaavat itse sopimusvelvoitteistaan. Hallintoyrityksen
                yritystunnusta ei saa käyttää arvonlisäverottomiin hankintoihin
                EU:n alueella tai sen ulkopuolella.
              </p>
              <p>
                7. Hallintoyrityksen palvelumaksu 3-4 % peritään palkanmaksun
                yhteydessä. Palvelumaksu on progressiivinen ja riippuvainen
                palvelun käyttäjän kokonaislaskutuksesta. Palvelumaksu on
                prosentuaalinen ja se lasketaan laskutuksen
                arvonlisäverottomasta hinnasta. Palvelumaksulle ei ole
                määritelty erillistä vähimmäishintaa.
              </p>
              <p>
                Pikapalkan palvelumaksu on 2,5 %, joka veloitetaan normaalin
                palvelumaksun lisäksi. Pikapalkka on laskukohtainen, ja sen
                käyttöönottamiseksi on valittava laskutuslomakkeesta erillinen
                Pikapalkka -vaihtoehto. Pikapalkan käyttäjä saa palkkansa
                pankkitililleen jo samana päivänä, kun käyttäjä lähettää laskun
                ennen klo 12:00, laskun oikeellisuus pystytään vahvistamaan, se
                on riidaton, lopullinen ja laskun saajalla ei ole
                luottohäiriömerkintöjä.Pikapalkan käyttäjällä voi olla avoimia
                laskuja yhtäaikaisesti 5000 euroon saakka.
              </p>
              <p>
                8. Palvelun käyttäjän on toimitettava Hallintoyritykselle
                verokortti palkanmaksua varten. Verokortti tulee toimittaa ennen
                ensimmäistä palkanmaksua. Laskutusmääräys asiakkaalle on
                mahdollista tehdä ennen verokortin toimittamista. Mikäli
                verokorttia ei toimiteta ennen ensimmäistä palkanmaksua, tehdään
                ennakonpidätys 60 % mukaisesti.
              </p>
              <p>
                9. Hallintoyritys maksaa palkan palvelun käyttäjälle, kun
                toimeksiantajan maksusuoritus on saapunut Hallintoyrityksen
                tilille tai erillisen sopimuksen mukaan. Palkka maksetaan, kun
                kaikki tarvittavat tiedot (kuitit, matkalaskut, palkansaajat,
                palkkion jakautuminen, yms) on asianmukaisesti toimitettu
                Hallintoyritykselle.
              </p>
              <p>
                Palvelun käyttäjän palkka määräytyy laskutuksen
                arvonlisäverottoman summan perusteella. Laskutetusta
                arvonlisäverottomasta summasta vähennetään Hallintoyrityksen
                palvelumaksu, tapaturmavakuutusmaksu, lakisääteiset
                työnantajakulut sekä palvelun käyttäjän henkilökohtainen
                ennakonpidätys. Maksettavat palkat ja kulukorvaukset ovat
                toimeksiannon mukaisesti sovittuja sekä kertakaikkisia,
                sisältäen lomakorvaukset.
              </p>
              <p>
                Palkanmaksun ohessa käyttäjälle toimitetaan sähköinen
                palkkaerittely. Käyttäjällä on myös oikeus saada pyynnöstään
                työ- ja palkkatodistus. Lisäksi todetaan, että palvelun
                käyttäjän ei tarvitse erikseen tehdä palkastaan ilmoituksia tai
                erillisiä maksuja muille tahoille.
              </p>
              <p>
                10. Palvelun käyttäjä on velvollinen noudattamaan
                työsuojelumääräyksiä. Työhön liittyvät verovapaat kulukorvaukset
                ja päivärahat korvataan asianmukaisia kuitteja vastaan.
                Kulukorvauksia voidaan maksaa työmatkoista, (poissulkien kodin
                ja työpaikan välinen matka) oman auton käytöstä sekä työhön
                liittyvistä materiaalikuluista.
              </p>
              <p>
                Käyttöomaisuushankintoja palvelun käyttäjän ei ole mahdollista
                vähentää Hallintoyrityksen kautta, sillä muuten kirjanpidollinen
                omistusoikeus siirtyy Hallintoyritykselle. Edellä mainitun
                kaltaiset hankinnat on vähennettävä palvelun käyttäjän
                henkilökohtaisessa verotuksessa. Palvelun käyttäjä on lisäksi
                vastuussa siitä, että ilmoitetut verottomat kulukorvaukset sekä
                muut kulut ovat oikeellisia ja enintään kaksi kuukautta vanhoja
                (kulukuitit on toimitettava alkuperäisinä viimeistään maksun
                yhteydessä). Hallintoyritys pidättää oikeuden olla hyväksymättä
                kulukuitteja.
              </p>
              <p>
                11. Palvelun käyttäjä on velvollinen sopimaan työsuorituksista
                sekä hinnoista toimeksiantajansa kanssa. Hallintoyritys
                suosittelee kirjallisen työsopimuksen tekoa, josta käyvät ilmi
                vähintään työsuoritteen vähimmäissisältö. Käyttäjän on
                määriteltävä kokonaislaskutushintansa siten, ettei siitä
                määräytyvä bruttopalkka alita alan voimassaolevan työsopimuksen
                määräämää ansiota. Ansiot eivät saa alittaa alan
                minimipalkkasäädöksiä, kun mukaan otetaan kustannusten
                verovapaiden korvausten maksaminen. Hallintoyritys pidättää
                oikeuden olla maksamatta toimeksiantoa, jos edellä mainittujen
                sääntöjen rikkomusta on aiheellista epäillä.
              </p>
              <p>
                12. Lisäksi todetaan: <br />
                Palvelun käyttäjän tulee noudattaa Suomessa voimassa olevaa
                lainsäädäntöä.
              </p>
              <p>
                Palvelun käyttäjän on noudatettava työturvallisuusmääräyksiä, ja
                hän on velvollinen perehtymään tulevan työn vaara- ja
                haittatekijöihin sekä niihin liittyviin
                työsuojelutoimenpiteisiin ennen työn aloittamista. Palvelun
                käyttäjän on huolehdittava siitä, että hänellä on työn tekoon
                tarvittavat oikeat ja ajantasaiset suojavälineet. Palvelun
                käyttäjä myös vastaa näiden välineiden käytöstä.
              </p>
              <p>
                Ammattialaa valvottaessa viranomaisten toimesta, on palvelun
                käyttäjän todistettava pätevyytensä asianmukaisin dokumentein.
                Jos työsuoritus vaatii erillisiä lupia, on palvelun käyttäjä
                vastuussa siitä, että hänellä on asianmukaiset ja ajantasaiset
                luvat työn suorittamiseen. Luvanvaraiset työsuoritteet on
                hyväksyttävä Hallintoyrityksen kanssa etukäteen. Mikäli näitä
                ehtoja rikotaan, palvelun käyttäjä ei ole oikeutettu saamaan
                korvauksia Kassavirtanen Oy:n voimassa olevan vastuuvakuutuksen
                kautta.
              </p>
              <p>
                Palvelun käyttäjä on henkilökohtaisesti vastuussa kaikkien
                toimittamiensa tietojen oikeellisuudesta. Tämä koskee muun
                muassa laskutuslomakkeelle annettavia tietoja sekä verottomien
                kulukorvausten ja muiden kulujen ilmoittamista. Hallintoyritys
                ei missään tilanteessa anna takuuta työnsuorittajan tekemästä
                työstä, eikä myöskään suorita vahingonkorvauksia tuotevastuulain
                (649/1990) perusteella. Verotuksellisesti sekä
                kirjanpitovelvollisuuden kannalta työnsuorittaja todetaan
                Hallintoyrityksen työntekijäksi. Muissa suhteissa, kuten
                työoikeudellisesti tarkasteltuna, työnsuorittajan oikeudellinen
                asema saattaa kuitenkin poiketa siitä. Työttömyyskorvausten
                osalta työnsuorittaja voidaan luokitella yrittäjäksi.
                Eläkevakuuttamisen osalta työntekijä on itse vastuussa
                YEL-vakuutuksen ottamisesta. Hallintoyritys mahdollistaa
                YEL-vakuutuksen ottamisen palvelun kautta.
              </p>
            </div>
          </div>
        </Panel>
      </div>

      <Snackbar
        open={showFailSnackbar}
        message="Rekisteröinti epäonnistui, tarkista kentät"
        autoHideDuration={4000}
        bodyStyle={{ backgroundColor: 'red', opacity: 0.8 }}
        onRequestClose={() => {
          closeRegisterSnackbar()
        }}
      />
      <Dialog
        title="Rekisteröidään käyttäjä"
        contentStyle={{ width: '350px', height: '150px', textAlign: 'center' }}
        modal={true}
        open={showSpinner}
      >
        <Spinner
          width={100}
          height={120}
          spinnerColor={'#44C0CC'}
          spinnerWidth={2}
          show={showSpinner}
        />
      </Dialog>
    </div>
  </MuiThemeProvider>
)

// Wrappers for the Material-UI
const renderTextField = ({
  input,
  label,
  hintText,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    hintText={hintText}
    style={{ textAlign: 'left' }}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

const renderCheckbox = ({
  input,
  label,
  disabled,
  meta: { touched, error },
  ...custom
}) => (
  <Checkbox
    label={label}
    style={{
      borderBottom: touched && error ? '2px solid red' : 'none',
      textAlign: 'left',
      fontSize: '16px',
      width: '256px',
      height: '72px',
      display: 'inline-block',
      marginTop: '50px'
    }}
    checked={!!input.value}
    onCheck={input.onChange}
    disabled={disabled}
    {...custom}
  />
)

export default Register
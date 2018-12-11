import ReactGA from 'react-ga'
import React from 'react'
import 'core-js/fn/object/assign'
import { Provider } from 'react-redux'
import { OidcProvider } from 'redux-oidc'
import { I18nextProvider } from 'react-i18next'
import store from './store'
import Routes from './routes'
import i18n from './utils/i18n'
import userManager from './utils/PHZUserManager'

// for older browsers
require('es6-promise').polyfill()

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

//Google Analytics Tracking Code
ReactGA.initialize('UA-129495772-1')
/* ReactGA.pageview('/')
ReactGA.pageview('hinnasto')
ReactGA.pageview('faq')
ReactGA.pageview('yrityksille')
ReactGA.pageview('yhteystiedot') */
ReactGA.pageview('/kiitos-rekisteroitymisesta')
// ReactGA.pageview('/dashboard/login')

export default class RootComponent extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <OidcProvider store={store} userManager={userManager}>
          <I18nextProvider i18n={ i18n }>
            <Routes />
          </I18nextProvider>
        </OidcProvider>
      </Provider>
    )
  }
}
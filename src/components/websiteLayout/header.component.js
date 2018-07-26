import React from 'react'
import SecNavigation from './sec-navigation.component'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

/**
 * The header part of the website
 *
 * @author Pragya Gupta
 */

  const Header = ({ navItems }) =>
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <SecNavigation navItems={navItems} />
  </MuiThemeProvider>

export default Header
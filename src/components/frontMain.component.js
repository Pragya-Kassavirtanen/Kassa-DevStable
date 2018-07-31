require('normalize.css/normalize.css')
require('styles/sass/main.scss')

import React from 'react'

import Header from './websiteLayout/header.component'
import Footer from './layout/footer.component'
import Home from './website/home.component'

/**
 * The Front main component for handling website navigation.
 *
 * @author Pragya Gupta
 */

const FrontMain = ({ children, navItems, path }) => {

  return (
    <div>
      <Header navItems={navItems} />
      { children }
      { ((path === '/') || (path === '/*')) && <Home/> }
      <Footer/>
    </div>
  )
}

export default FrontMain

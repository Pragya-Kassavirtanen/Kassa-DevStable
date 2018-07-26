import React from 'react'
import FrontPage from './frontpage.component'

/**
 * The Front Page view
 *
 * @author  Pragya Gupta
 */

const Home = ({ children }) =>
  <div>
    <FrontPage/>
    {children}
  </div>

export default Home

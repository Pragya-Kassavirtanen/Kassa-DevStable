import React from 'react'
import { Link } from 'react-router'
import { I18n } from 'react-i18next'
import NavIcon from './navicon.component'
import FontAwesome from 'react-fontawesome'
import Language from '../lang.component'

/**
 * Bootstrap styled navigation bar
 *
 * @author Skylar Kong
 */

const brandLogo = require('../../images/kassavirtanen-logo.png')

export default class Navigation extends React.Component {
  _createNavIcons = navItems => (
    <ul className="nav nav-tabs">
      {navItems.map((navItem, iter) => (
        <li key={iter}>
          <Link
            activeClassName="dashboard-nav-icon"
            className="dashboard-nav-linklist"
            to={navItem.url}
          >
            <NavIcon name={navItem.name} content={navItem.content} size="2x" />
          </Link>
        </li>
      ))}
    </ul>
  )

  render() {
    let { navItems } = this.props
    return (
      <I18n>
        {t => {
          return (
            <div className="navbar navbar-default">
              <div className="header-lined">
                <div className="container-fluid dashboard-header-emptytop" />
                <div className="container-fluid dashboard-header-top">
                  <ul className="nav nav-pills pull-right">
                    <li className="dashboard-nav-list">
                      <Language />
                    </li>
                    <li>
                      <Link to="/dashboard" className="dashboard-nav-list">
                        <FontAwesome name="lock" /> {t('logInside.label')}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="container-fluid dashboard-header-bottom">
                <div className="dashboard-header-brand">
                  <Link to="/dashboard">
                    <img
                      className="navbar-brand dashboard-nav-brand"
                      src={brandLogo}
                    />
                  </Link>
                </div>
                <div className="nav navbar-nav navbar-right dashboard-nav-left">
                  {this._createNavIcons(navItems)}
                </div>
              </div>
            </div>
          )
        }}
      </I18n>
    )
  }
}
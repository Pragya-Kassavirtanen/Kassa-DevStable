import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleChangeLang } from '../actions'
import store from '../store'

/**
 * Bootstrap styled Change Language View
 *
 * @author Pragya Gupta
 */

class LanguageComponent extends Component {

/*   _handleChangeLang = e => {
    i18n.changeLanguage(e.target.value)
  } */

  render() {
    return (
      <select
        name= "langOpt"        
        className="selectpicker dashboard-nav-select"
        onChange={(name) => {                   
          store.dispatch(handleChangeLang(name.target.value))
        }}
      >
        <option value="fi">FI</option>
        <option value="en">EN</option>
      </select>
    )
  }
}

const mapStateToProps = state => {
  return {
    lang: state.lang,
    state
  }
}

const Language = connect(
  mapStateToProps,
  { handleChangeLang }
)(LanguageComponent)


export default Language
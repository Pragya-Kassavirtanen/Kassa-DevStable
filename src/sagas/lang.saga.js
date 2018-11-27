import { take, fork } from 'redux-saga/effects'
import {  
  LANGUAGE_CHANGE
} from '../constants'
import i18n from '../utils/i18n'

/**
 * @author Pragya Gupta
 */


//ToChek:: lang param is undefined
function* changeLanguage(lang) {
  try {    
    //console.log('Inside changeLanguage:: ',lang)
    i18n.changeLanguage(lang)
  } catch (error) {
    console.warn(error)
  }
}

export function* watchChangeLanguageSaga() { 
    yield take(LANGUAGE_CHANGE)
    yield fork(changeLanguage)
}
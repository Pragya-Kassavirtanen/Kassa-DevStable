import {
  POST_TAX_CARD,
  POST_TAX_CARD_SUCCESS,
  POST_TAX_CARD_FAILED,
  GET_YEL_SUCCESS,
  GET_YEL_FAILED,
  PASSWORD_UPDATE_SUCCESS,
  PASSWORD_UPDATE_FAILED,
  CLOSE_PASSWORD_SNACKBAR,
  YEL_UPDATE_SUCCESS,
  YEL_UPDATE_FAILED,
  CLOSE_YEL_SNACKBAR 
} from '../constants'

const initialState = {
  showTaxCardSpinner: false,
  yel: [],
  showSnackbar: false,
  showFailSnackbar: false,
  showYelSnackbar: false  
}

const taxReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_TAX_CARD:
      return Object.assign({}, { ...state }, { showTaxCardSpinner: true })

    case POST_TAX_CARD_SUCCESS:
      return Object.assign({}, { ...state }, { showTaxCardSpinner: false })

    case POST_TAX_CARD_FAILED:
      return Object.assign({}, { ...state }, { showTaxCardSpinner: false })

    case GET_YEL_SUCCESS:
      return Object.assign({}, { ...state }, { yel: action.yels.data })

    case GET_YEL_FAILED:
      return Object.assign({}, { ...state }, {})

    case PASSWORD_UPDATE_SUCCESS:
      return Object.assign(
        {},
        { ...state },
        {
          showSnackbar: true
        }
      )

    case PASSWORD_UPDATE_FAILED:
      return Object.assign(
        {},
        { ...state },
        {
          showFailSnackbar: true
        }
      )

    case CLOSE_PASSWORD_SNACKBAR:
      return Object.assign({}, state, {
        showSnackbar: false,
        showFailSnackbar: false
      })

    case YEL_UPDATE_SUCCESS:
      return Object.assign(
        {},
        { ...state },
        {
          showYelSnackbar: true
        }
      )

    case YEL_UPDATE_FAILED:
      return Object.assign(
        {},
        { ...state },
        {
          showYelFailSnackbar: true
        }
      )

    case CLOSE_YEL_SNACKBAR:
      return Object.assign({}, state, {
        showYelSnackbar: false       
      })

    default:
      return state
  }
}

export default taxReducer

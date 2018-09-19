import { connect } from 'react-redux'
import FrontMainComponent from '../components/frontMain.component'

/**
 * An High order container class for the the Front main component.
 *
 * @author  Pragya Gupta
 *
 */

const mapStateToProps = (state, ownProps) => {
  return {    
    navItems: navItems,
    path: ownProps.location.pathname   
  }
}

const mapDispatchToProps  = dispatch => {
  return {
    dispatch    
  }
}

const mergeProps = ( stateProps, dispatchProps, ownProps ) => Object.assign( {}, stateProps, dispatchProps, ownProps)

const FrontMainContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(FrontMainComponent)

const navItems = [
  {  
    name: 'home',  
    content: 'ETUSIVU',
    url: '/home/etusivu'
  },
  { 
    name: 'list-alt',   
    content: 'HINNASTO',
    url: '/home/hinnasto'
  },
  {  
    name: 'info-circle', 
    content: 'USEIN KYSYTTYÄ',
    url: '/home/faq'
  },
  { 
    name: 'users',
    content: 'KEVYTYRITTÄJYYS',
    url: '/home/yrityksille'
  },
  {  
    name: 'envelope', 
    content: 'YHTEYSTIEDOT',
    url: '/home/yhteystiedot'
  }
]

export default FrontMainContainer
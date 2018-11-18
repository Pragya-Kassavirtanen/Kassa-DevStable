import React from 'react'
import { browserHistory } from 'react-router'
import { Doughnut, Bar } from 'react-chartjs-2'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import OwnInfoContainer from '../../containers/dashboard/ownInfo.container'
import ReleaseInfoContainer from '../../containers/dashboard/releaseInfo.container'

/**
 * The dashboard component to be viewed after user has
 * successfully sign in.
 *
 * @author Pragya Gupta
 */

export default class Dashboard extends React.Component {
  componentWillMount() {
    this.props.getInvoiceAmountMonthly()
    this.props.getInvoiceChart()
    this.props.getCustomersChart()
    this.props.getUserTaxInfo()
    this.props.getCompanyUpdates()
    //this.props.onTokenValidation()

    //window.addEventListener('scroll', this.handleScroll.bind(this))
    window.addEventListener('beforeunload', this.handleRefresh.bind(this))   
  }

  componentWillUnmount() {
    //window.removeEventListener('scroll', this.handleScroll.bind(this))
    window.removeEventListener('beforeunload', this.handleRefresh.bind(this))
  }

  /*   handleScroll(e) {    
    console.log(e)
  } */

  handleRefresh(e) {    
    //e.preventDefault()    
    console.log(e)
    // Chrome requires returnValue to be set.
    e.returnValue = ''
    //ToDo:: Refresh Token API
    browserHistory.push('/home/etusivu')
  }

  render() {
    return <DashboardComponent {...this.props} />
  }
}

const DashboardComponent = ({
  invoiceAmountByMonthlyChartData,
  invoiceChartData,
  topCustomers  
}) => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <div className="container-fluid">
      <div className="row">
        <div className="dashboard-content-header">
          <h1>Tapahtuma</h1>          
        </div>
      </div>
      <div className="dashboard-content-header">
        <hr />
      </div>
      <div className="row">
        <div className="dashboard-content-header">
          <div className="col-xs-12 col-sm-12 col-lg-12">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">LASKUTUKSET KUUKAUSITTAIN</h3>
              </div>
              <div className="panel-body">
                <Bar
                  data={invoiceAmountByMonthlyChartData}
                  width={100}
                  height={20}
                  options={{
                    legend: {
                      display: false
                    },
                    scales: {
                      yAxes: [{
                          ticks: {
                              beginAtZero: true
                          }
                      }],
                      xAxes: [{                         
                        barPercentage: 0.4
                      }]
                  }
                  }}
                />
              </div>
              <div className="panel-footer" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="dashboard-content-bottom">
            <div className="col-xs-12 col-sm-4 col-lg-4">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">LASKUT</h3>
                </div>
                <div className="panel-body">
                  <Doughnut
                    data={invoiceChartData}
                    width={100}
                    height={50}
                    options={{
                      legend: {
                        display: true,
                        position: 'right'
                      }
                    }}
                  />
                </div>
                <div className="panel-footer" />
              </div>
            </div>
            <div className="col-xs-12 col-sm-4 col-lg-4">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">TOP 5 ASIAKKAAT</h3>
                </div>
                <div className="panel-body">
                  <Doughnut
                    data={topCustomers}
                    width={100}
                    height={50}
                    options={{
                      legend: {
                        display: true,
                        position: 'right'
                      }
                    }}
                  />
                </div>
                <div className="panel-footer" />
              </div>
            </div>
            <div className="col-xs-12 col-sm-4 col-lg-4">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">OMAT TIEDOT</h3>
                </div>
                <div style={{marginBottom: '30px'}} className="row">
                  <OwnInfoContainer />
                </div>
                <div className="panel-footer" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="dashboard-content-header">
          <div className="col-xs-12 col-sm-12 col-lg-12"> 
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">TIEDOTTEET</h3>
              </div>
              <div style={{borderColor: 'transparent', marginBottom:'0px'}} className="panel panel-default">                
                  <ReleaseInfoContainer />                
              </div>
              <div className="panel-footer" />
            </div>
        </div>
        </div> 
      </div>
    </div>
  </MuiThemeProvider>
)
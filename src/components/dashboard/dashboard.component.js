import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

/**
 * The dashboard component to be viewed after user has
 * successfully sign in.
 *
 * @author Pragya Gupta
 */

export default class Dashboard extends React.Component {
  componentWillMount() {
    this.props.getCustomersChart()
  }

  render() {
    return <DashboardComponent {...this.props} />
  }
}

const DashboardComponent = ({ topCustomers }) => (
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
              <div style={{ marginBottom: '75px' }} className="panel-body">
                <p>Otsikko teksti</p>
              </div>
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
                <div style={{ marginBottom: '75px' }} className="panel-body">
                  <p>Otsikko teksti</p>
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
                <div style={{ marginBottom: '85px' }} className="panel-body">
                  <ul className="list-group">
                    <li className="list-group-item">
                      Otsikko teksti
                      <span className="pull-right">0,00 €</span>
                    </li>
                    <li className="list-group-item">
                      Otsikko teksti
                      <span className="pull-right">0,00 €</span>
                    </li>
                    <li className="list-group-item">
                      Otsikko teksti
                      <span className="pull-right">0,00 €</span>
                    </li>
                  </ul>
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
              <div style={{ marginBottom: '75px' }} className="panel-body">
                <p>Otsikko teksti</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MuiThemeProvider>
)

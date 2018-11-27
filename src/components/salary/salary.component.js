import React from 'react'

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  Divider
} from 'material-ui'

import ReactPaginate from 'react-paginate'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import PaySalaryContainer from '../../containers/salary/paySalary.container'

/**
 * @author  Kristian Lauttamus
 */

export default class NewSalaryComponent extends React.Component {
  componentWillMount() {
    this.props.getSalariesStart()
  }

  render() {
    return <Salary {...this.props} />
  }
}

const Salary = ({ salaryRows, salaryPages, salaryPageChange }) => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <div className="container-fluid">
      <div className="row">
        <div className="dashboard-content-header">
          <h1>Maksetut palkat</h1>
        </div>
      </div>
      <div className="row">
        <div className="dashboard-content-header">
          <hr />
        </div>
      </div>
      <div className="row">
        <div className="dashboard-content-header">
          <div className="col-md-12">
            <div className="panel panel-default">
              <div className="panel-body">
                <Table selectable={false}>
                  <TableHeader
                    adjustForCheckbox={false}
                    displaySelectAll={false}
                  >
                    <TableRow>
                      <TableHeaderColumn>Päivämäärä</TableHeaderColumn>
                      <TableHeaderColumn>Bruttopalkka</TableHeaderColumn>
                      <TableHeaderColumn>Nettopalkka</TableHeaderColumn>
                      {/* <TableHeaderColumn>Palvelumaksu</TableHeaderColumn> */}
                      <TableHeaderColumn>Matkakorvaus</TableHeaderColumn>
                      <TableHeaderColumn>Kulukorvaus</TableHeaderColumn>
                      <TableHeaderColumn>Tila</TableHeaderColumn>
                      <TableHeaderColumn>Toiminnot</TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody displayRowCheckbox={false}>{salaryRows}</TableBody>
                </Table>
                <Divider />
                <ReactPaginate
                  previousLabel={<i className="fa fa-chevron-left" />}
                  nextLabel={<i className="fa fa-chevron-right" />}
                  breakLabel={'...'}
                  breakClassName={'break-me'}
                  pageCount={salaryPages}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={salaryPageChange}
                  containerClassName={'pagination'}
                  subContainerClassName={'pages pagination'}
                  activeClassName={'active'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <PaySalaryContainer />
      </div>
    </div>
  </MuiThemeProvider>
)
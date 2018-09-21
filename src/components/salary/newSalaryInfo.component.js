import React from 'react'

import {
  Table,
  TableBody,
  TableRowColumn,
  TableHeader,
  TableHeaderColumn,
  TableRow  
} from  'material-ui'


export default class NewSalaryInfoComponent extends React.Component {
  render() {
    return <NewSalaryInfo {...this.props}/>
  }
}

const NewSalaryInfo = ({  
  newSalaryInfo 
}) =>
  <div className="dashboard-content-header">
    <div className="col-md-6 col-sm-6">
      <div className="panel panel-default">
        <div className="panel-heading">
          Maksettu palkka
        </div>
        <div className="panel-body">
          <Table selectable={false}>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn><div className="dashboard-salary-header">Laskutus</div></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              <TableRow>
                <TableRowColumn>Summa</TableRowColumn>
                <TableRowColumn>{new Intl.NumberFormat('fi-FI', {
                                  style: 'currency',
                                  currency: 'EUR'
                                }).format(newSalaryInfo.sumWithoutTax)}
                </TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
          <hr/>
          <Table selectable={false}>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn><div className="dashboard-salary-header">Palkka</div></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              <TableRow>
                <TableRowColumn>Palkanlaskennan aloitussumma</TableRowColumn>
                <TableRowColumn>
                  {new Intl.NumberFormat('fi-FI', {
                    style: 'currency',
                    currency: 'EUR'
                  }).format(newSalaryInfo.sumWithoutTax)}
                </TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Matka- ja päivärahakorvaukset</TableRowColumn>
                <TableRowColumn>
                  {new Intl.NumberFormat('fi-FI', {
                    style: 'currency',
                    currency: 'EUR'
                  }).format(newSalaryInfo.reimbursment_cost)}
                </TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Kulukorvaukset</TableRowColumn>
                <TableRowColumn>
                  {new Intl.NumberFormat('fi-FI', {
                    style: 'currency',
                    currency: 'EUR'
                  }).format(newSalaryInfo.expenses_cost)}
                </TableRowColumn>
              </TableRow>                       
              <TableRow>
                <TableRowColumn><b>Bruttopalkka</b></TableRowColumn>
                <TableRowColumn>
                  {new Intl.NumberFormat('fi-FI', {
                    style: 'currency',
                    currency: 'EUR'
                  }).format(newSalaryInfo.gross_salary)}
                </TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Ennakonpidätys</TableRowColumn>
                <TableRowColumn>
                {new Intl.NumberFormat('fi-FI', {
                    style: 'currency',
                    currency: 'EUR'
                  }).format(newSalaryInfo.tax_cost)}
                </TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn><b>Nettopalkka</b></TableRowColumn>
                <TableRowColumn>
                  {new Intl.NumberFormat('fi-FI', {
                    style: 'currency',
                    currency: 'EUR'
                  }).format(newSalaryInfo.net_salary)}
                </TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>YEL-vakuutus</TableRowColumn>
                <TableRowColumn>
                {new Intl.NumberFormat('fi-FI', {
                    style: 'currency',
                    currency: 'EUR'
                  }).format(newSalaryInfo.yel_cost)}
                </TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Palvelupalkkiovähennys</TableRowColumn>
                <TableRowColumn>
                  {new Intl.NumberFormat('fi-FI', {
                    style: 'currency',
                    currency: 'EUR'
                  }).format(newSalaryInfo.service_cost)}
                </TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Sosiaaliturvamaksuvähennys</TableRowColumn>
                <TableRowColumn>
                  {new Intl.NumberFormat('fi-FI', {
                    style: 'currency',
                    currency: 'EUR'
                  }).format(newSalaryInfo.social_contribution)}
                </TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Tapaturmavakuutusmaksuvähennys</TableRowColumn>
                <TableRowColumn>
                  {new Intl.NumberFormat('fi-FI', {
                    style: 'currency',
                    currency: 'EUR'
                  }).format(newSalaryInfo.accidental_insurance)}
                </TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>
                  <b>Vähennykset yhteensä</b>
                </TableRowColumn>
                <TableRowColumn>
                  {new Intl.NumberFormat('fi-FI', {
                    style: 'currency',
                    currency: 'EUR'
                  }).format(newSalaryInfo.deductions_sum)}
                </TableRowColumn>
              </TableRow>     
            </TableBody>
          </Table>
          <hr/>          
          <Table selectable={false}>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn><div className="dashboard-salary-header">Maksetaan tilille</div></TableHeaderColumn>
                <TableHeaderColumn><div className="dashboard-salary-header">
                  {new Intl.NumberFormat('fi-FI', {
                    style: 'currency',
                    currency: 'EUR'
                  }).format(newSalaryInfo.take_home_pay)}
                </div></TableHeaderColumn>
              </TableRow>
            </TableHeader>
          </Table>
        </div>
      </div>
    </div>    
  </div>
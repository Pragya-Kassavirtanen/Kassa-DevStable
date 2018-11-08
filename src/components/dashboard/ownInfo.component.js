import React from 'react'

import { Table, TableBody, TableRowColumn, TableRow } from 'material-ui'

export default class OwnInfoComponent extends React.Component {
  render() {
    return <OwnInfo {...this.props} />
  }
}

const OwnInfo = ({ userTaxInfo }) => (
  <div className="panel-body">
    <Table selectable={false}>
      <TableBody displayRowCheckbox={false}>
        <TableRow>
          <TableRowColumn>Veroprosentti</TableRowColumn>
          <TableRowColumn>{`${userTaxInfo.tax_percentage} % `}</TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>Palvelumaksu</TableRowColumn>
          <TableRowColumn>
            {`${userTaxInfo.service_payment} % `}
          </TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>YEL</TableRowColumn>
          <TableRowColumn>{`${userTaxInfo.yel_percentage} % `}</TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>Rahaa nostettavissa</TableRowColumn>
          <TableRowColumn>
            {new Intl.NumberFormat('fi-FI', {
              style: 'currency',
              currency: 'EUR'
            }).format(userTaxInfo.sumwitouttax)}
          </TableRowColumn>
        </TableRow>
      </TableBody>
    </Table>
  </div>
)
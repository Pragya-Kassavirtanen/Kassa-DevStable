import React, { Component } from 'react'

import {
  RaisedButton,
  TableRow,
  TableRowColumn,
  Table,
  TableBody
} from 'material-ui'

import { Field } from 'redux-form'

import { renderCheckbox, renderTextField } from '../../utils/wrappers'

export default class AdminInvoiceFilterRow extends Component {
  render() {
    return <AdminInvoiceFilterRowComponent {...this.props} />
  }
}

const AdminInvoiceFilterRowComponent = ({ searchAdminInvoice }) => (
  <form>
    <Table>
      <TableBody displayRowCheckbox={false}>
        <TableRow displayBorder={false} selectable={false}>
          <TableRowColumn>
            <Field
              name="company_name"
              label="Yrityksen nimi"
              style={{ width: '100%' }}
              component={renderTextField}
            />
          </TableRowColumn>
          <TableRowColumn>
            <Field
              name="invoice_id"
              label="Laskunro."
              style={{ width: '100%' }}
              component={renderTextField}
            />
          </TableRowColumn>
          <TableRowColumn>
            <Field
              name="invoice_reference"
              label="Laskuviite"
              style={{ width: '100%' }}
              component={renderTextField}
            />
          </TableRowColumn>
          <TableRowColumn>
            <Field
              name="minSum"
              label="Vähimmäissumma"
              style={{ width: '100%' }}
              component={renderTextField}
            />
          </TableRowColumn>
          <TableRowColumn>
            <Field
              name="maxsum"
              label="Enimmäissumma"
              style={{ width: '100%' }}
              component={renderTextField}
            />
          </TableRowColumn>
          <TableRowColumn>
            <Field
              name="instant_payment"
              label="Pikapalkka"
              component={renderCheckbox}
            />
          </TableRowColumn>
        </TableRow>
      </TableBody>
    </Table>
    <RaisedButton
      label="Hae"
      className="pull-right"
      primary={true}
      onClick={searchAdminInvoice}
    />
  </form>
)

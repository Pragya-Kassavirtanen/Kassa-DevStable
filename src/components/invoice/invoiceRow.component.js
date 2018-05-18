import React from 'react'
import { TableRow, TableRowColumn, Checkbox } from 'material-ui'
import { Link } from 'react-router'
import store from '../../store'
import {
  removeInvoice,
  copyInvoice,
  saveAndSendInvoice
  //editInvoice
} from '../../actions/'

import FontAwesome from 'react-fontawesome'

import { convertIntToState } from '../../utils/invoice.utils'

const InvoiceRow = ({
  id,
  billing_date,
  due_date,
  customer,
  invoice_id,
  totalSumWithVAT,
  status,
  instant_payment
}) => (
  <TableRow key={id}>
    <TableRowColumn>{customer}</TableRowColumn>
    <TableRowColumn>{invoice_id}</TableRowColumn>
    <TableRowColumn>{billing_date}</TableRowColumn>
    <TableRowColumn>{due_date}</TableRowColumn>
    <TableRowColumn>{totalSumWithVAT}</TableRowColumn>
    <TableRowColumn>
      <Checkbox checked={instant_payment} disabled={true} />
    </TableRowColumn>
    <TableRowColumn>{convertIntToState(status)}</TableRowColumn>
    <TableRowColumn>
      <div style={{ display: 'flex' }}>
        <Link>
          <p
            style={{ marginLeft: '10px' }}
            onClick={() => {
              store.dispatch(saveAndSendInvoice(invoice_id))
            }}
          >
            <FontAwesome name="telegram" />
          </p>
        </Link>
        {actionsByState(status, invoice_id)}
        <Link>
          <p
            style={{ marginLeft: '10px' }}
            onClick={() => {
              store.dispatch(removeInvoice(invoice_id))
            }}
          >
            <FontAwesome name="window-close" />
          </p>
        </Link>
      </div>
    </TableRowColumn>
  </TableRow>
)

const actionsByState = (status, invoice_id) =>
  status === 0 ? (
    <Link>
      <p
        style={{ marginLeft: '10px' }}
        onClick={() => {
          store.dispatch(copyInvoice(invoice_id))
        }}
      >
        <FontAwesome name="clone" />
      </p>
    </Link>
  ) : (
    <Link to={'/dashboard/invoice/edit'}>
      <p
        style={{ marginLeft: '10px' }}
        onClick={() => {
          //store.dispatch(editInvoice(invoice_id))
          store.dispatch(copyInvoice(invoice_id))
        }}
      >
        <FontAwesome name="pencil" />
      </p>
    </Link>
  )

export default InvoiceRow

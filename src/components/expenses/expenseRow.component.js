import React from 'react'
import { TableRow, TableRowColumn } from 'material-ui'
import { Link } from 'react-router'
import store from '../../store'
import { removeExpense, editExpense } from '../../actions/index'
import FontAwesome from 'react-fontawesome'

const ExpenseRow = ({
  invoice_expense_id,
  company_name,
  date_of_purchase,
  place_of_purchase,
  sum
}) =>
  <TableRow key={invoice_expense_id}>
    <TableRowColumn>
      {company_name}
    </TableRowColumn>
    <TableRowColumn>
      {date_of_purchase}
    </TableRowColumn>
    <TableRowColumn>
      {place_of_purchase}
    </TableRowColumn>
    <TableRowColumn>
      {sum}
    </TableRowColumn>
    <TableRowColumn>
      <div style={{ display: 'flex' }}>
      <Link to="/dashboard/fee/newfee">
          <p
            style={{ marginLeft: '10px' }}
            onClick={() => {
              store.dispatch(editExpense( invoice_expense_id ))
            }}
          >
            <FontAwesome name="pencil" />
          </p>
        </Link>        
        <Link>
          <p
            style={{ marginLeft: '10px' }}
            onClick={() => { store.dispatch(removeExpense( invoice_expense_id )) }}
            >
            <FontAwesome name="window-close" />
          </p>
        </Link>
      </div>
    </TableRowColumn>
  </TableRow>


export default ExpenseRow
import React from 'react'
import { TableRow, TableRowColumn } from 'material-ui'
import { Link } from 'react-router'
import store from '../../store'
import { getSalaryInfo } from '../../actions/index'
import FontAwesome from 'react-fontawesome'

const SalaryRow = ({
  id,
  date,
  gross_sum,
  net_sum,
  service_cost,
  allowance_cost,
  expense_cost
}) => (
  <TableRow key={id}>
    <TableRowColumn>{date}</TableRowColumn>
    <TableRowColumn>{gross_sum}</TableRowColumn>
    <TableRowColumn>{net_sum}</TableRowColumn>
    <TableRowColumn>{service_cost}</TableRowColumn>
    <TableRowColumn>{allowance_cost}</TableRowColumn>
    <TableRowColumn>{expense_cost}</TableRowColumn>
    <TableRowColumn>
      <div style={{ display: 'flex' }}>
        <Link>
          <p
            style={{ marginLeft: '10px' }}
            onClick={() => {
              store.dispatch(getSalaryInfo(id))
            }}
          >
            <FontAwesome name="info-circle" />
          </p>
        </Link>
        <Link>
          <p
            style={{ marginLeft: '10px' }}
            onClick={() => {
              store.dispatch(getSalaryInfo(id))
            }}
          >
            <FontAwesome name="file-pdf-o" />
          </p>
        </Link>
      </div>
    </TableRowColumn>
  </TableRow>
)

export default SalaryRow

import React from 'react'
import { TableRow, TableRowColumn } from 'material-ui'
import { Link } from 'react-router'
import store from '../../store'
import { removeAllowance, editAllowance } from '../../actions/index'
import FontAwesome from 'react-fontawesome'

const AllowanceRow = ({
  id,
  company_name,
  start_date,
  end_date,
  sum
}) =>
  <TableRow key={id}>
    <TableRowColumn>
      {company_name}
    </TableRowColumn>
    <TableRowColumn>
      {start_date}
    </TableRowColumn>
    <TableRowColumn>
      {end_date}
    </TableRowColumn>
    <TableRowColumn>
      {sum}
    </TableRowColumn>
    <TableRowColumn>
      <div style={{ display: 'flex' }}>
      <Link to="/dashboard/fee/newallowance">
          <p
            style={{ marginLeft: '10px' }}
            onClick={() => {
              store.dispatch(editAllowance( id ))
            }}
          >
            <FontAwesome name="pencil" />
          </p>
        </Link>        
        <Link>
          <p
            style={{ marginLeft: '10px' }}
            onClick={() => { store.dispatch(removeAllowance( id )) }}
            >
            <FontAwesome name="window-close" />
          </p>
        </Link>
      </div>
    </TableRowColumn>

  </TableRow>


export default AllowanceRow

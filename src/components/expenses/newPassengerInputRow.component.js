import React from 'react'
import { Field } from 'redux-form'

import { TableRow, TableRowColumn, FlatButton } from 'material-ui'

import { renderTextField } from '../../utils/wrappers'

import { removePassengerRow } from '../../actions'

import store from '../../store'

import FontAwesome from 'react-fontawesome'

const PassengerInputRow = ({ passenger, rowNumber, autoFocusIndex, check }) => (
  <TableRow className="dashboard-invoice-inputrow">
    <TableRowColumn>
      {(parseInt(autoFocusIndex) > 0 && !check) ? 
        <Field name={passenger} component={renderTextField} label="Matkustajan nimi" autoFocus /> : 
        <Field name={passenger} component={renderTextField} label="Matkustajan nimi" />
      }
    </TableRowColumn>
    <TableRowColumn>
      <FlatButton
        secondary={true}
        onClick={() => store.dispatch(removePassengerRow(rowNumber))}
        icon={<FontAwesome name="window-close" size="2x" />}
      />
    </TableRowColumn>
  </TableRow>
)

export default PassengerInputRow
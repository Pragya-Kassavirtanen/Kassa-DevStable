import React from 'react'
import {
  RaisedButton,
  TableRow,
  TableRowColumn,
  Table,
  TableBody
} from 'material-ui'
import { Field } from 'redux-form'
import {
  renderTextField,
  renderDatePicker,
  renderCheckbox
} from '../../utils/wrappers'

export default class AdminSalaryFilterRow extends React.Component {
  render() {
    return <AdminSalaryFilterRowComponent {...this.props} />
  }
}

const AdminSalaryFilterRowComponent = ({ searchAdminWages }) => (
  <form>
    <Table>
      <TableBody displayRowCheckbox={false}>
        <TableRow displayBorder={false} selectable={false}>
          <TableRowColumn>
            <Field
              name="firstname"
              label="Käyttäjänimi"
              style={{ width: '100%' }}
              component={renderTextField}
            />
          </TableRowColumn>
          <TableRowColumn>
            <Field
              name="start_date"
              component={renderDatePicker}
              floatingLabelText="Alkupvm"
              textFieldStyle={{ width: '100%' }}
              onChangeCallback={() => undefined}
            />
          </TableRowColumn>
          <TableRowColumn>
            <Field
              name="end_date"
              component={renderDatePicker}
              floatingLabelText="Loppupvm"
              textFieldStyle={{ width: '100%' }}
              onChangeCallback={() => undefined}
            />
          </TableRowColumn>
          <TableRowColumn>
            <Field
              name="statusPaid"
              label="Maksettu"
              component={renderCheckbox}
            />
            <Field
              name="StatusProcessing"
              label="Käsittelyssä"
              component={renderCheckbox}
            />
          </TableRowColumn>
          <TableRowColumn>
            <RaisedButton
              label="Hae"
              className="pull-right"
              primary={true}
              onClick={searchAdminWages}
            />
          </TableRowColumn>
        </TableRow>
      </TableBody>
    </Table>
  </form>
)

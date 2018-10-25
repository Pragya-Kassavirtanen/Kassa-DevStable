import React, { Component } from 'react'
import { Field } from 'redux-form'
import { renderTextField } from '../../utils/wrappers'
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
  RaisedButton
} from 'material-ui'

export default class AdminUpdateForm extends Component {
  render() {
    return <AdminUpdateFormComponent {...this.props} />
  }
}

const AdminUpdateFormComponent = ({ adminAddNewUpdates }) => (
  <form>
    <Table>
      <TableBody displayRowCheckbox={false}>
        <TableRow displayBorder={false} selectable={false}>
          <TableRowColumn>
            <Field
              name="company_update"
              component={renderTextField}
              className="dashboard-admin-updateformfield"             
              floatingLabelText="Päivitä"              
              multiLine={true}
              rows={1}
            />
          </TableRowColumn>
        </TableRow>
        <TableRow displayBorder={false} selectable={false}>
          <TableRowColumn>
            <RaisedButton
              label="Tallenna"
              className="pull-right"
              primary={true}
              onClick={adminAddNewUpdates}
            />
          </TableRowColumn>
        </TableRow>
      </TableBody>
    </Table>
  </form>
)
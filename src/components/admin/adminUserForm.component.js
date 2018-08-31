import React, { Component } from 'react'

import {
  Field
} from 'redux-form'

import {
  renderTextField
} from '../../utils/wrappers'

import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
  RaisedButton
} from 'material-ui'

export default class AdminUserForm extends Component {

  render() {
    return <AdminUserFormComponent {...this.props}/>
  }
}

const AdminUserFormComponent = ({  
  email,
  uuid,
  updateAdminUser
}) =>
  <form>
    <Table>
      <TableBody displayRowCheckbox={false}>
        <TableRow displayBorder={false} selectable={false}>
          <TableRowColumn>
            <Field name="account_number"
                   component={renderTextField}
                   className="dashboard-admin-textfield"
                   floatingLabelText="Tilinumero"
                  />
            <Field name="city"
                   className="dashboard-admin-textfield"
                   component={renderTextField}
                   floatingLabelText="Postitoimipaikka"
                   />
          </TableRowColumn>
        </TableRow>

        <TableRow displayBorder={false} selectable={false}>
          <TableRowColumn>
            <Field name="firstname"
                   className="dashboard-admin-textfield"
                   floatingLabelText="Etunimi"
                   component={renderTextField}
                   />
            <Field name="lastname"
                   className="dashboard-admin-textfield"
                   component={renderTextField}
                   floatingLabelText="Sukunimi"
                   />
          </TableRowColumn>
        </TableRow>

        <TableRow displayBorder={false} selectable={false}>
          <TableRowColumn>
            <Field name="job_title"
                   className="dashboard-admin-textfield"
                   component={renderTextField}
                   floatingLabelText="Ammattinimike"
                   />
            <Field name="market_name"
                   className="dashboard-admin-textfield"
                   component={renderTextField}
                   floatingLabelText="Markkinointinimi"
                   />
          </TableRowColumn>
        </TableRow>

        <TableRow displayBorder={false} selectable={false}>
          <TableRowColumn>
            <Field name="service_payment"
                   className="dashboard-admin-textfield"
                   component={renderTextField}
                   floatingLabelText="Palvelumaksuprosentti"/>
            <Field name="tax_percentage"
                   className="dashboard-admin-textfield"
                   component={renderTextField}
                   floatingLabelText="Veroprosentti"/>
          </TableRowColumn>
        </TableRow>
        <TableRow displayBorder={false} selectable={false}>
          <TableRowColumn>
            <RaisedButton label="Tallenna"
                          className="pull-right"
                          primary={true}
                          onClick={() => updateAdminUser(email, uuid)}                         
                          />
          </TableRowColumn>
        </TableRow>
      </TableBody>
    </Table>
  </form>
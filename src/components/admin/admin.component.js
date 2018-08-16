import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import AdminInvoiceFormContainer from '../../containers/admin/adminInvoiceForm.container'
import AdminUserFormContainer from '../../containers/admin/adminUserForm.container'
import AdminInvoiceFilterRowContainer from '../../containers/admin/adminInvoiceFilterRow.container'
import AdminUserFilterRowContainer from '../../containers/admin/adminUserFilterRow.container'
import AdminSalaryFilterRowContainer from '../../containers/admin/adminSalaryFilterRow.container'
import Spinner from 'react-spinner-material'
import {
  ListItem,
  List,
  makeSelectable,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
  TableHeader,
  TableHeaderColumn,
  Card,
  CardHeader,
  CardText,
  Checkbox,
  Divider,
  Dialog,
  Snackbar
} from 'material-ui'
import { convertIntToState } from '../../utils/invoice.utils'
import DateTimeFormat from '../../utils/DateTimeFormat'

export default class Admin extends Component {
  render() {
    return <AdminComponent {...this.props} />
  }
}

const AdminComponent = ({
  changeAdminMenu,
  selectedMenuItem,
  invoiceSearchRows,
  expandAdminInvoice,
  userSearchRows,
  salarySearchRows,
  showSpinner,
  showAdminSnackbar,
  hideAdminSnackbar,
  expandAdminUser
}) => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <div className="container-fluid">
      <div className="row">
        <div className="dashboard-content-header">
          <h1>Hallintapaneeli</h1>
        </div>
      </div>
      <div className="dashboard-content-header">
        <hr />
      </div>
      <div className="row">
        <div className="dashboard-content-header">
          <div className="col-xs-12 col-sm-12 col-lg-12">
            {sideMenu(changeAdminMenu, selectedMenuItem)}
            {selectPanel(
              selectedMenuItem,
              invoiceSearchRows,
              expandAdminInvoice,
              userSearchRows,
              changeAdminMenu,
              expandAdminUser,
              salarySearchRows
            )}
          </div>
        </div>
      </div>
      <Snackbar
        open={showAdminSnackbar}
        message="Tiedot päivitetty"
        bodyStyle={{ backgroundColor: 'forestGreen', opacity: 0.8 }}
        contentStyle={{ textAlign: 'center' }}
        autoHideDuration={5000}
        onRequestClose={hideAdminSnackbar}
      />
      <Dialog
        title="Tietoja päivitetään"
        contentStyle={{ width: '350px', height: '150px', textAlign: 'center' }}
        modal={true}
        open={showSpinner}
      >
        <Spinner
          width={100}
          height={120}
          spinnerColor={'#44C0CC'}
          spinnerWidth={2}
          show={showSpinner}
        />
      </Dialog>
    </div>
  </MuiThemeProvider>
)

const selectPanel = (
  selectedMenuItem,
  invoiceSearchRows,
  expandAdminInvoice,
  userSearchRows,
  changeAdminMenu,
  expandAdminUser,
  salarySearchRows
) => {
  switch (selectedMenuItem) {
    case 0:
      return invoicePanel(invoiceSearchRows, expandAdminInvoice)
    case 1:
      return customerPanel(userSearchRows, changeAdminMenu, expandAdminUser)
    case 2:
      return salaryPanel(salarySearchRows)
  }
}

const sideMenu = (changeAdminMenu, selectedMenuItem) => (
  <div className="col-xs-3 col-sm-3 col-lg-3">
    <Paper>
      <SelectableList
        defaultValue={0}
        onChange={changeAdminMenu}
        value={selectedMenuItem}
      >
        <ListItem value={0} primaryText="Laskut" />
        <ListItem value={1} primaryText="Asiakkaat" />
        <ListItem value={2} primaryText="Palkat" />
      </SelectableList>
    </Paper>
  </div>
)

const invoicePanel = (invoiceSearchRows, expandAdminInvoice) => (
  <div className="col-xs-9 col-sm-9 col-lg-9">
    <div className="panel panel-default">
      <div className="panel-body">
        <AdminInvoiceFilterRowContainer />
      </div>
      <hr style={{ marginTop: '0px' }} />
      <Table>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Yrityksen nimi</TableHeaderColumn>
            <TableHeaderColumn>Laskunro.</TableHeaderColumn>
            <TableHeaderColumn>Laskuviite</TableHeaderColumn>
            <TableHeaderColumn>Summa</TableHeaderColumn>
            <TableHeaderColumn>Pikapalkka</TableHeaderColumn>
            <TableHeaderColumn>Tila</TableHeaderColumn>
            <TableHeaderColumn>Tehty</TableHeaderColumn>
          </TableRow>
        </TableHeader>
      </Table>
      {createInvoiceRow(invoiceSearchRows, expandAdminInvoice)}
    </div>
  </div>
)

const customerPanel = (userSearchRows, changeAdminMenu, expandAdminUser) => (
  <div className="col-xs-9 col-sm-9 col-lg-9">
    <div className="panel panel-default">
      <div className="panel-body">
        <AdminUserFilterRowContainer />
      </div>
      <hr style={{ marginTop: '0px' }} />
      <Table>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow hoverable={true}>
            <TableHeaderColumn>Asiakas</TableHeaderColumn>
            <TableHeaderColumn>Yhteyshenkilö</TableHeaderColumn>
            <TableHeaderColumn>Sähköposti</TableHeaderColumn>
          </TableRow>
        </TableHeader>
      </Table>
      {createUserRow(userSearchRows, changeAdminMenu, expandAdminUser)}
    </div>
  </div>
)

const salaryPanel = salarySearchRows => (
  <div className="col-xs-9 col-sm-9 col-lg-9">
    <div className="panel panel-default">
      <div className="panel-body">
        <AdminSalaryFilterRowContainer />
      </div>
      <hr style={{ marginTop: '0px' }} />
      <Table>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow hoverable={true}>
            <TableHeaderColumn>Päivämäärä</TableHeaderColumn>
            <TableHeaderColumn>Bruttopalkka</TableHeaderColumn>
            <TableHeaderColumn>Nettopalkka</TableHeaderColumn>
            <TableHeaderColumn>Tila</TableHeaderColumn>
          </TableRow>
        </TableHeader>
      </Table>
      {createSalaryRow(salarySearchRows)}
    </div>
  </div>
)

/* const createInvoiceRow = (invoices, expandAdminInvoice) => invoices.map(el => <Card
  expandable={true}
  expanded={el.expanded}
  key={el.id}
  onExpandChange={(e) => expandAdminInvoice(e, el.id)}>
  <CardHeader showExpandableButton actAsExpander={true}>
    <Table>
      <TableBody displayRowCheckbox={false}>
        <TableRow selectable={false}>
          <TableRowColumn>
            <b>
              {el.company_name}
            </b>
          </TableRowColumn>
          <TableRowColumn>
            <b>
              {new DateTimeFormat('fi', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric'
              }).format(new Date(el.due_date))}
            </b>
          </TableRowColumn>
          <TableRowColumn>
            <Checkbox label="Pikapalkka" checked={el.instant_payment} disabled={true}/>
          </TableRowColumn>
        </TableRow>
      </TableBody>
    </Table>
  </CardHeader>
  <CardText expandable> {el.expanded && expandedInvoiceFormData(el.expandData)} </CardText>
  <Divider/>
</Card>) */

const createInvoiceRow = invoices =>
  invoices.map(el => (
    <Card
      expandable={true}
      expanded={el.expanded}
      key={el.customer_id}
      //onExpandChange={(e) => expandAdminInvoice(e, el.id)}
    >
      <CardHeader showExpandableButton actAsExpander={true}>
        <Table>
          <TableBody displayRowCheckbox={false}>
            <TableRow selectable={false}>
              <TableRowColumn>
                <b>{el.company_name}</b>
              </TableRowColumn>
              <TableRowColumn>
                <b>{el.invoice_id}</b>
              </TableRowColumn>
              <TableRowColumn>
                <b>{el.invoice_reference}</b>
              </TableRowColumn>
              <TableRowColumn>
                <b>
                  {new Intl.NumberFormat('fi-FI', {
                    style: 'currency',
                    currency: 'EUR'
                  }).format(el.sum)}
                </b>
              </TableRowColumn>
              <TableRowColumn>
                <Checkbox
                  checked={el.instant_payment === 'quick_pay' ? true : false}
                  disabled={true}
                />
              </TableRowColumn>
              <TableRowColumn>
                <b>{convertIntToState(el.status)}</b>
              </TableRowColumn>
              <TableRowColumn>
                <Checkbox />
              </TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
      </CardHeader>
      <CardText expandable>
        {' '}
        {el.expanded && expandedInvoiceFormData(el.expandData)}{' '}
      </CardText>
      <Divider />
    </Card>
  ))

/* const createUserRow = (users, changeAdminMenu, expandAdminUser) => users.map(el =>
  <Card
    expandable={true}
    expanded={el.expanded}
    key={el.email}
    onExpandChange={(e) => expandAdminUser(e, el.uuid)}>
    <CardHeader showExpandableButton actAsExpander={true}>
      <Table onCellClick={() => changeAdminMenu(0, el.email)}>
        <TableBody displayRowCheckbox={false}>
          <TableRow className='dashboard-admin-hover-row'>
            <TableRowColumn>
              {el.company_name}
            </TableRowColumn>
            <TableRowColumn>
              {el.person_to_contact}
            </TableRowColumn>
            <TableRowColumn>
              {el.person_to_contact_email}
            </TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    </CardHeader>
    <CardText expandable> {el.expanded && expandedUserFormData(el.expandData, el.uuid)} </CardText>
  <Divider/>
</Card>) */

const createUserRow = (users, changeAdminMenu) =>
  users.map(el => (
    <Card
      expandable={true}
      expanded={el.expanded}
      key={el.customer_id}
      //onExpandChange={(e) => expandAdminUser(e, el.uuid)}
    >
      <CardHeader showExpandableButton actAsExpander={true}>
        <Table onCellClick={() => changeAdminMenu(0, el.email)}>
          <TableBody displayRowCheckbox={false}>
            <TableRow className="dashboard-admin-hover-row">
              <TableRowColumn>{el.company_name}</TableRowColumn>
              <TableRowColumn>{el.person_to_contact}</TableRowColumn>
              <TableRowColumn>{el.person_to_contact_email}</TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
      </CardHeader>
      <CardText expandable>
        {' '}
        {el.expanded && expandedUserFormData(el.expandData, el.uuid)}{' '}
      </CardText>
      <Divider />
    </Card>
  ))

const createSalaryRow = (wages, changeAdminMenu) =>
  wages.map(el => (
    <Card
      expandable={true}
      expanded={el.expanded}
      key={el.id}
      //onExpandChange={(e) => expandAdminUser(e, el.uuid)}
    >
      <CardHeader showExpandableButton actAsExpander={true}>
        <Table onCellClick={() => changeAdminMenu(0, el.email)}>
          <TableBody displayRowCheckbox={false}>
            <TableRow className="dashboard-admin-hover-row">
              <TableRowColumn>
                {new DateTimeFormat('fi', {
                  day: 'numeric',
                  month: 'numeric',
                  year: 'numeric'
                }).format(new Date(el.created))}
              </TableRowColumn>
              <TableRowColumn>
                {new Intl.NumberFormat('fi-FI', {
                  style: 'currency',
                  currency: 'EUR'
                }).format(el.gross_salary)}
              </TableRowColumn>
              <TableRowColumn>
                {new Intl.NumberFormat('fi-FI', {
                  style: 'currency',
                  currency: 'EUR'
                }).format(el.net_salary)}
              </TableRowColumn>
              <TableRowColumn>{el.Status}</TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
      </CardHeader>
      <CardText expandable>
        {' '}
        {el.expanded && expandedUserFormData(el.expandData, el.uuid)}{' '}
      </CardText>
      <Divider />
    </Card>
  ))

const expandedInvoiceFormData = expandData => (
  <AdminInvoiceFormContainer
    form={`AdminInvoiceForm_${expandData.id}`}
    initialValues={expandData}
    id={expandData.id}
  />
)

const expandedUserFormData = (expandData, uuid) => (
  <AdminUserFormContainer
    form={`AdminUserForm_${expandData.email.replace('.', '')}`}
    initialValues={expandData}
    uuid={uuid}
    email={expandData.email}
  />
)

const wrapState = ComposedComponent => {
  return class SelectableList extends Component {
    handleRequestChange = (_, index) => {
      this.props.onChange(index)
    }

    render() {
      return (
        <ComposedComponent
          value={this.props.value}
          onChange={this.handleRequestChange}
        >
          {this.props.children}
        </ComposedComponent>
      )
    }
  }
}

let SelectableList = wrapState(makeSelectable(List))

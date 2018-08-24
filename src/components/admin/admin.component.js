import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import AdminUserFormContainer from '../../containers/admin/adminUserForm.container'
import AdminInvoiceFilterRowContainer from '../../containers/admin/adminInvoiceFilterRow.container'
import AdminUserFilterRowContainer from '../../containers/admin/adminUserFilterRow.container'
import AdminSalaryFilterRowContainer from '../../containers/admin/adminSalaryFilterRow.container'
import Spinner from 'react-spinner-material'
import ReactPaginate from 'react-paginate'
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
  Snackbar,
  RaisedButton
} from 'material-ui'
import {
  convertIntToState,
  convertNameToState
} from '../../utils/invoice.utils'
import DateTimeFormat from '../../utils/DateTimeFormat'
import store from '../../store'

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
  invoiceSearchPages,
  invoiceSearchPageChange,
  salarySearchPages,
  salarySearchPageChange,
  userSearchPages,
  userSearchPageChange,
  warnSalaryToPay,
  isToPaySalaryId,
  isToLiftSalary,
  cancelUpdateAdminSalaryStatus,
  updateAdminSalaryStatus,
  selected,
  isToPay,
  isToPayInvoiceId,
  warnInvoiceToPay,
  updateAdminInvoiceStatus,
  cancelUpdateAdminInvoiceStatus,
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
              invoiceSearchPages,
              invoiceSearchPageChange,
              salarySearchPages,
              salarySearchPageChange,
              userSearchPages,
              userSearchPageChange,
              warnSalaryToPay,
              isToPaySalaryId,
              isToLiftSalary,
              cancelUpdateAdminSalaryStatus,
              updateAdminSalaryStatus,
              selected,
              isToPay,
              isToPayInvoiceId,
              warnInvoiceToPay,
              updateAdminInvoiceStatus,
              cancelUpdateAdminInvoiceStatus,
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
  invoiceSearchPages,
  invoiceSearchPageChange,
  salarySearchPages,
  salarySearchPageChange,
  warnSalaryToPay,
  isToPaySalaryId,
  isToLiftSalary,
  cancelUpdateAdminSalaryStatus,
  updateAdminSalaryStatus,
  userSearchPages,
  userSearchPageChange,
  selected,
  isToPay,
  isToPayInvoiceId,
  warnInvoiceToPay,
  updateAdminInvoiceStatus,
  cancelUpdateAdminInvoiceStatus,
  expandAdminInvoice,
  userSearchRows,
  changeAdminMenu,
  expandAdminUser,
  salarySearchRows
) => {
  switch (selectedMenuItem) {
    case 0:
      return invoicePanel(
        invoiceSearchRows,
        invoiceSearchPages,
        invoiceSearchPageChange,
        selected,
        isToPay,
        isToPayInvoiceId,
        warnInvoiceToPay,
        updateAdminInvoiceStatus,
        cancelUpdateAdminInvoiceStatus,
        expandAdminInvoice
      )
    case 1:
      return customerPanel(
        userSearchRows,
        selected,
        changeAdminMenu,
        expandAdminUser,
        userSearchPages,
        userSearchPageChange
      )
    case 2:
      return salaryPanel(
        salarySearchRows,
        selected,
        warnSalaryToPay,
        isToPaySalaryId,
        isToLiftSalary,
        cancelUpdateAdminSalaryStatus,
        updateAdminSalaryStatus,
        salarySearchPages,
        salarySearchPageChange
      )
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

const invoicePanel = (
  invoiceSearchRows,
  invoiceSearchPages,
  invoiceSearchPageChange,
  selected,
  isToPay,
  isToPayInvoiceId,
  warnInvoiceToPay,
  updateAdminInvoiceStatus,
  cancelUpdateAdminInvoiceStatus
) => (
  <div className="col-xs-9 col-sm-9 col-lg-9">
    <div className="panel panel-default">
      <div className="panel-body">
        <AdminInvoiceFilterRowContainer />
      </div>
      <hr style={{ marginTop: '0px' }} />
      <div className="panel-body">
        <Table selectable={false}>
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
          <TableBody displayRowCheckbox={false}>
            {createInvoiceRow(
              invoiceSearchRows,
              selected,
              isToPay,
              isToPayInvoiceId,
              warnInvoiceToPay,
              updateAdminInvoiceStatus,
              cancelUpdateAdminInvoiceStatus
            )}
          </TableBody>
        </Table>
        <Divider />
        <ReactPaginate
          previousLabel={<i className="fa fa-chevron-left" />}
          nextLabel={<i className="fa fa-chevron-right" />}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={invoiceSearchPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={invoiceSearchPageChange}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
    </div>
  </div>
)

const customerPanel = (
  userSearchRows,
  selected,
  changeAdminMenu,
  expandAdminUser,
  userSearchPages,
  userSearchPageChange
) => (
  <div className="col-xs-9 col-sm-9 col-lg-9">
    <div className="panel panel-default">
      <div className="panel-body">
        <AdminUserFilterRowContainer />
      </div>
      <hr style={{ marginTop: '0px' }} />
      <Table>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow hoverable={true}>
            <TableHeaderColumn>Etunimi</TableHeaderColumn>
            <TableHeaderColumn>Sukunimi</TableHeaderColumn>
            <TableHeaderColumn>Sähköposti</TableHeaderColumn>
          </TableRow>
        </TableHeader>
      </Table>
      {createUserRow(
        userSearchRows,
        selected,
        changeAdminMenu,
        expandAdminUser
      )}
      <Divider />
      <div className="panel-body">
        <ReactPaginate
          previousLabel={<i className="fa fa-chevron-left" />}
          nextLabel={<i className="fa fa-chevron-right" />}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={userSearchPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={userSearchPageChange}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
    </div>
  </div>
)

const salaryPanel = (
  salarySearchRows,
  selected,
  warnSalaryToPay,
  isToPaySalaryId,
  isToLiftSalary,
  cancelUpdateAdminSalaryStatus,
  updateAdminSalaryStatus,
  salarySearchPages,
  salarySearchPageChange
) => (
  <div className="col-xs-9 col-sm-9 col-lg-9">
    <div className="panel panel-default">
      <div className="panel-body">
        <AdminSalaryFilterRowContainer />
      </div>
      <hr style={{ marginTop: '0px' }} />
      <Table>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow hoverable={true}>
            <TableHeaderColumn>Käyttäjänimi</TableHeaderColumn>
            <TableHeaderColumn>Päivämäärä</TableHeaderColumn>
            <TableHeaderColumn>Nettopalkka</TableHeaderColumn>
            <TableHeaderColumn>Tila</TableHeaderColumn>
            <TableHeaderColumn>Tehty</TableHeaderColumn>
          </TableRow>
        </TableHeader>
      </Table>
      {createSalaryRow(
        salarySearchRows,
        selected,
        warnSalaryToPay,
        isToPaySalaryId,
        isToLiftSalary,
        cancelUpdateAdminSalaryStatus,
        updateAdminSalaryStatus
      )}
      <Divider />
      <div className="panel-body">
        <ReactPaginate
          previousLabel={<i className="fa fa-chevron-left" />}
          nextLabel={<i className="fa fa-chevron-right" />}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={salarySearchPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={salarySearchPageChange}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
    </div>
  </div>
)

const createInvoiceRow = (
  invoices,
  selected,
  isToPay,
  isToPayInvoiceId,
  warnInvoiceToPay,
  updateAdminInvoiceStatus,
  cancelUpdateAdminInvoiceStatus
) =>
  invoices.slice(selected * 10, selected * 10 + 10).map(el => (
    <TableRow selectable={false} key={el.invoice_id}>
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
        <Checkbox
          onCheck={() => {
            store.dispatch(warnInvoiceToPay(el.invoice_id))
          }}
          disabled={el.invoicepaid === 1 ? true : false}
        />
        <Dialog
          title={`Haluatko Laskun numero = ${isToPayInvoiceId} maksetaan !`}
          contentStyle={{
            width: '450px',
            height: '200px',
            textAlign: 'center'
          }}
          modal={true}
          open={isToPay}
          overlayStyle={{ backgroundColor: 'transparent' }}
          titleStyle={{
            paddingTop: '30px',
            paddingLeft: '30px',
            fontSize: '20px',
            lineHeight: '40px'
          }}
        >
          <ul className="nav nav-pills pull-right">
            <li>
              <RaisedButton
                style={{ margin: '20px' }}
                label="Peruuta"
                primary={true}
                onClick={() => {
                  store.dispatch(cancelUpdateAdminInvoiceStatus())
                }}
              />
            </li>
            <li>
              <RaisedButton
                style={{ margin: '20px' }}
                label="Tallenna"
                primary={true}
                onClick={() => {
                  store.dispatch(updateAdminInvoiceStatus(isToPayInvoiceId))
                }}
              />
            </li>
          </ul>
        </Dialog>
      </TableRowColumn>
    </TableRow>
  ))

const createUserRow = (users, selected, changeAdminMenu, expandAdminUser) =>
  users.slice(selected * 10, selected * 10 + 10).map(el => (
    <Card
      expandable={true}
      expanded={el.expanded}
      key={el.uuid}
      onExpandChange={e => expandAdminUser(e, el.uuid)}
    >
      <CardHeader showExpandableButton actAsExpander={true}>
        <Table
          onCellClick={() => changeAdminMenu(0, el.person_to_contact_email)}
        >
          <TableBody displayRowCheckbox={false}>
            <TableRow className="dashboard-admin-hover-row">
              <TableRowColumn>{el.firstname}</TableRowColumn>
              <TableRowColumn>{el.lastname}</TableRowColumn>
              <TableRowColumn>{el.email}</TableRowColumn>
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

const createSalaryRow = (
  wages,
  selected,
  warnSalaryToPay,
  isToPaySalaryId,
  isToLiftSalary,
  cancelUpdateAdminSalaryStatus,
  updateAdminSalaryStatus
) =>
  wages.slice(selected * 10, selected * 10 + 10).map(el => (
    <Card
      expandable={true}
      expanded={el.expanded}
      key={el.id}
      //onExpandChange={(e) => expandAdminUser(e, el.uuid)}
    >
      {/* <CardHeader showExpandableButton actAsExpander={true}> */}
      <CardHeader>
        <Table>
          <TableBody displayRowCheckbox={false}>
            <TableRow selectable={false}>
              <TableRowColumn>{el.firstname}</TableRowColumn>
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
                }).format(el.net_salary)}
              </TableRowColumn>
              <TableRowColumn>{convertNameToState(el.status)}</TableRowColumn>
              <TableRowColumn>
                <Checkbox
                  onCheck={() => {
                    store.dispatch(warnSalaryToPay(el.id))
                  }}
                  disabled={el.status === 'paid' ? true : false}
                />
                <Dialog
                  title={`Haluatko Palkan numero = ${isToPaySalaryId} maksetaan !`}
                  contentStyle={{
                    width: '450px',
                    height: '200px',
                    textAlign: 'center'
                  }}
                  modal={true}
                  open={isToLiftSalary}
                  overlayStyle={{ backgroundColor: 'transparent' }}
                  titleStyle={{
                    paddingTop: '30px',
                    paddingLeft: '30px',
                    fontSize: '20px',
                    lineHeight: '40px'
                  }}
                >
                  <ul className="nav nav-pills pull-right">
                    <li>
                      <RaisedButton
                        style={{ margin: '20px' }}
                        label="Peruuta"
                        primary={true}
                        onClick={() => {
                          store.dispatch(cancelUpdateAdminSalaryStatus())
                        }}
                      />
                    </li>
                    <li>
                      <RaisedButton
                        style={{ margin: '20px' }}
                        label="Tallenna"
                        primary={true}
                        onClick={() => {
                          store.dispatch(
                            updateAdminSalaryStatus(isToPaySalaryId)
                          )
                        }}
                      />
                    </li>
                  </ul>
                </Dialog>
              </TableRowColumn>
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

/* const expandedInvoiceFormData = expandData => (
  <AdminInvoiceFormContainer
    form={`AdminInvoiceForm_${expandData.id}`}
    initialValues={expandData}
    id={expandData.id}
  />
) */

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

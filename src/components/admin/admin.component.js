import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import AdminInvoiceFilterRowContainer from '../../containers/admin/adminInvoiceFilterRow.container'
import AdminUserFilterRowContainer from '../../containers/admin/adminUserFilterRow.container'
import AdminUserFormContainer from '../../containers/admin/adminUserForm.container'
import AdminUpdateFormContainer from '../../containers/admin/adminUpdateForm.container'
import AdminSalaryFilterRowContainer from '../../containers/admin/adminSalaryFilterRow.container'
import ReactPaginate from 'react-paginate'
import { Link } from 'react-router'
import FontAwesome from 'react-fontawesome'
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
import { formatDateAndTime } from '../../utils/dashboard.utils'

export default class Admin extends Component {
  componentWillMount() {
    this.props.adminGetUpdates()
  }
  render() {
    return <AdminComponent {...this.props} />
  }
}

const AdminComponent = ({
  changeAdminMenu,
  selectedMenuItem,
  invoiceSearchRows,
  invoiceSearchPages,
  invoiceSearchPageChange,
  selected,
  isToPay,
  isToPayInvoiceId,
  showInvoicePDF,
  warnInvoiceToPay,
  noPikapalkka,
  updateAdminInvoiceStatus,
  cancelUpdateAdminInvoiceStatus,
  userSearchRows,
  userSearchPages,
  userSearchPageChange,
  expandAdminUser,
  salarySearchRows,
  salarySearchPages,
  salarySearchPageChange,
  warnSalaryToPay,
  isToPaySalaryId,
  showSalaryPDF,
  isToLiftSalary,
  cancelUpdateAdminSalaryStatus,
  updateAdminSalaryStatus,
  showAdminSnackbar,
  showAdminFailSnackbar,
  hideAdminSnackbar,  
  releaseSearchRows,
  adminDeleteCompanyUpdates,
  tiedotteetSearchPages,
  tiedotteetSearchPageChange
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
              selected,
              isToPay,
              isToPayInvoiceId,
              showInvoicePDF,
              warnInvoiceToPay,
              noPikapalkka,
              updateAdminInvoiceStatus,
              cancelUpdateAdminInvoiceStatus,
              userSearchRows,
              userSearchPages,
              userSearchPageChange,
              expandAdminUser,
              changeAdminMenu,
              salarySearchRows,
              salarySearchPages,
              salarySearchPageChange,
              warnSalaryToPay,
              isToPaySalaryId,
              showSalaryPDF,
              isToLiftSalary,
              cancelUpdateAdminSalaryStatus,
              updateAdminSalaryStatus,
              releaseSearchRows,
              adminDeleteCompanyUpdates,
              tiedotteetSearchPages,
              tiedotteetSearchPageChange
            )}
          </div>
        </div>
      </div>
      <Snackbar
        open={showAdminSnackbar}
        message="Tiedot päivitetty"
        bodyStyle={{ backgroundColor: 'forestGreen', opacity: 0.8 }}
        contentStyle={{ textAlign: 'center' }}
        autoHideDuration={2000}
        onRequestClose={hideAdminSnackbar}
      />
      <Snackbar
        open={showAdminFailSnackbar}
        message="Päivitys epäonnistui"
        autoHideDuration={4000}
        bodyStyle={{ backgroundColor: 'red', opacity: 0.8 }}
        onRequestClose={() => {
          hideAdminSnackbar()
        }}
      />
    </div>
  </MuiThemeProvider>
)

const selectPanel = (
  selectedMenuItem,
  invoiceSearchRows,
  invoiceSearchPages,
  invoiceSearchPageChange,
  selected,
  isToPay,
  isToPayInvoiceId,
  showInvoicePDF,
  warnInvoiceToPay,
  noPikapalkka,
  updateAdminInvoiceStatus,
  cancelUpdateAdminInvoiceStatus,
  userSearchRows,
  userSearchPages,
  userSearchPageChange,
  expandAdminUser,
  changeAdminMenu,
  salarySearchRows,
  salarySearchPages,
  salarySearchPageChange,
  warnSalaryToPay,
  isToPaySalaryId,
  showSalaryPDF,
  isToLiftSalary,
  cancelUpdateAdminSalaryStatus,
  updateAdminSalaryStatus,
  releaseSearchRows,
  adminDeleteCompanyUpdates,
  tiedotteetSearchPages,
  tiedotteetSearchPageChange
) => {
  switch (selectedMenuItem) {
    case 0:
      return customerPanel(
        userSearchRows,
        selected,
        userSearchPages,
        userSearchPageChange,
        expandAdminUser,
        changeAdminMenu
      )
    case 1:
      return invoicePanel(
        invoiceSearchRows,
        invoiceSearchPages,
        invoiceSearchPageChange,
        selected,
        isToPay,
        isToPayInvoiceId,
        showInvoicePDF,
        warnInvoiceToPay,
        noPikapalkka,
        updateAdminInvoiceStatus,
        cancelUpdateAdminInvoiceStatus
      )
    case 2:
      return salaryPanel(
        salarySearchRows,
        selected,
        salarySearchPages,
        salarySearchPageChange,
        warnSalaryToPay,
        isToPaySalaryId,
        showSalaryPDF,
        isToLiftSalary,
        cancelUpdateAdminSalaryStatus,
        updateAdminSalaryStatus
      )
    case 3:
      return tiedotteetPanel(
        releaseSearchRows,
        selected,
        adminDeleteCompanyUpdates,
        tiedotteetSearchPages,
        tiedotteetSearchPageChange
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
        <ListItem value={0} primaryText="Asiakkaat" />
        <ListItem value={1} primaryText="Laskut" />
        <ListItem value={2} primaryText="Palkat" />
        <ListItem value={3} primaryText="Tiedotteet" />
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
  showInvoicePDF,
  warnInvoiceToPay,
  noPikapalkka,
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
              <TableHeaderColumn>Sähköposti</TableHeaderColumn>
              <TableHeaderColumn>Yrityksen nimi</TableHeaderColumn>
              <TableHeaderColumn>Laskunro.</TableHeaderColumn>
              <TableHeaderColumn>Laskuviite</TableHeaderColumn>
              <TableHeaderColumn>Summa</TableHeaderColumn>
              <TableHeaderColumn>Pikapalkka</TableHeaderColumn>
              <TableHeaderColumn>Tila</TableHeaderColumn>
              <TableHeaderColumn>Lasku maksettu</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {createInvoiceRow(
              invoiceSearchRows,
              selected,
              isToPay,
              isToPayInvoiceId,
              showInvoicePDF,
              warnInvoiceToPay,
              noPikapalkka,
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
  userSearchPages,
  userSearchPageChange,
  expandAdminUser,
  changeAdminMenu
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
        expandAdminUser,
        changeAdminMenu
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
  salarySearchPages,
  salarySearchPageChange,
  warnSalaryToPay,
  isToPaySalaryId,
  showSalaryPDF,
  isToLiftSalary,
  cancelUpdateAdminSalaryStatus,
  updateAdminSalaryStatus
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
            <TableHeaderColumn>Palkka maksettu</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {createSalaryRow(
            salarySearchRows,
            selected,
            warnSalaryToPay,
            isToPaySalaryId,
            showSalaryPDF,
            isToLiftSalary,
            cancelUpdateAdminSalaryStatus,
            updateAdminSalaryStatus
          )}
        </TableBody>
      </Table>
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

const tiedotteetPanel = (
  releaseSearchRows,
  selected,
  adminDeleteCompanyUpdates,
  tiedotteetSearchPages,
  tiedotteetSearchPageChange
) => (
  <div className="col-xs-9 col-sm-9 col-lg-9">
    <div className="panel panel-default">
      <div className="panel-heading">
        <h3 className="panel-title">Yrityspäivitykset</h3>
      </div>
      <div className="panel-body">
        <AdminUpdateFormContainer />
      </div>
      <hr style={{ marginTop: '0px' }} />
      <div className="panel-body">
        <Table selectable={false}>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>Julkaisupäivä</TableHeaderColumn>
              <TableHeaderColumn>Julkaisu</TableHeaderColumn>
              <TableHeaderColumn>Toiminnot</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {createReleaseRow(
              releaseSearchRows,
              selected,
              adminDeleteCompanyUpdates
            )}
          </TableBody>
        </Table>
        <Divider />
        <ReactPaginate
          previousLabel={<i className="fa fa-chevron-left" />}
          nextLabel={<i className="fa fa-chevron-right" />}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={tiedotteetSearchPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={tiedotteetSearchPageChange}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
    </div>
  </div>
)

const createReleaseRow = (releases, selected, adminDeleteCompanyUpdates) =>
  releases.slice(selected * 10, selected * 10 + 10).map(el => (
    <TableRow selectable={false} key={el.id}>
      <TableRowColumn>
        {formatDateAndTime(el.created)}
      </TableRowColumn>
      <TableRowColumn style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>        
        <span>{el.newsupdate}</span>
      </TableRowColumn>
      <TableRowColumn>
        <div style={{ display: 'flex' }}>
          <Link>
            <p
              style={{ marginLeft: '10px' }}
              onClick={() => {
                store.dispatch(adminDeleteCompanyUpdates(el.id))
              }}
            >
              <FontAwesome name="window-close" />
            </p>
          </Link>
        </div>
      </TableRowColumn>
    </TableRow>
  ))

const createInvoiceRow = (
  invoices,
  selected,
  isToPay,
  isToPayInvoiceId,
  showInvoicePDF,
  warnInvoiceToPay,
  noPikapalkka,
  updateAdminInvoiceStatus,
  cancelUpdateAdminInvoiceStatus
) =>
  invoices.slice(selected * 10, selected * 10 + 10).map(el => (
    <TableRow selectable={false} key={el.email+el.invoice_id}>
      <TableRowColumn>
        {el.email}
      </TableRowColumn>
      <TableRowColumn>
        {el.company_name}
      </TableRowColumn>
      <TableRowColumn>
        {el.invoice_id}
      </TableRowColumn>
      <TableRowColumn>
        {el.invoice_reference}
      </TableRowColumn>
      <TableRowColumn>        
          {new Intl.NumberFormat('fi-FI', {
            style: 'currency',
            currency: 'EUR'
          }).format(el.sum)}        
      </TableRowColumn>
      <TableRowColumn>
        <Checkbox
          checked={el.instant_payment === 'quick_pay' ? true : false}
          disabled={true}
        />
      </TableRowColumn>
      <TableRowColumn>
        {convertIntToState(el.status)}
      </TableRowColumn>
      <TableRowColumn>
      <div style={{ display: 'flex' }}>
        <Checkbox
          onCheck={() => {
            store.dispatch(warnInvoiceToPay(`${el.uuid}$$${el.invoice_id}`))
          }}
          disabled={el.invoicepaid !== 0 ? true : false}
          checked={isToPayInvoiceId !== `${el.uuid}$$${el.invoice_id}` ? false : true}
        />
        <Link>
          <p
            style={{ marginLeft: '10px' }}
            onClick={() => {
              store.dispatch(showInvoicePDF(`${el.uuid}$$${el.invoice_id}`))
            }}          
          >
            <FontAwesome name="file-pdf-o" />
          </p>
        </Link>
        </div>       
        <Dialog
          title={'Vahvista, että lasku maksetaan'}
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
                style={{ margin: '10px' }}
                label="Peruuta"
                primary={true}
                onClick={() => {
                  store.dispatch(cancelUpdateAdminInvoiceStatus())
                }}
              />
            </li>
            <li>
              <RaisedButton
                style={{ margin: '10px' }}
                label="Ei Pikapalkka"
                primary={true}
                onClick={() => {
                  store.dispatch(noPikapalkka())
                }}
              />
            </li>
            <li>
              <RaisedButton
                style={{ margin: '10px' }}
                label="Maksettu"
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

const createUserRow = (users, selected, expandAdminUser, changeAdminMenu) =>
  users.slice(selected * 10, selected * 10 + 10).map(el => (
    <Card
      expandable={true}
      expanded={el.expanded}
      key={el.uuid}
      onExpandChange={e => expandAdminUser(e, el.uuid)}
    >
      <CardHeader showExpandableButton actAsExpander={true}>
        <Table onCellClick={() => changeAdminMenu(1, el.email)}>
          <TableBody displayRowCheckbox={false}>
            <TableRow selectable={false} key={el.uuid}>
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
  showSalaryPDF,
  isToLiftSalary,
  cancelUpdateAdminSalaryStatus,
  updateAdminSalaryStatus
) =>
  wages.slice(selected * 10, selected * 10 + 10).map(el => (
    <TableRow selectable={false} key={el.email+el.id}>
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
      <div style={{ display: 'flex' }}>
        <Checkbox
          onCheck={() => {
            store.dispatch(warnSalaryToPay(`${el.uuid}$$${el.id}`))
          }}
          disabled={el.status === 'paid' ? true : false}
          checked={isToPaySalaryId !== `${el.uuid}$$${el.id}` ? false : true}
        />
        <Link>
          <p
            style={{ marginLeft: '10px' }}
            onClick={() => {
              store.dispatch(showSalaryPDF(`${el.uuid}$$${el.id}`))
            }}          
          >
            <FontAwesome name="file-pdf-o" />
          </p>
        </Link>
        </div>
        <Dialog
          open={isToLiftSalary}
          title={'Vahvista, että palkka maksetaan'}
          contentStyle={{
            width: '450px',
            height: '200px',
            textAlign: 'center'
          }}
          modal={true}
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
                label="Maksettu"
                primary={true}
                onClick={() => {
                  store.dispatch(updateAdminSalaryStatus(isToPaySalaryId))
                }}
              />
            </li>
          </ul>
        </Dialog>
      </TableRowColumn>
    </TableRow>
  ))

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
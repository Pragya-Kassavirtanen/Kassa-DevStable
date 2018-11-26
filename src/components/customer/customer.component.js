import React from 'react'
import { Field } from 'redux-form'
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableHeaderColumn,
  RaisedButton,
  Divider,
  Snackbar  
} from 'material-ui'
import ReactPaginate from 'react-paginate'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import store from '../../store'
import { renderTextField } from '../../utils/wrappers'
import { SelectField } from 'redux-form-material-ui'

/**
 * @author  Skylar Kong
 */

export default class CustomerComponent extends React.Component {
  componentDidMount() {
    this.props.getCustomersStart()
    this.props.getEinvoiceOperator()
  }

  render() {
    return <Customer {...this.props} />
  }
}

/* const _onFormSubmit = (values, e) => {
  e.preventDefault()
  console.log(e)  
} */

const _onFormSubmit = () => { 
  return false
}

const Customer = ({
  customerRows,
  countryItems,
  invoiceItems,
  eInvoiceOperators,
  handleSubmit,
  customerPages,
  isEdit,
  customer_id,
  newCustomer,
  customerPageChange,
  saveCustomerUpdate,
  cancelCustomerUpdate,
  showSnackbar,
  showFailSnackbar,
  closeCustomerSnackBar,
  invalid
}) => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <div className="container-fluid">
      <div className="row">
        <div className="dashboard-content-header">
          <h1>Asiakkaat</h1>
        </div>
      </div>
      <div className="dashboard-content-header">
        <hr />
      </div>
      <div className="row">
        <div className="dashboard-content-header">
          <div className="col-xs-12 col-sm-12 col-lg-12">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Asiakkaat</h3>
              </div>
              <div className="panel-body">
                {createCustomerRows(
                  customerRows,
                  customerPages,
                  customerPageChange
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="dashboard-content-header">
          {isEdit ? (
            <h1>MUOKKAA ASIAKKAN TIETOJA</h1>
          ) : (
            <h1>LUO UUSI ASIAKAS</h1>
          )}
        </div>
      </div>
      <div className="dashboard-content-header">
        <hr />
      </div>
      <form onSubmit={handleSubmit(_onFormSubmit)}>
        <div className="row">
          <div className="dashboard-content-header">
            <div className="col-xs-12 col-sm-6 col-lg-6">
              {customerInfo(countryItems)}
            </div>
            <div className="col-xs-12 col-sm-6 col-lg-6">
              {invoiceInfo(invoiceItems, eInvoiceOperators)}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="dashboard-content-header">
            <div className="col-xs-12 col-sm-12 col-lg-12">
              <div className="panel panel-default">
                <div className="panel-body">
                  {isEdit ? (
                    <ul className="nav nav-pills pull-right">
                      <li>
                        <RaisedButton
                          label="Peruuta"
                          primary={true}
                          onClick={cancelCustomerUpdate}
                        />
                      </li>
                      <li>
                        <RaisedButton
                          label="Tallenna"
                          primary={true}
                          onClick={() => {
                            store.dispatch(saveCustomerUpdate(customer_id))
                          }}
                        />
                      </li>
                    </ul>
                  ) : (
                    <div className="pull-right">
                      {invalid ? (
                        <RaisedButton
                          label="Lisää asiakas"
                          primary={true}
                          type="submit"
                        />
                      ) : (
                        <RaisedButton
                          label="Lisää Asiakas"
                          primary={true}
                          type="submit"
                          onClick={newCustomer}
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <Snackbar
        open={showSnackbar}
        message="Asiakas lisättiin onnistuneesti!"
        autoHideDuration={2000}
        bodyStyle={{ backgroundColor: 'forestGreen', opacity: 0.8 }}
        onRequestClose={() => {
          closeCustomerSnackBar()
        }}
      />
      <Snackbar
        open={showFailSnackbar}
        message="Lisää asiakas epäonnistui, tarkista kentät"
        autoHideDuration={4000}
        bodyStyle={{ backgroundColor: 'red', opacity: 0.8 }}
        onRequestClose={() => {
          closeCustomerSnackBar()
        }}
      />
    </div>
  </MuiThemeProvider>
)

const customerInfo = countryItems => (
  <div className="panel panel-default">
    <div className="panel-heading">
      <h3 className="panel-title">Asiakkaan yhteystiedot</h3>
    </div>
    <div className="panel-body" style={{ marginBottom: '25px' }}>
      <div>
        <Field
          name="country"
          component={SelectField}
          maxHeight={200}
          floatingLabelText="Maa *"
        >
          {countryItems}
        </Field>
      </div>
      <div>
        <Field
          name="company_name"
          component={renderTextField}
          label="Yrityksen nimi *"
        />
      </div>
      <div>
        <Field
          name="business_id"
          component={renderTextField}
          label="Y-Tunnus *"
        />
      </div>
      <div>
        <Field
          name="person_to_contact"
          component={renderTextField}
          label="Yhteyshenkilön nimi *"
        />
      </div>
      <div>
        <Field
          name="person_to_contact_email"
          component={renderTextField}
          label="Yhteyshenkilön sähköposti *"
        />
      </div>
    </div>
  </div>
)

const invoiceInfo = (invoiceItems, eInvoiceOperators) => (
  <div className="panel panel-default">
    <div className="panel-heading">
      <h3 className="panel-title">Laskun toimitustapa</h3>
    </div>
    <div className="panel-body" style={{ marginBottom: '25px' }}>
      <div>
        <Field
          name="delivery_method"
          component={SelectField}
          floatingLabelText="Laskun toimitustapa"
        >
          {invoiceItems}
        </Field>
      </div>
      <div>
        <Field
          name="delivery_address"
          component={renderTextField}
          label="Laskutusosoite"
        />
      </div>
      <div>
        <Field
          name="zip_code"
          component={renderTextField}
          label="Postinumero"
        />
      </div>
      <div>
        <Field
          name="city"
          component={renderTextField}
          label="Postitoimipaikka"
        />
      </div>
      <div>
        <Field
          name="web_invoice"
          component={renderTextField}
          label="Verkkolaskuosoite"
        />
      </div>
      <div>
        <Field
          name="finvoice_operator"
          component={SelectField}
          floatingLabelText="Verkkolaskuoperaattori"
        >
          {eInvoiceOperators}
        </Field>
      </div>
    </div>
  </div>
)

const createCustomerRows = (
  customerRows,
  customerPages,
  customerPageChange
) => (
  <div>
    <Table selectable={false}>
      <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
        <TableRow>
          <TableHeaderColumn>Asiakas</TableHeaderColumn>
          <TableHeaderColumn>Yhteyshenkilö</TableHeaderColumn>
          <TableHeaderColumn>Sähköposti</TableHeaderColumn>
          <TableHeaderColumn>Osoite</TableHeaderColumn>
          <TableHeaderColumn>Toiminnot</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>{customerRows}</TableBody>
    </Table>
    <Divider />
    <ReactPaginate
      previousLabel={<i className="fa fa-chevron-left" />}
      nextLabel={<i className="fa fa-chevron-right" />}
      breakLabel={'...'}
      breakClassName={'break-me'}
      pageCount={customerPages}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={customerPageChange}
      containerClassName={'pagination'}
      subContainerClassName={'pages pagination'}
      activeClassName={'active'}
    />
  </div>
)
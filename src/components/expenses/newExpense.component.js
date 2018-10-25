import React from 'react'
import { Field } from 'redux-form'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Spinner from 'react-spinner-material'
import { browserHistory } from 'react-router'
import store from '../../store'

import {
  renderDatePicker,
  renderInputFile,
  renderExpenseTextField
} from '../../utils/wrappers'

import { SelectField } from 'redux-form-material-ui'

import {
  Table,
  TableHeader,
  TableBody,
  TableHeaderColumn,
  TableRow,
  RaisedButton,
  Dialog,
  Snackbar
} from 'material-ui'

export default class NewExpenseComponent extends React.Component {
  render() {
    return <NewExpense {...this.props} />
  }
}

const _onFormSubmit = values => {
  console.log(values)
}

const NewExpense = ({
  invoices,
  expenseRows,
  addExpenseRow,
  expensePictureUpload,
  invalid,
  submitFailed,
  handleSubmit,
  saveExpense,
  showSpinner,
  showSnackbar,
  closeSnackbar,
  isEdit,
  saveExpenseUpdate,
  cancelExpenseUpdate,
  changeExpensePurchaseDate
}) => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <div className="container-fluid">
      <div className="row">
        <div className="dashboard-content-header">
          {isEdit ? <h1>Muokkaa Kulukorvausta</h1> : <h1>Kulukorvaukset</h1>}
        </div>
      </div>
      <div className="dashboard-content-header">
        <hr />
      </div>
      <form onSubmit={handleSubmit(_onFormSubmit)}>
        <div className="row">
          <div className="dashboard-content-header">
            <div className="col-xs-12 col-sm-12 col-lg-12">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">Lisää kulukuitti</h3>
                </div>
                <div className="panel-body" style={{ marginBottom: '25px' }}>
                  <div>
                    <Field
                      name="invoice"
                      component={SelectField}
                      floatingLabelText="Lasku"
                      style={{ width: '100%' }}
                    >
                      {invoices}
                    </Field>
                  </div>
                  <div>
                    <Field
                      name="place_of_purchase"
                      component={renderExpenseTextField}
                      label="Ostopaikka"
                      autoFocus
                    />
                  </div>
                  <div>
                    <Field
                      name="date_of_purchase"
                      component={renderDatePicker}
                      floatingLabelText="Ostopäivämäärä"
                      textFieldStyle={{ width: '100%' }}
                      onChangeCallback={changeExpensePurchaseDate}
                    />
                  </div>
                  <div className="dashboard-expense">
                    {isEdit ? (
                      <Field
                        name="receipt_picture"
                        placeholder="Lähetä kuitti uudelleen"
                        disabled={true}
                        component={renderExpenseTextField}
                      />
                    ) : (
                      <Field
                        name="receipt_picture"
                        placeholder="kuitti.png tai kuitti.jpg tai kuitti.gif"
                        disabled={true}
                        component={renderExpenseTextField}
                      />
                    )}
                    <div>
                      <RaisedButton
                        label="Lisää kuitin kuva"
                        primary={true}
                        containerElement={<label htmlFor="input-tax" />}
                      />
                      <div className="dashboard-tax-input">
                        <Field
                          name="inputFile"
                          component={renderInputFile}
                          id="input-tax"
                          onChange={e =>
                            expensePictureUpload(
                              e.target.value
                                .split('\\')
                                .slice(-1)
                                .pop()
                            )
                          }
                        />
                        {/*<input id="input-tax" type="file" onChange={(e) => onInputChange(e)}/>*/}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {specification(expenseRows, addExpenseRow)}
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
                          onClick={() => {
                            cancelExpenseUpdate()
                            browserHistory.push('/dashboard/fee')
                          }}
                        />
                      </li>
                      <li>
                        {invalid ? (
                          <RaisedButton
                            label="Tallenna"
                            primary={true}
                            type="submit"
                          />
                        ) : (
                          <RaisedButton
                            label="Tallenna"
                            primary={true}
                            onClick={() => {
                              store.dispatch(saveExpenseUpdate())
                            }}
                          />
                        )}
                      </li>
                    </ul>
                  ) : (
                    <div className="pull-right">
                      {invalid ? (
                        <RaisedButton
                          label="Hyväksy kulukorvaus"
                          primary={true}
                          type="submit"
                        />
                      ) : (
                        <RaisedButton
                          label="Hyväksy kulukorvaus"
                          primary={true}
                          type="submit"
                          onClick={saveExpense}
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
        message="Korvaus tallennettu ja lähetetty!"
        autoHideDuration={2000}
        bodyStyle={{ backgroundColor: 'forestGreen', opacity: 0.8 }}
        onRequestClose={() => {
          closeSnackbar()
          browserHistory.push('/dashboard/fee')
        }}
      />
      <Snackbar
        open={submitFailed && invalid}
        message="Korvaus ei onnistunut tallentamaan, tarkista kentät"
        autoHideDuration={4000}
        bodyStyle={{ backgroundColor: 'red', opacity: 0.8 }}
      />
      <Dialog
        title="Lähetetään kulukorvausta"
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

const specification = (expenseRows, addExpenseRow) => (
  <div className="row">
    <div className="dashboard-content-header">
      <div className="col-xs-12 col-sm-12 col-lg-12">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Kuitin erittely</h3>
          </div>
          <div className="panel-body">
            <Table selectable={false}>
              <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                <TableRow className="dashboard-invoice-inputrow">
                  <TableHeaderColumn>Nimike</TableHeaderColumn>
                  <TableHeaderColumn>Summa</TableHeaderColumn>
                  <TableHeaderColumn>Vero %</TableHeaderColumn>
                  <TableHeaderColumn>Poista rivi</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>{expenseRows}</TableBody>
            </Table>
            <div>
              <div className="dashboard-invoice-add pull-right">
                <RaisedButton
                  label="Lisää uusi rivi"
                  primary={true}
                  onClick={addExpenseRow}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)
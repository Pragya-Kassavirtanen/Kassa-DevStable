import React from 'react'
import { Field } from 'redux-form'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Spinner from 'react-spinner-material'
import { browserHistory } from 'react-router'
import store from '../../store'

import SummaryTableComponent from './summaryTable.component'

import {
  renderDatePicker,
  renderTextField,
  renderTimePicker,
  renderCheckbox
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

export default class NewAllowanceComponent extends React.Component {
  componentDidMount() {
    this.props.changeAllowanceDate()
  }

  render() {
    return <NewAllowance {...this.props} />
  }
}

const _onFormSubmit = values => {
  console.log(values)
}

const NewAllowance = ({
  invoices,
  allowanceCost,
  allowanceRows,
  addAllowanceRow,
  invalid,
  submitting,
  submitFailed,
  countryItems,
  showMileageForm,
  showAllowanceForm,
  allowancePassenger,
  addPassengerRow,
  showAdditionalVehicleInfo,
  vehicleTypeItems,
  vehicleAdditionalItems,
  showAdditionalInfo,
  startDate,
  endDate,
  //dayItems,
  changeAllowanceDate,
  //selectAllowanceDays,
  allowanceDaysFull,
  allowanceDaysPart,
  allowanceDaysMeal,
  fullTimeSelected,
  partTimeSelected,
  mealSelected,
  kmPrice,
  distance,
  handleSubmit,
  saveTravellingExpense,
  showSpinner,
  showSnackbar,
  closeSnackbar,
  isEdit,
  saveAllowanceUpdate,
  cancelAllowanceUpdate,
  changeAllowanceStartTime,
  changeAllowanceEndTime
}) => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <div className="container-fluid">
      <div className="row">
        <div className="dashboard-content-header">
          {isEdit ? (
            <h1>Muokkaa matka- tai päivärahakorvausta</h1>
          ) : (
            <h1>Luo uusi matka- tai päivärahakorvaus</h1>
          )}
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
                  <h3 className="panel-title">Lasku</h3>
                </div>
                <div className="panel-body" style={{ marginBottom: '25px' }}>
                  <div>
                    <Field
                      name="invoice"
                      component={SelectField}
                      floatingLabelText="Valitse lasku"
                      style={{ width: '100%' }}
                    >
                      {invoices}
                    </Field>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="dashboard-content-header">
            <div className="col-xs-12 col-sm-12 col-lg-12">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">Syötä matkan tiedot</h3>
                </div>
                <div className="panel-body" style={{ marginBottom: '25px' }}>
                  <div>
                    <Field
                      name="destination"
                      component={renderTextField}
                      label="Matkan kohde"
                      style={{ float: 'left', width: '50%' }}
                      autoFocus
                    />
                    <Field
                      name="country"
                      component={SelectField}
                      style={{ float: 'left', width: '50%' }}
                      floatingLabelText="Maa"
                    >
                      {countryItems}
                    </Field>
                  </div>
                  <div>
                    <Field
                      name="start_date"
                      component={renderDatePicker}
                      floatingLabelText="Matkan alkamispäivä"
                      textFieldStyle={{ float: 'left', width: '50%' }}
                      maxDate={endDate ? new Date(endDate) : undefined}
                      onChangeCallback={changeAllowanceDate}
                    />
                    <Field
                      name="start_time"
                      component={renderTimePicker}
                      floatingLabelText="Alkuaika"
                      textFieldStyle={{ float: 'left', width: '50%' }}
                      onChangeCallback={changeAllowanceStartTime}
                    />
                  </div>
                  <div>
                    <Field
                      name="end_date"
                      component={renderDatePicker}
                      floatingLabelText="Matkan päättymispäivä"
                      textFieldStyle={{ float: 'left', width: '50%' }}
                      minDate={new Date(startDate)}
                      onChangeCallback={changeAllowanceDate}
                    />
                    <Field
                      name="end_time"
                      component={renderTimePicker}
                      floatingLabelText="Loppuaika"
                      textFieldStyle={{ float: 'left', width: '50%' }}
                      onChangeCallback={changeAllowanceEndTime}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {routeSpecification(allowanceRows, addAllowanceRow)}
          <div className="dashboard-content-header">
            <div className="col-xs-6 col-sm-6 col-lg-6">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">Korvaukset</h3>
                </div>
                <div className="panel-body">
                  <Field
                    name="mileage_allowance"
                    label="Kilometrikorvaukset"
                    component={renderCheckbox}
                  />
                  <Field
                    name="day_allowance"
                    label="Päivä- ja ruokarahat"
                    component={renderCheckbox}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {payMileage(
            showMileageForm,
            addPassengerRow,
            allowancePassenger,
            vehicleTypeItems,
            vehicleAdditionalItems,
            showAdditionalInfo,
            showAdditionalVehicleInfo
          )}
          {payAllowance(
            showAllowanceForm,
            //dayItems,
            //selectAllowanceDays,
            allowanceDaysFull,
            allowanceDaysPart,
            allowanceDaysMeal
          )}
        </div>

        {summary(
          allowanceCost,
          fullTimeSelected,
          partTimeSelected,
          mealSelected,
          kmPrice,
          distance
        )}
        {submitButton(
          invalid,
          isEdit,
          cancelAllowanceUpdate,
          saveAllowanceUpdate,
          saveTravellingExpense,
          submitting
        )}
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
        title="Lähetetään matka- ja päivärahakorvausta"
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

const summary = (
  allowanceCost,
  fullTimeSelected,
  partTimeSelected,
  mealSelected,
  kmPrice,
  distance
) => (
  <div className="row">
    <div className="dashboard-content-header">
      <div className="col-xs-12 col-sm-12 col-lg-12">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Korvauslaskuri</h3>
          </div>
          <div className="panel-body" style={{ marginBottom: '25px' }}>
            <div>
              <SummaryTableComponent
                allowanceCost={allowanceCost}
                fullTimeSelected={fullTimeSelected}
                partTimeSelected={partTimeSelected}
                mealSelected={mealSelected}
                kmPrice={kmPrice}
                distance={distance}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const routeSpecification = (allowanceRows, addAllowanceRow) => (
  <div className="dashboard-content-header">
    <div className="col-xs-6 col-sm-6 col-lg-6">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Reitin erittely</h3>
        </div>
        <div className="panel-body">
          <Table selectable={false}>
            <TableBody displayRowCheckbox={false}>{allowanceRows}</TableBody>
          </Table>
          <div>
            <div className="dashboard-invoice-add pull-right">
              <RaisedButton
                label="Lisää uusi rivi"
                primary={true}
                onClick={addAllowanceRow}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const payMileage = (
  showMileageForm,
  addPassengerRow,
  allowancePassenger,
  vehicleTypeItems,
  vehicleAdditionalItems,
  showAdditionalInfo,
  showAdditionalVehicleInfo
) =>
  !showMileageForm ? null : (
    <div className="dashboard-content-header">
      <div className="col-xs-6 col-sm-6 col-lg-6">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Kilometrikorvaukset</h3>
          </div>
          <div className="panel-body">
            <div>
              <Field
                name="distance"
                component={renderTextField}
                label="Ajoreitin pituus (km)"
                style={{ float: 'left', width: '50%' }}
              />
              <Field
                name="license_plate"
                component={renderTextField}
                style={{ float: 'left', width: '50%' }}
                label="Ajoneuvon rekisterinumero"
              />
              <Field
                name="vehicle_type"
                component={SelectField}
                style={{ float: 'left', width: '100%' }}
                floatingLabelText="Ajoneuvon tyyppi"
                onChange={value => {
                  showAdditionalVehicleInfo(value['0'])
                }}
              >
                {vehicleTypeItems}
              </Field>
            </div>
            <div>
              {/*there must be hidden block to prevent table vanishing when additional info is not shown*/}
              {!showAdditionalInfo ? (
                <div style={{ visibility: 'hidden' }}>hidden block</div>
              ) : (
                additionalInfo(vehicleAdditionalItems)
              )}
            </div>
            <div>
              <div className="dashboard-invoice-add">
                <Table selectable={false}>
                  <TableHeader
                    adjustForCheckbox={false}
                    displaySelectAll={false}
                  >
                    <TableRow className="dashboard-invoice-inputrow">
                      <TableHeaderColumn>Matkustajat</TableHeaderColumn>
                      <TableHeaderColumn />
                    </TableRow>
                  </TableHeader>
                  <TableBody displayRowCheckbox={false}>
                    {allowancePassenger}
                  </TableBody>
                </Table>
                <RaisedButton
                  label="Lisää matkustaja"
                  primary={true}
                  onClick={addPassengerRow}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

const additionalInfo = vehicleAdditionalItems => (
  <div>
    <Field
      name="additional_vehicle_cost"
      component={SelectField}
      style={{ float: 'left', width: '100%' }}
      floatingLabelText="Lisävalinnat"
    >
      {vehicleAdditionalItems}
    </Field>
    <Field
      name="heavy_load"
      label="Kuljetettu raskasta kuormaa"
      component={renderCheckbox}
    />
    <Field
      name="forest_trail"
      label="Ajettu metsäautotiellä"
      component={renderCheckbox}
    />
    <Field
      name="working_dog"
      label="Kuljetettu työkoiraa"
      component={renderCheckbox}
    />
  </div>
)

const payAllowance = (
  showAllowanceForm,
  //dayItems,
  //selectAllowanceDays,
  allowanceDaysFull,
  allowanceDaysPart,
  allowanceDaysMeal
) =>
  !showAllowanceForm ? null : (
    <div className="dashboard-content-header">
      <div className="col-xs-6 col-sm-6 col-lg-6">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Päivä- ja ruokarahat</h3>
          </div>
          <div className="panel-body">
            <div>
              <Field
                name="full_time_allowance"
                component={SelectField}
                floatingLabelText="Kokopäiväraha"
                style={{ float: 'left', width: '100%' }}
              >
                {allowanceDaysFull}
              </Field>
              <Field
                name="part_time_allowance"
                component={SelectField}
                style={{ float: 'left', width: '100%' }}
                floatingLabelText="Osapäiväraha"
              >
                {allowanceDaysPart}
              </Field>
              <Field
                name="meal_allowance"
                component={SelectField}
                style={{ float: 'left', width: '100%' }}
                floatingLabelText="Ateriakorvaus"
              >
                {allowanceDaysMeal}
              </Field>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

const submitButton = (
  invalid,
  isEdit,
  cancelAllowanceUpdate,
  saveAllowanceUpdate,
  saveTravellingExpense,
  submitting
) => (
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
                      cancelAllowanceUpdate()
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
                        store.dispatch(saveAllowanceUpdate())
                      }}
                    />
                  )}
                </li>
              </ul>
            ) : (
              <div className="pull-right">
                {invalid ? (
                  <RaisedButton
                    label="Hyväksy matkakorvaus"
                    primary={true}
                    type="submit"
                  />
                ) : (
                  <RaisedButton
                    label="Hyväksy matkakorvaus"
                    primary={true}
                    type="submit"
                    disabled={submitting}
                    onClick={saveTravellingExpense}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
)
import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {
  renderTextField,
  renderRadioButtonGroup,
  renderCheckbox
} from '../../utils/wrappers'
import { Field } from 'redux-form'
import { MenuItem, RadioButton, RaisedButton } from 'material-ui'
import { SelectField } from 'redux-form-material-ui'

class Yel extends React.Component {
  componentWillMount() {
    this.props.getYelStart()
  }

  render() {
    return <YelComponent {...this.props} />
  }
}

const _onFormSubmit = () => {
  return false
}

//const YelComponent = ({ showYel, showFirstTimer, postYelStart, income, selectedYelGroup, showYelCounter, handleSubmit}) =>
const YelComponent = ({ showFirstTimer, postYelStart, handleSubmit }) => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <div>
      <form onSubmit={handleSubmit(_onFormSubmit)}>
        <div className="container-fluid">
          <div className="row">
            <div className="dashboard-content-header">
              <div className="col-xs-12 col-sm-6 col-lg-6">
                <div className="panel panel-default">
                  <div className="panel-heading">Määritä YEL</div>
                  <div className="panel-body">
                    {/*  <Field name="income"
                           style={{'verticalAlign': 'bottom'}}
                           label="Arvioi vuotuiset työtulosi"
                           component={renderTextField}/>
                    <Field name="ageGroup"
                           component={SelectField}
                           style={{'verticalAlign': 'bottom'}}
                           floatingLabelText="Valitse ikäsi">
                      <MenuItem key={1} value={18} primaryText={'18-52 vuotias'}/>
                      <MenuItem key={2} value={53} primaryText={'53-62 vuotias'}/>
                      <MenuItem key={3} value={63} primaryText={'63-67 vuotias'}/>
                    </Field>
                    {showYel &&
                      <Field name="yelSelect"
                             defaultSelected="payByMyself"
                             component={renderRadioButtonGroup}>
                        <RadioButton
                          value="payByMyself"
                          label="Maksan YEL-vakuutuksen itse"
                        />
                        <RadioButton
                          value="payByDefaults"
                          label={'Kassavirtanen maksaa YEL-vakuutusta puolestasi ' + income + ' euron palkkasumman mukaan'}
                        />
                      </Field>

                    }
                    {showFirstTimer &&
                      <Field
                        name="firstTimeEntrepreneur"
                        label="Olen toiminut yrittäjänä alle neljä vuotta"
                        component={renderCheckbox}
                      />
                    } */}
                    {/*  <div>
                      { showYelCounter && !!selectedYelGroup && showFirstTimer &&
                      <p className="dashboard-tax-yel">
                        {'YEL-vakuutus: ' +
                          (!!selectedYelGroup.discounted_percent ?
                          selectedYelGroup.discounted_percent :
                          selectedYelGroup.value) +
                          ' prosenttia bruttopalkasta'}
                          </p>
                        } */}                        

                    <Field
                      name="yelSelect"
                      defaultSelected="yel_self"
                      component={renderRadioButtonGroup}
                    >
                      <RadioButton
                        value="yel_self"
                        label="Maksan YEL-vakuutuksen itse"
                      />
                      <RadioButton
                        value="yel_recommended"
                        label={'Maksetaan YEL-vakuutus lailla'}
                      />
                      <RadioButton
                        value="yel_minimum"
                        label={'Maksa minimi YEL-vakuutuksen (7656,26 Euro)'}
                      />
                    </Field>
                    {showFirstTimer && (
                      <div>
                        <Field
                          name="firsttime_enterprenuer"
                          label="Olen toiminut yrittäjänä alle neljä vuotta"
                          component={renderCheckbox}
                        />
                        <Field
                          name="yel_income"
                          style={{ verticalAlign: 'bottom' }}
                          label="Arvioi vuotuiset työtulosi"
                          component={renderTextField}
                        />
                        <Field
                          name="age_group"
                          component={SelectField}
                          style={{ verticalAlign: 'bottom' }}
                          floatingLabelText="Valitse ikäsi"
                        >
                          <MenuItem
                            key={1}
                            value={'18-52 vuotias'}
                            primaryText={'18-52 vuotias'}
                          />
                          <MenuItem
                            key={2}
                            value={'53-62 vuotias'}
                            primaryText={'53-62 vuotias'}
                          />
                          <MenuItem
                            key={3}
                            value={'63-67 vuotias'}
                            primaryText={'63-67 vuotias'}
                          />
                        </Field>
                      </div>
                    )}
                    <div>
                      <RaisedButton
                        label="Päivitä YEL-tiedot"
                        primary={true}
                        type="submit"
                        onClick={postYelStart}
                        className="pull-right"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </MuiThemeProvider>
)

export default Yel

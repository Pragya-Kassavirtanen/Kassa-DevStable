import { connect } from 'react-redux'

import Salary from '../../components/salary/salary.component'

import {
  getSalariesStart,
  getSalaryTaxPercentageSuccess,
  getSalaryInfo,
  salaryPageChange
} from '../../actions'

const mapStateToProps = state => {
  return {
    state,
    salaryRows: state.salary.salaryRows,
    salaryPages: !!state.salary.allSalaries
      ? Math.ceil(state.salary.allSalaries.length / 10)
      : 0,
    id: state.salary.newSalaryInfo.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    getSalariesStart: () => dispatch(getSalariesStart()),
    getSalaryTaxPercentageSuccess: resultParsed =>
      dispatch(getSalaryTaxPercentageSuccess(resultParsed)),
    getSalaryInfo: id => dispatch(getSalaryInfo(id)),
    salaryPageChange: selected => dispatch(salaryPageChange(selected))
  }
}

const SalaryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Salary)

export default SalaryContainer

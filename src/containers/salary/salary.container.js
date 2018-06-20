import { connect } from 'react-redux'

import Salary from '../../components/salary/salary.component'

import {
    getSalariesStart,
    getSalaryTaxPercentageSuccess
} from '../../actions'

const mapStateToProps = state => {
    return {
        state,
        salaryRows: state.salary.salaryRows        
    }
}

const mapDispatchToProps = dispatch => {
    return {
      dispatch,
      getSalariesStart: () => dispatch(getSalariesStart()),     
      getSalaryTaxPercentageSuccess: (resultParsed) => dispatch(getSalaryTaxPercentageSuccess(resultParsed))
    }
}

const SalaryContainer = connect(mapStateToProps, mapDispatchToProps)(Salary)

export default SalaryContainer

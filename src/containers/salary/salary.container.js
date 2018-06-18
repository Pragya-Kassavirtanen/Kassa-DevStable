import { connect } from 'react-redux'

import Salary from '../../components/salary/salary.component'

import {
    getSalariesStart
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
      getSalariesStart: () => dispatch(getSalariesStart())
    }
}

const SalaryContainer = connect(mapStateToProps, mapDispatchToProps)(Salary)

export default SalaryContainer

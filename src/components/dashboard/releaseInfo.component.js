import React from 'react'
import ReactPaginate from 'react-paginate'
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
  TableHeader,
  TableHeaderColumn,
  Divider
} from 'material-ui'
import { formatDateAndTime } from '../../utils/dashboard.utils'

export default class ReleaseInfoComponent extends React.Component {
  render() {
    return <ReleaseInfo {...this.props} />
  }
}

const ReleaseInfo = (
  releaseInfoSearchRows,
  selected,
  releaseInfoSearchPages,
  releaseInfoSearchPageChange
) => (
  <div className="col-xs-9 col-sm-9 col-lg-9">
    <div className="panel panel-default">
      <div className="panel-body">
        <Table selectable={false}>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>Julkaisupäivä</TableHeaderColumn>
              <TableHeaderColumn>Julkaisu</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {createReleaseInfoRow(releaseInfoSearchRows, selected)}
          </TableBody>
        </Table>
        <Divider />
        <ReactPaginate
          previousLabel={<i className="fa fa-chevron-left" />}
          nextLabel={<i className="fa fa-chevron-right" />}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={releaseInfoSearchPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={releaseInfoSearchPageChange}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
    </div>
  </div>
)

const createReleaseInfoRow = (releaseInfoSearchRows, selected) =>
  {
    return releaseInfoSearchRows.slice(selected * 10, selected * 10 + 10).map(el => (<TableRow selectable={false} key={el.id}>
      <TableRowColumn>
        <b>{formatDateAndTime(el.created)}</b>
      </TableRowColumn>
      <TableRowColumn>
        <b>{el.newsupdate}</b>
      </TableRowColumn>
    </TableRow>))
  }
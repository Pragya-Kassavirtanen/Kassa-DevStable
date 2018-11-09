import React from 'react'
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
  TableHeader,
  TableHeaderColumn,
  Divider
} from 'material-ui'
import ReactPaginate from 'react-paginate'
import { formatDateAndTime } from '../../utils/dashboard.utils'

export default class ReleaseInfoComponent extends React.Component {
  render() {
    return <ReleaseInfo {...this.props} />
  }
}

const ReleaseInfo = ({
  releaseInfoSearchRows,
  selected,
  releaseInfoSearchPages,
  releaseInfoSearchPageChange
}) => (    
     <div className="panel-body">    
      <Table selectable={false}>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn style={{width: '25%'}}>Julkaisupäivä</TableHeaderColumn>
            <TableHeaderColumn style={{width: '75%'}}>Julkaisu</TableHeaderColumn>
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
)

const createReleaseInfoRow = (releaseInfoSearchRows, selected) => {
  return releaseInfoSearchRows
    .slice(selected * 10, selected * 10 + 10)
    .map(el => (
      <TableRow selectable={false} key={el.id}>
        <TableRowColumn style={{width: '25%'}}>
          {formatDateAndTime(el.created)}
        </TableRowColumn>
        <TableRowColumn style={{width: '75%', whiteSpace: 'normal', wordWrap: 'break-word'}}>
          <span>{el.newsupdate}</span>
        </TableRowColumn>
      </TableRow>
    ))
}
import { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Table, {
  TableBody,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  TableCell,
} from 'material-ui/Table';
import PROJECTS_PAGE_SIZE from '../../utils/constants';

const columns = [
  { label: 'Project' },
  {
    label: 'Summary',
  },
  { label: 'Tag' },
  {
    label: 'Assignee',
  },
  {
    label: 'Last Updated',
  },
];
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    width: '100%',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  summary: {
    whiteSpace: 'nowrap',
  },
});

class BugsTable extends Component {
  state = {
    order: 'desc',
    orderBy: 'Last Updated',
    data: [
      {
        project: 'Servo',
        summary: '1436212 - Add pagination to listClients',
        tag: 'JS',
        assignee: 'None',
        lastUpdated: '2018-05-20',
      },
      {
        project: 'Taskcluster',
        summary:
          '1443017 - Use a mock AWS library to test publishing API definitions',
        tag: 'JS',
        assignee: 'None',
        lastUpdated: '2018-05-14',
      },
      {
        project: 'Servo',
        summary: '1443016 - Create a fake version of azure-blob-storage',
        tag: 'JS',
        assignee: 'None',
        lastUpdated: '2018-05-12',
      },
      {
        project: 'Servo',
        summary: '1441960 - Add measure of time to start processing a task',
        tag: 'JS',
        assignee: 'None',
        lastUpdated: '2018-05-06',
      },
      {
        project: 'Taskcluster',
        summary:
          '1451548 - Return 404 for indexes and namespaces that are expired',
        tag: 'JS',
        assignee: 'None',
        lastUpdated: '2018-05-04',
      },
      {
        project: 'Taskcluster',
        summary:
          '1441977 - Run tests for taskcluster-treeherder in Taskcluster',
        tag: 'JS',
        assignee: 'None',
        lastUpdated: '2018-05-03',
      },
      {
        project: 'Servo',
        summary: '1446768 - Only post "No taskcluster jobs.." to a PR once',
        tag: 'JS',
        assignee: 'None',
        lastUpdated: '2018-05-01',
      },
      {
        project: 'Taskcluster',
        summary:
          '1457126 - Authorization failures should state which clientId lacks scopes',
        tag: 'Rust',
        assignee: 'None',
        lastUpdated: '2018-04-05',
      },
      {
        project: 'Taskcluster',
        summary: '44 - Add pagination to auth.listRoles',
        tag: 'JS',
        assignee: 'None',
        lastUpdated: '2018-03-05',
      },
      {
        project: 'Taskcluster',
        summary:
          '1306494 - Add a diff+commit submit button to some text areas in tc-tools',
        tag: 'JS',
        assignee: 'None',
        lastUpdated: '2018-02-12',
      },
      {
        project: 'Taskcluster',
        summary:
          '333 - Make azure-entities and azure-blob0-storage independent of tc-lib-monitor',
        tag: 'JS',
        assignee: 'None',
        lastUpdated: '2018-02-04',
      },
      {
        project: 'Taskcluster',
        summary: '1344912 - Support tag events, too',
        tag: 'JS',
        assignee: 'None',
        lastUpdated: '2018-01-01',
      },
      {
        project: 'Taskcluster',
        summary: '1453714 - Return http 424 instead of 403 for error artifacts',
        tag: 'Python',
        assignee: 'None',
        lastUpdated: '2017-12-04',
      },
    ].sort((a, b) => (a.lastUpdated > b.lastUpdated ? -1 : 1)),
    page: 0,
    rowsPerPage: PROJECTS_PAGE_SIZE,
  };

  createSortHandler = property => event => {
    this.handleRequestSort(event, property);
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const data =
      order === 'desc'
        ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({ data, order, orderBy });
  };

  handlePageChange = (event, page) => {
    this.setState({ page });
  };

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, rowsPerPage, page } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell
                    key={column.label}
                    sortDirection={orderBy === column.label ? order : false}>
                    <TableSortLabel
                      active={orderBy === column.label}
                      direction={order}
                      onClick={this.createSortHandler(column.label)}>
                      {column.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(item => (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={`${item.project}-${item.summary}`}>
                    <TableCell component="th" scope="row">
                      {item.project}
                    </TableCell>
                    <TableCell className={classes.summary}>
                      {item.summary}
                    </TableCell>
                    <TableCell>{item.tag}</TableCell>
                    <TableCell>{item.assignee}</TableCell>
                    <TableCell>{item.lastUpdated}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={PROJECTS_PAGE_SIZE}
          rowsPerPageOptions={[PROJECTS_PAGE_SIZE]}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handlePageChange}
        />
      </div>
    );
  }
}

export default withStyles(styles)(BugsTable);

import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import styled from 'styled-components';
import { executionService } from '../services';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';

function createData(percent) {
  return { percent };
}

const LineBreak = styled.div`
  width: 100%;
  height: 30px;
`;

const rows = [
  createData(4.0),
  createData(4.3),
  createData(6.0),
  createData(4.3),
  createData(3.9),
];

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = async () => {
    let progress = await executionService.getProgress();
    this.setState({ progress });
  };

  getColor = (v) => {
    if (v > 50) return "green";
    if (v < 30) return "red";
    return "black";
  }

  render() {
    return (
      <div>
      <LineBreak />
      <Typography variant="h5">
        Your progress pas week progress
      </Typography>
      <LineBreak />
      <Paper>
      <Table >
        <TableHead>
          <TableRow>
            <TableCell>Habit</TableCell>
            {Array.apply(null, { length: 7 }).map(Number.call, Number).reverse().map((i) => {
              return <TableCell align="right">{moment().subtract(i, 'days').format("DD MM YYYY")}</TableCell>
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.progress && this.state.progress.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right" style={{ color: this.getColor(row.percent[0])}}>{row.percent[0] + '%'}</TableCell>
              <TableCell align="right" style={{ color: this.getColor(row.percent[1])}}>{row.percent[1] + '%'}</TableCell>
              <TableCell align="right" style={{ color: this.getColor(row.percent[2])}}>{row.percent[2] + '%'}</TableCell>
              <TableCell align="right" style={{ color: this.getColor(row.percent[3])}}>{row.percent[3] + '%'}</TableCell>
              <TableCell align="right" style={{ color: this.getColor(row.percent[4])}}>{row.percent[4] + '%'}</TableCell>
              <TableCell align="right" style={{ color: this.getColor(row.percent[5])}}>{row.percent[5] + '%'}</TableCell>
              <TableCell align="right" style={{ color: this.getColor(row.percent[6])}}>{row.percent[6] + '%'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </Paper>
      </div>
    );
  }
}

export default Results;
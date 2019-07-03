import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import styled from 'styled-components';
import AddProgress from './AddProgress'
import Results from './Results'

const LayoutWrapper = styled.div`
  width: 70%;
  height: 1300px;
  padding: 40px;
  margin: 0 auto;
  box-shadow: 0px 2px 40px 0 rgba(0, 0, 0, 0.1);
`;

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    }
  }

  handleTabChange = (e, v) => {
    const prevState = this.state;
    this.setState({ ...prevState, value: v });
  }

  render() {
    return (
      <LayoutWrapper>
        <div>
          <AppBar position="static">
            <Tabs value={this.state.value} onChange={this.handleTabChange}>
              <Tab label="Track progress" />
              <Tab label="Analytics" />
              <Tab label="Activity log" />
            </Tabs>
          </AppBar>
          {this.state.value === 0 && <AddProgress />}
          {this.state.value === 1 && <Results/>}
          {this.state.value === 2 && <Typography variant="h5">
          Track your habit progress
        </Typography>}
        </div>

      </LayoutWrapper>
    )
  }
}
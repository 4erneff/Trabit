import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { authActions } from '../actions';

const NavigationList = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
  margin: 0;
  padding: 12px;
`;

const NavigationItem = styled.li`
  margin: 4px 8px;
  ${props => props.grow ?
    `flex-grow: ${props.grow}` :
    ''
  };
  > a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
  }
`;

const Input = styled.input`
  width: 100%;
  border: none;
  font-size: 14px;
`;

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  onLogout = async (e) => {
    let result = await authActions.logout();
    this.props.dispatch(result);
  }

  render() {
    return (
      <nav style={{'line-height': '40px', 'font-size': '20px'}}>
        <NavigationList>
            <NavigationItem>
              <Link to="/">Trabit</Link>
            </NavigationItem>
          {this.props.auth.loggedIn &&
            <NavigationItem>
            <Link to="/dashboard">Dashboard</Link>
            </NavigationItem>}
          {this.props.auth.loggedIn &&
            <NavigationItem>
              <Link to="/habits">Habits</Link>
            </NavigationItem>}
          {this.props.auth.loggedIn ?
            < NavigationItem >
              <Link to="/" onClick={this.onLogout}>Log out</Link>
            </NavigationItem> :
            <NavigationItem>
              <Link to="/login">Login</Link>
            </NavigationItem>}
          {!this.props.auth.loggedIn &&
            <NavigationItem>
              <Link to="/register">Register</Link>
            </NavigationItem>}
          </NavigationList>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
})
export default connect(mapStateToProps)(Navigation)
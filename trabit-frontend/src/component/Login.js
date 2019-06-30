import React, { Component } from 'react';
import { connect } from 'react-redux'
import styled, { ThemeProvider } from 'styled-components';
import TextInputField from './common/TextInputField';
import PrimaryButton from './common/Button';
import authConsts from '../constants/auth';
import { authActions } from '../actions';

const LoginForm = styled.form`
  max-width: 420px;
  padding: 24px;
  margin: 0 auto;
  box-shadow: 0px 2px 40px 0 rgba(0, 0, 0, 0.1);
`;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  handleChange = (e) => {
    const { name, value} = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    let username = this.state.username;
    let password = this.state.password;

    let result = await authActions.login(username, password, this.props.history.push);
    if (result.type === authConsts.LOGIN_SUCCESS) {
      this.props.dispatch(result);
      this.props.history.push('/');
    } else {
      this.setState({error: result.error.message})
    }
  }

  render() {
    return (
      <LoginForm onSubmit={this.handleSubmit}>
        <TextInputField
          label="Username"
          name="username"
          onChange={this.handleChange}
          value={this.state.username}
        />
        <TextInputField
          label="Password"
          onChange={this.handleChange}
          name="password"
          type="password"
          value={this.state.password}
        />
        <PrimaryButton disabled={this.state.loading}>
          Login
        </PrimaryButton>
        {this.state.error &&
          // <SubtleErrorBox label={this.state.error} />
          <p>{this.state.error}</p>
        }
      </LoginForm>
    );
  }
}

export default connect()(Login)
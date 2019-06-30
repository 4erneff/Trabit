import React, { Component } from 'react';
import { connect } from 'react-redux'
import styled, { ThemeProvider } from 'styled-components';
import TextInputField from './common/TextInputField';
import PrimaryButton from './common/Button';
import authConsts from '../constants/auth';
import { authActions } from '../actions';

const RegistrationForm = styled.form`
  max-width: 420px;
  padding: 24px;
  margin: 0 auto;
  box-shadow: 0px 2px 40px 0 rgba(0, 0, 0, 0.1);
`;

const SubtleErrorBox = styled.div`
  margin-top: 12px;
  padding: 24px;
  box-shadow: 0px 2px 40px 0 rgba(0, 0, 0, 0.1);
  > p {
    opacity: 0.5;
  }
`;

class Register extends Component {
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
    let email = this.state.email;

    let result = await authActions.register(username, password, email);
    if (result.type === authConsts.REGISTER_SUCCESS) {
      this.props.dispatch(result);
      this.props.history.push('/login');
    } else {
      this.setState({error: result.error.message})
    }
  }

  render() {
    return (
      <RegistrationForm onSubmit={this.handleSubmit}>
        <TextInputField
          label="Username"
          name="username"
          onChange={this.handleChange}
          value={this.state.username}
        />
        <TextInputField
          label="Password"
          name="password"
          type="password"
          onChange={this.handleChange}
          value={this.state.password}
        />
        <TextInputField
          label="Email"
          name="email"
          onChange={this.handleChange}
          type="email"
          value={this.state.email}
        />
        <PrimaryButton disabled={this.state.loading}>
          Register
        </PrimaryButton>
        {this.state.error &&
          <SubtleErrorBox label={this.state.error}>
            <p>{this.state.error}</p>
          </SubtleErrorBox>
        }
      </RegistrationForm>
    );
  }
}

export default connect()(Register)
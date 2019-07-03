import React, { Component } from 'react';
import { connect } from 'react-redux'
import authConsts from '../constants/auth';
import { authActions } from '../actions';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value)
    let newState = { ...this.state };
    newState[name] = value;
    this.setState(newState);
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
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div >
          <Avatar >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form  noValidate onSubmit={this.handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              onChange={this.handleChange}
              value={this.state.username}
              label="Username"
              name="username"
              autoFocus
              inputProps={{
                autocomplete: "off",
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={this.handleChange}
              value={this.state.password}
              autoComplete="current-password"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="email"
              label="Email"
              type="email"
              id="email"
              onChange={this.handleChange}
              value={this.state.email}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Sign Up
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}

export default connect()(Register)
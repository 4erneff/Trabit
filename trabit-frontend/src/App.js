import React from 'react';
import { Provider } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import './App.css';
import theme from './theme';
import {
  Route,
  Switch,
  withRouter
} from 'react-router-dom';
import { store } from './store'
import Landing from './component/Landing';
import Dashboard from './component/Dashboard';
import Navigation from './component/Navigation';
import Login from './component/Login';
import Register from './component/Register';
import HabitList from './component/Habits';
import UpsertHabit from './component/UpsertHabit';


function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Navigation></Navigation>
          <Switch>
            <Route
              exact
              path="/"
              component={Landing}
            />
            <Route
              exact
              path="/dashboard"
              component={Dashboard}
            />
            <Route
              exact
              path="/habits"
              component={HabitList}
            />
            <Route
              exact
              path="/habits/:habitId"
              component={UpsertHabit}
            />
            <Route
              exact
              path="/login"
              component={Login}
            />
            <Route
              exact
              path="/register"
              component={Register}
            />
          </Switch>
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import moment from 'moment';
import habitConstants from '../constants/habit';
import { habitActions } from '../actions';
import PropTypes from "prop-types";
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import './AddProgress.css';
import { height } from '@material-ui/system';

const HeaderWrapper = styled.div`
  padding: 30px;
`;

const LineBreak = styled.div`
  padding: 30px;
`;

class AddProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: Date.now(),
      habit: {
        habits: [
          { 'name': "habit 1", 'id': 1 },
          { 'name': "habit 2", 'id': 2 },
        ]
      }
    }
  }

  componentDidMount = async () => {
    if (this.props.habit.habits.length > 0) return;
    let result = await habitActions.retrieveAll();
    if (result.type === habitConstants.RETRIEVE_ALL_SUCCESS) {
      this.props.dispatch(result);
    }
  };

  handleChange = (e) => {
    const value = e.target.value;
    let newState = { ...this.state }
    newState.date = moment(value).format('YYYY-MM-DD');
    this.setState(newState);
  }

  onHabitSelect = (habitName) => {
    let newState = { ...this.state }
    console.log(habitName)
    const selected = this.props.habit.habits.find((habit => habitName === habit.name))
    newState.selectedHabit = selected;
    this.setState(newState);
  }

  render() {
    return (
      <div>
        <HeaderWrapper>
        <Typography variant="h5">
          Track your habit progress for
        </Typography>
        </HeaderWrapper>
        <TextField
          label="Date"
          type="date"
          name="date"
          onChange={this.handleChange}
          value={moment(this.state.date).format('YYYY-MM-DD')}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Autocomplete
          suggestions={this.props.habit.habits.map((habit) => habit.name)}
          onSelect={this.onHabitSelect}
        />
        <LineBreak />
        {!this.state.selectedHabit ? <Typography variant="h6">
          No habit selected!
        </Typography>:<AddProgressItem habit={this.state.selectedHabit}></AddProgressItem>}
      </div>
     );
  }
}

class AddProgressItem extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() {
    return (
      <div>
        {this.props.habit.progressType == 1 ? <div>
          <Typography variant="h6" style={{ 'line-height': '4'}}>
            How many {this.props.habit.unit} of {this.props.habit.action} have you done?
            <TextField
              style={{ margin: 8}}
              margin="normal"
              variant="filled"
              name="target"
            />
            <Button variant="contained" color="primary">
              Submit
            </Button>
          </Typography>
        </div> : <div>
          <Typography variant="h6">
            Add execution of {this.props.habit.action}
            <Button variant="contained" color="primary">
              Submit
            </Button>
          </Typography>
        </div>}
      </div>
    );
  }
}


const mapStateToProps = state => ({
  habit: state.habit,
})
export default connect(mapStateToProps)(AddProgress)

class Autocomplete extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array)
  };

  static defaultProps = {
    suggestions: []
  };

  constructor(props) {
    super(props);

    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: ""
    };
  }

  // Event fired when the input value is changed
  onChange = e => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;

    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    // Update the user input and filtered suggestions, reset the active
    // suggestion and make sure the suggestions are shown
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
    this.props.onSelect(e.currentTarget.value);
  };

  // Event fired when the user clicks on a suggestion
  onClick = e => {
    // Update the user input and reset the rest of the state
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
    this.props.onSelect(e.currentTarget.innerText);
  };

  // Event fired when the user presses a key down
  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    // User pressed the enter key, update the input and close the
    // suggestions
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
      this.props.onSelect(filteredSuggestions[activeSuggestion]);
    }
    // User pressed the up arrow, decrement the index
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul class="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }

              return (
                <li
                  className={className}
                  key={suggestion}
                  onClick={onClick}
                >
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div class="no-suggestions">
            <em>No suggestions, you're on your own!</em>
          </div>
        );
      }
    }

    return (
      <form onSubmit={e => { e.preventDefault();}}>
      <Fragment
      >
        <TextField
          label="Search for habit"
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          variant="filled"
          onChange={onChange}
          onKeyDown={onKeyDown}
          name="info"
          value={this.state.userInput}
          inputProps={{
            autocomplete: "off",
          }}
        />
        {suggestionsListComponent}
        </Fragment>
      </form>
    );
  }
}
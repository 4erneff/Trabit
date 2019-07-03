import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import PrimaryButton from './common/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import { habitActions } from '../actions';
import habitConstants from '../constants/habit';

const CreateHabitForm = styled.form`
  width: 700px;
  padding: 40px;
  margin: 0 auto;
  box-shadow: 0px 2px 40px 0 rgba(0, 0, 0, 0.1);
`;

const SelectWrapper = styled.div`
  padding: 12px;
`


class UpsertHabit extends Component {
  constructor(props) {
    super(props);
    let isEdit = false;
    let habit = {
      type: 0,
      period: 0,
      compare: 0,
    }
    if (this.props.match.params.habitId !== "0") {
      const habitId = this.props.match.params.habitId;
      habit = this.props.habit.habits.filter((habit) => habit.id == habitId)[0];
      isEdit = true;
      console.log(habit)
    }
    this.state = {
      habit,
      isEdit,
      classes: {
        root: {
          display: 'flex',
          flexWrap: 'wrap',
        },
        formControl: {
          margin: 8,
          minWidth: 120,
        },
        selectEmpty: {
          marginTop: 8,
        }
      },
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    let newState = { ...this.state }
    newState.habit[name] = value
    this.setState(newState);
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const action = this.state.isEdit ? habitActions.edit : habitActions.create;
    let result = await action(this.state.habit);
    if (result.type.indexOf("SUCCESS") != -1) {
      this.props.dispatch(result);
      this.props.history.push('/habits');
    } else {
      this.setState({error: result.error.message})
    }
  }

  render() {
    return (
      <CreateHabitForm onSubmit={this.handleSubmit}>
        <Typography variant="h6">
          {this.state.isEdit ? "Edit habit" : "Create new habit"}
        </Typography>
        <TextField
          label="Habit name"
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          variant="filled"
          onChange={this.handleChange}
          name="name"
          value={this.state.habit.name}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Habit description"
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          variant="filled"
          onChange={this.handleChange}
          name="desc"
          value={this.state.habit.desc}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Action"
          style={{ margin: 8 }}
          fullWidth
          disabled={this.state.isEdit}
          margin="normal"
          variant="filled"
          name="action"
          onChange={this.handleChange}
          value={this.state.habit.action}
        />
        <SelectWrapper>
        <FormControl fullWidth classKey="marginDense">
        <Select
          disabled={this.state.isEdit}
          value={this.state.habit.type}
          onChange={this.handleChange}
          inputProps={{
            name: 'type',
          }}
          >
          <MenuItem value={0}>Select progress type</MenuItem>
          <MenuItem value={1}>Sum</MenuItem>
          <MenuItem value={2}>Rate</MenuItem>
        </Select>
          </FormControl>
          </SelectWrapper>
        <SelectWrapper>
        <FormControl fullWidth classKey="marginDense">
        <Select
          value={this.state.habit.compare}
          onChange={this.handleChange}
          disabled={this.state.isEdit}
          inputProps={{
            name: 'compare',
          }}
          >
            <MenuItem value={0}>Select progress compare</MenuItem>
            <MenuItem value={2}>At least</MenuItem>
            <MenuItem value={1}>Less than</MenuItem>
        </Select>
        </FormControl>
        </SelectWrapper>
        <TextField
          label="Target value"
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          variant="filled"
          name="target"
          onChange={this.handleChange}
          value={this.state.habit.target}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Units"
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          variant="filled"
          name="unit"
          onChange={this.handleChange}
          value={this.state.habit.unit}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <SelectWrapper>
        <FormControl fullWidth classKey="marginDense">
        <Select
          value={this.state.habit.period}
          onChange={this.handleChange}
          inputProps={{
            name: 'period',
          }}
          >
          <MenuItem value={0}>Select period</MenuItem>
          <MenuItem value={1}>Daily</MenuItem>
          <MenuItem value={2}>Weekly</MenuItem>
          <MenuItem value={3}>Monthly</MenuItem>
          <MenuItem value={4}>Annually</MenuItem>
        </Select>
        </FormControl>
        </SelectWrapper>
        <PrimaryButton>
          Done
        </PrimaryButton>
      </CreateHabitForm>
    );
  }
}

const mapStateToProps = state => ({
  habit: state.habit,
})
export default connect(mapStateToProps)(UpsertHabit)
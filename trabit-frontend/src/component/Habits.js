import React, { Component } from 'react';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import Build from '@material-ui/icons/Build';
import Delete from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import habitConstants from '../constants/habit';
import styled from 'styled-components';
import { habitActions } from '../actions';
import './Habits.css';

const AddBtn = styled.div`
  float: right;
  padding-right: 10px;
`;

const GridWrapper = styled.div`
  width: 700px;
  padding: 40px;
  margin: 0 auto;
  height: 1300px;
  box-shadow: 0px 2px 40px 0 rgba(0, 0, 0, 0.1);
`


class HabitList extends Component{
  constructor(props) {
    super(props);
    this.state = {
      'habits': [],
      'open': false,
    }
  }

  componentDidMount = async () => {
    if (this.props.habit.habits.length > 0) return;
    let result = await habitActions.retrieveAll();
    if (result.type === habitConstants.RETRIEVE_ALL_SUCCESS) {
      this.props.dispatch(result);
    }
  };

  onEdit = (habit) => {
    this.props.history.push('/habits/'+ habit.id);
  }

  onDelete = async (habit) => {
    let result = await habitActions.deleteHabit(habit);
    if (result.type === habitConstants.DELETE_SUCCESS) {
      this.props.dispatch(result);
    }
  }

  handleAddHabit = () => {
    this.props.history.push('/habits/0');
  }

  render() {
    return (
      <GridWrapper>
        <Typography variant="h6">
          Manage your habits
        </Typography>
      <Grid item xs={12} md={6}>
        <div>
          <List>
            {this.props.habit.habits && this.props.habit.habits.map(habit =>
              <HabitListItem habit={habit} onEdit={this.onEdit} onDelete={this.onDelete}/>
             )}
          </List>
        </div>
        <AddBtn>
          <Fab color="primary" size="small"  aria-label="Add" onClick={() => this.handleAddHabit()}>
            <AddIcon />
          </Fab>
        </AddBtn>
      </Grid>
      </GridWrapper>
    );
  }

}
const mapStateToProps = state => ({
  habit: state.habit,
})
export default connect(mapStateToProps)(HabitList)

class HabitListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() {
    return (
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <FolderIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={this.props.habit.name}
        />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="Edit" onClick={() => this.props.onEdit(this.props.habit)}>
            <Build />
          </IconButton>
          <IconButton edge="end" aria-label="Delete" onClick={() => this.props.onDelete(this.props.habit)}>
            <Delete />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    )
  }
}
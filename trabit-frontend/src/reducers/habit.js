import habitConstants from '../constants/habit';

let initialState = {
  habits: [],
}

const habit = (state = initialState, action) => {
  switch (action.type) {
    case habitConstants.RETRIEVE_ALL_SUCCESS:
      return {
        habits: action.habits
      };
    case habitConstants.CREATE_SUCCESS:
      return {
        habits: [...state.habits, action.habit]
      }
    case habitConstants.EDIT_SUCCESS:
      let newHabits = state.habits.map((habit) => {
        if (habit.id === action.habit.id) {
          return action.habit;
        }
        return habit;
      })
      return {
        habits: newHabits
      };
    case habitConstants.DELETE_SUCCESS:
      newHabits = state.habits.filter((habit) => habit != action.habit);
      return {
        habits: newHabits
      };
    default:
      return state;
  }
}

export default habit
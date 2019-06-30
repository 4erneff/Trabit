import habitConstants from '../constants/habit';
import { habitService } from '../services';

export const habitActions = {
  retrieveAll,
  create,
  edit,
  deleteHabit
};

async function retrieveAll() {
  try {
    let habits = await habitService.retrieveAll()
    return success(habits);
  } catch(err) {
    return failure(err);
  }

  function success(habits) { return { type: habitConstants.RETRIEVE_ALL_SUCCESS, habits } }
  function failure(error) { return { type: habitConstants.RETRIEVE_ALL_ERROR, error } }
}

async function create(habit) {
  try {
    await habitService.create(habit)
    return success(habit);
  } catch(err) {
    return failure(err);
  }

  function success(habit) { return { type: habitConstants.CREATE_SUCCESS, habit } }
  function failure(error) { return { type: habitConstants.RETRIEVE_ALL_ERROR, error } }
}

async function edit(habit) {
  try {
    await habitService.edit(habit)
    return success(habit);
  } catch(err) {
    return failure(err);
  }

  function success(habit) { return { type: habitConstants.EDIT_SUCCESS, habit } }
  function failure(error) { return { type: habitConstants.RETRIEVE_ALL_ERROR, error } }
}

async function deleteHabit(habit) {
  try {
    await habitService.deleteHabit(habit)
    return success(habit);
  } catch(err) {
    return failure(err);
  }

  function success(habit) { return { type: habitConstants.DELETE_SUCCESS, habit } }
  function failure(error) { return { type: habitConstants.RETRIEVE_ALL_ERROR, error } }
}
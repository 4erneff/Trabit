async function retrieveAll(username, password) {
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
  };
  // TODO: call backend
  return [
    { 'name': "habit 1", 'id': 1, 'action': 'reading'},
    { 'name': "habit 2", 'id': 2, progressType: 1, action: "running", unit: "laps"},
    { 'name': "habit baba", 'id': 3 },
    { 'name': "habit dyado", 'id': 4 },
  ]
}

async function create(habit) {
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify({ username, password })
  };
  // TODO: call backend
  return true;
}

async function edit(habit) {
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify({ username, password })
  };
  // TODO: call backend
  return habit;
}

async function deleteHabit(habit) {
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify({ username, password })
  };
  // TODO: call backend
  return true;
}

export const habitService = {
  retrieveAll,
  create,
  edit,
  deleteHabit
};
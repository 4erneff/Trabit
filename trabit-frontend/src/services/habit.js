async function retrieveAll() {
  const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'token': window.localStorage.getItem('token') },
  };
  try {
    var res = await fetch(`http://localhost:8080/habits/`, requestOptions).then(handleResponse);
    return res.habits;
  } catch (err) {
    console.log(err)
  }
}

function handleResponse(response) {
  return response.text().then(text => {
      const data = text && JSON.parse(text);
      return data;
  });
}


async function create(habit) {
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'token': window.localStorage.getItem('token') },
      body: JSON.stringify({ habit})
  };

  const res = await fetch(`http://localhost:8080/habits/`, requestOptions).then(handleResponse);
  if (!res.success) {
    throw new Error(res.err);
  }
  return res.habit;
}

async function edit(habit) {
  const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'token': window.localStorage.getItem('token') },
      body: JSON.stringify({ habit})
  };

  const res = await fetch(`http://localhost:8080/habits/`, requestOptions).then(handleResponse);
  if (!res.success) {
    throw new Error(res.err);
  }
  console.log(res.habit)
  return res.habit;
}

async function deleteHabit(habit) {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', 'token': window.localStorage.getItem('token') },
    body: JSON.stringify({ habit})
  };

  const res = await fetch(`http://localhost:8080/habits/`, requestOptions).then(handleResponse);
  if (!res.success) {
    throw new Error(res.err);
  }
  return habit;
}

export const habitService = {
  retrieveAll,
  create,
  edit,
  deleteHabit
};
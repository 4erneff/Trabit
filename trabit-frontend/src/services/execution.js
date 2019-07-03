async function add(execution) {
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'token': window.localStorage.getItem('token') },
      body: JSON.stringify({ execution })
  };
  var res = await fetch(`http://localhost:8080/execution`, requestOptions).then(handleResponse);
  console.log(res);
  if (!res.success) {
    throw new Error("Invalid execution");
  }
  return res.execution;
}

async function getProgress() {
  const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'token': window.localStorage.getItem('token') },
  };
  var res = await fetch(`http://localhost:8080/execution/weeklyprogress`, requestOptions).then(handleResponse);
  console.log(res);
  return res.progress;
}

function handleResponse(response) {
  return response.text().then(text => {
      const data = text && JSON.parse(text);
      return data;
  });
}

export const executionService = {
  add,
  getProgress,
};
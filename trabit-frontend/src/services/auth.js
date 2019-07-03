async function login(name, password) {
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, password })
  };
  var res = await fetch(`http://localhost:8080/users/login`, requestOptions).then(handleResponse);
  console.log(res);
  if (!res.success) {
    throw new Error("Invalid username or password");
  }
  window.localStorage.setItem('token', res.user.token);
  return res.user;
}

async function register(name, password, email) {
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, password, email })
  };
  var res = await fetch(`http://localhost:8080/users/register`, requestOptions).then(handleResponse);
  if (!res.success) {
    throw new Error("User already exists!");
  }
  return true;
}

function logout() {
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({'token': window.localStorage.getItem('token')})
  };
  fetch(`http://localhost:8080/users/logout`, requestOptions);
}

function handleResponse(response) {
  return response.text().then(text => {
      const data = text && JSON.parse(text);
      return data;
  });
}

export const authService = {
  login,
  register,
  logout
};
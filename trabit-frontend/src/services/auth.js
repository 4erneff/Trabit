async function login(username, password) {
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
  };
  // TODO: call backend
  if (username === 'bb' && password === 'bb'){
    return { 'name': 'ivobb' }
  } else {
    throw new Error("Wrong credentials");
  }

  // return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
  //     .then(handleResponse)
  //     .then(user => {
  //         // store user details and jwt token in local storage to keep user logged in between page refreshes
  //         localStorage.setItem('user', JSON.stringify(user));

  //         return user;
  //     });
}

async function register(username, password, email) {
  if (username === 'bb') {
    throw new Error("User already exists");
  } else {
    return { 'success': true };
  }
}

export const authService = {
  login,
  register
};
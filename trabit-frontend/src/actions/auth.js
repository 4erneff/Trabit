import authConstants from '../constants/auth';
import { authService } from '../services';

export const authActions = {
  login,
  register,
  logout
};

async function login(username, password) {
  try {
    let user = await authService.login(username, password);
    if (user) {
      return success(user);
    }
  } catch(err) {
    return failure(err);
  }

  function success(user) { return { type: authConstants.LOGIN_SUCCESS, user } }
  function failure(error) { return { type: authConstants.LOGIN_FAILURE, error } }
}

async function register(username, password, email) {
  try {
    let user = await authService.register(username, password, email)
    return success(user);
  } catch(err) {
    return failure(err);
  }

  function success(user) { return { type: authConstants.REGISTER_SUCCESS, user } }
  function failure(error) { return { type: authConstants.REGISTER_FAILURE, error } }
}

async function logout() {
  authService.logout();
  return {type: authConstants.LOGOUT}
}
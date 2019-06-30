import authConstants from '../constants/auth';

let initialState = {}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case authConstants.LOGIN_SUCCESS:
      console.log(state);
      return {
        loggedIn: true
      };
    case authConstants.LOGOUT:
      return {};
    default:
      return state
  }
}

export default auth
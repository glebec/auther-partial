import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

const SET = 'SET_CURRENT_USER';
const REMOVE = 'REMOVE_CURRENT_USER';

/* ------------   ACTION CREATORS     ------------------ */

const set = user => ({ type: SET, user });
const unset = () => ({ type: REMOVE });

/* ------------       REDUCER     ------------------ */

export default function reducer (currentUser = null, action) {
  switch (action.type) {
    case SET:
      return action.user;
    default:
      return currentUser;
  }
}

/* ------------       DISPATCHERS     ------------------ */

export const login = credentials => dispatch => {
  return axios.post('/api/auth/login', credentials)
  .then(res => dispatch(set(res.data)))
  .catch(err => console.error('Login unsuccesful', err));
};

export const signup = credentials => dispatch => {
  return axios.post('/api/auth/signup', credentials)
  .then(res => dispatch(set(res.data)))
  .catch(err => console.error('Signup unsuccesful', err));
};

export const logout = () => dispatch => {
  return axios.get('/api/auth/logout')
  .then(res => dispatch(unset()))
  .catch(err => console.error('Logout unsuccesful', err));
};

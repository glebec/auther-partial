import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

const SET = 'SET_CURRENT_USER';

/* ------------   ACTION CREATORS     ------------------ */

const set = user => ({ type: SET, user });

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

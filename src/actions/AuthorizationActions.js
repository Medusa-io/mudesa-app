import axios from 'axios';
import { GET_AUTHORIZATIONS_SUCCESS } from './ActionTypes';

const getAuthorizationsSuccess = (payload, dispatch) => dispatch({
  type: GET_AUTHORIZATIONS_SUCCESS,
  payload,
});

export const getAuthorizations = () => async (dispatch) => {
  try {
    const { data } = await axios.get('authorization');
    getAuthorizationsSuccess(data, dispatch);
  } catch (err) {
    throw err;
  }
};

export const x = 0;

import axios from 'axios';
import { AsyncStorage } from 'react-native';

import { LOGIN_SUCCESS } from './ActionTypes';
import { setApiToken } from '../config/api';
import { sleep } from '../utils/general';

const SESSION_KEY = 'session1-key';
const TOKEN_KEY = 'token-key';
const SLEEP_TIME = 3000;

const success = dispatch => dispatch({ type: LOGIN_SUCCESS });

const setToken = async (token) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (err) {
    throw err;
  }
};

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    return token;
  } catch (err) {
    throw err;
  }
};

export const login = (form, { navigate }) => async (dispatch) => {
  try {
    const { data } = await axios.post('authenticate', form);
    await AsyncStorage.setItem(SESSION_KEY, 'yes');
    await setToken(data.token);
    setApiToken(data.token);
    success(dispatch);
    navigate('UserMain');
  } catch (err) {
    throw err;
  }
};

export const signUp = (form, { navigate }) => async (dispatch) => {
  try {
    await axios.post('user', form);
    await login(form, { navigate })(dispatch);
  } catch (err) {
    throw err;
  }
};

export const checkSession = ({ navigate }) => async () => {
  try {
    await sleep(SLEEP_TIME);
    const value = await AsyncStorage.getItem(SESSION_KEY);

    if (value === 'yes') {
      const token = await getToken();
      await setApiToken(token);
      navigate('UserMain');
    } else {
      navigate('SignIn');
    }
  } catch (err) {
    throw err;
  }
};

export const logout = () => { };

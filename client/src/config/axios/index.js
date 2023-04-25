import axios from 'axios';
import { BASE_URL } from '@/constants';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const axiosInstancePrivate = axios.create({
  baseURL: BASE_URL,
});

export const fetchRequest = request => success => failed => dispatch => {
  axiosInstance({
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
    withCredentials: false,
    ...request,
  })
    .then(async response => {
      dispatch(success({ ...response.data }));
    })
    .catch(error => {
      if (error.response) {
        dispatch(failed({ ...error.response }));
      } else {
        dispatch(failed({ error: error?.message }));
      }
    });
};

export const fetchRequestWithToken =
  request => success => failed => async dispatch => {
    axiosInstancePrivate({
      method: 'GET',
      headers: {
        'Content-type': request.contentType
          ? request.contentType
          : 'application/json',
      },
      withCredentials: false,
      ...request,
    })
      .then(async response => {
        dispatch(success({ response: response.data }));
      })
      .catch(error => {
        if (error.response) {
          dispatch(failed({ error: error?.response.data }));
        } else {
          dispatch(failed({ error: error?.message }));
        }
      });
  };


import axios from 'axios';
// import { API_ROOT } from '../config';

import {
  OFFERS,
  FETCH_CUSTOMER_DETAILS,
  ERRORS,
  LOADER_ON,
} from '../constants/index';

import { toast } from 'react-toastify';

var headerAxiosConfig = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

export function offersUpdateVehicleNo(postData, history) {
  console.log('postDATA', postData);
  let request = axios.post(
    `http://10.0.7.219:9095/api/v2/updateCustMembershipData`,

    //QA URL
    // `http://10.0.7.219:9099/api/v2/updateCustMembershipData`,

    postData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
      },
    },

    { token: localStorage.getItem('auth_token') },
    headerAxiosConfig
  );

  return (dispatch) => {
    request
      .then(({ data }) => {
        // data.responseMessage = 'Membership Already Exist';
        dispatch({ type: OFFERS, payload: data });
        toast.success('Vehicle number registered successfully', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log('data data  ==== ', data);
      })
      .catch((error) => {
        dispatch({
          type: ERRORS,
          payload: error.response.data.responseMessage,
        });
        toast.error('Please reload the page', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log('errors bhim', error.response.data.responseMessage);
      });
  };
}

export function offersGetCustomerData(postData) {
  let request = axios.post(
    `http://10.0.7.219:8085/api/v1/motorclub/checkCustomer`,
    postData,
    headerAxiosConfig
  );
  console.log('offer postdata', postData);

  return (dispatch) => {
    dispatch({
      type: LOADER_ON,
      payload: true,
    });
    request
      .then(({ data }) => {
        console.log('offer data', data);
        dispatch({ type: FETCH_CUSTOMER_DETAILS, payload: data });
      })
      .then(() => {
        setTimeout(() => {
          dispatch({
            type: LOADER_ON,
            payload: false,
          });
        }, 500);
      })
      .catch((err) => {
        dispatch({
          type: LOADER_ON,
          payload: false,
        });
        dispatch({
          type: FETCH_CUSTOMER_DETAILS,
          payload: err.response && err.response.data ? err.response.data : '',
        });
      });
  };
}


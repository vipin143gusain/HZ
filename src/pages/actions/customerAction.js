import axios from 'axios';

import { toast } from 'react-toastify';

import {
  AUTH_LOGIN,
  REGISTER,
  LOADER_ON,
  FETCH_CUSTOMER_DETAILS,
  REGISTER_MC,
  UPDATE_MC_DETAIL
} from '../constants';

const API_BASE_URL = `https://fgngapi.futuregroup.in/api/v1`;
const GET_MEM_DETAIL = "https://fgngapi.futuregroup.in/preprod-motorclub/api/v1/getCustMembershipData"
const API_REGISTER_MC = "https://fgngapi.futuregroup.in/preprod-motorclub/api/v1/FGnGCustRegisteration";
const API_UPDATE_CUST= "https://fgngapi.futuregroup.in/preprod-motorclub/api/v1/updateCustMembershipData";


var headerAxiosConfig = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

const API = axios.create({baseURL:API_BASE_URL});

export const getCust = (custMobileNo,auth)=>async(dispatch)=>{

  try {
    const {data} = await API.post(`${GET_MEM_DETAIL}`,{
      sellerid:203,custMobileNo,membershipType:1,authenticated:1
    })
    dispatch({type:FETCH_CUSTOMER_DETAILS, payload:data})
  } catch (error) {
    console.log(error.message)
  }
}

export const registerCust = (history,custMobileNo,
          firstName,
          lastName,
          vehicleNum,
          vehicleNum2,
          vehicleNum3,
          )=>async(dispatch)=>{

            let vStr=vehicleNum;
            if(vehicleNum&&vehicleNum2){
              vStr=`${vehicleNum},${vehicleNum2}`
            }
            if(vehicleNum&&vehicleNum2&&vehicleNum3){
              vStr=`${vehicleNum},${vehicleNum2},${vehicleNum3}`
            }
     
  try {
    const {data} = await API.post(`${API_REGISTER_MC}`,{
      sellerId:203,
      custMobileNo,
      custFirstName:firstName,
      custLastName:lastName,
      vehRegNumber:vStr,
      membershipType:1,
      termVersion:"1.0",
      policyVersion:"1.0",
      consentSigned:1,
      channelid:2
    })

    console.log(data.membershipDetails);
    
    dispatch({type:REGISTER_MC, payload:data});
    console.log("session saved in action");
    history.push('/motor-club/offers');
    
  } catch (error) {
    console.log(error.response,error.message)
    toast.error("Something went wrong, please try again",{
      position: "top-right",
      autoClose: 1500,
      progress: undefined,
    })
    
  }
}

export const updateCustDetails=(membershipId,custMobileNum,vehRegNum2,vehRegNum3)=>async(dispatch)=>{

  try {

    const {data} = await API.post(`${API_UPDATE_CUST}`,{
      sellerid:203,
      membershipid:membershipId,
      custmobileno:custMobileNum,
      membershipType:1,
      vehregNumber2:vehRegNum2,
      vehregNumber3:vehRegNum3
    }) 
    dispatch({type:UPDATE_MC_DETAIL, payload:data});
  } catch (error) {
    console.log('error updating cust details');
    
  }

}


export const registerCustHZ=(history,custMobileNo,
  firstName,
  lastName,
  dob,prodId)=>async(dispatch)=>{

  try {
    const {data} = API.post(`${API_BASE_URL}/hellozindagi/registerLead`,{
        sellerId:203,
        custMobileNo,
        custFirstName:firstName,
        custLastName:lastName,
        custDOB:dob,
        platformprodid:prodId,
        leadsource: 2
    })
    
  } catch (error) {
    console.log('error registering cust for HZ');
  }
}


/*

//JWT Login - Get Token - Validate JWT Token and decrypt by JWE in express end
export function authLogin(postData) {
  let request = axios.post(
    `http://10.0.7.219:8085/api/v1/motorclub/registerCustomer`,
    postData,
    headerAxiosConfig
  );

  return (dispatch) => {
    dispatch({
      type: LOADER_ON,
      payload: true,
    });
    request
      .then(({ data }) => {
        console.log('then', data);
        dispatch({ type: AUTH_LOGIN, payload: data });
      })
      .then(() => {
        setTimeout(() => {
          dispatch({
            type: LOADER_ON,
            payload: false,
          });
        }, 1000);
      })
      .catch((err) => {
        dispatch({
          type: LOADER_ON,
          payload: false,
        });
        // console.log('err', err.response.data);
        dispatch({
          type: AUTH_LOGIN,
          payload: err.response && err.response.data ? err.response.data : '',
        });
      });
  };
}

export function registerAction(postData, history) {
  // console.log('postDATA', postData);
  let request = axios.post(
    `http://10.0.7.219:8085/api/v1/motorclub/registerCustomer`,

    //QA URL
    // `http://10.0.7.219:9099/api/v2/FGnGCustRegisteration`,

    postData,
    // {
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
    //   },
    // },

    // { token: localStorage.getItem('auth_token') },
    // headerAxiosConfig
  );

  return (dispatch) => {
    request
      .then(({ data }) => {
        console.log('then', data);
        data.responseMessage = 'Membership Already Exist';
        dispatch({ type: REGISTER, payload: data });
        history.push('congratulation');
      })
      .catch((err) => {
        console.log('err', err.response.data);
        dispatch({ type: REGISTER, payload: err.response.data });
      });
  };
}
*/
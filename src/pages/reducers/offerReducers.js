import {
  OFFERS,
  FETCH_CUSTOMER_DETAILS,
  ERRORS,
  LOADER_ON,
  FILTER_CATEGORY,
  FILTER_VEHICLE,
  FILTER_BRAND,
  FETCH_OFFERS,
  LOGOUT,
  REGISTER_MC,
  UPDATE_MC_DETAIL
} from '../constants/index';

const INITIAL_STATE = {
  offers: [],

  responseMsg: '',

  filteredOffers:[],

  customer: {},

  errorMsgExceedLimint: '',

  modal: false,
  isLoading: false,
};
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = INITIAL_STATE, action) {
  
  switch (action.type) {
    case OFFERS:
      return {
        ...state,
        offers: action.payload,
        responseMsg: action.payload.responseMessage,
        modal: false,
      };

    case FETCH_CUSTOMER_DETAILS:
      let custData = {
        firstName:action.payload.membershipdetails.custfirstname,
        lastName:action.payload.membershipdetails.custlastname,
        membershipId:action.payload.membershipdetails.membershipid,
        mobileNumber:action.payload.membershipdetails.custmobileno
      }
      sessionStorage.setItem('cust',JSON.stringify(custData));
      console.log("session saved in reducer");
      
      return { ...state, customer: action.payload };

    
    case REGISTER_MC:
      console.log("register mc reducer started")
      let custmc = {
        firstName:action.payload.membershipDetails.custfirstname,
        lastName:action.payload.membershipDetails.custlastname,
        membershipId:action.payload.membershipDetails.membershipid,
        mobileNumber:action.payload.membershipDetails.custmobileno
      }
      sessionStorage.setItem('cust',JSON.stringify(custmc));
      return { ...state, customer: action.payload }

    case UPDATE_MC_DETAIL:
      return {...state,
        customer:{...state.customer,membershipdetails:action.payload} }

    case LOGOUT:
      return {...state,customer:{}}

    case ERRORS:
      return { ...state, errorMsgExceedLimint: action.payload };

    case LOADER_ON:
      return { ...state, isLoading: action.payload };

      case FETCH_OFFERS:
        return{
          ...state,
          offers:action.payload,
          filteredOffers:action.payload
        }
    case FILTER_CATEGORY:

      const categoryFilter = state.filteredOffers.filter(elem=>elem.category===action.payload);
      
    return {
      ...state,
      filteredOffers:categoryFilter
    }
    case FILTER_VEHICLE:
        const vehicleFilter = state.filteredOffers.filter(elem=>elem.vehicle===action.payload);
       
        return {
        ...state,
        filteredOffers:vehicleFilter
      }

    case FILTER_BRAND:
        const brandFilter = state.filteredOffers.filter(elem=>elem.brand===action.payload);
        return {
        ...state,
        filteredOffers:brandFilter
      }

    default:
      return state;
  }
}

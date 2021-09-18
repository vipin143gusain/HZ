import React, { useState, useEffect } from 'react';
import {
  Link,
  useLocation,useHistory
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {FETCH_CUSTOMER_DETAILS } from '../pages/constants/index'
import {debounce} from 'lodash';
import {useFormik} from 'formik'
import {toast,ToastContainer} from 'react-toastify';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import OtpInput from 'react-otp-input';
import axios from 'axios';
import Timer from '../components/Timer';
import logo1 from '../assets/images/logo1.png';
import { REGISTER } from '../pages/constants/index';
import otpGenerator from 'otp-generator';

import McLogo from '../assets/images/mcPageImg/mcLogo.png';


import jsonData from '../config.json';
// const API_BASE_URL = `http://10.0.7.219:7570/`;
// const API_BASE_URL = `http://10.0.7.219:8085/`;
const API_BASE_URL = `https://fgngapi.futuregroup.in/api/v1`;



const prodObj = {
  'cyber-protect': {
    title: 'Cyber Protect',
    img: 'hacker.svg',
    prodId: 10
  },
  'laptop-insurance': {
    title: 'Laptop Insurance',
    img: 'laptop-insu.svg',
    prodId: 3
  },
  'tv-insurance': {
    title: 'TV Insurance',
    img: 'entertainment.png',
    prodId: 2
  },
  'bike-insurance': {
    title: 'Bike Insurance',
    img: 'bike.svg',
    prodId: 5
  },
  'car-insurance': {
    title: 'Car Insurance',
    img: 'car_insu.svg',
    prodId: 6
  },
  'personal-accident-insurance': {
    title: 'Personal Accident Insurance',
    img: 'accident.svg',
    prodId: 8
  },
  'health-insurance': {
    title: 'Health Insurance',
    img: 'health.svg',
    prodId: 9
  },
  'motor-club': {
    title: 'The Motor Club',
    img: 'motor-club-text.svg',
    prodId: 7
  },
  'super-benefits': {
    title: 'Super Benefits',
    img: 'unlock-icon.svg',
    prodId: 11
  },
};


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const RedCheckbox = withStyles({
  root: {
    color: '#f239398c',
    '&$checked': {
      color: '#F23939',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

function Registration() {
  const history = useHistory();
  const memDetails = useSelector(state=>state.offerReducer.customer);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues:{
      firstName:'',
      lastName:'',
      vehicleNum:'',
      vehicleNum2:'',
      vehicleNum3: '',
      terms:false,
      dob:'',
      mobileNumber:'',
      otp:''
    }
  });

  let query = useQuery();
  let product = query.get("product");
  let prodId = prodObj[product].prodId;
  // console.log(prodId);
  // console.log(product);

  let initFields = {
    firstName: '',
    lastName: '',
    vehicleNum: '',
    vehicleNum2: '',
    vehicleNum3: '',
    dob: ''
  };
  let initFieldErrors = {
    firstName: '',
    lastName: '',
    vehicleNum: '',
    vehicleNum2:'',
    vehicleNum3:'',
    dob: '',
    mobileNumber:null,
    otp:'',
    terms:''
  }

  const [activeCard, setActiveCard] = useState(1);
  const [mobNumber, setMobNumber] = useState('');
  const [otpValue, setOtpValue] = useState('');
  const [fields, setFields] = useState(initFields);
  const [fieldErrors, setFieldErrors] = useState(initFieldErrors);
  const [isError, setIsError] = useState(true);
  const [state, setState] = useState({
    terms: false,
  });
  const [custDetail, setCustDetail] = useState(null);
  
  // const [resendDisabled, setResendDisabled] = useState(true);
  const [timeValue, setTimeValue] = useState(30);
  const [totalVehicle, setTotalVehicle] = useState(1);

  const [appConstants, setAppConstants] = useState({});
  const [smsUniqueCode, setSmsUniqueCode] = useState(0);

  

  const onChangeMobile = (event) => {
    // console.log(event.target.value);
    setMobNumber(event.target.value);
    const mobileRegex = /^[7-9][0-9]{9}/;
    const mobileRegex2 = /^(.)\1{9}$/;
    let mobile = event.target.value;
    let result= mobileRegex.test(mobile);
    if(mobileRegex2.test(mobile)){
      result=false
    }    
    handleDebounce(result,'mobileNumber',"Please enter a Valid Mobile number");
        
  }

  const handleDebounce=debounce((result,fieldName,message)=>{
    
    if(!result){
      setFieldErrors({...fieldErrors,[`${fieldName}`]:message});
      setIsError(true)
    }else{
      setFieldErrors({...fieldErrors,[`${fieldName}`]:''});
    }
    
  },500)

  const verifyBtn = (event) => {
    event.preventDefault();
    // console.log(mobNumber);
    if (mobNumber) {
      let mobileRegx = /^[6-9]\d{9}$/;
      if (mobileRegx.test(mobNumber)) {
        // proceed api call
        // console.log('valid number');

        let req = {};
        let reqURL = '';
        const reqURLMOTOR = `${API_BASE_URL}/getCustMembershipData`;
        const reqURLHZ = `${API_BASE_URL}/hellozindagi/checkLead`;
        if (product === 'motor-club') {
          reqURL = reqURLMOTOR;
          req = {
            sellerid: appConstants.sellerId,
            custMobileNo: mobNumber,
            membershipType: appConstants.membershipType
          };
        } else {
          reqURL = reqURLHZ;
          req = {
            custMobileNo: mobNumber,
            platformprodid: prodId
          }
        }

        axios({
          method: 'post',
          url: reqURL,
          data: req
        })
          .then(res => {
            // console.log(res);
            // console.log(res.data.responseCode);
            // setActiveCard(activeCard + 1);

            if (res.data.responseCode === "200" || res.data.responseMessage === "SUCCESS" || res.data.status === "SUCCESS") {
              if (product === 'motor-club') {
               // sendTheSMS()
              //  setActiveCard(activeCard+1);
               setActiveCard(3);
               setCustDetail(res.data);
               dispatch({ type: FETCH_CUSTOMER_DETAILS, payload: res.data })
              //  history.push('/offers');
                // setActiveCard(15);
              } else {
                setActiveCard(10);
              }

            } else {
              // console.log('success else')
              // setActiveCard(activeCard + 1);
              // sendTheSMS();
            }
          })
          .catch(function (error) {
            if (error.response) {
              // Request made and server responded
              // console.log(error.response);
              // console.log(error.response.status);
              // console.log(error.response.headers);

              if (error.response.data.responseCode === '404' || error.response.data.status === 'FAIL') {
                // 
                // setActiveCard(activeCard + 1);
                // console.log('catch block')
                sendTheSMS();
              }
            } else if (error.request) {
              // The request was made but no response was received
              // console.log(error.request);
              genericError();
            } else {
              // Something happened in setting up the request that triggered an Error
              // console.log('Error', error.message);
              genericError();
            }

          });

        // setActiveCard(activeCard + 1);
      } else {
        alert('Please enter a valid mobile number');
      }
    } else {
      alert('Please enter mobile number');
    }


  }

  const sendTheSMS = (resend) => {
    const otp = otpGenerator.generate(4, {digits:true, upperCase: false, specialChars: false,alphabets:false });

    let reqURL = '';
    let req = {};
    reqURL = `${API_BASE_URL}/smsgateway/sendOtp`;
  console.log(otp);
    req = {  
      mobile_number: mobNumber,
      app_code: "2",
      otp_code: otp,
    sms_body: `Your OTP Verification Code is ${otp}. Do not share it with anyone - Hello Zindagi`,
    sender_id: "HELOZN"
    };

    axios({
      method: 'post',
      url: reqURL,
      data: req
    })
      .then(res => {
        // console.log(res.data.responseCode);
        // setActiveCard(activeCard + 1);

        if (res.data.responseCode === "200" || res.data.responseMessage === "SUCCESS" || res.data.status === "SUCCESS") {
          setSmsUniqueCode(res.data.responseObject.unique_code);
          if (!resend) {
            setActiveCard(activeCard + 1);
          }

        } else {
          // setActiveCard(activeCard + 1);
          genericError();
        }
      })
      .catch(function (error) {
        if (error.response) {
          // Request made and server responded
          // console.log(error.response.data);
          // console.log(error.response.status);
          // console.log(error.response.headers);

          if (error.response.data.responseCode === '404' || error.response.data.status === 'FAIL') {
            // 
            // setActiveCard(activeCard + 1);
          }
        } else if (error.request) {
          // The request was made but no response was received
          // console.log(error.request);
          genericError();
        } else {
          // Something happened in setting up the request that triggered an Error
          // console.log('Error', error.message);
          genericError();
        }

      });

  }

  const handleChange = (val) => {
    // console.log(val);
    setOtpValue(val);
  }

  const otpNextBtn = (event) => {
    event.preventDefault();
    // console.log(otpValue);
    // console.log(otpValue.length);
    if (otpValue.length === 4) {

      let reqURL = '';
      let req = {};
      reqURL = `${API_BASE_URL}/smsgateway/validateOtp`;
      req = {
        mobile_number: mobNumber,
        unique_code: smsUniqueCode,
        otp_string: otpValue
      };

      axios({
        method: 'post',
        url: reqURL,
        data: req
      })
        .then(res => {
          // console.log(res);
          // console.log(res.data.responseCode);
          // setActiveCard(activeCard + 1);

          if (res.data.responseCode === "200" || res.data.responseMessage === "SUCCESS" || res.data.status === "SUCCESS") {
            // if(product === 'motor-club') {
            //   setActiveCard(15);
            // } else {
            //   setActiveCard(10);
            // }
            if(custDetail) {
              dispatch({ type: FETCH_CUSTOMER_DETAILS, payload: custDetail })
              history.push('/offers',custDetail);
            } else{
              setActiveCard(activeCard + 1);
            }
            handleDebounce(true,"otp","Invalid OTP")

          } else {
            // setActiveCard(activeCard + 1);
            // genericError();
          }
        })
        .catch(function (error) {
          if (error.response) {
            // Request made and server responded
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
            setFieldErrors({...fieldErrors,otp:"Invalid OTP"})

            if (error.response.data.responseCode === '404' || error.response.data.status === 'FAIL' || error.response.data.status === 'FAILURE') {
              // 
              // setActiveCard(activeCard + 1);
              if (error.response.data.responseCode === "OTP VALIDATION FAILED") {
                // alert(error.response.data.responseCode);
              } else {
                // genericError();
              }
            }
          } else if (error.request) {
            // The request was made but no response was received
            // console.log(error.request);
            genericError();
          } else {
            // Something happened in setting up the request that triggered an Error
            // console.log('Error', error.message);
            genericError();
          }

        });

      // setActiveCard(activeCard + 1);

    } else {
      alert('Please enter the 4-digit OTP');
    }

  }

  const resendTheOTP = (event) => {
    event.preventDefault();
    setFieldErrors({...fieldErrors,otp:""})
    setTimeValue(30);
    sendTheSMS(true);
  }

  const fieldChange = (event) => {
    // console.log(event.target.name, event.target.value);
    setFields({ ...fields, [event.target.name]: event.target.value });
    handleRegistrationError(event);
  };

  const handleRegistrationError=(e)=>{
  
    let nameRegex = /^[a-zA-Z ]{2,30}$/;
    // const vehicleNumRegex = /^[A-Za-z]{2}[0-9]{2}/;
    const vehicleNumRegex = /^[A-Za-z]{2}[0-9]{2}[A-Za-z]{1,2}[0-9]{3,4}$/;
    if(e.target.name==="firstName"){
      handleDebounce(nameRegex.test(e.target.value),'firstName',"Please enter a valid first name")
      if(e.target.value==='') handleDebounce(false,'firstName',"Please provide first name")
    }
    if(e.target.name==="lastName"){
      handleDebounce(nameRegex.test(e.target.value),'lastName',"Please enter a valid last name");
      if(e.target.value==='') handleDebounce(false,'lastName',"Please provide last name")
    }
    if(e.target.name==='vehicleNum'){
      handleDebounce(vehicleNumRegex.test(e.target.value),'vehicleNum', 'Please Enter a valid Vehicle number');
      if(e.target.value==='') handleDebounce(false,'vehicleNum',"Please provide vehicle number")
    }
    if(e.target.name==='vehicleNum2'){
      handleDebounce(vehicleNumRegex.test(e.target.value),'vehicleNum2', 'Please Enter a valid Vehicle number');
      if(e.target.value==='') handleDebounce(false,'vehicleNum2',"Please provide vehicle number")
      if(e.target.value===fields.vehicleNum){
        handleDebounce(false,'vehicleNum2',"Duplicate vehicle number")
        toast.error('Duplicate Vehicle Number', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      } 
    }
    if(e.target.name==='vehicleNum3'){
      handleDebounce(vehicleNumRegex.test(e.target.value),'vehicleNum3', 'Please Enter a valid Vehicle number');
      if(e.target.value==='') handleDebounce(false,'vehicleNum3',"Please provide vehicle number");
      if(e.target.value===fields.vehicleNum || e.target.value===fields.vehicleNum2){
        handleDebounce(false,'vehicleNum3',"Duplicate vehicle number");
        toast.error('Duplicate Vehicle Number', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false
          });
      }
    }
    
  }

  const handleError=()=>{
    if(fieldErrors.firstName|| fieldErrors.lastName|| fieldErrors.vehicleNum||
      fieldErrors.vehicleNum2||
      fieldErrors.vehicleNum3||
      fieldErrors.dob||
      fieldErrors.terms){
       setIsError(true);
   } else if(fields.firstName===""||
   fields.lastName===''
   ||fields.vehicleNum===''
   ||fields.vehicleNum2===''
   ||state===false
   ){
     setIsError(true);
   } else{
     setIsError(false);
   }
  }

  

  const checkboxChange = (event) => {
    // console.log(event.target.checked);
    setState({ ...state, [event.target.name]: event.target.checked });
    
    handleDebounce(event.target.checked,'terms','Please accept terms & condition to proceed')
  };

  const addVehicle = (num) => {
    setTotalVehicle(num + 1);
  }

  const submitInfoBtn = (event) => {
    event.preventDefault();
    // console.log(fields);
    // console.log(state.terms);
    let errorExist = false;

    var nameRegex = /^[a-zA-Z ]{2,30}$/;
    const vehicleNumRegex = /^[A-Za-z]{2}[0-9]{2}/;

    // const vehicleNumRegex = /^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$/;
    // const vehicleNumRegex = /^[a-zA-Z]{2}[a-zA-Z0-9]{3,9}$/;
    // const vehicleNumRegex = /(([A-Za-z]){2,3}(|-)(?:[0-9]){1,2}(|-)(?:[A-Za-z]){2}(|-)([0-9]){1,4})|(([A-Za-z]){2,3}(|-)([0-9]){1,4})/;

    let firstNameError = '';
    let lastNameError = '';
    let vehicleNumError = '';
    let dobError = '';

    // Validate first name
    if (fields.firstName === '') {
      // console.log('Please provide first name');
      errorExist = true;
      // setFieldErrors({ ...fieldErrors, firstName: 'Please provide first name' });
      firstNameError = 'Please provide first name';
    } else if (!nameRegex.test(fields.firstName)) {
      // console.log('Please provide a valid first name');
      errorExist = true;
      // setFieldErrors({ ...fieldErrors, firstName: 'Please provide a valid first name' });
      firstNameError = 'Please provide a valid first name';
    }

    // Validate last name
    if (fields.lastName === '') {
      // console.log('Please provide last name');
      errorExist = true;
      // setFieldErrors({ ...fieldErrors, lastName: 'Please provide last name' });
      lastNameError = 'Please provide last name';
    } else if (!nameRegex.test(fields.lastName)) {
      // console.log('Please provide a valid last name');
      errorExist = true;
      // setFieldErrors({ ...fieldErrors, lastName: 'Please provide a valid last name' });
      lastNameError = 'Please provide a valid last name';
    }

    // Validate vehicle number or date of birth 
    // if(product === 'bike-insurance' || product === 'car-insurance' || product === 'motor-club') {
    if (product === 'motor-club') {
      if (fields.vehicleNum || fields.vehicleNum2 || fields.vehicleNum3) {
        if (fields.vehicleNum && !vehicleNumRegex.test(fields.vehicleNum)) {
          errorExist = true;
          vehicleNumError = 'Please provide valid vehicle numbers';
        } else {
          // console.log('correct vehicle num');
        }

        if (fields.vehicleNum2 && !vehicleNumRegex.test(fields.vehicleNum2)) {
          errorExist = true;
          vehicleNumError = 'Please provide valid vehicle numbers';
        } else {
          // console.log('correct vehicle num');
        }

        if (fields.vehicleNum3 && !vehicleNumRegex.test(fields.vehicleNum3)) {
          errorExist = true;
          vehicleNumError = 'Please provide valid vehicle numbers';
        } else {
          // console.log('correct vehicle num');
        }

      } else {
        // console.log('Please provide vehicle number');
        errorExist = true;
        vehicleNumError = 'Please provide vehicle number';
      }
      // if(fields.vehicleNum === '') {
      // console.log('Please provide vehicle number');
      //   errorExist = true;
      //   vehicleNumError = 'Please provide vehicle number';
      // }
    } else {
      if (fields.dob === '') {
        // console.log('Please provide date of birth');
        errorExist = true;
        dobError = 'Please provide date of birth';
      } else {
        // Use Javascript
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
        var yyyy = today.getFullYear();
        if (dd < 10) {
          dd = '0' + dd
        }
        if (mm < 10) {
          mm = '0' + mm
        }

        today = yyyy + '-' + mm + '-' + dd;

        // console.log('comparing');
        if (fields.dob > today) {
          // console.log('compare true');
          errorExist = true;
          dobError = 'Please provide valid date of birth';
        }
      }
    }

    // Validate t & c checkbox
    if (state.terms === false) {
      alert('Please accept Terms & Conditions and Privacy Policy');
      errorExist = true;
    }

    setFieldErrors({
      ...fieldErrors,
      firstName: firstNameError,
      lastName: lastNameError,
      vehicleNum: vehicleNumError,
      dob: dobError
    });

    if (!errorExist) {

      let req = {};
      let reqURL = '';
      const reqURLMOTOR = `http://10.0.7.219:8085/api/v1/motorclub/registerCustomer`;
      const reqURLHZ = `${API_BASE_URL}api/v1/hellozindagi/registerLead`;
      if (product === 'motor-club') {

        let vehRegNumber = [];
        // vehRegNumber.push(fields.vehicleNum);
        if (fields.vehicleNum) {
          vehRegNumber.push(fields.vehicleNum);
        }
        if (fields.vehicleNum2) {
          vehRegNumber.push(fields.vehicleNum2);
        }
        if (fields.vehicleNum3) {
          vehRegNumber.push(fields.vehicleNum3);
        }

        reqURL = reqURLMOTOR;
        req = {
          sellerId: appConstants.sellerId,
          custFirstName: fields.firstName,
          custLastName: fields.lastName,
          custMobileNo: mobNumber,
          // custDOB: fields.dob,
          custDOB: '0000-00-00',
          termVersion: appConstants.termVersion,
          policyVersion: appConstants.policyVersion,
          vehRegNumber: vehRegNumber,
          membershipType: appConstants.membershipType,
          consentSigned: 1,
          chanelid: 2,

          // dispatch(registerAction);
        };

      } else {
        reqURL = reqURLHZ;
        req = {
          sellerid: appConstants.sellerId,
          custFirstName: fields.firstName,
          custLastName: fields.lastName,
          custMobileNo: mobNumber,
          custDOB: fields.dob,
          platformprodid: prodId,
          leadsource: 2
        }
      }


      axios({
        method: 'post',
        url: reqURL,
        data: req
      })
        .then(res => {
          console.log('Registration Response ', res);
          // console.log(res.data.responseCode);
          // setActiveCard(activeCard + 1);

          dispatch({ type: REGISTER, payload: res.data });

          if (res.data.responseCode === "200" || res.data.responseMessage === "SUCCESS" || res.data.status === "SUCCESS") {
            if (product === 'motor-club') {
              setActiveCard(4);
            } else {
              setActiveCard(5);
            }

          } else {
            // setActiveCard(activeCard + 1);
          }
        })
        .catch(function (error) {
          if (error.response) {
            // Request made and server responded
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);

            if (error.response.data.responseCode === '404') {
              // 
              // setActiveCard(activeCard + 1);
              genericError();
            }
          } else if (error.request) {
            // The request was made but no response was received
            // console.log(error.request);
            genericError();
          } else {
            // Something happened in setting up the request that triggered an Error
            // console.log('Error', error.message);
            genericError();
          }

        });

      // setActiveCard(activeCard + 1);
    }


  }

  const genericError = () => {
    alert('Something went wrong. Please try again after some time.');
  }

  const alreadyLogin=()=>{
    const custStoredData = JSON.parse(sessionStorage.getItem('cust'));
    if(custStoredData){
      setActiveCard(3)
    }
  
  }

  const loadData = () => JSON.parse(JSON.stringify(jsonData));
  useEffect(() => {
    const constData = loadData();
    alreadyLogin();
    // console.log(constData);
    const mcc = constData.mcConstants;
    handleError();
    setAppConstants({
      ...fields,
      sellerId: mcc.sellerId,
      termVersion: mcc.termVersion,
      policyVersion: mcc.policyVersion,
      membershipType: mcc.membershipType
    });
  }, [fieldErrors])


  return (
    <Grid container className="reg-main-con">
      <ToastContainer/>
      {activeCard !== 3 &&
        <Grid item md={6} className={`reg-left-con ${product === 'motor-club' ? 'bluish-bg' : null}`}>
          <div className="reg-title">
            <Link to="/">
              {
                product === 'motor-club'
                  ? <img alt="" src={logo1} />
                  : <img alt="" src={logo1} />
              }
            </Link>
          </div>
          <div className="title-block">

            {
              product === 'super-benefits' &&
              <div className="unlock-text1">Unlock the</div>
            }

            {
              product === 'motor-club'
                ? activeCard !== 3 &&
                <img alt="" src={require("../assets/images/motor-club-banner.jpg").default} className="" />
                :
                <>
                  <div className={`reg-prod-name ${product === 'motor-club' ? 'white-text' : null}`}>{prodObj[product].title}</div>
                  <div className={`reg-img-con ${product === 'super-benefits' ? 'reg-img-unlock' : null}`}>
                    <img alt="" src={require(`../assets/images/${prodObj[product].img}`).default} />
                  </div>
                </>
            }



            {/* <div className={`reg-prod-name ${product === 'motor-club' ? 'white-text' : null}`}>{prodObj[product].title}</div>
          <div className={`reg-img-con ${product === 'super-benefits' ? 'reg-img-unlock' : null}`}>
            <img alt="" src={require(`../assets/images/${prodObj[product].img}`).default} />
          </div> */}
          </div>
        </Grid>}

      <Grid item md={activeCard !== 3 ? 6 : 12} xs={12} className={`reg-right-con ${activeCard === 3 ? 'right-con-card3' : null}`}>
        <div className="right-block-con">

          {
            activeCard === 1 &&
            <div>
              <div className="reg-helper-text">Enter mobile number and login</div>
              <div className="reg-input-con mob-input">
                <input type="text" placeholder="" maxLength="10" name="mobileNumber" value={mobNumber} onChange={onChangeMobile} />
                <div className="country-code">+91</div>
                <div className="reg-red-btn" style={fieldErrors.mobileNumber||mobNumber==''?{backgroundColor:'#f23939a8'}:null} onClick={!fieldErrors.mobileNumber?verifyBtn:null}>Verify</div>
                <div className="field-err-text">{fieldErrors.mobileNumber}</div>
              </div>
            </div>
          }

          {
            activeCard === 2 &&
            <div>
              <div className="reg-helper-text">We sent OTP code to verify your number</div>
              <div className="reg-input-con otp-input-con">
                <OtpInput
                  value={otpValue}
                  onChange={(val) => handleChange(val)}
                  numInputs={4}
                  isInputNum={true}
                  separator={<span></span>}
                  containerStyle={'otp-container'}
                />
                <div className={otpValue.length<4?'reg-red-btn-disabled':'reg-red-btn'}
                  onClick={otpValue.length<4?null:otpNextBtn}>Next</div>
              </div>

              <div className={`resend-otp-btn ${timeValue === 0 ? null : 'disable-btn'}`} onClick={resendTheOTP}>Resend OTP</div>
              <div className="field-err-text">{fieldErrors.otp}</div>
              <div className="timer-con"><Timer initialSeconds={30} timeValue={timeValue} setTimeValue={setTimeValue} /></div>
            </div>
          }


        </div>

        {
          activeCard === 3 &&
          <>
            <img className="mcLogoCss" src={McLogo} alt="Motor Club Logo" />
            <div className="card-3">

              <div className="info-heading text-center">ENTER YOUR DETAILS TO JOIN THE CLUB!</div>
              <div className="pingBg">
                <Grid container className="mcCSS">
                  <Grid item md={6} className="mcCSS">
                    <div className="reg-helper-text-2">First Name</div>
                    <input type="text" name="firstName" value={fields.firstName} onChange={(e) => fieldChange(e)} /><br/>
                    <div className="field-err-text">{fieldErrors.firstName}</div>
                  </Grid>
                  <Grid item md={6} className="mcCSS">
                    <div className="reg-helper-text-2">Last Name</div>
                    <input type="text" name="lastName" value={fields.lastName} onChange={(e) => fieldChange(e)} /><br/>
                    <div className="field-err-text">{fieldErrors.lastName}</div>
                  </Grid>
                  <Grid item md={2}></Grid>
                </Grid>
                <Grid container className="info-row2-con">
                  <Grid item md={12}>

                    {
                      // product === 'bike-insurance' || product === 'car-insurance' || product === 'motor-club'
                      product === 'motor-club'
                        ?

                        product === 'motor-club'
                          ?
                          <div>
                            {/* <div className="reg-helper-text-2">Vehicle Number</div> */}
                            <div className="vehNumBox">
                              <div className="reg-helper-text-2 myWidth">Vehicle 1</div>
                              <div className="veh-row myWidth2" style={{display:'inline-block'}} >
                                <input type="text" name="vehicleNum" value={fields.vehicleNum} onChange={(e) => fieldChange(e)} /><br/>
                                <div className="field-err-text">{fieldErrors.vehicleNum}</div>
                               {fields.vehicleNum &&
                               !fieldErrors.vehicleNum &&
                                <div className={`reg-plus-btn ${totalVehicle === 1 ? 'plus-show' : 'plus-hide'}`} onClick={() => addVehicle(1)}>+ Add more vehicles</div>}
                              </div>
                            </div>
                            {
                              totalVehicle >= 2
                                ?
                                <div className="vehNumBox">
                                  <div className="reg-helper-text-2 myWidth">Vehicle 2</div>
                                  <div className="veh-row myWidth2" style={{display:'inline-block'}}>
                                    <input type="text" name="vehicleNum2" value={fields.vehicleNum2} onChange={(e) => fieldChange(e)} className="vehicle2" /><br/>
                                    <div className="field-err-text">{fieldErrors.vehicleNum2}</div>
                                   {fields.vehicleNum2&& !fieldErrors.vehicleNum2&&<div className={`reg-plus-btn ${totalVehicle === 2 ? 'plus-show' : 'plus-hide'}`} onClick={() => addVehicle(2)}>+ Add more vehicles</div>
                                    }
                                  </div>
                                </div>
                                : null
                            }
                            {
                              totalVehicle >= 3
                                ?
                                <div className="vehNumBox">
                                  <div className="reg-helper-text-2 myWidth">Vehicle 3</div>
                                  <div className="veh-row myWidth2" style={{display:'inline-block'}}>
                                    <input type="text" name="vehicleNum3" value={fields.vehicleNum3} onChange={(e) => fieldChange(e)} className="vehicle3" /><br/>
                                    <div className="field-err-text">{fieldErrors.vehicleNum3}</div>
                                  {fields.vehicleNum &&
                                    fields.vehicleNum2 &&
                                    fields.vehicleNum3 &&
                                    !fieldErrors.vehicleNum3 &&
                                    <div className="reg-plus-btn reg-plus-last">+ Add more vehicles</div> }
                                  </div>
                                </div>
                                : null
                            }

                            {/* <div className="reg-helper-text-2">Maximum 3 vehicle numbers.</div> */}
                            {/* <div className="reg-plus-btn">+</div> */}
                            {/* <div className="field-err-text">{fieldErrors.vehicleNum}</div> */}
                          </div>
                          :
                          <div>
                            <div className="reg-helper-text-2">Vehicle Number</div>
                            <input type="text" name="vehicleNum" value={fields.vehicleNum} onChange={(e) => fieldChange(e)} />
                            <br/><div className="field-err-text">{fieldErrors.vehicleNum}</div>
                          </div>

                        :
                        <div>
                          <div className="reg-helper-text-2">Date of Birth</div>
                          <input type="date" name="dob" value={fields.dob} onChange={(e) => fieldChange(e)} />
                          <br/><div className="field-err-text">{fieldErrors.dob}</div>
                        </div>
                    }

                  </Grid>
                </Grid>

                <div className="terms-con">
                  <FormGroup row>
                    <FormControlLabel
                      control={<RedCheckbox checked={state.terms} onChange={checkboxChange} name="terms" />}
                      label={
                        <div className="agree-terms">I agree to the {` `}
                          {product === 'motor-club' ? <span><Link to="/tnc" target="_blank" rel="noreferrer">Terms & Conditions</Link> and {` `}</span> : null}
                          <Link to="/privacy-policy" target="_blank" rel="noreferrer">Privacy Policy</Link>.
                        </div>
                      }
                    />
                  </FormGroup>
                </div>
                <div className={activeCard !== 3 ? "reg-red-btn info-submit" : isError?"myBtnCss-disabled":"myBtnCss"} 
                onClick={isError?null:submitInfoBtn}>Submit</div>
              </div>
            </div> </>
        }

        {
          activeCard === 4 &&
          <>
            {/* <div className="card-4">
              <div className="congrats-text">Congratulations</div>
              <div className="lead-name">{fields.firstName}</div>
              <div>You are now a member of the</div>
              <div className="motor-text">Hello Zindagi MOTOR CLUB</div>
              <div className="reg-red-btn benefits-btn">Avail Benefits</div>
            </div> */}
            <div className="card-10">
              <div>Thank you for registering with Hello Zindagi.</div>
              <div>We will connect with you shortly and assist you with the further buying journey.</div>
              {/* Thank you for registering with Hello Zindagi. We will connect with you shortly and assist you with the further buying journey. */}

              <Link to="/offers">
                <button type="button" className="btn mt-5 availBtn ">
                  Avail Benefits
                </button>
              </Link>
            </div>
          </>
        }

        {
          activeCard === 5 &&
          <>
            {/* <div className="card-10">
              <div>Dear User,</div>
              <div className="already-text">Your information has been submitted successfuly.</div>
              <div className="">Our team will contact you soon.</div>
              <Link to="/" className="go-to-home"><div className="reg-red-btn benefits-btn">Go To Home</div></Link>
            </div> */}
            <div className="card-10">
              {/* <div>Thank you for registering with Hello Zindagi.</div>
              <div className="already-text">You will soon receive your offer on your registered mobile number</div> */}
              <div>Thank You!</div>
              <div>You will get a call back from our ‘Certified Insurance Assistant’ to help you buy the product</div>
              <div>You can also reach us directly on  <a href="https://wa.me/918767516040">Whats App +91-8767516040</a>  or email at <a href="mailto:care@hellozindagi.co">care@hellozindagi.co</a></div>
            </div>
          </>
        }

        {
          activeCard === 10 &&
          <>
            {/* <div className="card-10">
              <div>Dear User,</div>
              <div className="already-text">This mobile number is already registered with us</div>
            </div> */}
            <div className="card-10 card-15">
              <div>You are our Existing Member.</div>
              <div className="already-text">Please contact our Customer Care for further details.</div>
            </div>
          </>
        }

        {
          activeCard === 15 &&
          <div className="card-10 card-15">
            <div>You are our Existing Member.</div>
            <div className="already-text">Please contact our Customer Care for further details.</div>
          </div>
        }

      </Grid>
    </Grid>
  );
}

export default Registration;

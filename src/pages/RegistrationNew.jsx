import React, { useState, useEffect } from 'react';
import {
    Link,
    useLocation,useHistory
  } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { FETCH_CUSTOMER_DETAILS } from '../pages/constants/index';
import { getCust,registerCust } from './actions/customerAction';
import {toast,ToastContainer} from 'react-toastify';
import {useFormik} from 'formik'

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import OtpInput from 'react-otp-input';
import axios from 'axios';
import Timer from '../components/Timer';
import logo1 from '../assets/images/logo1.png';
import {sendOTP,validateOTP} from './config/smsGateway';
import styled from 'styled-components';

import {prodObj} from './config/productObj';
import McLogo from '../assets/images/mcPageImg/mcLogo.png';

import jsonData from '../config.json';
const API_BASE_URL = `https://fgngapi.futuregroup.in/api/v1`;



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

const RegistrationNew = () => {
    const history = useHistory();
  const dispatch = useDispatch();
  const cust = useSelector(state=>state.offerReducer.customer);


  const formik = useFormik({
    initialValues:{
      firstName:'',
      lastName:'',
      vehicleNum:'',
      vehicleNum2:'',
      vehicleNum3: '',
      terms:false,
      dob:'',
      mobNumber:''
    },
    validate:values=>{
      let errors={};

      if(activeCard!==3&&!values.mobNumber){
        errors.mobNumber="Please enter a mobile number";
      } else if(activeCard!==3&&!/^[6-9][0-9]{9}$/i.test(values.mobNumber)){
        errors.mobNumber= "Mobile number must be 10 digit and starts with 6-9"
      } else if(activeCard!==3&&/^(.)\1{9}$/.test(values.mobNumber)){
        errors.mobNumber= "No repeated mobile number allowed"
      }
      //--------------------------------------------------------------
      if(!values.firstName){
        errors.firstName="Please Enter Your First Name"
      }else if(!/^[a-zA-Z ]{3,30}$/.test(values.firstName)){
        errors.firstName="Please Enter a Valid First Name"
      }

      if(!values.lastName){
        errors.lastName="Please Enter Your First Name"
      }else if(!/^[a-zA-Z ]{3,30}$/.test(values.lastName)){
        errors.lastName="Please Enter a Valid First Name"
      }
      //---------------Vehicle Validate------------------
      if(!values.vehicleNum){
        errors.vehicleNum= "Please Enter Vehicle Number"
      } else if(!/^[A-Za-z]{2}[0-9]{2}[A-Za-z]{1,2}[0-9]{3,4}$/.test(values.vehicleNum)){
        errors.vehicleNum= "Please Enter a Valid Vehicle Number"
      }
      //-------Vehicle2------------
      if(totalVehicle===2&&values.vehicleNum&&!values.vehicleNum2){
        errors.vehicleNum2= "Please Enter Vehicle Number"
      } else if(totalVehicle===2&&values.vehicleNum&&!/^[A-Za-z]{2}[0-9]{2}[A-Za-z]{1,2}[0-9]{3,4}$/.test(values.vehicleNum2)){
        errors.vehicleNum2= "Please Enter a Valid Vehicle Number"
      } else if(totalVehicle===2&&values.vehicleNum&&values.vehicleNum2===values.vehicleNum){
        errors.vehicleNum2= "Duplicate Vehicle Number Not Allowed";
        toast.error('Duplicate Vehicle Number', {
          position: "top-right",
          autoClose: 3000,
          
          })
      }
      //--------vehicle 3------------------
      if(totalVehicle===3&&values.vehicleNum2&&!values.vehicleNum3){
        errors.vehicleNum3= "Please Enter Vehicle Number"
      } else if(totalVehicle===3&&values.vehicleNum2&&!/^[A-Za-z]{2}[0-9]{2}[A-Za-z]{1,2}[0-9]{3,4}$/.test(values.vehicleNum3)){
        errors.vehicleNum3= "Please Enter a Valid Vehicle Number"
      } else if(totalVehicle===3&&values.vehicleNum2&&values.vehicleNum3===values.vehicleNum2){
        errors.vehicleNum3= "Duplicate Vehicle Number Not Allowed"
          toast.error('Duplicate Vehicle Number', {
            position: "top-right",
            autoClose: 3000,
            progress: undefined,
            })
      }
      //----------------DOB validate--------------

      if(values.dob===""){
        errors.dob="Please Select Date Of Birth"
      }
        const date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let day = date.getDate();
//----------------------------------------
        let dobVal = values.dob.split('-');
        let selectedDate = new Date(dobVal[0],dobVal[1],dobVal[2]).getTime();
        let today = new Date(year,month,day).getTime();
        if(selectedDate===today || selectedDate>today){
          errors.dob = "Date of birth cannot be Today or future Date"
        }
      //--------------Terms Validate-------------------
      if(formik.touched.terms&&!values.terms){
        errors.terms="Please Agree to Terms and Conditions to Proceed"
      }

      return errors
    }
  });

  

  let query = useQuery();
  let product = query.get("product");
  let prodId = prodObj[product].prodId;

 
  const [activeCard, setActiveCard] = useState(1);
  const [mobNumber, setMobNumber] = useState('');
  const [otpValue, setOtpValue] = useState('');
  const [fields, setFields] = useState();
  const [fieldErrors, setFieldErrors] = useState();
  const [isError, setIsError] = useState(false);
  const [custDetail, setCustDetail] = useState(null);
  const [timeValue, setTimeValue] = useState(30);
  const [totalVehicle, setTotalVehicle] = useState(1);
  const [appConstants, setAppConstants] = useState({});
  const [smsUniqueCode, setSmsUniqueCode] = useState(0);

  const onChangeMobile = (e) => {
    // console.log(event.target.value);
    setMobNumber(e.target.value);
    const mobileRegex = /^[7-9][0-9]{9}/;
    let mobile = e.target.value;
    const result = mobileRegex.test(mobile);
        
  }

  
  const verifyBtn= async(e)=>{
    e.preventDefault();
    setOtpValue('');
    formik.setFieldError("otp","");
    try {
     const {data}= await axios.post(`${API_BASE_URL}/getCustMembershipData`,{
        sellerid:appConstants.sellerId,
        custMobileNo:formik.values.mobNumber,
        membershipType:appConstants.membershipType
      })
 
      dispatch({type:FETCH_CUSTOMER_DETAILS, payload:data})
      await sendOTP(formik.values.mobNumber)
      setActiveCard(2);
    } catch (error) {
      const otpDetail = await sendOTP(formik.values.mobNumber);

      if(!otpDetail) toast.error('Count not send OTP, Try Again', {position: "top-right",autoClose: 1500,progress: undefined,
        })
       // setSmsUniqueCode(otpDetail.responseObject.unique_code);
       // setActiveCard(2); 
       setActiveCard(3); 
      
    }
}

const verifyOTP= async(e)=>{
  e.preventDefault();
  
  try{
  const valid = await validateOTP(
    formik.values.mobNumber,smsUniqueCode,otpValue
  )
  if(!valid){
    throw new Error("Invalid OTP");
    return
  }
  // formik.setFieldValue('firstName',`${cust.membershipdetails?.custfirstname||""}`);
  // formik.setFieldValue('lastName',`${cust.membershipdetails?.custlastname||""}`);
  // formik.setFieldValue('vehicleNum',`${cust.membershipdetails?.vehicle1||""}`);
  // formik.setFieldValue('vehicleNum2',`${cust.membershipdetails?.vehicle2||""}`);
  // formik.setFieldValue('vehicleNum3',`${cust.membershipdetails?.vehicleNum3||""}`);
 
  setActiveCard(3);
  formik.setFieldError("otp","Invalid OTP, Please Enter Valid OTP");
  } catch(error){
    
    formik.setFieldError("otp","Invalid OTP, Please Enter Valid OTP");
    toast.error(error.message, {position: "top-right",autoClose: 1500,progress: undefined,
        })
  }
}

const register=async(e)=>{
  e.preventDefault();
  try {
    const data = await dispatch(registerCust(
      formik.values.mobNumber,
      formik.values.firstName,
      formik.values.lastName,
      formik.values.dob,
      formik.values.vehicleNum,
      formik.values.vehicleNum2,
      formik.values.vehicleNum3,
      appConstants.termVersion,
      appConstants.policyVersion
      ))
      if(!data.status) throw new Error("Something went Wrong while Registration");
      history.push('/offers')
  } catch (error) {
    toast.error(error.message, {
      position: "top-right",
      autoClose: 3000,
      progress: undefined,
      })
    
  }
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
    const mcc = constData.mcConstants;
    setAppConstants({
      ...fields,
      sellerId: mcc.sellerId,
      termVersion: mcc.termVersion,
      policyVersion: mcc.policyVersion,
      membershipType: mcc.membershipType
    });
  }, [])


    return (
        <Grid container className="reg-main-con">
          {/* <Formik> */}
          <ToastContainer limit={1} />

            <Register >
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
            </div>
            </Grid>}

            <Grid item md={activeCard !== 3 ? 6 : 12} xs={12} className={`reg-right-con ${activeCard === 3 ? 'right-con-card3' : null}`}>
        <div className="right-block-con">

          {
            activeCard === 1 &&
            <div>
              <div className="reg-helper-text">Enter mobile number and login</div>
              <div className="reg-input-con mob-input">
                <input type="text" placeholder="" maxLength="10" name="mobNumber" 
                  {...formik.getFieldProps('mobNumber')}
                />
                <div className="country-code">+91</div>
                <button 
                className={formik.errors.mobNumber||!formik.dirty?'reg-red-btn-disabled':"reg-red-btn"} 
                onClick={verifyBtn}
                style={{border:'none'}}
                disabled={formik.errors.mobNumber||!formik.dirty?true:false}
                >Verify</button>
                {formik.touched.mobNumber&&
                <div className="field-err-text">{formik.errors.mobNumber}</div>
                }
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
                  onChange={(val)=>setOtpValue(val)}
                  numInputs={4}
                  isInputNum={true}
                  separator={<span></span>}
                  containerStyle={'otp-container'}
                  
                />
                <div className={otpValue.length<4?'reg-red-btn-disabled':'reg-red-btn'}
                onClick={verifyOTP}
                  >Next</div>
              </div>

              <div className={`resend-otp-btn ${timeValue === 0 ? null : 'disable-btn'}`}
              onClick={verifyBtn}
               >Resend OTP</div>
              <div className="field-err-text">{formik.errors.otp}</div>
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
                    <input type="text" 
                      name="firstName"
                      {...formik.getFieldProps('firstName')}
                      />
                      <br />
                      {formik.touched.firstName&&
                      <div className="field-err-text">{formik.errors.firstName}</div>
                      }
                  </Grid>
                  <Grid item md={6} className="mcCSS">
                    <div className="reg-helper-text-2">Last Name</div> 
                    <input type="text" name="lastName" {...formik.getFieldProps('lastName')} />
                    <br />
                    {formik.touched.lastName&&
                    <div className="field-err-text">{formik.errors.lastName}</div>
                    }
                  </Grid>
                  <Grid item md={2}></Grid>
                </Grid>
                <Grid container className="info-row2-con">
                  <Grid item md={12} style={{display:'flex', flexDirection:'column'}}>

                    {
                      // product === 'bike-insurance' || product === 'car-insurance' || product === 'motor-club'
                      product === 'motor-club'
                        &&
                          <div>
                            <div className="vehNumBox">
                              <div className="reg-helper-text-2 myWidth">Vehicle 1</div>
                              <div className="veh-row myWidth2">
                                <input type="text" name="vehicleNum" {...formik.getFieldProps('vehicleNum')} /><br/>
                                {formik.touched.vehicleNum&&
                                <div className="field-err-text">{formik.errors.vehicleNum}</div>
                                }
                                {formik.values.vehicleNum&&!formik.errors.vehicleNum&&
                                <div className={`reg-plus-btn ${totalVehicle === 1 ? 'plus-show' : 'plus-hide'}`} onClick={()=>setTotalVehicle(2)} >+ Add more vehicles</div>
                                
                                }
                              </div>
                            </div>
                            {
                              totalVehicle >= 2
                                &&
                                <div className="vehNumBox">
                                  <div className="reg-helper-text-2 myWidth">Vehicle 2</div>
                                  <div className="veh-row myWidth2">
                                    <input type="text" name="vehicleNum2" {...formik.getFieldProps('vehicleNum2')} className="vehicle2" />
                                    {formik.touched.vehicleNum2&&
                                    <div className="field-err-text">{formik.errors.vehicleNum2}</div>
                                    }
                                    {formik.values.vehicleNum2&&!formik.errors.vehicleNum2&&
                                    <div className={`reg-plus-btn ${totalVehicle === 2 ? 'plus-show' : 'plus-hide'}`} onClick={()=>setTotalVehicle(3)} >+ Add more vehicles</div>
                                    }
                                  </div>
                                </div>
                                
                            }
                            {
                              totalVehicle >= 3
                                &&
                                <div className="vehNumBox">
                                  <div className="reg-helper-text-2 myWidth">Vehicle 3</div>
                                  <div className="veh-row myWidth2">
                                    <input type="text" name="vehicleNum3"
                                    {...formik.getFieldProps('vehicleNum3')} className="vehicle3" /><br/>
                                    
                                    {formik.touched.vehicleNum3&&
                                    <div className="field-err-text">{formik.errors.vehicleNum3}</div>
                                    }
                                    <div className="reg-plus-btn reg-plus-last">+ Add more vehicles</div>
                                  </div>
                                </div>
                            }
                          </div>
                                }
                        <div style={{display:'flex', flexDirection:'column'}} >
                          <div className="reg-helper-text-2">Date of Birth</div>
                          <input type="date" name="dob" {...formik.getFieldProps('dob')} />
                          {formik.touched.dob&&
                          <div className="field-err-text">{formik.errors.dob}</div>
                          }
                        </div>
                  </Grid>
                </Grid>
                    
                <div className="terms-con">
                  <FormGroup row>
                    <FormControlLabel
                      control={<RedCheckbox checked={formik.values.terms} onBlur={formik.handleBlur} onChange={formik.handleChange} name="terms" />}
                      label={
                        <div className="agree-terms">I agree to the {` `}
                          {product === 'motor-club' ? <span><Link to="/tnc" target="_blank" rel="noreferrer">Terms & Conditions</Link> and {` `}</span> : null}
                          <Link to="/privacy-policy" target="_blank" rel="noreferrer">Privacy Policy</Link>.
                          <div className="field-err-text">{formik.errors.terms}</div>
                        </div>
                      }
                    />
                  </FormGroup>
                </div>
                {formik.dirty&&formik.isValid&&formik.values.terms?
                <button className={activeCard !== 3 ? "reg-red-btn info-submit" :"myBtnCss"}
                onClick={register}
                style={{border:'none'}}
                >Submit</button>:
                <button className={activeCard !== 3 ? "reg-red-btn info-submit" :"myBtnCss-disabled"}
                style={{border:'none'}}
                disabled
                
                >Submit</button>
                }
            
              </div>
            </div> </>
        }

        {
          activeCard === 4 &&
          <>
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
          
            <div className="card-10">
              <div>Thank You!</div>
              <div>You will get a call back from our ‘Certified Insurance Assistant’ to help you buy the product</div>
              <div>You can also reach us directly on  <a href="https://wa.me/918767516040">Whats App +91-8767516040</a>  or email at <a href="mailto:care@hellozindagi.co">care@hellozindagi.co</a></div>
            </div>
          </>
        }

        {
          activeCard === 10 &&
          <>
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
        </Register>
      {/* </Formik> */}
    </Grid>
    )
}

export default RegistrationNew

const Register = styled.div`

`
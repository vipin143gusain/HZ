import {useState} from 'react';

import {useFormik} from 'formik';
import {toast, ToastContainer} from 'react-toastify';
import OtpInput from 'react-otp-input';
import {Grid,FormGroup,FormControlLabel,Checkbox} from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';

import {useHistory} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { FETCH_CUSTOMER_DETAILS } from './constants';
import FooterSmall from "../components/FooterSmall";
import HeaderMotorClub from "../components/HeaderMotorClub";
import Timer from '../components/Timer';
import { ControlCameraOutlined, FormatLineSpacing } from '@material-ui/icons';
import {getCustDetails} from './api/index';
import { registerCust } from './actions/customerAction';
import {sendOTP2,validateOTP2} from './config/smsGateway';

function MotorClub() {
  const dispatch = useDispatch();
  const history= useHistory();

  const [activeCard, setActiveCard] = useState(1);
  const [mobNumber, setMobNumber] = useState('');
  const [otpValue, setOtpValue] = useState('');
  const [smsUniqueCode, setSmsUniqueCode] = useState(0);
  const [fields, setFields] = useState();
  const [fieldErrors, setFieldErrors] = useState();
  const [isError, setIsError] = useState(false);
  const [custDetail, setCustDetail] = useState(null);
  const [timeValue, setTimeValue] = useState(30);
  const [totalVehicle, setTotalVehicle] = useState(1);
  const [appConstants, setAppConstants] = useState({});

  const formik = useFormik({
    initialValues:{
      firstName:'',
      lastName:'',
      vehicleNum:'',
      vehicleNum2:'',
      vehicleNum3: '',
      mobNumber:'',
      otp:''
    },
    validate:values=>{
      let errors={};

      if(activeCard!==3&&!values.mobNumber){
        errors.mobNumber="Please enter a mobile number";
      } else if(activeCard!==3&&!/^[6-9][0-9]{9}$/i.test(values.mobNumber)){
        errors.mobNumber= "Mobile number must be 10 digit and starts with 6,7,8,9"
      } else if(activeCard!==3&&/^(.)\1{9}$/.test(values.mobNumber)){
        errors.mobNumber= "No repeated mobile number allowed"
      }
      //--------------------------------------------------------------

      //-------------------otp validation----------------------
      if(!values.otp){
        errors.otp="Please enter OTP to proceed"
      }else if(values.otp&&values.otp.length<4){
        errors.otp="Please enter 4 digit OTP"
      }

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
      } else if(!/^[A-Za-z]{2}[0-9]{2}[A-Za-z0-9]{1,7}$/.test(values.vehicleNum)){
        errors.vehicleNum= "Please Enter a Valid Vehicle Number"
      }
      //-------Vehicle2------------
      if(totalVehicle>=2&&!values.vehicleNum2){
        errors.vehicleNum2= "Please Enter Vehicle Number"
      } else if(totalVehicle>=2&&values.vehicleNum2&&!/^[A-Za-z]{2}[0-9]{2}[A-Za-z0-9]{1,7}$/.test(values.vehicleNum2)){
        errors.vehicleNum2= "Please Enter a Valid Vehicle Number"
      } else if(totalVehicle>=2&&values.vehicleNum&&values.vehicleNum2===values.vehicleNum){
        errors.vehicleNum2= "Duplicate Vehicle Number Not Allowed";
        
      }
      //--------vehicle 3------------------
      if(totalVehicle===3&&values.vehicleNum2&&!values.vehicleNum3){
        errors.vehicleNum3= "Please Enter Vehicle Number"
      } else if(totalVehicle===3&&values.vehicleNum2&&!/^[A-Za-z]{2}[0-9]{2}[A-Za-z0-9]{1,7}$/.test(values.vehicleNum3)){
        errors.vehicleNum3= "Please Enter a Valid Vehicle Number"
      } else if(totalVehicle===3&&values.vehicleNum2&&values.vehicleNum3===values.vehicleNum2){
        errors.vehicleNum3= "Duplicate Vehicle Number Not Allowed"
          
      }else if(totalVehicle===3&&values.vehicleNum3===values.vehicleNum){
        errors.vehicleNum3= "Duplicate Vehicle Number Not Allowed"
          
      }
     
      return errors
    }
  });

 
  const verifyBtn=async(e)=>{
    e.preventDefault();
    formik.setFieldTouched('otp',false);
    formik.setFieldValue('otp','');
    try {
      const {data} = await getCustDetails(formik.values.mobNumber);
      const otp = await sendOTP2(formik.values.mobNumber);
      setCustDetail(data);
      // dispatch({type:FETCH_CUSTOMER_DETAILS, payload:custDetail});
      setSmsUniqueCode(otp.data.responseObject.unique_code);
      setActiveCard(2);
    } catch (error) {
      
          const {data} = await sendOTP2(formik.values.mobNumber);
          setSmsUniqueCode(data.responseObject.unique_code);
          setActiveCard(2)
          console.log("verify button error ");
    }
  }

  const verifyOTP=async(e)=>{
    e.preventDefault();
    formik.setFieldTouched('otp',true);
    if(!formik.values.otp||formik.errors.otp) return
    try {
      await validateOTP2(formik.values.mobNumber,smsUniqueCode,formik.values.otp);
  
      if(!custDetail){
        setActiveCard(3)
      }
      if(custDetail){
        dispatch({type:FETCH_CUSTOMER_DETAILS, payload:custDetail});
        history.push('/motor-club/offers')
      }
    
      
    } catch (error) {
      formik.setFieldError("otp","Invalid OTP");
      console.log("error verifying otp");
    }
  }

  const register=(e)=>{
    e.preventDefault();
    dispatch(registerCust(
        history,
        formik.values.mobNumber,
        formik.values.firstName,
        formik.values.lastName,
        formik.values.vehicleNum,
        formik.values.vehicleNum2,
        formik.values.vehicleNum3,
        ))
  }

  return (
    <>
        
      <HeaderMotorClub />
      <ToastContainer limit={1} />
    <div className="motorClubPage">
      <div className="d-flex align-items-center justify-content-between">
      {
        activeCard!==3&&activeCard!==4&&
        <div className="mobRespCss">
          <img className="img-fluid respWidthLeft" src={require("../assets/images/mcPageImg/standing-car.svg").default} alt="" />
        </div>
      }
      {
        activeCard===3&&
        <div className="mobRespCss">
          <img className="img-fluid respWidthLeft" src={require("../assets/images/mcPageImg/scooty-moving.svg").default} alt="" />
        </div>
      }
      {
        activeCard!==4&&

      
        <div className="mobRespCss2">
        {
            activeCard === 1 &&
            <div>
              <div className="reg-helper-text login-text" style={{opacity:1}} >Login/ Sign up</div>
              <div className="reg-input-con mob-input">
                <input type="number" className="login-input" placeholder="Mobile Number" maxLength="10" name="mobNumber" 
                  {...formik.getFieldProps('mobNumber')}
                />
                {/* <div className="country-code mc-country-code">+91</div> */}
                <div style={{marginTop:'20px'}} >
                  {formik.touched.mobNumber&&
                  <div className="field-err-text" style={{marginTop:'-4px',marginBottom:'10px'}} >{formik.errors.mobNumber}</div>
                  }
                <button 
                className={` ${formik.errors.mobNumber||!formik.dirty?'reg-here-btn-disabled':"reg-here-btn"}`} 
                onClick={verifyBtn}
                style={{border:'none'}}
                disabled={formik.errors.mobNumber||!formik.dirty?true:false}
                >NEXT</button>
                  </div>

              </div>
            </div>
          }

          {
            activeCard === 2 &&
            <div>
              <div className="reg-helper-text login-text">Enter 4 digit code</div>
              <div className="reg-helper-text" style={{width:'auto'}}>OTP sent to you on your mobile phone {formik.values.mobNumber}</div>
              <div className="reg-input-con otp-input-con">
                <OtpInput
                  value={formik.values.otp}
                  className={'mc-otp-inputVal'}
                  onChange={(val)=>{formik.setFieldValue("otp",val)} }
                  numInputs={4}
                  isInputNum={true}
                  separator={<span></span>}
                  containerStyle={'mc-otp-input'}
                  name='otp'
                  
                />
              <div className={`resend-otp-btn ${timeValue === 0 ? null : 'disable-btn'}`}
              onClick={verifyBtn}
               >Did not received OTP? Resend OTP.</div>
               <div>
               {
                 formik.touched.otp&&
                 <div className="field-err-text">{formik.errors.otp}</div>
               }
              </div>
              <div className="timer-con" style={{marginBottom:'10px'}}  ><Timer initialSeconds={30} timeValue={timeValue} setTimeValue={setTimeValue} /></div>
              </div>
                <button className={formik.errors.otp?'reg-here-btn-disabled':'reg-here-btn'} 
                onClick={verifyOTP}
                  >VERIFY</button>

            </div>
          }


      {
          activeCard === 3 &&
          <>
              <div>
                <div className="reg-helper-text login-text">Register</div>
                <div className='mcReg-input-con' >
                  <div className="nameConainer">
                    <div>
                        <input type='text'
                        className="login-input"
                          name='firstName'
                          {...formik.getFieldProps('firstName')}
                          placeholder="First Name"/>
                          {formik.touched.firstName&&
                            <div className="field-err-text">{formik.errors.firstName}</div>
                            }
                    </div>
                    <div>
                        <input 
                        type="text"
                        name="lastName"
                        {...formik.getFieldProps('lastName')}
                        placeholder="Last Name"/>
                        {formik.touched.lastName&&
                          <div className="field-err-text">{formik.errors.lastName}</div>
                          }
                      </div>
                    </div>
                    <div className='vehicleCons'>
                        <div className="vehRow">
                          <input 
                          maxLength="11"
                          name="vehicleNum"
                          {...formik.getFieldProps('vehicleNum')}
                          placeholder="Vehicle Number"
                          />
                          <img height='100%' src={require('../assets/images/mcPageImg/car-gray-mini.svg').default} alt="" />
                        </div>
                        {formik.touched.vehicleNum&&
                              <div className="field-err-text">{formik.errors.vehicleNum}</div>
                          }
                          
                        {/* {
                      formik.values.vehicleNum&&!formik.errors.vehicleNum&&
                      <div className={`mcAddVehicleBtn ${totalVehicle===1?"plus-show":"plus-hide"}`} onClick={()=>setTotalVehicle(totalVehicle+1)} >+ Add Vehicle</div>

                      } */}

                          {
                            totalVehicle>=2&&
                            <div>
                              <div className="vehRow">
                                <input
                                name="vehicleNum2"
                                maxLength="11"
                                 {...formik.getFieldProps('vehicleNum2')}
                                 placeholder="Vehicle Number"/>
                                <img height='100%' src={require('../assets/images/mcPageImg/car-gray-mini.svg').default} alt="" />
                              </div>
                              {formik.touched.vehicleNum2&&
                                    <div className="field-err-text">{formik.errors.vehicleNum2}</div>
                                  }

                          {/* {
                            formik.values.vehicleNum2&&!formik.errors.vehicleNum2&&
                            <div className={`mcAddVehicleBtn ${totalVehicle===2?"plus-show":"plus-hide"}`} onClick={()=>setTotalVehicle(totalVehicle+1)} >+ Add Vehicle</div>
                          } */}
                            </div>
                        }
                          {
                            totalVehicle===3&&
                            <div>
                              <div className="vehRow">
                                <input 
                                maxLength="11"
                                name="vehicleNum3"
                                {...formik.getFieldProps('vehicleNum3')}
                                placeholder="Vehicle Number"/>
                                <img height='100%' src={require('../assets/images/mcPageImg/car-gray-mini.svg').default} alt="" />
                              </div>
                              {formik.touched.vehicleNum3&&
                                    <div className="field-err-text">{formik.errors.vehicleNum3}</div>
                                  }
                            </div>
                        }
                              {
                                totalVehicle!==3&&
                                <div className='mcAddVehicleBtn' onClick={(prev)=>setTotalVehicle(totalVehicle+1)} >+ Add Vehicle</div>
          
                              }


                    </div>

                </div>
                 
            {formik.dirty&&formik.isValid?
                <div className="reg-here-btn"
                onClick={register} style={{marginTop:'8px'}}
                >NEXT</div>:
                <div className="reg-here-btn-disabled" style={{marginTop:'8px'}}
                disabled
                >NEXT</div>
                }
              </div>
            </>
        }
      
        </div>
}
          </div>

    </div>
      <FooterSmall />
      </>
  );
}

export default MotorClub;

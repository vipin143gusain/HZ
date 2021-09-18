import React,{useState} from 'react';
import styled from 'styled-components';

import { useFormik } from 'formik';
import { useSelector,useDispatch } from 'react-redux';
import HeaderMotorClub from '../components/HeaderMotorClub';
import { updateCustDetails } from './actions/customerAction';
import FooterSmall from '../components/FooterSmall';
import moment from 'moment';


const MotorClubCustDetails = () => {
    const dispatch = useDispatch();
const cust = useSelector(state=>state.offerReducer.customer.membershipdetails);
const [addVeh, setAddVeh] = useState('');


const formik = useFormik({
    initialValues:{
        addVeh2:'',
        addVeh3:''
    },
    validate: values=>{
        let errors={};

//-------------vehichel2 validation--------------------------------------------
        if(!cust.vehicle2&&!values.addVeh2){
            errors.addVeh2='Please enter vehicle number to add'
        }else if(!cust.vehicle2&&!/^[A-Za-z]{2}[0-9]{2}[A-Za-z0-9]{1,7}$/.test(values.addVeh2)){
            errors.addVeh2="Please add a valid Vehicle number"
        }else if(cust.vehicle1&&cust.vehicle1.toLowerCase()===values.addVeh2.toLowerCase()){
            errors.addVeh2="Duplicate vehicle number not allowed"
        }
//------------vehicle 3 validation-----------------------------------------------
        if(!cust.vehicle3&&cust.vehicle2&&!values.addVeh3){
            errors.addVeh3='Please enter vehicle number to add'
        }else if(!cust.vehicle3&&cust.vehicle2&&!/^[A-Za-z]{2}[0-9]{2}[A-Za-z0-9]{1,7}$/.test(values.addVeh3)){
            errors.addVeh3="Please add a valid Vehicle number"
        } else if(cust.vehicle2&&cust.vehicle2.toLowerCase()===values.addVeh3.toLowerCase()||values.addVeh3.toLowerCase()===cust.vehicle1.toLowerCase()){
            errors.addVeh3="Duplicate vehicle number not allowed"
        }

        return errors;
    }
})


const handleSubmit=(e)=>{
    if(cust.vehicle2)
    e.preventDefault();
    dispatch(updateCustDetails(
        cust.membershipid,
        cust.custmobileno,
        !cust.vehicle2?formik.values.addVeh2:'',
        formik.values.addVeh3
        ))
}

   
    return (
        <>
        <HeaderMotorClub/>
    
        <Wrapper bg={(require('../assets/images/mcPageImg/banner-2.png').default)} >
            <div >
                {
                    cust&&<>
                            <div className="detail custName">
                                {cust.custfirstname} {cust.custlastname}
                               
                            </div>
                            <div className="detail custNum">
                                {cust.custmobileno}
                               
                            </div>
                            <div className="detail custMemId">
                                Member ID: {cust.membershipid}
                              
                            </div>
                            <div className="detail activeFrom">
                                Member Active From:&#10240;{ moment(cust.memvalidfrom).format("MMM Do YYYY")}
                            </div>
                            <div className="detail custStatus">
                                Status: {cust.status===1&&"Active"}
                                {cust.status===0&&"InActive"}
                               
                            </div>


                            <div className="existVehCont" >
                                {
                                  cust.vehicle1&&  
                                <div className="existVeh1 existVeh detail">
                                    {cust.vehicle1}
                                </div>
                                }
                                {
                                    cust.vehicle2&&
                                <div className="existVeh1 existVeh detail">
                                    {cust.vehicle2}
                                </div>
                                }
                                {
                                    cust.vehicle3&&
                                <div className="existVeh1 existVeh detail">
                                    {cust.vehicle3}
                                </div>

                                }
                                
                            </div>

                                  {
                                      !cust.vehicle2&&(
                            <div className="addVeh">
                                <input type="text"
                                 name='addVeh2' 
                                 className="detail addVeh2 " 
                                 placeholder="Vehicle 2"
                                 maxLength='11'
                                 {...formik.getFieldProps('addVeh2')}
                                  />
                                <div className="addVehIcon" >
                                    <img src={require('../assets/images/mcPageImg/car-gray-mini.png').default} alt="" />
                                </div>
                            </div>
                                      )
                                    }   

                                    {formik.touched.addVeh2&&
                                            <div className="field-err-text">{formik.errors.addVeh2}</div>
                                            }
                           

                                    {
                                       !cust.vehicle3&&cust.vehicle2&&
                                        <div className="addVeh">
                                            <input type="text"
                                            name='addVeh3' 
                                            className="detail addVeh2" 
                                            placeholder="Vehicle 3"
                                            maxLength='11'
                                            {...formik.getFieldProps('addVeh3')}
                                            />
                                            <div className="addVehIcon" >
                                                <img src={require('../assets/images/mcPageImg/car-gray-mini.png').default} alt="" />
                                            </div>
                                        </div>
                                    }

                                  {formik.touched.addVeh3&&
                                    <div className="field-err-text">{formik.errors.addVeh3}</div>
                                    }

                                    {!cust.vehicle3&&(
                                        formik.dirty&&formik.isValid?
                                        <button className="addBtn" onClick={handleSubmit} >+ Add vehicle</button>
                                        :
                                        <button className="addBtn disabled-btn" disabled onClick={handleSubmit} >+ Add vehicle</button>
                                    )
                                    
                                    }


                                                                      
                                    {/* {
                                        formik.dirty&&formik.isValid?
                                            <button className="addBtn" onClick={handleSubmit} >+ Add vehicle</button>
                                            :
                                            <button className="addBtn disabled-btn" disabled onClick={handleSubmit} >+ Add vehicle</button>
                                    } */}
                    </>
                }

            </div>
            
        </Wrapper>
        <FooterSmall/>
        </>
    )
}

export default MotorClubCustDetails

const Wrapper = styled.div`
display:flex;
flex-direction: column;
align-items: center;
min-height: 50vh;
margin-top:8%;
margin-bottom: 3%;


:before{
    content: '';
    background: url(/static/media/banner-2.9bc4e0ae.png);
    position: absolute;
    top: 100px;
    left: 0;
    right: 0;
    height: 100%;
    background-repeat: no-repeat;
    z-index: -1;
    background-size: contain;
}
    
.detail{
    color:#ce001b;
    border: 1px solid #0000006e;
    border-radius: 14px;
    width: 313px;
    padding: 5px 13px;
    margin-top: 11px;
}
.custName{
    font-weight: 500;
    text-transform: capitalize;
}
.addVeh{
    margin-top: 20px;
    display:flex;
    align-items: center;
    gap:0 5px;
    input{
        text-transform: uppercase;
    }
    .addVeh2{
        color:black;
    }
    .addVehIcon{
        margin-top: 7px;
        img{
            height: 100%;
            padding: 8px 2px;
            background-color: white;
            border-radius: 10px;
            width: 55px;
        }
    }
}
.existVehCont{
    margin-top: 20px;
    .existVeh{
        border:1px solid lightgray;
        background-color: white;
        color:black;
        text-transform: uppercase;
    }
}
.addBtn{
    border:none;
    border-radius: 15px;
    background-color: #df102b;
    color:white;
    padding:3px 13px;
    margin-top: 8px;
}
.disabled-btn{
    background-color:#df102cc7 ;
}
`
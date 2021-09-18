import React,{useEffect} from 'react';

import styled from 'styled-components';
import {Link,useHistory} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import { getCust } from '../pages/actions/customerAction';
import { LOGOUT } from '../pages/constants';

const HeaderMotorClub = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const custDetail = useSelector(state=>state.offerReducer.customer.membershipdetails);

    const custData = JSON.parse(sessionStorage.getItem('cust'));

    const handleLogout=(e)=>{
        e.preventDefault();
        sessionStorage.removeItem('cust');
        dispatch({type:LOGOUT})
        history.push('/')
    }


useEffect(()=>{

    if(!custDetail && custData){
        dispatch(getCust(custData.mobileNumber,"auth"));
    }

},[])

    return (
        <>
        <Wrapper>
            <Logo >
                <Link to="/" >
                    <img src={require("../assets/images/mcPageImg/logo-white.png").default} alt="mcLogo" />
                </Link>
            </Logo>
            <CusDetails className="dropdown" >
                <div className="detail"  data-toggle="dropdown"   >
                    <img src={require('../assets/images/mcPageImg/user-red.svg').default} alt="" />
                </div>
                {
                    custDetail&&
                <div className="dropdown-menu dropdown-menu-right" >
                    <div className="dropdownWrapper">
                        <div className="cust-image" >
                            <img src={require('../assets/images/mcPageImg/user-profile.png').default} alt="user profile" />
                        </div>
                        <Link to="/motor-club/profile" className="profileBtn" >
                            <button className="profileBtn" >
                                PROFILE
                            </button>
                        </Link>
                        <div className="dropdown-divider"></div>
                        <button className="logoutBtn" onClick={handleLogout} >
                   	
                        <span><img style={{width:'12px'}} src={require('../assets/images/mcPageImg/logout-icon.svg').default} alt="" /></span> LOGOUT</button>
                    </div>

                </div>              

                }
                
            </CusDetails>
        </Wrapper>

            
        </>
    )
}

export default HeaderMotorClub

export const Wrapper = styled.div`
background-color: #ce001b;
    display:flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 20px;
`

const Logo = styled.div`
    height:80px;
    padding-bottom: 9px;
    img{
        height:100%;
    }
`
const CusDetails = styled.div`
.detail{
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    height:60px;
    width:60px;
    border-radius: 50%;
    img{
        height:100%;
    }
}
.dropdownWrapper{
:before{
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    z-index: -1;
}
    display:flex;
    flex-direction: column;
    justify-content: center;
    .cust-image{
        margin:auto;
        padding:15px;
    }
    .profileBtn{
        border:none;
        background-color:#ce001b;
        color:white;
        width:100px;
        margin:auto;
    }
    .logoutBtn{
        border:none;
        background: none;
    }
}
`

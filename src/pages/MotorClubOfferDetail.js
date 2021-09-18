import React from 'react';
import styled from 'styled-components';
import FooterSmall from '../components/FooterSmall';
import HeaderMotorClub from '../components/HeaderMotorClub';
import { brands,exclusiveCards,offerBenefits } from './config/cards';
import { Link } from 'react-router-dom';
import O2oemi from './O2oemiCopy';

const MotorClubOfferDetail = () => {
    return (
        <>
        <HeaderMotorClub />
        <Wrapper>
            <OfferDetail>
                <OfferAction>
                    <div className="actionImg">
                        <img src={require('../assets/images/mcPageImg/offer-detail-1.png').default} alt="" />
                    </div>
                    <div className="btnCont">
                        <Link target="_blank" to={"//google.com"} >
                            <button className="offerBtn" >REDEEM NOW</button>
                        </Link>
                    </div>
                </OfferAction>
                <OfferBenefits>
                    <p className="title">Process & Details of the offer</p>
                    <ol>
                        {
                            offerBenefits.process.map((elem,index)=>(
                                <li key={index+1} >{elem}</li>
                            ))
                        }
                    </ol>
                    <p className="title">Terms & Conditions</p>
                    <ol>
                        {
                            offerBenefits.terms.map((elem,index)=>(
                                <li key={index+2} >{elem}</li>
                            ))
                        }
                    </ol>
                    <p className="startText">* Limited period offer</p>
                </OfferBenefits>

                    {/* <O2oemi /> */}
            </OfferDetail>
            <OtherOffers>
                <h4 className='cardHeading' >OTHER OFFERS ON VEHICLE SERVICES</h4>
                <div className="cardWrapper">
                    {
                        exclusiveCards.map((elem,index)=>(
                    <div className='cardContainer' key={index+3} >
                        <img src={elem.image} alt="" />
                    </div>
                        ))
                    }
                </div>
            </OtherOffers>
            <Brands>
            <p className="title">Motor Club Partners</p>
                {brands.map((elem,index)=>(
                    <div className="brands">
                        <img key={index+4} src={elem} alt="" />
                    </div>
                ))}
            </Brands>
            
        </Wrapper>
        <FooterSmall/>
        </>
    )
}

export default MotorClubOfferDetail

const Wrapper = styled.div`

`
const OfferDetail = styled.div`
    background:#ff000014;
    display:flex;
    justify-content: center;
    align-items: center;
    gap: 0 72px;
    padding: 70px 20px;
`
const OfferAction = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    flex:0.45;
    .actionImg{
        width:100%;
        img{
            height: 550px;
        }
    }
    .offerBtn{
        color:white;
        background-color: #eb2027;
        border:none;
        padding:5px 16px;
        margin-top: 20px;
    }
`
const OfferBenefits = styled.div`
    
    width:630px;

.title{
    font-size: 18px;
    font-weight: 600;
    color:#eb2027;
}
ol{
    width:88%;
    padding-left: 22px;
    font-weight: 600;
    line-height: 28px;
    font-size: 16px;
}
.startText{
    font-style: italic;
}
`
const OtherOffers = styled.div`
    padding: 45px 0;
    box-shadow: 1px 1px 10px 4px #c4b9b987;
.cardHeading{
    color:#eb2027;
    text-align:center;
    font-size:20px;
    padding-bottom: 30px;
}
.cardWrapper{
    display: flex;
    flex-wrap: wrap;
    gap:10px 25px;
    justify-content: center;
    align-items: center;
}
.cardContainer{
    height:220px;
    width:220px;
    img{
        height:100%;
        width:100%;
    }
}
`
const Brands = styled.div`
display:flex;
align-items: center;
justify-content: space-around;
margin:45px 5px;
padding: 20px 45px;
height:100px;
.title{
    color:#eb2027;
}
.brands{
    border-right: 1px solid #eb202780;
    height:50px;
    padding: 7px 15px;
    img{
        height: 100%;
        
    }
}
`
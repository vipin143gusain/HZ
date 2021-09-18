import React,{useState,useEffect,useRef} from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import Carousel from 'react-material-ui-carousel';
import MultiCarousel from 'react-multi-carousel';



import HeaderMotorClub from '../components/HeaderMotorClub';
import FooterSmall from '../components/FooterSmall';
import {exclusiveCards,brands,whyMotorClub} from './config/cards';
import {assets,assets2} from './config/tempAssets';
import { FILTER_VEHICLE,FILTER_BRAND,FILTER_CATEGORY,FETCH_OFFERS } from './constants';
import { useDispatch,useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const MotorClubOffers = () => {
    const dispatch = useDispatch();
    
    const [vehicle, setvehicle] = useState();
    const [category, setCategory] = useState();
    const [selectBrand, SetselectBrand] = useState();

    const custDetails= useSelector(state=>state.offerReducer.customer.membershipdetails);
    const filOffer = useSelector(state=>state.offerReducer.offers.filter(elem=>{
        
        if(vehicle&&selectBrand&&category){
            return elem.category===category&&elem.brand===selectBrand&&elem.vehicle===vehicle;
        }
        if(vehicle&&category){
            return elem.vehicle===vehicle&&elem.category===category;

        }
        if(vehicle&&selectBrand){
            return elem.vehicle===vehicle&&elem.brand===selectBrand;
        }
        if(category&&selectBrand){
            return elem.category===category&&elem.brand===selectBrand;
        }

        else return elem
    }))
    

    if(custDetails){
        let data = {
            mobileNumber:custDetails.custmobileno,
            membershipId:custDetails.membershipid,
            firstName:custDetails.custfirstname,
            lastName:custDetails.custlastname
        }
        sessionStorage.setItem("cust", JSON.stringify(data));
    }
    
    
const filterVehicleType=(id)=>{
    setvehicle(id);
    
    dispatch({type:FILTER_VEHICLE,payload:vehicle});
}

const filterBrand=(brand)=>{
    dispatch({type:FILTER_BRAND,payload:brand});
}

const filterCategory=(cat)=>{
    setCategory(cat)
    dispatch({type:FILTER_CATEGORY,payload:cat});
}


let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const ref = useRef(null);

  const scroll=(scrollOffset)=>{
      
      ref.current.scrollLeft += scrollOffset;
  }

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
}

  useEffect(()=>{
      dispatch({type:FETCH_OFFERS,payload:assets2});
  },[])

    return (
        <>
        <HeaderMotorClub/>
        <Wrapper>
            {/* <HeroSlider>
                <img src={require('../assets/images/mcPageImg/banner.png').default} alt="" />
            </HeroSlider> */}
            <div className="carousel">
                <Carousel 
                autoPlay={true}
                animation="slide"
                navButtonsAlwaysVisible={true}
                navButtonsProps={{
                    className:"bannerNavBtn",
                    
                }}
                
                >                           
                        <img src={require('../assets/images/mcPageImg/banner.png').default} alt="" />
                        <img src={require('../assets/images/mcPageImg/banner.png').default} alt="" />
                    
                        <img src={require('../assets/images/mcPageImg/banner.png').default} alt="" />
                        <img src={require('../assets/images/mcPageImg/banner.png').default} alt="" />

                </Carousel>

            </div>
            {/* <div style={{display:'flex'}} >
            {
                filOffer.map(elem=>{
                    return( 
                    <>
                        <div style={{border:'2px solid black',width:'150px',height:'150px',margin:'8px'}} >
                            <p>vehicle:{elem.vehicle}</p>
                            <p>category:{elem.category}</p>
                            <p>brand{elem.brand}</p>
                        </div>
                    </>
                    )
                })
            }

            </div> */}
            
            <ExclusiveOffers>
                <Options>
                    <VehicleSelect>
                        <p className='title'>VEHICLE</p>
                        <div className="vehicle">
                            {vehicle===2?
                            <img src={require('../assets/images/mcPageImg/scooter-red-mini.png').default} alt="mini red scooter" />:
                            <img src={require('../assets/images/mcPageImg/scooter-gray-mini.png').default} alt="mini gray scooter" 
                            onClick={()=>filterVehicleType(2)} />
                            }
                            {
                            vehicle===4?
                            <img src={require('../assets/images/mcPageImg/car-red-mini.png').default} alt="mini red car" />:
                            <img src={require('../assets/images/mcPageImg/car-gray-mini.png').default} alt="mini gray car"
                            onClick={()=>filterVehicleType(4)}
                            />
                            }
                        </div>
                    </VehicleSelect>
                    <CategorySelect>
                        <p className='title'>CATEGORY</p>
                        <div className='category' >
                            <button className="categoryBtn" onClick={()=>filterCategory(0)} >
                                All
                            </button>
                            <button className={category===1?"categoryBtn selected":"categoryBtn"} onClick={()=>filterCategory(1)} >
                                Vehicle Services
                            </button>
                            <button className={category===2?"categoryBtn selected":"categoryBtn"} onClick={()=>filterCategory(2)}>
                                Spare Parts
                            </button>
                            <button className={category===3?"categoryBtn selected":"categoryBtn"} onClick={()=>filterCategory(3)}>
                                Battery
                            </button>
                            <button className={category===4?"categoryBtn selected":"categoryBtn"} onClick={()=>filterCategory(4)}>
                                Insurance
                            </button>
                            <button className={category===5?"categoryBtn selected":"categoryBtn"} onClick={()=>filterCategory(5)}>
                                Fastagy
                            </button>
                        </div>
                    </CategorySelect>
                    <BrandSelect>
                    <p className="title">BRANDS</p>
                    <div className="brands">
                        <button className={selectBrand===1?"brandsBtn selected":"brandsBtn"}
                        onClick={()=>SetselectBrand(1)}
                        >
                            CEAT
                        </button>
                        <button className={selectBrand===2?"brandsBtn selected":"brandsBtn"}
                            onClick={()=>SetselectBrand(2)}>
                                Pitsop
                        </button>
                        <button className={selectBrand===3?"brandsBtn selected":"brandsBtn"}
                        onClick={()=>SetselectBrand(3)}>SCAD</button>

                        <button className={selectBrand===4?"brandsBtn selected":"brandsBtn"}
                            onClick={()=>SetselectBrand(4)}>
                                IDFC First Bank
                        </button>
                        <button className={selectBrand===5?"brandsBtn selected":"brandsBtn"}
                            onClick={()=>SetselectBrand(5)}>
                            OTO Capital
                        </button>
                        <button className={selectBrand===6?"brandsBtn selected":"brandsBtn"}
                            onClick={()=>SetselectBrand(6)}>
                                Battery Wale
                        </button>
                        <button className={selectBrand===7?"brandsBtn selected":"brandsBtn"}
                        onClick={()=>SetselectBrand(7)}>Future Generali</button>
                        <button className={selectBrand===8?"brandsBtn selected":"brandsBtn"}
                        onClick={()=>SetselectBrand(8)}>boodmo</button>
                    </div>
                    </BrandSelect>
                </Options>
                <Cards leftArr={require('../assets/images/mcPageImg/arrow-left.svg').default}
                        rightArr={require('../assets/images/mcPageImg/arrow-right.svg').default}
                 >
                    <h4 className='cardHeading' ><span>EXCLUSIVE OFFERS FOR MEMBERS</span></h4>
                    
                    <div className="cardWrapper" ref={ref}>
                        {
                            exclusiveCards.map((elem,index)=>(
                        <div className='cardContainer' key={index} >
                            <Link to={'/motor-club/offers/detail'} >
                                <img src={elem.image} alt="" />
                            </Link>

                        </div>
                            ))
                        }
                        {
                            exclusiveCards.map((elem,index)=>(
                        <div className='cardContainer' key={index} >
                            <Link to={'/motor-club/offers/detail'} >
                                <img src={elem.image} alt="" />
                            </Link>

                        </div>
                            ))
                        }
                        
                    </div>
                    <div className="bottomScrollBtn">
                        <span >
                            <button className="scrollLeft" onClick={() => scroll(-300)} > &lt; </button>
                            <button className="scrollRight" onClick={() => scroll(300)} > &gt; </button>

                        </span>
                    </div>

            
                </Cards>
            </ExclusiveOffers>
            <AmazingOffers>
                <p className="title">AMAZING OFFERS AVAILABLE ON MOTOR CLUB</p>
                <Header>
                    {/* <div className="header-title">
                        Trending
                    </div> */}
                    <div className="header-title">
                        Hot Deals
                    </div>
                    <div className="header-title">
                        Limited Time Deals
                    </div>
                    <div className="header-title">
                        Comming Soon
                    </div>
                </Header>
                    <MultiCarousel
                    responsive={responsive}
                    containerClass="amazingCarousel"
                    >
                        <div className="cards">
                            <img src={require('../assets/images/mcPageImg/Amazing-Offers-1.png').default} alt="" />
                        </div>
                        <div className="cards">
                            <img src={require('../assets/images/mcPageImg/Amazing-Offers-2.png').default} alt="" />
                        </div>
                        <div className="cards">
                            <img src={require('../assets/images/mcPageImg/Amazing-Offers-3.png').default} alt="" />
                        </div>
                        <div className="cards">
                            <img src={require('../assets/images/mcPageImg/Amazing-Offers-1.png').default} alt="" />
                        </div>
                        <div className="cards">
                            <img src={require('../assets/images/mcPageImg/Amazing-Offers-2.png').default} alt="" />
                        </div>
                        <div className="cards">
                            <img src={require('../assets/images/mcPageImg/Amazing-Offers-3.png').default} alt="" />
                        </div>
                    </MultiCarousel>
                {/* <AmazingCards>
                        <div className="cards">
                            <img src={require('../assets/images/mcPageImg/Amazing-Offers-1.png').default} alt="" />
                        </div>
                        <div className="cards">
                            <img src={require('../assets/images/mcPageImg/Amazing-Offers-2.png').default} alt="" />
                        </div>
                        <div className="cards">
                            <img src={require('../assets/images/mcPageImg/Amazing-Offers-3.png').default} alt="" />
                        </div>
                </AmazingCards> */}
            </AmazingOffers>
            <Brands>
                <p className="title">Motor Club Partners</p>
                {brands.map((elem,index)=>(
                    <div className="brands">
                        <img key={index} src={elem} alt="" />
                    </div>
                ))}
            </Brands>
            <WhyMotorclub>
                <p className="title"><span>Why Motor Club?</span> </p>
                <div className="whyCardWrapper">
                    {
                        whyMotorClub.map((elem,index)=>(
                            <div key={index} className="whyCard">
                                <img src={elem.image} alt="" />
                                <p>{elem.text}</p>
                            </div>
                        ))
                    }
                </div>
            </WhyMotorclub>
            <Benefits>
                <p className="title">Miles of benefits</p>
                <div className="benefitCardWrapper">
                    <div className="benefitCard">
                        <p className="benefitCount">5000</p>
                        <p className="plus">+</p>
                        <p className="text">vehicle serviced</p>
                    </div>
                    <div className="benefitCard">
                        <p className="benefitCount">2000</p>
                        <p className="plus">+</p>
                        <p className="text">members availed discounts on spare parts</p>
                    </div>
                    <div className="benefitCard">
                        <p className="benefitCount">1000</p>
                        <p className="plus">+</p>
                        <p className="text">vehicle financed</p>
                    </div>
                    <div className="benefitCard">
                        <p className="benefitCount">10,000</p>
                        <p className="plus">+</p>
                        <p className="text">vehicle insured</p>
                    </div>
                </div>
            </Benefits>
            
        </Wrapper>
        <FooterSmall/>
        </>
    )
}

export default MotorClubOffers

const Wrapper = styled.div`
.carousel{
   
    img{
       height:600px;
       width:100%;
        object-fit: cover;
    }
    .bannerNavBtn{
        background:transparent;
        color:white;
        
        .MuiSvgIcon-root{
            font-size: 1.5em;
            width:1em;
            height: 1em;
        }
    }
}
`
const HeroSlider = styled.div`
height:400px;
img{
    height: 100%;
    width: 100%;
    object-fit: cover;
}

`
const ExclusiveOffers = styled.div`
    margin:5px 0;
    padding: 40px 10px;
    display:flex;
`
const Options = styled.div`
/* flex:0.4; */
width:40%;

padding:10px 30px;
.title{
    font-weight: 500;
    color:#eb2027;
    font-size: 18px;
}
`
const VehicleSelect = styled.div`
    border-bottom: 1px solid #cbc4c466;
    padding-bottom: 33px;
    margin-bottom: 15px;
.vehicle{
    display:flex;
    gap:8px;
    align-items: center;
    img{
    height: 30px;
    box-shadow: 0px 0px 3px 0px #7571716e;
    border-radius: 10px;
    padding: 5px;
    }
}
`
const CategorySelect = styled.div`
    border-bottom: 1px solid #cbc4c466;
    padding-bottom: 33px;
    margin-bottom: 15px;
.categoryBtn{
    border: none;
    border-radius: 12px;
    font-size: 13.5px;
    padding: 2px 14px;
    margin: 5px;
}
.selected{
    color: #eb2027;
    font-weight: 500;
}

`
const BrandSelect = styled.div`
.brandsBtn{
    border: none;
    border-radius: 12px;
    font-size: 14px;
    padding: 2px 14px;
    margin: 5px;
}
.selected{
    color: #eb2027;
    font-weight: 500;
}
`
const Cards = styled.div`
/* flex:0.6; */
width:50%;
border:2px solid #44404066;
padding:10px 13px;
position: relative;

::before{
    content:${props=>`url(${props.leftArr})`};
    position: absolute;
    display: block;
    top: 50%;
    left: -22px;
    
}
::after{
    content:${props=>`url(${props.rightArr})`};
    position: absolute;
    display: block;
    top: 50%;
    right: -22px;
    
}

.cardHeading{
    color:#eb2027;
    text-align:center;
    padding-bottom: 15px;
    margin-top: -25px;
    z-index: 2;
    span{
        background: white;
        padding: 0 5px;
    }
}
.cardWrapper{
    display: grid;
    grid-template-rows: repeat(2,1fr);
    overflow: scroll;
    grid-auto-flow: column;
    width: 100%;
    overflow-y: hidden;
    overflow-x: hidden;
    scroll-behavior: smooth;
    gap:5px;
    border-radius:8px ;
}
.cardContainer{
    height:220px;
    width:220px;
    img{
        height:100%;
        width:100%;
    }
}
.bottomScrollBtn{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: -34px;
    margin-top: 12px;
    gap:7px;
    .btnContainer{
        background:white;
    }
    button{
        border: none;
        margin: 0 5px;
        font-size: 21px;
        color: white;
        background-color: #8080809c;
        padding: 0px 11px;
        font-weight: 600;
    }
    span{
        background:white;
    }
}
`
const AmazingOffers = styled.div`
    box-shadow: -1px 1px 10px 4px #5855554d;
    padding: 40px 10px;
.title{
    color:#eb2027;
    text-align:center;
    font-size:20px;
}
img{
    width:100%;
}
.amazingCarousel{
    width: 100%;
}

`
const Header = styled.div`
    display: grid;
    grid-template-columns: 33.3% 33.3% 33.3%;
    .header-title{
        padding: 13px 50px;
        background: darkgray;
        color: white;
        font-weight: 400;
        margin: 1px 1px;
        text-align: center;
        }
`
const AmazingCards = styled.div`
    display: grid;
    grid-template-columns: 33.3% 33.3% 33.3%;

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
    border-right: 2px solid #eb202780;
    height:50px;
    padding: 7px 15px;
    img{
        height: 100%;
        
    }
}
`
const WhyMotorclub = styled.div`
padding:20px 100px;
    .title{
        font-size: 30px;
        color:#eb2027;
        font-weight: 700;
        text-align:center;
        position: relative;
            :before{
                content: '';
                background: #eb2027;
                position: absolute;
                top: 60%;
                left: 0;
                height: 2px;
                z-index: -1;
                width: 40%;
            }
            :after{
                content: '';
                background: #eb2027;
                position: absolute;
                top: 60%;
                right: 0;
                height: 2px;
                z-index: -1;
                width: 40%;
            }
            span{
                background:white;
            }
    }
.whyCardWrapper{
    display:flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 40px;
    .whyCard{
        width:200px;
        padding:15px;
        img{
            width:100%;
        }
        p{
            padding-top: 15px;
            text-align:center;
        }

    }
}
`
const Benefits = styled.div`
    background-color: #ce001b14;
    padding: 44px 0;
.title{
    text-align: center;
    color: #eb2027;
    font-size: 25px;
    font-weight: 700;
    padding-bottom: 23px;
}

.benefitCardWrapper{
    display:flex;
    align-items: center;
    justify-content: space-evenly;
    text-align:center;

    .benefitCard{
        width:210px;
    }

    .benefitCount{
        font-size: 23px;
        font-weight: 400;
    }
    .plus{
        font-size: 30px;
        margin-top: -33px;
    }
    .text{
        font-size: 16px;
        margin-top: -23px;
    }
}
`
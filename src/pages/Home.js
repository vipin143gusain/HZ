import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Header from '../components/Header';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ProudOwnerStrip from '../components/ProudOwnerStrip';
import FooterSmall from '../components/FooterSmall';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Hero from '../assets/images/cool-man.png';

const carouselData = [
  {
    title: 'Cyber Protect',
    premiumStarts: '7',
    sumInsured: '25,000',
    prodLink: 'cyber-protect'
  },
  {
    title: 'Laptop Insurance',
    premiumStarts: '300',
    sumInsured: '30,000',
    prodLink: 'laptop-insurance'
  },
  {
    title: 'TV Insurance',
    premiumStarts: '200',
    sumInsured: '25,000',
    prodLink: 'tv-insurance'
  },
  {
    title: 'Accident Insurance',
    premiumStarts: '365',
    sumInsured: '5 lakh',
    prodLink: 'personal-accident-insurance'
  },
  {
    customized: true,
    off: '40%',
    title: 'Bike Insurance',
    premiumStarts: '',
    sumInsured: '',
    prodLink: 'bike-insurance'
  },
  {
    customized: true,
    off: '70%',
    title: 'Car Insurance',
    premiumStarts: '',
    sumInsured: '',
    prodLink: 'car-insurance'
  },
  {
    title: 'Health Insurance',
    premiumStarts: '13',
    sumInsured: '3 lakh',
    prodLink: 'health-insurance'
  }
];

function Home() {
  const mobile = useMediaQuery('(max-width:600px)');
  
  let slidesToShow = 4;
  if (mobile) {
    slidesToShow = 1;
  }

  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: slidesToShow,
    slidesToScroll: 1
  };

  return (
    <div>
      <Header background="blue" />

      <Grid container>
        <Grid item md={12} xs={12}>

          <div className="top-heading">
            <div>Welcome to <span className="hero-text-bold">Genuine, Exciting </span></div>
            <div><span className="hero-text-bold">and DIY</span> world of Insurance</div>
          </div>

          <div className="hero-container">
            <img alt="" src={Hero} />
          </div>

          <div className="sol-con-con">
            <div className="solutions-container">

              <Slider {...settings}>
                {
                  carouselData.map((item, index) => {
                    return (
                      <div className="sol-box-con" key={`s-${index}`}>
                        <div className="sol-box" key={`item-${index}`}>
                          <div className="title">{item.title}</div>
                          <div>
                            {
                              item.customized === true
                                ?
                                <div className="costs-container">
                                  <div className="cost-box">
                                    <div className="subtext">Customised plans available</div>
                                    <div className="cost-num">upto {item.off} OFF</div>
                                    <div className="subtext">on Premium</div>
                                  </div>
                                </div>
                                :
                                <div className="costs-container">
                                  <div className="cost-box">
                                    <div className="subtext">Premium starts at</div>
                                    <div className="cost-num">&#x20b9; {item.premiumStarts}</div>
                                  </div>
                                  <div className="cost-box">
                                    <div className="subtext">Sum insured</div>
                                    <div className="cost-num">&#x20b9; {item.sumInsured}</div>
                                    <div className="subtext">onwards</div>
                                  </div>
                                </div>
                            }

                            <Link to={`${item.prodLink}`} className="know-more-btn">
                              Know More
                            </Link>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </Slider>


            </div>
          </div>

        </Grid>

        <Grid item md={12} xs={12}>
          <div className="we-create">we create protection solutions based on:</div>

          <Grid container className="create-logos">
            <Grid item md={2}></Grid>
            <Grid item md={4} xs={6} className="based-icon-box">
              <div className="based-icon-cont">
                <img alt="" src={require('../assets/images/consumer-ask.svg').default} />
              </div>
              <div>Consumer Ask</div>
            </Grid>
            <Grid item md={4} xs={6} className="based-icon-box">
              <div className="based-icon-cont">
                <img alt="" src={require("../assets/images/data-analytics.svg").default} />
              </div>
              <div>Deep Data Analytics</div>
            </Grid>
            <Grid item md={2}></Grid>
          </Grid>

          <Grid container className="create-logos">
            <Grid item md={2}></Grid>
            <Grid item md={4} xs={6} className="based-icon-box">
              <div className="based-icon-cont">
                <img alt="" src={require('../assets/images/low-margins.svg').default} />
              </div>
              <div>Low Margins</div>
            </Grid>
            <Grid item md={4} xs={6} className="based-icon-box">
              <div className="based-icon-cont">
                <img alt="" src={require("../assets/images/honesty.svg").default} />
              </div>
              <div>Honesty & Transparency</div>
            </Grid>
            <Grid item md={2}></Grid>
          </Grid>

          <div className="margin-div"></div>

          <div className="hr-line"></div>

          <div className="we-create">Backed by</div>

          <div className="backed-logo-con">
            <div className="backed">
              <img alt="" src={require("../assets/images/fglogo.png").default} />
            </div>
            <div className="backed glogo">
              <img alt="" src={require("../assets/images/glogo.png").default} />
            </div>
          </div>

          <Grid container>
            <Grid item md={2}></Grid>
            <Grid item md={1} xs={12} className="badge-con-col">
              <div className="badge-icon-con">
                <img alt="" src={require('../assets/images/badge.png').default} />
              </div>
            </Grid>
            <Grid item md={7} xs={12}>

              <div className="backed-text">
                Hello Zindagi is a FMCG styled brand. It is owned by FG&G Distribution Pvt Ltd, a joint venture between Future Group and Generali. Generali is a global insurance major with over 190 years of experience, present in 75 countries and with over 70,000 employees. Their vast international experience allows for quick development of new commercial insurance products back-ended with proven technology. Future Group is widely credited for developing India’s best known consumer brands and experiences. The insights and data support from the group gives a strong platform to Hello Zindagi for being ‘most customer centric’.
              </div>

            </Grid>
            <Grid item md={2}></Grid>
          </Grid>

          <div className="margin-div-2"></div>
          <div className="hr-line"></div>
          {/* <div className="we-create">Partner with us</div>

            <Grid container>
              <Grid item md={2}></Grid>
              <Grid item md={8} xs={12}>
                <div className="partner-text">
                  We offer Insurance products that seamlessly integrate with other digitally-driven products/services and aspire to simplify it for the greater good. Data-powered and tech-backed, we have created products for some of the best in business and help them provide more value to the customers
                </div>
                <div className="partners-con">
                  <div>Partners:</div>
                  <div className="plogo-con">
                    <img alt="" src={require('../assets/images/bigbazaar.png').default} />
                  </div>
                  <div className="plogo-con">
                    <img alt="" src={require('../assets/images/koryo.png').default} />
                  </div>
                  <div className="plogo-con">
                    <img alt="" src={require('../assets/images/ceriz.png').default} />
                  </div>
                </div>
              </Grid>
              <Grid item md={2}></Grid>
            </Grid> */}

          <div className="margin-div-2"></div>


        </Grid>

      </Grid>

      {/* <ProudOwnerStrip /> */}
      <FooterSmall />

    </div>
  );
}

export default Home;

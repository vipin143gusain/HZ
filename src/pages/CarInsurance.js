import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Header from '../components/Header';
import SuperBenefitsStrip from '../components/SuperBenefitsStrip';
import ProudOwnerStrip from '../components/ProudOwnerStrip';
import FooterSmall from '../components/FooterSmall';

const covered = [
  'Vehicle damage: This benefit covers any damage to your vehicle on account of an accident, burglary, theft or housebreaking.',
  'It also covers your vehicle on account of any damage caused due to fire, lightning, self-ignition, explosion, riot, strike, malicious act, terrorism, earthquake, flood, cyclone and inundation.',
  'This cover also encompasses protection against any damage caused to your vehicle while in transit by road, rail, air and elevator.',
  'Third party liability: This benefit protects you against any third party liability that you may incur on account of the death or bodily injury to any person or damage to property.',
  'The policy also covers the legal expenses you might incur to defend this claim. This is a mandatory insurance coverage for your vehicle.',
];

const notCovered = [
  'Normal wear, tear and general ageing of the vehicle',
  'Any depreciation or any consequential loss and mechanical / electrical breakdown',
  'Vehicle being used in ways or for purposes other than those in accordance with limitations as to use',
  'Any damage to / by a person driving the vehicle without a valid license Any damage to / by a person driving the vehicle under the influence of drugs or liquor Loss or damage due to war, mutiny or nuclear risk',
  'Any accident outside the geographical area',
];



function CarInsurance() {
  return (
    <div>
      <Header />
      <Grid container>
        <Grid item md={1}></Grid>
        <Grid item md={5}>
          <div className="prod-header-part">
            <div className="prod-heading">Car Insurance</div>
            <div>We are here to transform the way you look at your car insurance needs. Not only do we cover accidental damages and theft , but also any third-party liability or legal expenses you might need help with.</div>

            <Hidden smUp>
              <div className="ref-img">
                <img alt="" src={require("../assets/images/car_insu.svg").default} />
              </div>
            </Hidden>

            <div className="highlight-con">
              <div className="red-btn">Customized plans available</div>
              <div className="white-btn">Upto 70% off on Premium</div>
            </div>
            <div className="highlight-helper">Policy Duration: 365 Days</div>

            <div className="action-line">Put a brake on stress</div>
            <div className="apply-btn-con"><Link to="register?product=car-insurance" className="apply-btn">Apply Now</Link></div>
          </div>
        </Grid>
        <Grid item md={5}>
          <Hidden smDown>
            <div className="ref-img">
              <img alt="" src={require("../assets/images/car_insu.svg").default} />
            </div>
          </Hidden>
        </Grid>
        <Grid item md={1}></Grid>
      </Grid>

      <Grid container>
        <Grid item md={1}></Grid>
        <Grid item md={10} xs={12}>
          <div className="we-create">key features</div>
          <div className="risk-logo-con">
            <div className="risk-logo-div">
              <img alt="" src={require("../assets/images/highcover.svg").default} />
              <div>Accidental Damages, Fire, Theft and Burglary</div>
            </div>
            <div className="risk-logo-div">
              <img alt="" src={require("../assets/images/workshops.svg").default} />
              <div>More than 2500 cashless workshops</div>
            </div>
            <div className="risk-logo-div">
              <img alt="" src={require("../assets/images/survey.svg").default} />
              <div>In-house surveyors for swift & easy settlements</div>
            </div>
            <div className="risk-logo-div">
              <img alt="" src={require("../assets/images/thumbsup.svg").default} />
              <div>Towing assistance (within city limits only)</div>
            </div>
          </div>

          <Grid container>
            <Grid item md={6} xs={12}>
              <div className="cover-heading">What is covered?</div>
              <div className="points-container">
                {
                  covered.map((item, index) => (
                    <div key={`item-${index}`} className="covered-con">
                      <div className="red-bullet"></div>
                      <div className="point-text">{item}</div>
                    </div>
                  ))
                }
              </div>
            </Grid>
            <Grid item md={6} xs={12}>
              <div className="cover-heading">What is not covered?</div>
              <div className="points-container">
                {
                  notCovered.map((item, index) => (
                    <div key={`item-${index}`} className="covered-con">
                      <div className="red-bullet"></div>
                      <div className="point-text">{item}</div>
                    </div>
                  ))
                }
              </div>
            </Grid>

            <Grid item md={2}></Grid>
            <Grid item md={8} xs={12}>
              <div className="hr-line-3"></div>
              <div className="disclaim-text">Disclaimer: For complete details of Policy coverage, terms, conditions and exclusions, please refer the policy wordings</div>

              <div className="download-con-bike">
                <div className="bike-dl-block">
                  <img alt="" src={require("../assets/images/policy-doc2.svg").default} className="doc-img" />
                  <div className="doc-text-div">
                    <div>Policy Wordings</div>
                    <a href={require("../assets/pdf/Car Insurance Policy Wordings.pdf").default}> <img alt="" src={require("../assets/images/download.svg").default} /></a>
                  </div>
                </div>
                <div className="bike-dl-block">
                  <img alt="" src={require("../assets/images/doc-form.svg").default} className="doc-img" />
                  <div className="doc-text-div">
                    <div>Proposal Form</div>
                    <a href={require("../assets/pdf/Car Insurance Proposal form.pdf").default}> <img alt="" src={require("../assets/images/download.svg").default} /></a>
                  </div>
                </div>
                <div className="bike-dl-block">
                  <img alt="" src={require("../assets/images/doc-form.svg").default} className="doc-img" />
                  <div className="doc-text-div">
                    <div>Claim Form</div>
                    <a href={require("../assets/pdf/Car Insurance Claim form.pdf").default}> <img alt="" src={require("../assets/images/download.svg").default} /></a>
                  </div>
                </div>
              </div>

              <div className="hr-line-3"></div>

              <div className="notice-text">Important Notice: The Motor Third Party Liability Premium has been revised from 1st April 2016.</div>
            </Grid>
            <Grid item md={2}></Grid>

            <Grid item md={12} className="extra-offer-con">
              <div className="offer-left">
                <div>Get upto</div>
                <div className="percent">70% OFF</div>
              </div>
              <div className="offer-mid">
                <div>on your car Insurance renewal.</div>
                <div>Limited period offer</div>
              </div>
              <div className="offer-right">
                <div className="apply-btn-con"><Link to="register?product=car-insurance" className="apply-btn">Apply Now</Link></div>
              </div>
            </Grid>

          </Grid>

        </Grid>
        <Grid item md={1}></Grid>
      </Grid>

      <SuperBenefitsStrip />
      {/* <ProudOwnerStrip /> */}
      <FooterSmall />

    </div>
  );
}

export default CarInsurance;
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Header from '../components/Header';
import SuperBenefitsStrip from '../components/SuperBenefitsStrip';
import ProudOwnerStrip from '../components/ProudOwnerStrip';
import FooterSmall from '../components/FooterSmall';

const covered = [
  'Bike Damage: In the event of ordinary losses/damages to your bike, regardless of who is at fault and where the accident took place, a wide variety of cases, from broken windows to theft or destruction is covered.',
  'Third Party Liability: Any legal liability that you may incur due to the death of or bodily injury to a third party or damage to the property of a third party while using your bike, is covered. The policy also covers the legal expenses you might incur to defend this claim. This is a mandatory insurance coverage for your bike.',
  'Personal Accident Cover: A compulsory Personal Accident cover of Rs. 15 lakhs is available for individual owners of the bike while driving (Available only if the owner of the bike holds a valid driving license). You can also opt for a Personal Accident cover for passengers (Named or un-named) up to a maximum amount of Rs. 2 lakhs per person.',
  'Additional Legal Liabilities: The following additional legal liabilities may also be opted for at an additional premium – ',
];

const bulletPoints = [
  '• Paid driver/conductor/cleaner employed in operation of the bike ',
  '• Employees travelling in/driving the bike other than paid driver ',
  '• Non-fare paying passengers',
];


function BikeInsurance() {
  return (
    <div>
      <Header />
      <Grid container>
        <Grid item md={1}></Grid>
        <Grid item md={5}>
          <div className="prod-header-part">
            <div className="prod-heading">Bike Insurance</div>
            <div>We trust your motor-biking skills and yet we are here to cover all the potential damage against all odds to make sure your safety comes first. Our plan encompasses protection against any damage caused to your vehicle along with third party damages.</div>

            <Hidden smUp>
              <div className="ref-img">
                <img alt="" src={require("../assets/images/bike.svg").default} />
              </div>
            </Hidden>

            <div className="highlight-con">
              <div className="red-btn">Customized plans available</div>
              <div className="white-btn">Upto 40% off on Premium</div>
            </div>
            <div className="highlight-helper">Policy Duration: 365 Days</div>

            <div className="action-line">Accelerate your way to safety</div>
            <div className="apply-btn-con"><Link to="register?product=bike-insurance" className="apply-btn">Apply Now</Link></div>
          </div>
        </Grid>
        <Grid item md={5}>
          <Hidden smDown>
            <div className="ref-img">
              <img alt="" src={require("../assets/images/bike.svg").default} />
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
              <div>Cover against accidental damages, fire & theft</div>
            </div>
            <div className="risk-logo-div">
              <img alt="" src={require("../assets/images/instant-policy.svg").default} />
              <div>Instant policy issuance</div>
            </div>
            <div className="risk-logo-div">
              <img alt="" src={require("../assets/images/personalized.svg").default} />
              <div>Personalized service</div>
            </div>
            <div className="risk-logo-div">
              <img alt="" src={require("../assets/images/thumbsup.svg").default} />
              <div>Quick claims settlement</div>
            </div>
          </div>

          <Grid container>
            <Grid item md={12} xs={12}>
              <div className="cover-heading covered-only">What is covered?</div>
              <div className="points-container">
                {
                  covered.map((item, index) => (
                    <div key={`item-${index}`} className="covered-con">
                      <div className="red-bullet"></div>
                      <div className="point-text">{item}</div>
                      {index === 3 &&
                        bulletPoints.map((item2, index2) => (
                          <div className="subbullets" key={`item-${index}-b`}>{item2}</div>
                        ))
                      }
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
                  <img alt="" src={require("../assets/images/doc.svg").default} className="doc-img" />
                  <div className="doc-text-div">
                    <div>Policy Wordings</div>
                    <a href={require("../assets/pdf/Bike Insurance Policy Wordings.pdf").default}> <img alt="" src={require("../assets/images/download.svg").default} /></a>
                  </div>
                </div>
                <div className="bike-dl-block">
                  <img alt="" src={require("../assets/images/doc-form.svg").default} className="doc-img" />
                  <div className="doc-text-div">
                    <div>Proposal Form</div>
                    <a href={require("../assets/pdf/Bike Insurance Proposal form.pdf").default}> <img alt="" src={require("../assets/images/download.svg").default} /></a>
                    <a style={{ display: 'none' }} href={require("../assets/pdf/PDF/HZMC_DigitalCoupons_CInc_V5.pdf").default}> <img alt="" src={require("../assets/images/download.svg").default} /></a>

                  </div>
                </div>
              </div>

              <div className="hr-line-3"></div>

            </Grid>
            <Grid item md={2}></Grid>


            <Grid item md={12} className="extra-offer-con">
              <div className="offer-left">
                <div>Get upto</div>
                <div className="percent">40% OFF</div>
              </div>
              <div className="offer-mid">
                <div>on your bike Insurance renewal.</div>
                <div>Limited period offer</div>
              </div>
              <div className="offer-right">
                <div className="apply-btn-con"><Link to="register?product=bike-insurance" className="apply-btn">Apply Now</Link></div>
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

export default BikeInsurance;

import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Header from '../components/Header';
import SuperBenefitsStrip from '../components/SuperBenefitsStrip';
import ProudOwnerStrip from '../components/ProudOwnerStrip';
import FooterSmall from '../components/FooterSmall';

const covered = [
  'This policy covers the insured in case of Permanent Total Disability, Permanent Partial Disability, Temporary Total Disability & Death arising due to Accident including Disappearance and Drowning',
  'Under Permanent Total Disability and Permanent Partial Disability benefits, covers like Coma, Accidental Head Injury, Burns etc are being covered separately under Special conditions',
  'An inbuilt cover for Repatriation Benefit and Funeral Expenses-An amount up to a maximum of 1% of the Accidental Death Sum Insured would be reimbursed for the repatriation of the insured person’s remains subject to maximum of ₹ 12500/- . No additional premium to be paid for this cover',
  'Terrorism is covered',
];


function PersonalAccidentInsurance() {
  return (
    <div>
      <Header />
      <Grid container>
        <Grid item md={1}></Grid>
        <Grid item md={5}>
          <div className="prod-header-part">
            <div className="prod-heading">Personal Accident Insurance</div>
            <div>Do not let any uneventful situation hinder your success. We strive to provide maximum protection cover to you and your loved ones at the most minimal price.</div>

            <Hidden smUp>
              <div className="ref-img">
                <img alt="" src={require("../assets/images/accident.svg").default} />
              </div>
            </Hidden>

            <div className="highlight-con">
              <div className="red-btn">Premium: Starts from Rs 365/-</div>
              <div className="white-btn">Sum Insured: Up to Rs 500,000</div>
            </div>
            <div className="highlight-helper">Policy Duration: 365 Days</div>

            <div className="action-line">A Lifejacket that keeps you afloat</div>
            <div className="apply-btn-con"><Link to="register?product=personal-accident-insurance" className="apply-btn">Apply Now</Link></div>
          </div>
        </Grid>
        <Grid item md={5}>
          <Hidden smDown>
            <div className="ref-img">
              <img alt="" src={require("../assets/images/accident.svg").default} />
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
              <div>No medical check-up required</div>
            </div>
            <div className="risk-logo-div">
              <img alt="" src={require("../assets/images/covers-death.svg").default} />
              <div>Covers death or disability</div>
            </div>
            <div className="risk-logo-div">
              <img alt="" src={require("../assets/images/no-waiting.svg").default} />
              <div>Instant policy issuance with no waiting period</div>
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
                    </div>
                  ))
                }
              </div>
            </Grid>

            <Grid item md={2}></Grid>
            <Grid item md={8}>
              <div className="hr-line-3"></div>
              <div className="disclaim-text">Disclaimer: For complete details of Policy coverage, terms, conditions and exclusions, please refer the policy wordings</div>

              <div className="download-con-bike">
                <div className="bike-dl-block">
                  <img alt="" src={require("../assets/images/policy-doc2.svg").default} className="doc-img" />
                  <div className="doc-text-div">
                    <div>Policy Wordings</div>
                    <a href={require("../assets/pdf/Personal Accident Policy wordings.pdf").default}> <img alt="" src={require("../assets/images/download.svg").default} /></a>
                  </div>
                </div>
                <div className="bike-dl-block">
                  <img alt="" src={require("../assets/images/doc-form.svg").default} className="doc-img" />
                  <div className="doc-text-div">
                    <div>Proposal Form</div>
                    <a href={require("../assets/pdf/Personal Accident Proposal form.pdf").default}> <img alt="" src={require("../assets/images/download.svg").default} /></a>
                  </div>
                </div>
              </div>

              <div className="hr-line-3"></div>

            </Grid>
            <Grid item md={2}></Grid>

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

export default PersonalAccidentInsurance;

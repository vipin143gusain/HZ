import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Header from '../components/Header';
import SuperBenefitsStrip from '../components/SuperBenefitsStrip';
import ProudOwnerStrip from '../components/ProudOwnerStrip';
import FooterSmall from '../components/FooterSmall';

const keyFeatures = [
  'Hospitalization Medical Expenses',
  'Day Care Treatment',
  'Domiciliary Hospitalization Expenses',
  'Pre-Hospitalization Medical Expenses',
  'Out-Patient Medical Expenses (Applicable for Superior Plan and Premiere Plan only)',
  'Post-Hospitalization Medical Expenses',
  'Child Vaccination Benefits (Applicable for Premiere Plan)',
  'Restoration of Sum Insured',
  'New Born Baby (Applicable for Superior and Premiere Plan)',
  'Maternity Expenses',
  'Emergency Medical Evacuation (Applicable for Superior and Premiere plan)',
  'E-opinion in respect of an illness or injury',
  'Organ Donor Expenses',
  'Alternative Treatment Cover',
  'Patient Care Medical Treatment Abroad (Applicable for Premiere Plan)',
  'Accident Hospitalization (Increase in Sum Insured)',
  'Wellness Care',
  'Accompanying Person',
  'Cumulative Bonus',
  'Road Ambulance Charges',
];


function HealthInsurance() {
  return (
    <div>
      <Header />
      <Grid container>
        <Grid item md={1}></Grid>
        <Grid item md={5}>
          <div className="prod-header-part">
            <div className="prod-heading">Health Insurance</div>
            <div>It’s true what they say, health is wealth. We place equal importance on your physical as well as your emotional wellbeing. The best-in-class individual, as well as family floater plan, are now available at your disposal.</div>

            <Hidden smUp>
              <div className="ref-img">
                <img alt="" src={require("../assets/images/health.svg").default} />
              </div>
            </Hidden>

            <div className="highlight-con">
              <div className="red-btn">Premium: Starts from Rs 13/- per day</div>
              <div className="white-btn">Sum Insured: Rs 300,000 onwards</div>
            </div>
            <div className="highlight-helper">Policy Duration: 365 Days</div>

            <div className="action-line">A shield against rising healthcare cost</div>
            <div className="apply-btn-con"><Link to="register?product=health-insurance" className="apply-btn">Apply Now</Link></div>
          </div>
        </Grid>
        <Grid item md={5}>
          <Hidden smDown>
            <div className="ref-img">
              <img alt="" src={require("../assets/images/health.svg").default} />
            </div>
          </Hidden>
        </Grid>
        <Grid item md={1}></Grid>
      </Grid>

      <Grid container>
        <Grid item md={1}></Grid>
        <Grid item md={10} xs={12}>
          <div className="we-create">key features</div>

          <div className="points-container points-health">
            {
              keyFeatures.map((item, index) => (
                <div key={`item-${index}`} className="covered-con">
                  <div className="red-bullet"></div>
                  <div className="point-text">{item}</div>
                </div>
              ))
            }
          </div>

          <Grid container>

            <Grid item md={2}></Grid>
            <Grid item md={8}>
              <div className="hr-line-3"></div>
              <div className="disclaim-text">Disclaimer: For complete details of Policy coverage, terms, conditions and exclusions, please refer the policy wordings</div>

              <div className="download-con-bike">
                <div className="bike-dl-block">
                  <img alt="" src={require("../assets/images/policy-doc2.svg").default} className="doc-img" />
                  <div className="doc-text-div">
                    <div>Policy Wordings</div>
                    <a href={require("../assets/pdf/Health Total_Policy Wordings.pdf").default}> <img alt="" src={require("../assets/images/download.svg").default} /></a>
                  </div>
                </div>
                <div className="bike-dl-block">
                  <img alt="" src={require("../assets/images/policy-doc2.svg").default} className="doc-img" />
                  <div className="doc-text-div">
                    <div>Product Brochure</div>
                    <a href={require("../assets/pdf/HealthTotal-eBrochure.pdf").default}> <img alt="" src={require("../assets/images/download.svg").default} /></a>
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

export default HealthInsurance;

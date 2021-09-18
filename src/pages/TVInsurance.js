import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Header from '../components/Header';
import SuperBenefitsStrip from '../components/SuperBenefitsStrip';
import ProudOwnerStrip from '../components/ProudOwnerStrip';
import FooterSmall from '../components/FooterSmall';

const covered = [
  'Accidental damages',
  'Damage due to liquid',
  'Fire & allied perils',
  'Theft & Burglary'
];

const notCovered = [
  'Wear and tear, corrosion of parts',
  'Pre existing faults or defects',
  'Aesthetic defects such as scratches on painted, polished or enameled surfaces etc.',
  'Loss or damage to bulbs, valves, tubes, ribbons etc.',
  'Malicious damage by workmen',
];


function TVInsurance() {
  return (
    <div>
      <Header />
      <Grid container>
        <Grid item md={1}></Grid>
        <Grid item md={5}>
          <div className="prod-header-part">
            <div className="prod-heading">TV Insurance</div>
            <div>TV sets are expensive nowadays, so isn’t it sensible to protect it? We have curated an easy and effective TV insurance solution so you can stay entertained worry-free.</div>

            <Hidden smUp>
              <div className="ref-img">
                <img alt="" src={require("../assets/images/entertainment.png").default} />
              </div>
            </Hidden>

            <div className="highlight-con">
              <div className="red-btn">Premium: Starts from Rs 200/-</div>
              <div className="white-btn">Sum Insured: Up to Rs 25,000</div>
            </div>

            <div className="action-line">Secure your daily dose of entertainment</div>
            <div className="apply-btn-con"><Link to="register?product=tv-insurance" className="apply-btn">Apply Now</Link></div>
          </div>
        </Grid>
        <Grid item md={5}>
          <Hidden smDown>
            <div className="ref-img">
              <img alt="" src={require("../assets/images/entertainment.png").default} />
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
              <div>High cover at low premium</div>
            </div>
            <div className="risk-logo-div">
              <img alt="" src={require("../assets/images/coversnew.svg").default} />
              <div>Covers new & up to 18 months old TV</div>
            </div>
            <div className="risk-logo-div">
              <img alt="" src={require("../assets/images/liquid-damage.svg").default} />
              <div>Covers liquid & accidental damages</div>
            </div>
            <div className="risk-logo-div">
              <img alt="" src={require("../assets/images/thumbsup.svg").default} />
              <div>Quick claim settlement</div>
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
            <Grid item md={8}>
              <div className="hr-line-3"></div>
              <div className="disclaim-text">Disclaimer: For complete details of Policy coverage, terms, conditions and exclusions, please refer the policy wordings</div>
              <div className="download-con">
                <div>Download <br /> policy wordings</div>
                <img alt="" src={require("../assets/images/pdf-icon.png").default} />
                <a href={require("../assets/pdf/TV Policy Wordings.pdf").default}> <img alt="" src={require("../assets/images/download.svg").default} /></a>
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

export default TVInsurance;

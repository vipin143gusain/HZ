import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Header from '../components/Header';
import SuperBenefitsStrip from '../components/SuperBenefitsStrip';
import ProudOwnerStrip from '../components/ProudOwnerStrip';
import FooterSmall from '../components/FooterSmall';

const cyberCovered = [
  'Privacy Breach and Data Breach by Third Party',
  'Information Technology Theft Loss',
  'Email Spoofing',
  'Identity Theft',
  'Social Media hacking',
  'Malware risk',
  'Media Liability claims',
  'Cyber Stalking',
  'Phishing',
  'Cyber Extorsion'
];

const cyberNotCovered = [
  'Loss due to negligence ',
  'Loss due to physical theft of cards or smart devices ',
  'Physical loss of money ',
  'Loss due to share trading'
];


function CyberProtect() {
  return (
    <div>
      <Header />
      <Grid container>
        <Grid item md={1}></Grid>
        <Grid item md={5}>
          <div className="prod-header-part">
            <div className="prod-heading">Cyber Protect</div>
            <div>9 out of 10 people that lost money in cyber frauds didn’t think they needed cyber insurance in the first place. Do you see a lesson here?</div>
            <div>Don’t wait for financial losses to happen.</div>
            <div>Get Cyber Insurance cover today.</div>

            <Hidden smUp>
              <div className="ref-img">
                <img alt="" src={require("../assets/images/hacker.svg").default} />
              </div>
            </Hidden>

            <div className="highlight-con">
              <div className="red-btn">Premium: Starts from Rs 7/- per month</div>
              <div className="white-btn">Sum Insured: Up to Rs 25,000</div>
            </div>

            <div className="action-line">Keep yourself protected from cyber frauds</div>
            <div className="apply-btn-con"><Link to="register?product=cyber-protect" className="apply-btn">Apply Now</Link></div>
          </div>
        </Grid>
        <Grid item md={5}>
          <Hidden smDown>
            <div className="ref-img">
              <img alt="" src={require("../assets/images/hacker.svg").default} />
            </div>
          </Hidden>
        </Grid>
        <Grid item md={1}></Grid>
      </Grid>

      <Grid container>
        <Grid item md={1}></Grid>
        <Grid item md={10} xs={12}>
          <div className="we-create">Types of Cyber Risks</div>
          <div className="risk-logo-con">
            <div className="risk-logo-div">
              <img alt="" src={require("../assets/images/password.png").default} />
              <div>Passwords Hacked</div>
            </div>
            <div className="risk-logo-div">
              <img alt="" src={require("../assets/images/otp.svg").default} />
              <div>OTP Compromised</div>
            </div>
            <div className="risk-logo-div">
              <img alt="" src={require("../assets/images/netbanking.png").default} />
              <div>Netbanking Security Breach</div>
            </div>
            <div className="risk-logo-div">
              <img alt="" src={require("../assets/images/social.png").default} />
              <div>Social Media Account Hacked</div>
            </div>
          </div>

          <Grid container>
            <Grid item md={6} xs={12}>
              <div className="cover-heading">What is covered?</div>
              <div className="points-container">
                {
                  cyberCovered.map((item, index) => (
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
                  cyberNotCovered.map((item, index) => (
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
              <div className="centre-text">Policy indemnifies an individual against financial losses arising due to cyber frauds</div>
              <div className="hr-line-3"></div>
              <div className="disclaim-text">Disclaimer: For complete details of Policy coverage, terms, conditions and exclusions, please refer the policy wordings</div>
              <div className="download-con">
                <div>Download <br /> policy wordings</div>
                <img alt="" src={require("../assets/images/pdf-icon.png").default} />
                <a href={require("../assets/pdf/Cyber Protect Policy Wordings.pdf").default}> <img alt="" src={require("../assets/images/download.svg").default} /></a>
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

export default CyberProtect;
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Header from '../components/Header';
import SuperBenefitsStrip from '../components/SuperBenefitsStrip';
import ProudOwnerStrip from '../components/ProudOwnerStrip';
import FooterSmall from '../components/FooterSmall';

const cyberCovered = [
  'Fire & allied perils ',
  'Riot and strike, explosion ',
  'Breakdown or derangement ',
  'Short circuit or voltage fluctuations ',
  'Arcing, theft, burglary ',
  'Costs of external data media (punch cards, paper tapes, magnetic tapes, discs etc) ',
  'Cost of reconstruction of data'
];

const cyberNotCovered = [
  'Wear and tear, corrosion of parts ',
  'Pre existing faults or defects. ',
  'Aesthetic defects such as scratches on painted, polished or enameled surfaces etc. ',
  'Loss or damage to bulbs, valves, tubes, ribbons etc. ',
  'Malicious damage by workmeng'
];


function LaptopInsurance() {
  return (
    <div>
      <Header />
      <Grid container>
        <Grid item md={1}></Grid>
        <Grid item md={5}>
          <div className="prod-header-part">
            <div className="prod-heading">Laptop Insurance</div>
            <div>We all realize how exhausting it is to claim warranties or get a laptop fixed. It is expensive, time-consuming and most warranties do not even cover liquid damages. On the contrary, insurance provides high coverage at a nominal cost.</div>

            <Hidden smUp>
              <div className="ref-img">
                <img alt="" src={require("../assets/images/laptop-insu.svg").default} />
              </div>
            </Hidden>

            <div className="highlight-con">
              <div className="red-btn">Premium: Starts from Rs 300/-</div>
              <div className="white-btn">Sum Insured: Up to Rs 30,000</div>
            </div>
            <div className="highlight-helper">Policy Duration: 365 Days</div>

            <div className="action-line">Protect your work buddy</div>
            <div className="apply-btn-con"><Link to="register?product=laptop-insurance" className="apply-btn">Apply Now</Link></div>
          </div>
        </Grid>
        <Grid item md={5}>
          <Hidden smDown>
            <div className="ref-img">
              <img alt="" src={require("../assets/images/laptop-insu.svg").default} />
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
              <img alt="" src={require("../assets/images/lowcost.svg").default} />
              <div>Low cost plans</div>
            </div>
            <div className="risk-logo-div">
              <img alt="" src={require("../assets/images/accidental.svg").default} />
              <div>Covers accidental & liquid damage</div>
            </div>
            <div className="risk-logo-div">
              <img alt="" src={require("../assets/images/thumbsup.svg").default} />
              <div>Quick claims settlement</div>
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
              <div className="centre-text">Laptop Insurance is an all risk cover. All perils are covered unless specifically excluded.</div>
              <div className="hr-line-3"></div>
              <div className="disclaim-text">Disclaimer: For complete details of Policy coverage, terms, conditions and exclusions, please refer the policy wordings</div>
              <div className="download-con">
                <div>Download <br /> policy wordings</div>
                <img alt="" src={require("../assets/images/pdf-icon.png").default} />
                <a href={require("../assets/pdf/Laptop Policy wordings.pdf").default}> <img alt="" src={require("../assets/images/download.svg").default} /></a>
                
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

export default LaptopInsurance;
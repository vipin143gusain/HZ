import React from 'react';
import Grid from '@material-ui/core/Grid';

export default function Footer() {

  return (
    <div className="footer-con">
      <Grid container >
        <Grid item md={5}>
          <div className="f-links-con">
            <div className="f-links-col">
              <div>Company</div>
              <div>Management Team</div>
              <div>Partner with us</div>
              <div>IRDA Reg. No</div>
            </div>
            <div className="f-links-col">
              <div>Support</div>
              <div>Customer Service</div>
              <div>Registered Office</div>
            </div>
            <div className="f-links-col">
              <div>Resources</div>
              <div>Downloads</div>
              <div>Media</div>
            </div>
            <div className="f-links-col">
              <div>Legal</div>
              <div>Privacy Policy</div>
              <div>Disclaimer</div>
              <div>Terms & Conditions</div>
            </div>
              
          </div>
        </Grid>
        <Grid item md={4}>
        </Grid>
        <Grid item md={3}>
          <div className="wa-block">
            <div className="wa-logo-con">
              <img src={require('../assets/images/wa-logo.png').default} alt="imgg1" />
            </div>
            <div className="wa-text-con">
              <div>WhatsApp us on</div>
              <div>+91 87675 16040</div>
            </div>
          </div>
        </Grid>

      </Grid>

      <Grid container className="rights-con">
        <Grid item md={9}>
          <div>
            <div>© FG&G Distribution Pvt Ltd. All Rights Reserved.</div>
            <div>Tax benefits are as per Income Tax Act, 1961 and are subject to modifications made thereto from time to time. Insurance is the subject matter of solicitation.</div>
          </div>
        </Grid>
        <Grid item md={3}>
          <div className="media-links-con">
            <div>Connect with us</div>
            <div className="media-link">
              <img src={require('../assets/images/facebook.svg').default} alt="imgg2" />
              <img src={require('../assets/images/linkedin.svg').default} alt="imgg3" />
              <img src={require('../assets/images/instagram.png').default} alt="imgg4" />
            </div>
          </div>
        </Grid>
      </Grid>

    </div>
  );
}
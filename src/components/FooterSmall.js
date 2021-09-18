import React from 'react';
import Grid from '@material-ui/core/Grid';

export default function FooterSmall() {

  return (
    <div className="footer-con footer-con-small">
      <Grid container >
        <Grid item md={8}>
          <div className="footer-sm-title">FG&G Distribution Pvt. Ltd.</div>
          <div>(A JV between Future Group and Assicurazioni Generali)</div>
          <div>CIN: U66000MH2018PTC316154 | IRDA Registration number: 316154</div>
          <div>Category: Company Limited by Shares, Non-govt company</div>
        </Grid>
        <Grid item md={4} xs={12}>
          <div className="sm-connect-media">
            <div>Connect with us</div>
            <div className="media-links-sm">
              <a href="https://www.facebook.com/Hello-Zindagi-Insurance-109215517986276" target="_blank" rel="noreferrer"><img alt="" src={require('../assets/images/facebook.svg').default} /></a>
              <a href="https://twitter.com/hellozindgi1"><img alt="" src={require('../assets/images/twitter.svg').default} /></a>
              <a href="https://www.linkedin.com/company/77373988/admin/" target="_blank" rel="noreferrer"><img alt="" src={require('../assets/images/linkedin.svg').default} /></a>
              <a href="https://api.whatsapp.com/send/?phone=918767516040&text=hello" target="_blank" rel="noreferrer"><img alt="" src={require('../assets/images/whatsapp.svg').default} /></a>
            </div>
          </div>
        </Grid>

      </Grid>

    </div>
  );
}
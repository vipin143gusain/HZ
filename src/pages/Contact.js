import Grid from '@material-ui/core/Grid';
import Header from '../components/Header';
import FooterSmall from '../components/FooterSmall';

function Contact() {
  return (
    <div>
      <Header />

      <Grid container className="con-grid">
        <Grid item md={2}></Grid>
        <Grid item md={8}>
          <div className="connect-heading">Connect with us</div>
          <Grid container>
            <Grid item md={6}>
              <div className="cx-img">
                <img alt="" src={require("../assets/images/connect.svg").default} />
              </div>
              <div className="con-timings">Timings: Mon-Fri 9am - 5pm</div>
            </Grid>
            <Grid item md={6}>
              <div className="con-info">
                <div className="con-block">
                  <img alt="" src={require("../assets/images/home.svg").default} />
                  <address>
                    <div>2nd floor, Sobo Central Mall,</div>
                    <div>Near Haji Ali, Mumbai Central,</div>
                    <div>Mumbai, Maharashtra, 400034</div>
                  </address>
                </div>
                <div className="con-block">
                  <img alt="" src={require("../assets/images/call.svg").default} />
                  <div>
                    <a href="tel:+918767516040">+91-8767516040</a>
                  </div>
                </div>
                <div className="con-block">
                  <img alt="" src={require("../assets/images/mail.svg").default} />
                  <div>
                    <a href="mailto:care@hellozindagi.co">care@hellozindagi.co</a>
                  </div>
                </div>
                <div className="con-block">
                  <img alt="" src={require("../assets/images/wa-circle.svg").default} />
                  <div>
                    <a href="https://wa.me/918767516040">WhatsApp +91-8767516040</a>
                  </div>
                </div>
              </div>
              
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={2}></Grid>
      </Grid>

      <FooterSmall />

    </div>
  );
}

export default Contact;
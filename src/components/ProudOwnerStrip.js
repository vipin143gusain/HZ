import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';

export default function ProudOwnerStrip() {

  return (
    <Grid container className="proud-strip">
      <Grid item md={5} xs={12}>
        <div className="proud-heading">
          <div>Are you a proud</div>
          <div>owner of a car?</div>
        </div>
        <div className="car-con">
          <img alt="" src={require('../assets/images/cool-car.svg').default} />
        </div>
      </Grid>
      <Grid item md={4} xs={12} className="mem-benefits-con">
        <div className="member-title">Membership Benefits:</div>
        <div>Get up to 70% off on Insurance renewal</div>
        <div>Enjoy exclusive discounts from partner brands</div>
        <div>Get regular alerts and updates on the auto industry</div>
          
      </Grid>
      <Grid item md={3} xs={12}>
        <div className="right-box-con">
          <div className="mclogo-con">
            <img alt="" src={require('../assets/images/mc-hor.png').default} />
          </div>
          <div className="hr-line join-club-hr"></div>
          <div className="we-create join-club-heading">Join our club</div>
          
          <div>
            <Link to="register?product=motor-club" className="mc-reg-link"><span className="register-btn">Register</span></Link>
          </div>
        </div>

      </Grid>
    </Grid>
  );
}
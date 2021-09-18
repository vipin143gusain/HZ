import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';

function SuperBenefitsStrip() {
  return (
    <Grid container className="benefits-section">
      <Grid item md={2}></Grid>
      <Grid item md={8}>
        <div className="super-con">
          <Link to={`register?product=super-benefits`} className="">
            <img alt="" src={require("../assets/images/super-benefits.PNG").default} />
          </Link>
        </div>
      </Grid>
      <Grid item md={2}></Grid>
    </Grid>
  );
}
  
export default SuperBenefitsStrip;

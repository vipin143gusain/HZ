import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import useGoogleAnalytics from './useGoogleAnalytics';
import ScrollToTop from './ScrollToTop';
import './App.css';
import Home from './pages/Home';
import CyberProtect from './pages/CyberProtect';
import LaptopInsurance from './pages/LaptopInsurance';
import TVInsurance from './pages/TVInsurance';
import BikeInsurance from './pages/BikeInsurance';
import CarInsurance from './pages/CarInsurance';
import PersonalAccidentInsurance from './pages/PersonalAccidentInsurance';
import HealthInsurance from './pages/HealthInsurance';
import Registration from './pages/Registration';
import RegistrationNew from './pages/RegistrationNew';
import MotorClub from './pages/MotorClub';
import Contact from './pages/Contact';
import FAQs from './pages/FAQs';
import TnC from './pages/TnC';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Offers from './pages/Offers';
import MotorClubOffers from './pages/MotorClubOffers';
import MotorClubOfferDetail from './pages/MotorClubOfferDetail';
import MotorClubCustDetails from './pages/MotorClubCustDetails';
import O2oemi from './pages/O2oemiCopy';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';



function Routes() {
  useGoogleAnalytics()

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/cyber-protect" component={CyberProtect} />
      <Route exact path="/laptop-insurance" component={LaptopInsurance} />
      <Route exact path="/tv-insurance" component={TVInsurance} />
      <Route exact path="/bike-insurance" component={BikeInsurance} />
      <Route exact path="/car-insurance" component={CarInsurance} />
      <Route exact path="/personal-accident-insurance" component={PersonalAccidentInsurance} />
      <Route exact path="/health-insurance" component={HealthInsurance} />
      <Route exact path="/register" component={Registration} />
      {/* <Route exact path="/register" component={RegistrationNew} /> */}
      <Route exact path="/motor-club" component={MotorClub} />
      <Route exact path="/motor-club/profile" component={MotorClubCustDetails} />
      <Route exact path="/motor-club/offers" component={MotorClubOffers} />
      <Route exact path="/motor-club/offers/detail" component={MotorClubOfferDetail} />
      <Route exact path="/contact" component={Contact} />
      <Route exact path="/faqs" component={FAQs} />
      <Route exact path="/tnc" component={TnC} />
      <Route exact path="/privacy-policy" component={PrivacyPolicy} />
      <Route exact path="/offers" component={Offers} />

      <Route render={() => <h1>404: page not found</h1>} />
    </Switch>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes />
    </BrowserRouter>
  )
}

export default App;
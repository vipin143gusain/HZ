import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Header from '../components/Header';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import FooterSmall from '../components/FooterSmall';

const useStyles = makeStyles((theme) => ({
  acc: {
    boxShadow: 'none',
    borderBottom: '1px solid #darkgrey'
  },
  faqSection: {
    padding: 10,
    backgroundColor: '#e1e1e1',
    borderRadius: 10,
    "& div": {
      backgroundColor: '#e1e1e1'
    }
  }
}));

function FAQs() {
  const classes = useStyles();

  return (
    <div>
      <Header />

      <Grid container className="con-grid">
        <Grid item md={2}></Grid>
        <Grid item md={8}>
          <div className="connect-heading">FAQs</div>
          <Grid container className={classes.faqSection}>
            <Grid item md={12}>

              <Accordion className={classes.acc}>
                <AccordionSummary
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <div className="que-row">
                    <div><div className="f-plus">+</div></div>
                    <div>Why do I need Insurance?</div>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <div>
                    <b>Insurance</b> is a way of managing risks. When
                    you buy
                    insurance, you transfer the cost of a potential loss
                    to the insurance company in exchange for a fee,
                    known as the premium. Insurance companies invest the
                    funds securely, so it can grow, and pay out when
                    there’s a claim.<br/><br/>
                    Insurance helps you:<br/>
                    <b>Own a home</b>, because mortgage lenders need to
                    know
                    your home is protected. It covers you for repairs
                    and replacement of any damage that’s covered in your
                    policy. It provides protection against theft, damage
                    from perils like fire and water, and financial
                    responsibility that could result from a visitor or
                    guest being accidentally injured on your property.<br/><br/>
                    <b>Drive vehicles</b>, because few people could
                    afford the
                    repairs, health care costs and legal expenses
                    associated with collisions and injuries without
                    coverage. Auto insurance is also a legal
                    requirement.<br/><br/>
                    <b>Maintain your current standard of living</b> if
                    you
                    become disabled or have a critical illness. It
                    covers your day-to-day costs and larger expenses
                    like your mortgage while you focus on your
                    health
                    and recovery.<br/><br/>
                    <b>Cover health care costs</b> like prescription
                    drugs,
                    dental care, vision care and other
                    health-related
                    items.<br/><br/>
                    <b>Provide for your family</b> in the event of a
                    death.
                    There are life insurance options for short and
                    long-term needs that protect your family’s home,
                    mortgage, lifestyle and the cost of
                    post-secondary
                    education for children.<br/><br/>
                    <b>Take vacations</b> without worrying about flight
                    cancellations or emergency medical expenses
                    abroad.
                    Take the time to review your policies and
                    contact
                    one of our helpful Financial Advisors to answer
                    your
                    questions or get advice. A little knowledge can
                    make
                    a big difference when it comes to buying the
                    right
                    insurance to help protect what matters most for
                    you
                    and your family.

                  </div>
                </AccordionDetails>
              </Accordion>

              <Accordion className={classes.acc}>
                <AccordionSummary
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <div className="que-row">
                    <div><div className="f-plus">+</div></div>
                    <div>What’s great about Insurance offered by Hello Zindagi?</div>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <div>
                    <b>Simple products</b> – Our products are simple to offer and easy to consume, and addresses the ever evolving needs of a consumer. Pick that suits your lifestyle and stay protected.<br/><br/>
                    <b>Easy online processes</b> - From the process of buying insurance to making claims is paperless, easy,
                    quick and hassle-free! No hard copies, even for claims!<br/><br/>
                    <b>Honest Pricing</b> – We are open and transparent on our margins and commission structures. We sell
                    direct and make use of technology to keep our costs low and pass on the savings to you in the form of
                    low premiums.<br/><br/>
                    <b>Do-it-yourself</b> – Choose the plan that best suits your need. Decide. Take your own time. Call us or chat
                    with us for any assistance, we are here to help you get the best value for your money.
                  </div>
                </AccordionDetails>
              </Accordion>

              <Accordion className={classes.acc}>
                <AccordionSummary
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <div className="que-row">
                    <div><div className="f-plus">+</div></div>
                    <div>What are the different kinds of Insurances available with us?</div>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <div>
                    <ul>
                      <li>Health Insurance</li>
                      <li>Car Insurance</li>
                      <li>Bike Insurance</li>
                      <li>TV &amp; Laptop Insurance</li>
                      <li>Personal Accident</li>
                      <li>Cyber Protect</li>
                    </ul>
                  </div>
                </AccordionDetails>
              </Accordion>

              <Accordion className={classes.acc}>
                <AccordionSummary
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <div className="que-row">
                    <div><div className="f-plus">+</div></div>
                    <div>Why our Health Insurance is the best?</div>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <div>
                    <b>No Age Based Copayment</b> - Our Health Insurance come with No age based Copayment. This
                    means, during your claims- you need not pay anything from your pocket.<br/><br/>
                    <b>No Room Rent Restriction</b> - Everyone has different preferences and we understand that. That’s why, we
                    have no room rent restrictions. Choose any hospital room you prefer.<br/><br/>
                    <b>Cumulative Bonus</b> - A reward for staying healthy! Get Yearly Cumulative Bonus.<br/><br/>
                    <b>Get Treated at any Hospital</b> - Choose from 5100+ of our network hospitals in India for cashless claims
                    or opt for a reimbursement.
                  </div>
                </AccordionDetails>
              </Accordion>

              <Accordion className={classes.acc}>
                <AccordionSummary
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <div className="que-row">
                    <div><div className="f-plus">+</div></div>
                    <div>How to file a claim?</div>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <div>
                  Write to us on <a href="mailto:care@hellozindagi.co">care@hellozindagi.co</a> with your policy number and the policy type- Health, Car,
                  Bike etc Our representative will call you for further processing.
                  </div>
                </AccordionDetails>
              </Accordion>

            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <FooterSmall />

    </div>
  );
}

export default FAQs;
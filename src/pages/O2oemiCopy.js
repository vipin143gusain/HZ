import React from 'react';
import LimitedPeriodOfferStrip from "./LimitedPeriodOfferStrip"
import styled from 'styled-components';

const O2oemi = () => {
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
        <Wrapper>
            <div className="mainOfferImgWrapper">
                
                <img className="offerMainImg" src={require('../assets/images/mcPageImg/offerDetail.png').default} alt="" />
                {/* <div className="couponBox">
                    <span>Coupon Code: &nbsp;</span>
                    <span><strong>PTFGE555</strong></span>

                </div> */}

                <a className="linkCss" href="https://bit.ly/3fSnMMi">
                    <button className="redeemBtn" style={{ bottom: "35px" }}>Redeem Now</button>
                </a>
            </div>

            <div className="detailTxtWrapper">
                <h4 style={{ color: "#0084a7" }}>Process & Details of the offer</h4>
                <ol type="1" className="textOl">
                    <li>Two-Wheeler Finance is done by OTO Capital.</li>
                    <li>In selected cities only: Pune, Bangalore, Hyderabad, Chennai & Mysuru.</li>
                    <li>100% Processing fee waiver.</li>
                    <li>Lease option or Loan option available.</li>
                    <li>Loan with No Income Proof option available.</li>

                </ol>
            </div>

            <div className="tncWrapper">
                <h4 style={{ color: "#0084a7" }}>Terms & Conditions</h4>
                <ol type="1" className="textOl">
                    <li>OTO Capital reserves the right to reject the loan application.  </li>
                    <li>Vehicle delivery post loan sanction is as per OTO Capital Process guidelines.</li>
                    <li>OTO Capital Customer care - 9372081131</li>
                    <li>Hello Zindagi does not take responsibilty for the Quality of Product and Service
                        offered by partners. However, we try and protect the interest of our Club Members.
                        Please get in touch with us at care@hellozindagi.co for any concerns & grievances.
                    </li>

                </ol>
            </div>

            <LimitedPeriodOfferStrip />
            </Wrapper>
        </>
    )
}

export default O2oemi

const Wrapper = styled.div`

`
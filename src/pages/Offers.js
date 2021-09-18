import React, { useState, useEffect } from 'react';
// import HelloZindagiLogoComp from './HelloZindagiLogo';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../pages/Loader';
// import HelloZindagiLogo from '../images/motorClubLogo.jpg';

// Import Action files

import {
  offersUpdateVehicleNo,
  offersGetCustomerData,
} from '../pages/actions/offersAction';

const Offers = (props) => {

  //alert message starts

  // const diffToast = () => {
  //   toast.success('Vehicle 2 registered successfully', {
  //     position: 'top-center',
  //     autoClose: 4000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //   });

  //   toast.success('Vehicle 2 and 3 registered successfully', {
  //     position: 'top-center',
  //     autoClose: 2000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //   });
  // };

  //alert message ends
  const dispatch = useDispatch();
  // const forceUpdate = useForceUpdate();

  let customerDetails = useSelector((state) => state.customerReducer);
  let offerCustomerReducer = useSelector((state) => state.offerReducer);


  // console.log('state offerCustomerReducer reducer', offerCustomerReducer);

  // console.log('state REGISTER ACTION', registerAction);

  const [toggleState, setToggleState] = useState(1);

  // const canBeSubmitted = () => {
  //   const isValid = firstName.trim().length >= 5; // TextInput

  //   if (isValid) {
  //     document.getElementById('submitButton').removeAttribute('disabled');
  //   } else {
  //     document.getElementById('submitButton').setAttribute('disabled', true);
  //   }
  // };

  // useEffect(() => canBeSubmitted());

  // useEffect(() => fetchCustomerDetails);
  // console.log('fetchCustomer', fetchCustomerDetails);

  // const offersModal = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
  // const offersModal2 = [{ id: 1 }, { id: 2 }];
  // const offersModal3 = [{ id: 1 }];
  // const offersModal4 = [{ id: 1 }, { id: 2 }];
  // const offersModal5 = [{ id: 1 }];
  // const offersModal6 = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

  const [modalBox, setModal] = useState(false);

  const [diabledVehInput, setDiabledVehInput] = useState(false);
  const [diabledVehInput3, setDiabledVehInput3] = useState(false);

  const [vehicle2State, setVehicle2State] = useState('');

  const [vehicle3State, setVehicle3State] = useState('');

  // const [vehicleNumber, setVehicleNumber] = useState({
  //   vehicleNumber2: '',
  //   vehicleNumber3: '',
  // });

  const [disabled, setDisabled] = useState(true);
  const [disabled2, setDisabled2] = useState(true);

  // const [inputValue, setInputValue] = useState('');

  // Input Clear Field handler Starts
  // const handleClearInput = (e) => {
  //   setInputValue(e.target.value);
  // };
  // Input Clear Field handler Starts

  const vehicleOne =
    offerCustomerReducer &&
      offerCustomerReducer.offers &&
      offerCustomerReducer.offers.vehicle1 &&
      vehicle2State &&
      offerCustomerReducer.offers.vehicle1.toUpperCase() ===
      vehicle2State.toUpperCase()
      ? true
      : false;

  const vehicleTwo =
    offerCustomerReducer &&
      offerCustomerReducer.offers &&
      offerCustomerReducer.offers.vehicle2 &&
      vehicle3State &&
      offerCustomerReducer.offers.vehicle2.toUpperCase() ===
      vehicle3State.toUpperCase()
      ? true
      : false;

  const vehicleThree =
    offerCustomerReducer &&
      offerCustomerReducer.offers &&
      offerCustomerReducer.offers.vehicle1 &&
      vehicle3State &&
      offerCustomerReducer.offers.vehicle1.toUpperCase() ===
      vehicle3State.toUpperCase()
      ? true
      : false;

  // console.log(
  //   'veh1 ===',
  //   offerCustomerReducer?.customer?.membershipdetails?.vehicle1,
  //   'veh2 ===',
  //   offerCustomerReducer?.customer?.membershipdetails?.vehicle2,
  //   'veh3===',
  //   offerCustomerReducer?.customer?.membershipdetails?.vehicle3
  // );

  console.log(
    'veh1 ===',
    vehicleOne,
    'veh2 ===',
    vehicleTwo,
    'veh3===',
    vehicleThree
  );

  const onSubmitHandler = (e) => {
    e.preventDefault();

    // console.log('onsubmit', vehicle);
    // setvehicle({
    //   vehicle2: data.vehicle2 ? data.vehicle2 : '',
    //   vehicle3: data.vehicle3 ? data.vehicle3 : '',
    // });

    if (vehicleOne || vehicleTwo || vehicleThree) {
      toast.error('Duplicate Vehicle Number', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      // ADD BUTTON UPDATE VEHICLE NO. STARTS
      const updateVehicleNos = {
        sellerid: 203,
        membershipType: 1,
        membershipid:
          customerDetails &&
          customerDetails.postRegisterBtn &&
          customerDetails.postRegisterBtn.membershipDetails.membershipid &&
          customerDetails.postRegisterBtn.membershipDetails.membershipid,
        custmobileno:
          customerDetails &&
          customerDetails.postRegisterBtn &&
          customerDetails.postRegisterBtn.membershipDetails.custmobileno &&
          customerDetails.postRegisterBtn.membershipDetails.custmobileno,

        vehregNumber2: vehicle2State || '',
        vehregNumber3: vehicle3State || '',
      };
      for (var item in updateVehicleNos) {
        if (updateVehicleNos[item] === '') {
          delete updateVehicleNos[item];
        }
      }

      if (vkgnull && vkgnull.length === 2) {
        delete updateVehicleNos['vehregNumber2'];
      }

      dispatch(offersUpdateVehicleNo(updateVehicleNos));
      setTimeout(() => {
        const getCustData = {
          sellerid: 203,
          membershipType: 1,
          custMobileNo:
            offerCustomerReducer &&
            offerCustomerReducer.customer &&
            offerCustomerReducer.customer.membershipdetails &&
            offerCustomerReducer.customer.membershipdetails.custmobileno &&
            offerCustomerReducer.customer.membershipdetails.custmobileno,
        };

        dispatch(offersGetCustomerData(getCustData));
      }, 100);
    }

    //setDiabledVehInput(!diabledVehInput);
  };

  // ADD BUTTON UPDATE VEHICLE NO. ENDS

  // const bhim = (pass) => {
  //   const obj = offersModal2.find((ele) => {
  //     return ele.id === pass;
  //   });
  //   console.log('log', obj);
  // };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 6,
      partialVisibilityGutter: 25,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
      slidesToSlide: 1,
      partialVisibilityGutter: 20,
    },
  };
  // hide and show div
  function toggleTab(index) {
    setToggleState(index);
  }

  const getCustData = {
    sellerid: 203,
    membershipType: 1,
    custMobileNo:
      customerDetails &&
      customerDetails.postRegisterBtn &&
      customerDetails.postRegisterBtn.membershipDetails &&
      customerDetails.postRegisterBtn.membershipDetails.custmobileno &&
      customerDetails.postRegisterBtn.membershipDetails.custmobileno,
  };
  useEffect(() => {
    // dispatch(offersGetCustomerData(getCustData));
  }, []);

  useEffect(() => {
    console.log('vipin', offerCustomerReducer.offers.vehicles);
    if (
      offerCustomerReducer &&
      offerCustomerReducer.offers &&
      offerCustomerReducer.offers.vehicles &&
      offerCustomerReducer.offers.vehicles.length > 1
    ) {
      setDiabledVehInput(true);
    }
  }, [
    offerCustomerReducer,
    offerCustomerReducer.offers,
    offerCustomerReducer.offers.vehicles,
  ]);

  // MODAL BOX HIDE WHEN CLICK ON ADD BTN STARTS
  useEffect(() => {
    setModal(offerCustomerReducer.modalBox);
    console.log('MODAL BOX', modalBox);
  }, [offerCustomerReducer]);

  // MODAL BOX HIDE WHEN CLICK ON ADD BTN STARTS
  const onclickPlusBtn = () => {
    setModal(true);
  };
  // const vehicle2Input = document.getElementById('vehicle2').value;

  const inputChangeHandler = (e) => {
    e.preventDefault();
    console.log('targert name', e.target.name);
    console.log('targert value', e.target.value);
    // var pattern = /^[a-zA-Z]{2}/;

    if (e.target.name === 'vehicle2') {
      setVehicle2State(e.target.value);
    }

    if (e.target.name === 'vehicle3') {
      setVehicle3State(e.target.value);
    }

    // var vehicle2Validation = document.getElementById('vehicleId2').value;
    // var vehicle3Validation = document.getElementById('vehicleId3').value;
    console.log('vehicle2', vehicle2State);
    console.log('vehicle3', vehicle3State);
  };

  const removelastNull =
    offerCustomerReducer &&
    offerCustomerReducer.offers &&
    offerCustomerReducer.offers.vehicles &&
    offerCustomerReducer.offers.vehicles;

  // console.log('last null ===', removelastNull);

  const vkgnull =
    removelastNull &&
    removelastNull.filter((item) => {
      return item.vehregnumber !== null;
    });
  console.log('last null ===', vkgnull);

  const closeFunction = () => {
    setVehicle2State('');
    setVehicle3State('');
  };

  useEffect(() => {
    if (vehicle2State && vehicle2State.length >= 5) {
      setDisabled(false);
      setDisabled2(false);
    } else if (vehicle2State && vehicle2State.length < 5) {
      setDisabled(true);
      setDisabled2(true);
      setVehicle3State('');
    }

    if (
      vehicle3State &&
      vehicle3State.length > 0 &&
      vehicle3State &&
      vehicle3State.length < 5
    ) {
      setDisabled(true);
    } else if (vehicle3State && vehicle3State.length >= 5) {
      setDisabled(false);
    }
    console.log('vehicle2 Settime', vehicle2State);
    console.log('vehicle3 Settime', vehicle3State);
  }, [vehicle2State, vehicle3State]);

  return (
    <>
      {offerCustomerReducer.isLoading ? (
        <Loader />
      ) : (
        <div>
          {/* <HelloZindagiLogoComp /> */}
          <div className="memberDataWrapper">
            <div className="row borderRadius">
              <div className="col-4 borderSide">
                <p>Member ID</p>

                <p>
                  {/* {offerCustomerReducer &&
                    offerCustomerReducer.customer &&
                    offerCustomerReducer.customer.membershipdetails &&
                    offerCustomerReducer.customer.membershipdetails
                      .membershipid &&
                    offerCustomerReducer.customer.membershipdetails
                      .membershipid} */}
                  {offerCustomerReducer &&
                    offerCustomerReducer.customer &&
                    offerCustomerReducer.customer.membershipdetails &&
                    offerCustomerReducer.customer.membershipdetails.membershipid &&
                    offerCustomerReducer.customer.membershipdetails.membershipid}
                </p>
              </div>
              <div className="col-4 borderSide pl-0 pr-0">
                <p>Member From</p>
                <p>
                  {Moment(
                    offerCustomerReducer &&
                    offerCustomerReducer.customer &&
                    offerCustomerReducer.customer.membershipdetails &&
                    offerCustomerReducer.customer.membershipdetails
                      .memvalidfrom &&
                    offerCustomerReducer.customer.membershipdetails
                      .memvalidfrom
                  ).format('DD-MMMM-YYYY')}
                </p>
              </div>
              <div className="col-4 borderSide borderRiteNone">
                <p>Status</p>
                <p>Active</p>
                {/* <p>
              {customerDetails &&
                offerCustomerReducer.customer &&
                offerCustomerReducer.customer.membershipdetails &&
                offerCustomerReducer.customer.membershipdetails.status &&
                offerCustomerReducer.customer.membershipdetails.status}
            </p> */}
              </div>
              <div className="horizontalLine"></div>
              <div className="col-4 borderSide">
                <p>Vehicle 1</p>
                <p>
                  {offerCustomerReducer &&
                    offerCustomerReducer.customer &&
                    offerCustomerReducer.customer.membershipdetails &&
                    offerCustomerReducer.customer.membershipdetails.vehicle1 &&
                    offerCustomerReducer.customer.membershipdetails.vehicle1}
                </p>
              </div>
              <div className="col-4 borderSide">
                <p>Vehicle 2</p>
                <p>
                  {(offerCustomerReducer &&
                    offerCustomerReducer.customer &&
                    offerCustomerReducer.customer.membershipdetails &&
                    offerCustomerReducer.customer.membershipdetails.vehicle2 &&
                    offerCustomerReducer.customer.membershipdetails.vehicle2) ||
                    vehicle2State}
                </p>
              </div>
              <div className="col-4 borderSide borderRiteNone">
                <p>Vehicle 3</p>
                <p>
                  {(offerCustomerReducer &&
                    offerCustomerReducer.customer &&
                    offerCustomerReducer.customer.membershipdetails &&
                    offerCustomerReducer.customer.membershipdetails.vehicle3 &&
                    offerCustomerReducer.customer.membershipdetails.vehicle3) ||
                    vehicle3State}
                </p>
              </div>

              {/* DYNAMIC COMING STARTS */}
              {/* <div className="horizontalLine"></div>

          <div className="col-4 borderSide">
            <p>Mobile No.</p>
            <p>
              {registerAction &&
                registerAction.postRegisterBtn &&
                registerAction.postRegisterBtn.membershipDetails &&
                registerAction.postRegisterBtn.membershipDetails.custmobileno}
            </p>
          </div>
          <div className="col-4 borderSide">
            <p>Valid From</p>
            <p>
              {Moment(
                registerAction &&
                  registerAction.postRegisterBtn &&
                  registerAction.postRegisterBtn.membershipDetails &&
                  registerAction.postRegisterBtn.membershipDetails.memvalidfrom
              ).format('DD-MMMM-YYYY')}
            </p>
          </div>
          <div className="col-4 borderSide borderRiteNone">
            <p>Expiry On</p>
            <p>
              {Moment(
                registerAction &&
                  registerAction.postRegisterBtn &&
                  registerAction.postRegisterBtn.membershipDetails &&
                  registerAction.postRegisterBtn.membershipDetails.memexpiryon
              ).format('DD-MMMM-YYYY')}
            </p>
          </div> */}
              {/* DYNAMIC COMING END */}
            </div>
            <div className="float-right"></div>
            {/* <small className="text-danger">
          Thank you for being part Motor Club. You have already utilized the
          maximum limit of 3 vehicles Registration under one membership. In case
          of a query, Write to us on motorclub@hellozindagi.co
        </small> */}
            <div className="float-right addVehicleBtn">
              {(offerCustomerReducer &&
                offerCustomerReducer.customer &&
                offerCustomerReducer.customer.membershipdetails &&
                offerCustomerReducer.customer.membershipdetails.vehicle2) &&
                (offerCustomerReducer &&
                  offerCustomerReducer.customer &&
                  offerCustomerReducer.customer.membershipdetails &&
                  offerCustomerReducer.customer.membershipdetails.vehicle3)
                ? true :
                <>
                  <span className="addVehicleTxt">
                    Add
                    <br />
                    Vehicle
                  </span>
                  <button
                    type="button"
                    className="btn btn-danger addBtnCss"
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                    onClick={onclickPlusBtn}
                  >
                    +
                  </button>
                </>
              }
            </div>

            {modalBox && (
              <div
                className="modal fade"
                id="exampleModalCenter"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
                data-backdrop="false"
              >
                <div
                  className="modal-dialog modal-dialog-centered transparentBg"
                  role="document"
                >
                  <div className="modal-content">
                    <div className="modal-header border-0">
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                        onClick={closeFunction}
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body pb-4">
                      <form className="form-inline" onSubmit={onSubmitHandler}>
                        <div className="form-group w-100 mb-4">
                          <label
                            htmlFor="vehicle2"
                            className="float-left pt-2 vehicleBoxLabel"
                          >
                            Vehicle 2
                          </label>
                          <input
                            // disable={!formState.isDirty}
                            type="text"
                            className="form-control float-right w-75 vehicleInput second rounded-lg"
                            id="vehicleId2"
                            placeholder="EX - KA05MG5566"
                            maxLength="11"
                            autoComplete="off"
                            name="vehicle2"
                            // disabled={
                            //   vkgnull && vkgnull.length > 1 ? true : false
                            // }
                            // disabled={
                            //   diabledVehInput
                            // }

                            disabled={offerCustomerReducer &&
                              offerCustomerReducer.customer &&
                              offerCustomerReducer.customer.membershipdetails &&
                              offerCustomerReducer.customer.membershipdetails.vehicle2 !== null ? true : false}


                            value={vehicle2State}
                            // disabled={
                            //    offerCustomerReducer &&
                            //    offerCustomerReducer.customer &&
                            //    offerCustomerReducer.customer.vehicles &&
                            //    offerCustomerReducer.customer.vehicles.length > 1

                            // }
                            onChange={(e) => inputChangeHandler(e)}
                          // {...register('vehicle2', {
                          //   required:
                          //     offerCustomerReducer &&
                          //     offerCustomerReducer.customer &&
                          //     offerCustomerReducer.customer.membershipdetails &&
                          //     offerCustomerReducer.customer.membershipdetails
                          //       .vehicle2 &&
                          //     offerCustomerReducer.customer.membershipdetails
                          //       .vehicle2
                          //       ? false
                          //       : true,
                          //   minLength: 5,
                          //   // maxLength: 11,
                          // })}
                          />

                          {offerCustomerReducer &&
                            offerCustomerReducer.customer &&
                            offerCustomerReducer.customer.membershipdetails &&
                            offerCustomerReducer.customer.membershipdetails.vehicle2 ? (
                            <small className="form-text text-danger float-left pl-4">
                              <span className="pl-1">
                                Vehicle 2 is already registered
                              </span>
                            </small>
                          ) : null}
                          {/* <small className="form-text text-danger float-left pl-4">
                        {errors.vehicle2 &&
                          errors.vehicle2.type === 'required' && (
                            <span className="pl-1">
                              Vehicle number 2 is required
                            </span>
                          )}

                        {/* {<p>Vehicle 2 registered successfully</p>} */}

                          {/* {errors.vehicle2 &&
                        errors.vehicle2.type === 'minLength' && (
                          <span className="pl-1">
                            Please enter min 5 characters
                          </span>
                        )} 

                        {errors.vehicle2 &&
                          errors.vehicle2.type === 'maxLength' && (
                            <span className="pl-1">
                              Enter only 11 characters
                            </span>
                          )}
                      </small> */}
                        </div>
                        <div className="form-group w-100 mb-4">
                          <label
                            htmlFor="vehicle3"
                            className="float-left pt-2 vehicleBoxLabel"
                          >
                            Vehicle 3
                          </label>
                          <input
                            // disable={!formState.isDirty}
                            type="text"
                            className="form-control float-right w-75 vehicleInput second rounded-lg"
                            id="vehicleId3"
                            placeholder="EX - KA05MG5566"
                            maxLength="11"
                            autoComplete="off"
                            name="vehicle3"
                            onChange={(e) => inputChangeHandler(e)}
                            // onChange={(e) => {
                            //   inputChangeHandler(e);
                            //   handleClearInput(e);
                            // }}
                            // disabled={disabled2}
                            // disabled={
                            //   vkgnull && vkgnull.length > 1 ? false : disabled2
                            // }

                            disabled={offerCustomerReducer &&
                              offerCustomerReducer.customer &&
                              offerCustomerReducer.customer.membershipdetails &&
                              offerCustomerReducer.customer.membershipdetails.vehicle2 &&
                              offerCustomerReducer.customer.membershipdetails.vehicle2 !== null ? false : disabled2}

                            value={vehicle3State}
                          // onChange={handleClearInput}

                          // {...register('vehicle3', {
                          //   required: false,
                          //   minLength: 5,
                          //   // maxLength: 11,
                          // })}
                          // disabled={disabled2}
                          // disabled={
                          //   offerCustomerReducer &&
                          //   offerCustomerReducer.customer &&
                          //   offerCustomerReducer.customer.vehicles &&
                          //   offerCustomerReducer.customer.vehicles.length > 3
                          //     ? true
                          //     : false
                          // }
                          />
                          {/* <small className="form-text text-danger float-left pl-4">
                        {errors.vehicle3 &&
                          errors.vehicle3.type === 'required' && (
                            <span className="pl-1">
                              Vehicle number 3 is required
                            </span>
                          )}

                        {/* {
                        <span className="pl-1">
                          Vehicle 2 and 3 registered successfully
                        </span>
                      } */}
                          {/* {errors.vehicle3 &&
                        errors.vehicle3.type === 'minLength' && (
                          <span className="pl-1">
                            Please enter min 5 characters
                          </span>
                        )} 
                        {errors.vehicle2 &&
                          errors.vehicle2.type === 'maxLength' && (
                            <span className="pl-1">
                              Enter only 11 characters
                            </span>
                          )}
                      </small> */}
                        </div>

                        {/* {offerCustomerReducer.errorMsgExceedLimint && (
                          <p className="exceedMemberError">
                            {offerCustomerReducer.errorMsgExceedLimint}
                          </p>
                        )} */}

                        <button
                          // onClick={diffToast}
                          disabled={disabled}
                          type="submit"
                          className="btn btn-danger m-auto w-25"
                        >
                          Add
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* alert messgage starts */}
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            {/* alert messgage ends */}
          </div>
          <div className="mt-5 serviceCatWrapper">
            <h2>SERVICE CATEGORIES</h2>

            <Carousel
              focusOnSelect={false}
              swipeable={true}
              draggable={false}
              showDots={false}
              responsive={responsive}
              ssr={true} // means to render carousel on server-side.
              infinite={true}
              // autoPlay={this.props.deviceType !== 'mobile' ? true : false}
              autoPlay={true}
              autoPlaySpeed={2000}
              keyBoardControl={false}
              customTransition="all .5"
              transitionDuration={1000}
              containerClass="carousel-container"
              removeArrowOnDeviceType={['mobile', '']}
              // deviceType={this.props.deviceType}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
              partialVisible={true}
            >
              <div
                className={
                  toggleState === 1
                    ? 'tabs active-tabs carouselTxt'
                    : 'tabs carouselTxt'
                }
                onClick={() => toggleTab(1)}
              >
                <i className="fas fa-tire-rugged carBg"></i>

                <p>TYRE</p>
              </div>
              <div
                className={
                  toggleState === 2
                    ? 'tabs active-tabs carouselTxt active-tabs '
                    : 'tabs carouselTxt'
                }
                onClick={() => toggleTab(2)}
              >
                <i className="fas fa-car carBg"></i>
                <p>
                  REPAIRS & <br />
                  MAINTENANCE
                </p>
              </div>
              <div
                className={
                  toggleState === 3
                    ? 'tabs active-tabs carouselTxt'
                    : 'tabs carouselTxt'
                }
                onClick={() => toggleTab(3)}
              >
                <i className="fas fa-car-wash carBg"></i>
                <p>
                  WASHING &<br />
                  DETAILING
                </p>
              </div>

              <div
                className={
                  toggleState === 4
                    ? 'tabs active-tabs carouselTxt'
                    : 'tabs carouselTxt'
                }
                onClick={() => toggleTab(4)}
              >
                <i className="fas fa-car-bump carBg"></i>
                <p>
                  ROAD SIDE
                  <br />
                  ASSISTANCE
                </p>
              </div>
              <div
                className={
                  toggleState === 5
                    ? 'tabs active-tabs carouselTxt'
                    : 'tabs carouselTxt'
                }
                onClick={() => toggleTab(5)}
              >
                <i className="fas fa-car-building carBg"></i>
                <p>ACCESSORIES</p>
              </div>

              {/* <div
            className={
              toggleState === 6
                ? 'tabs active-tabs carouselTxt'
                : 'tabs carouselTxt'
            }
            onClick={() => toggleTab(5)}
          >
            <i className="fas fa-car-building carBg"></i>
            <p>ACCESSORIES</p>
          </div> */}
            </Carousel>
            <div className="horizontalLine2"></div>

            <div
              className={toggleState === 1 ? 'content active-content' : 'hideTab'}
            >
              <>
                <div
                  type="text"
                  className="offerBox"
                  data-toggle="modal"
                  data-target="#exampleModalLong"
                >
                  <div className="offerTitle">
                    <p>PITSHOP 1</p>
                    <p className="small mb-0">FLAT Rs.555 Off</p>
                    <p className="small mb-0">FLAT Rs.555 Off</p>
                    <p className="small">Rs.2000 Wallet Balance</p>
                  </div>
                </div>

                <div
                  className="modal fade"
                  id="exampleModalLong"
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLongTitle2"
                  aria-hidden="true"
                >
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        {/* <h5 className="modal-title" id="exampleModalLongTitle2">
                        offer 2
                      </h5> */}
                        <button
                          type="button"
                          className="close float-left colorRed"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true"> <i class="fas fa-chevron-left colorRed"></i></span>
                        </button>
                        <img
                          className=" d-block width40"
                          // src={HelloZindagiLogo}
                          alt="Hello Zindagi and Motor Club Logo"
                        />
                      </div>
                      <div className="modal-body">
                        <div className="couponBox">
                          <p><strong>PITSHOP</strong></p>
                          <p>FLAT Rs.555 Off</p>
                          <p>On car exterior rubbing polishing <br />+</p>

                          <p>Rs. 1000 Wallet Balance</p>
                          <div className="couponCode">
                            <p className="couponTxt">PTCH500</p>
                            <button className="clickBtn">Click</button>
                          </div>

                        </div>
                        <div id="accordion">
                          <div className="card">

                            <div className="card-header" id="headingOne">
                              <h5 className="mb-0">
                                <button
                                  className="btn btn-link btnCollapse"
                                  data-toggle="collapse"
                                  data-target="#collapseOne"
                                  aria-expanded="true"
                                  aria-controls="collapseOne"
                                >
                                  Details
                                  <i className="fas fa-caret-down"></i>
                                </button>



                              </h5>
                            </div>

                            <div
                              id="collapseOne"
                              className="collapse show"
                              aria-labelledby="headingOne"
                              data-parent="#accordion"
                            >
                              <div className="card-body">
                                <b>1.</b> Anim pariatur cliche reprehenderit, enim eiusmod
                                high life accusamus terry richardson ad squid. <br /><br />
                                <b>2. </b>
                                wolf moon officia aute, non cupidatat skateboard
                                dolor brunch. Food truck quinoa nesciunt laborum
                                eiusmod. Brunch  <br /><br />
                                <b>3. </b>  wolf moon tempor, sunt aliqua
                                put a bird on it squid single-origin coffee nulla
                                assumenda shoreditch et. Nihil anim keffiyeh
                                helvetica, craft beer labore wes anderson cred
                                nesciunt sapiente ea proident. <br /><br />
                                <b>4. </b>  Ad vegan excepteur
                                butcher vice lomo. Leggings occaecat craft beer
                                farm-to-table, raw denim aesthetic synth nesciunt
                                you probably haven't heard of them accusamus
                                labore sustainable VHS.
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header" id="headingTwo">
                              <h5 className="mb-0">

                                <button
                                  className="btn btn-link btnCollapse"
                                  data-toggle="collapse"
                                  data-target="#collapseTwo"
                                  aria-expanded="true"
                                  aria-controls="collapseTwo"
                                >
                                  Terms & Conditions
                                  <i className="fas fa-caret-down"></i>
                                </button>
                              </h5>
                            </div>
                            <div
                              id="collapseTwo"
                              className="collapse"
                              aria-labelledby="headingTwo"
                              data-parent="#accordion"
                            >
                              <div className="card-body">
                                <b>1.</b> Anim pariatur cliche reprehenderit, enim eiusmod
                                high life accusamus terry richardson ad squid. <br /><br />
                                <b>2. </b>
                                wolf moon officia aute, non cupidatat skateboard
                                dolor brunch. Food truck quinoa nesciunt laborum
                                eiusmod. Brunch  <br /><br />
                                <b>3. </b>  wolf moon tempor, sunt aliqua
                                put a bird on it squid single-origin coffee nulla
                                assumenda shoreditch et. Nihil anim keffiyeh
                                helvetica, craft beer labore wes anderson cred
                                nesciunt sapiente ea proident. <br /><br />
                                <b>4. </b>  Ad vegan excepteur
                                butcher vice lomo. Leggings occaecat craft beer
                                farm-to-table, raw denim aesthetic synth nesciunt
                                you probably haven't heard of them accusamus
                                labore sustainable VHS.
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>

                    </div>
                  </div>
                </div>


                <div
                  type="text"
                  className="offerBox"
                  data-toggle="modal"
                  data-target="#exampleModalLong2"
                >
                  <div className="offerTitle">
                    <p>PITSHOP 2</p>
                    <p className="small mb-0">FLAT Rs.999 Off</p>
                    <p className="small mb-0">FLAT Rs.999 Off</p>
                    <p className="small">Rs.2000 Wallet Balance</p>
                  </div>
                </div>


                <div className="modal fade"
                  id="exampleModalLong2"
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLongTitle2"
                  aria-hidden="true"
                >
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        {/* <h5 className="modal-title" id="exampleModalLongTitle2">
                        offer 2
                      </h5> */}
                        <button
                          type="button"
                          className="close float-left colorRed"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true"> <i class="fas fa-chevron-left colorRed"></i></span>
                        </button>
                        <img
                          className=" d-block width40"
                          // src={HelloZindagiLogo}
                          alt="Hello Zindagi and Motor Club Logo"
                        />
                      </div>
                      <div className="modal-body">
                        <div className="couponBox">
                          <p><strong>PITSHOP</strong></p>
                          <p>FLAT Rs.555 Off</p>
                          <p>On car exterior rubbing polishing <br />+</p>

                          <p>Rs. 1000 Wallet Balance</p>
                          <div className="couponCode">
                            <p className="couponTxt">PTCH500</p>
                          </div>
                        </div>
                        <div id="accordion">
                          <div className="card">

                            <div className="card-header" id="headingOne">
                              <h5 className="mb-0">
                                <button
                                  className="btn btn-link"
                                  data-toggle="collapse"
                                  data-target="#collapseOne"
                                  aria-expanded="true"
                                  aria-controls="collapseOne"
                                >
                                  Details
                                </button>
                              </h5>
                            </div>

                            <div
                              id="collapseOne"
                              className="collapse show"
                              aria-labelledby="headingOne"
                              data-parent="#accordion"
                            >
                              <div className="card-body">
                                <b>1.</b> Anim pariatur cliche reprehenderit, enim eiusmod
                                high life accusamus terry richardson ad squid. <br /><br />
                                <b>2. </b>
                                wolf moon officia aute, non cupidatat skateboard
                                dolor brunch. Food truck quinoa nesciunt laborum
                                eiusmod. Brunch  <br /><br />
                                <b>3. </b>  wolf moon tempor, sunt aliqua
                                put a bird on it squid single-origin coffee nulla
                                assumenda shoreditch et. Nihil anim keffiyeh
                                helvetica, craft beer labore wes anderson cred
                                nesciunt sapiente ea proident. <br /><br />
                                <b>4. </b>  Ad vegan excepteur
                                butcher vice lomo. Leggings occaecat craft beer
                                farm-to-table, raw denim aesthetic synth nesciunt
                                you probably haven't heard of them accusamus
                                labore sustainable VHS.
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header" id="headingTwo">
                              <h5 className="mb-0">
                                <button
                                  className="btn btn-link collapsed"
                                  data-toggle="collapse"
                                  data-target="#collapseTwo"
                                  aria-expanded="false"
                                  aria-controls="collapseTwo"
                                >
                                  Terms & Conditions
                                </button>
                              </h5>
                            </div>
                            <div
                              id="collapseTwo"
                              className="collapse"
                              aria-labelledby="headingTwo"
                              data-parent="#accordion"
                            >
                              <div className="card-body">
                                <b>1.</b> Anim pariatur cliche reprehenderit, enim eiusmod
                                high life accusamus terry richardson ad squid. <br /><br />
                                <b>2. </b>
                                wolf moon officia aute, non cupidatat skateboard
                                dolor brunch. Food truck quinoa nesciunt laborum
                                eiusmod. Brunch  <br /><br />
                                <b>3. </b>  wolf moon tempor, sunt aliqua
                                put a bird on it squid single-origin coffee nulla
                                assumenda shoreditch et. Nihil anim keffiyeh
                                helvetica, craft beer labore wes anderson cred
                                nesciunt sapiente ea proident. <br /><br />
                                <b>4. </b>  Ad vegan excepteur
                                butcher vice lomo. Leggings occaecat craft beer
                                farm-to-table, raw denim aesthetic synth nesciunt
                                you probably haven't heard of them accusamus
                                labore sustainable VHS.
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </>
            </div>

            <div
              className={toggleState === 2 ? 'content active-content' : 'hideTab'}
            >
              <>
                <div
                  type="text"
                  className="offerBox"
                  data-toggle="modal"
                  data-target="#exampleModalLong2"
                //   onClick={() => bhim(val.id)}
                >
                  {/* {`Offer${i + 1}`}  */}
                  <div className="offerTitle">
                    <p>PITSHOP</p>
                    <p className="small mb-0">FLAT Rs.555 Off</p>
                    <p className="small mb-0">FLAT Rs.555 Off</p>
                    <p className="small">Rs.1000 Wallet Balance</p>
                  </div>
                </div>

                <div
                  className="modal fade"
                  id="exampleModalLong2"
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLongTitle2"
                  aria-hidden="true"
                >
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle2">
                          offer 2
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <div id="accordion">
                          <div className="card">
                            <div className="card-header" id="headingOne">
                              <h5 className="mb-0">
                                <button
                                  className="btn btn-link"
                                  data-toggle="collapse"
                                  data-target="#collapseOne"
                                  aria-expanded="true"
                                  aria-controls="collapseOne"
                                >
                                  Terms & Conditions #1
                                </button>
                              </h5>
                            </div>

                            <div
                              id="collapseOne"
                              className="collapse show"
                              aria-labelledby="headingOne"
                              data-parent="#accordion"
                            >
                              <div className="card-body">
                                Anim pariatur cliche reprehenderit, enim eiusmod
                                high life accusamus terry richardson ad squid. 3
                                wolf moon officia aute, non cupidatat skateboard
                                dolor brunch. Food truck quinoa nesciunt laborum
                                eiusmod. Brunch 3 wolf moon tempor, sunt aliqua
                                put a bird on it squid single-origin coffee nulla
                                assumenda shoreditch et. Nihil anim keffiyeh
                                helvetica, craft beer labore wes anderson cred
                                nesciunt sapiente ea proident. Ad vegan excepteur
                                butcher vice lomo. Leggings occaecat craft beer
                                farm-to-table, raw denim aesthetic synth nesciunt
                                you probably haven't heard of them accusamus
                                labore sustainable VHS.
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header" id="headingTwo">
                              <h5 className="mb-0">
                                <button
                                  className="btn btn-link collapsed"
                                  data-toggle="collapse"
                                  data-target="#collapseTwo"
                                  aria-expanded="false"
                                  aria-controls="collapseTwo"
                                >
                                  Terms & Conditions #2
                                </button>
                              </h5>
                            </div>
                            <div
                              id="collapseTwo"
                              className="collapse"
                              aria-labelledby="headingTwo"
                              data-parent="#accordion"
                            >
                              <div className="card-body">
                                Anim pariatur cliche reprehenderit, enim eiusmod
                                high life accusamus terry richardson ad squid. 3
                                wolf moon officia aute, non cupidatat skateboard
                                dolor brunch. Food truck quinoa nesciunt laborum
                                eiusmod. Brunch 3 wolf moon tempor, sunt aliqua
                                put a bird on it squid single-origin coffee nulla
                                assumenda shoreditch et. Nihil anim keffiyeh
                                helvetica, craft beer labore wes anderson cred
                                nesciunt sapiente ea proident. Ad vegan excepteur
                                butcher vice lomo. Leggings occaecat craft beer
                                farm-to-table, raw denim aesthetic synth nesciunt
                                you probably haven't heard of them accusamus
                                labore sustainable VHS.
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header" id="headingThree">
                              <h5 className="mb-0">
                                <button
                                  className="btn btn-link collapsed"
                                  data-toggle="collapse"
                                  data-target="#collapseThree"
                                  aria-expanded="false"
                                  aria-controls="collapseThree"
                                >
                                  Terms & Conditions #3
                                </button>
                              </h5>
                            </div>
                            <div
                              id="collapseThree"
                              className="collapse"
                              aria-labelledby="headingThree"
                              data-parent="#accordion"
                            >
                              <div className="card-body">
                                Anim pariatur cliche reprehenderit, enim eiusmod
                                high life accusamus terry richardson ad squid. 3
                                wolf moon officia aute, non cupidatat skateboard
                                dolor brunch. Food truck quinoa nesciunt laborum
                                eiusmod. Brunch 3 wolf moon tempor, sunt aliqua
                                put a bird on it squid single-origin coffee nulla
                                assumenda shoreditch et. Nihil anim keffiyeh
                                helvetica, craft beer labore wes anderson cred
                                nesciunt sapiente ea proident. Ad vegan excepteur
                                butcher vice lomo. Leggings occaecat craft beer
                                farm-to-table, raw denim aesthetic synth nesciunt
                                you probably haven't heard of them accusamus
                                labore sustainable VHS.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                        <button type="button" className="btn btn-primary">
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            </div>
            <div
              className={toggleState === 3 ? 'content active-content' : 'hideTab'}
            >
              <>
                <div
                  type="text"
                  className="offerBox"
                  data-toggle="modal"
                  data-target="#exampleModalLong3"
                >
                  <div className="offerTitle">
                    <p>PITSHOP</p>
                    <p className="small mb-0">FLAT Rs.555 Off</p>
                    <p className="small mb-0">FLAT Rs.555 Off</p>
                    <p className="small">Rs.1000 Wallet Balance</p>
                  </div>
                </div>

                <div
                  className="modal fade"
                  id="exampleModalLong3"
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLongTitle"
                  aria-hidden="true"
                >
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">
                          Offer Title
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">...</div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                        <button type="button" className="btn btn-primary">
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            </div>

            <div
              className={toggleState === 4 ? 'content active-content' : 'hideTab'}
            >
              <>
                <div
                  type="text"
                  className="offerBox"
                  data-toggle="modal"
                  data-target="#exampleModalLong4"
                //   onClick={() => bhim(val.id)}
                >
                  {/* {`Offer${i + 1}`}  */}
                  <div className="offerTitle">
                    <p>PITSHOP</p>
                    <p className="small mb-0">FLAT Rs.555 Off</p>
                    <p className="small mb-0">FLAT Rs.555 Off</p>
                    <p className="small">Rs.1000 Wallet Balance</p>
                  </div>
                </div>

                <div
                  className="modal fade"
                  id="exampleModalLong4"
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLongTitle2"
                  aria-hidden="true"
                >
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle2">
                          offer 2
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <div id="accordion">
                          <div className="card">
                            <div className="card-header" id="headingOne">
                              <h5 className="mb-0">
                                <button
                                  className="btn btn-link"
                                  data-toggle="collapse"
                                  data-target="#collapseOne"
                                  aria-expanded="true"
                                  aria-controls="collapseOne"
                                >
                                  Terms & Conditions #1
                                </button>
                              </h5>
                            </div>

                            <div
                              id="collapseOne"
                              className="collapse show"
                              aria-labelledby="headingOne"
                              data-parent="#accordion"
                            >
                              <div className="card-body">
                                Anim pariatur cliche reprehenderit, enim eiusmod
                                high life accusamus terry richardson ad squid. 3
                                wolf moon officia aute, non cupidatat skateboard
                                dolor brunch. Food truck quinoa nesciunt laborum
                                eiusmod. Brunch 3 wolf moon tempor, sunt aliqua
                                put a bird on it squid single-origin coffee nulla
                                assumenda shoreditch et. Nihil anim keffiyeh
                                helvetica, craft beer labore wes anderson cred
                                nesciunt sapiente ea proident. Ad vegan excepteur
                                butcher vice lomo. Leggings occaecat craft beer
                                farm-to-table, raw denim aesthetic synth nesciunt
                                you probably haven't heard of them accusamus
                                labore sustainable VHS.
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header" id="headingTwo">
                              <h5 className="mb-0">
                                <button
                                  className="btn btn-link collapsed"
                                  data-toggle="collapse"
                                  data-target="#collapseTwo"
                                  aria-expanded="false"
                                  aria-controls="collapseTwo"
                                >
                                  Terms & Conditions #2
                                </button>
                              </h5>
                            </div>
                            <div
                              id="collapseTwo"
                              className="collapse"
                              aria-labelledby="headingTwo"
                              data-parent="#accordion"
                            >
                              <div className="card-body">
                                Anim pariatur cliche reprehenderit, enim eiusmod
                                high life accusamus terry richardson ad squid. 3
                                wolf moon officia aute, non cupidatat skateboard
                                dolor brunch. Food truck quinoa nesciunt laborum
                                eiusmod. Brunch 3 wolf moon tempor, sunt aliqua
                                put a bird on it squid single-origin coffee nulla
                                assumenda shoreditch et. Nihil anim keffiyeh
                                helvetica, craft beer labore wes anderson cred
                                nesciunt sapiente ea proident. Ad vegan excepteur
                                butcher vice lomo. Leggings occaecat craft beer
                                farm-to-table, raw denim aesthetic synth nesciunt
                                you probably haven't heard of them accusamus
                                labore sustainable VHS.
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header" id="headingThree">
                              <h5 className="mb-0">
                                <button
                                  className="btn btn-link collapsed"
                                  data-toggle="collapse"
                                  data-target="#collapseThree"
                                  aria-expanded="false"
                                  aria-controls="collapseThree"
                                >
                                  Terms & Conditions #3
                                </button>
                              </h5>
                            </div>
                            <div
                              id="collapseThree"
                              className="collapse"
                              aria-labelledby="headingThree"
                              data-parent="#accordion"
                            >
                              <div className="card-body">
                                Anim pariatur cliche reprehenderit, enim eiusmod
                                high life accusamus terry richardson ad squid. 3
                                wolf moon officia aute, non cupidatat skateboard
                                dolor brunch. Food truck quinoa nesciunt laborum
                                eiusmod. Brunch 3 wolf moon tempor, sunt aliqua
                                put a bird on it squid single-origin coffee nulla
                                assumenda shoreditch et. Nihil anim keffiyeh
                                helvetica, craft beer labore wes anderson cred
                                nesciunt sapiente ea proident. Ad vegan excepteur
                                butcher vice lomo. Leggings occaecat craft beer
                                farm-to-table, raw denim aesthetic synth nesciunt
                                you probably haven't heard of them accusamus
                                labore sustainable VHS.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                        <button type="button" className="btn btn-primary">
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            </div>

            <div
              className={toggleState === 5 ? 'content active-content' : 'hideTab'}
            >
              <>
                <div
                  type="text"
                  className="offerBox"
                  data-toggle="modal"
                  data-target="#exampleModalLong5"
                >
                  <div className="offerTitle">
                    <p>PITSHOP</p>
                    <p className="small mb-0">FLAT Rs.555 Off</p>
                    <p className="small mb-0">FLAT Rs.555 Off</p>
                    <p className="small">Rs.1000 Wallet Balance</p>
                  </div>
                </div>

                <div
                  className="modal fade"
                  id="exampleModalLong5"
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLongTitle"
                  aria-hidden="true"
                >
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">
                          Offer Title
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true"> <i class="fas fa-chevron-left colorRed"></i></span>

                        </button>
                      </div>
                      <div className="modal-body">...</div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                        <button type="button" className="btn btn-primary">
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            </div>
          </div>
        </div>
      )
      }
    </>
  );
};

export default Offers;

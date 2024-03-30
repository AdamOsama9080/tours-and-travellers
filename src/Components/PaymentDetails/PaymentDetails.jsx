import React, { useContext, useState, useEffect } from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import './PaymentDetails.css';
import { ModalContext } from '../../Contexts/pypalContext.js';
import { cartContext } from './CartProvider.jsx';
import { AdultContext } from '../../Contexts/AdultsContext.js';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams } from "react-router-dom";


function PayPalButtonComponent({ tour, adults, tourPrice }) {
  const [show, setShow] = useState(false);
  const { showModal, setShowModal } = useContext(ModalContext);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const { Adults, setAdultsContext } = useContext(AdultContext);
  
const {id}=useParams()
  const handleBookingSubmit =  () => {
    console.log(typeof Adults);
    console.log(tour);
    console.log(localStorage.getItem("id"));
    const response = axios
      .post("https://apis-2-4nek.onrender.com/booking/", {
        tour: id,
      
        user: localStorage.getItem("id"),
        numOfPeople: parseInt(Adults),
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    if (response.ok) {
      console.log("Adults added successfully");
      console.log(response);
      // Reset form data after successful submission
    } else {
      console.error("Failed to add adults");
    }
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          description: "Book Your Travel Package",
          amount: {
            currency_code: "USD",
            value: tourPrice * Adults,
          },
        },
      ],
      application_context: {
        shipping_preference: "NO_SHIPPING",
      },
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      setSuccess(true);
      console.log("Payment successful");
      console.log(`tourPrice in payment ${tourPrice}`);
      handleBookingSubmit(); 
      Swal.fire({
        title: "Good job!",
        text: "Payment successful",
        icon: "success"
      });
    });
  };

  const onError = (data, actions) => {
    setError("Error exists in your payment");
  };

  useEffect(() => {
    console.log(`Adults ${Adults}`);
  }, [Adults]);

  useEffect(() => {
    console.log(`tour price: ${tourPrice}`);
  }, [tourPrice]);

  return (
    <div className="container text-center">
      <PayPalScriptProvider
        options={{
          "client-id":
            "Ae-htR7tJGC9ZtgEYb5elo_tntQEoD8O-xHXfbbKnqT12hK53zqTvB788sOOkK_EvEOfD3S1APtuzp-L",
        }}
      >
        {/* Background overlay */}
        {showModal && (
          <div className="shadow" onClick={() => setShowModal(false)}></div>
        )}

        {/* PayPal Modal */}
        {showModal && (
          <div
            className="modal fade show"
            style={{ display: "block" }}
            tabIndex="-1"
            role="dialog"
          >
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header justify-content-evenly">
                  <h5 className="modal-title" id="paypalModalLabel">
                    Pay with PayPal
                  </h5>
                  <button
                    type="button"
                    className="close btn btn-danger"
                    onClick={() => setShowModal(false)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <PayPalButtons
                    style={{ layout: "vertical" }}
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                  />
                  {show ? (
                    <PayPalButtonComponent
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={onError}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        )}
        {/* End PayPal Modal */}
      </PayPalScriptProvider>
      {success && (
                console.log("payment success")


      )}
    </div>
  );
}

export default PayPalButtonComponent;

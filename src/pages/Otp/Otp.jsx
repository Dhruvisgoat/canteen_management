import React, { useEffect } from "react";
import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";

const Otp = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(auth);
    ui.start(".otp-container", {
      signInOptions: [firebase.auth.PhoneAuthProvider.PROVIDER_ID],
      signInSuccessUrl: "/home", // Update with your desired login page URL
      callbacks: {
        signInSuccessWithAuthResult: (authResult, redirectUrl) => {
          navigate("/home"); // Navigate to the specified URL
          return false; // Prevent the default redirect behavior
        },
      },
    });
  }, [navigate]);

  return <div className="otp-container"></div>;
};

export default Otp;

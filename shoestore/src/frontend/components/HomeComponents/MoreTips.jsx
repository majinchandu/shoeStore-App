import React, { useState } from 'react';
// var nodemailer = require('nodemailer');
// import emailjs from 'emailjs-com';
import axios from 'axios'

const MoreTips = () => {

  // function sendEmail(e) {
  //   e.preventDefault();    //This is important, i'm not sure why, but the email won't send without it

  //   emailjs.sendForm('service_6rwq14g', 'template_mv818sp', e.target, 'D7Xlw2DyCgQDOKNEy')
  //     .then((result) => {
  //         window.location.reload()  //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior) 
  //     }, (error) => {
  //         console.log(error.text);
  //     });
  // }

  const [email, setEmail] = useState('');

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  

  const sendEmail = async (e) => {
    e.preventDefault();

    try {
      if (!isValidEmail(email)) {
        alert("enter valid email")
      }
      else {
        const response = await axios.post('http://localhost:5000/send-email', { email });
        if (response.status === 200) {
          alert('Email successfully sent!');
          setEmail('');
        }
      }
    } catch (error) {
      console.error('There was an error sending the email:', error);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url("https://sasshoes-com.s3.us-west-2.amazonaws.com/img/banner-uplift-21.jpg")`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '25rem',
        position: 'relative',
      }}
    >
      {/* Overlay div with semi-transparent background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.3)', // Adjust the opacity (0.5 is 50%)
        }}
      ></div>

      {/* Content inside MoreTips */}
      <div className="contentInsideMoreTips container " style={{ paddingTop: '150px', position: 'relative', zIndex: 1, marginLeft: "auto", marginRight: "auto" }}>
        <h1 style={{ color: 'white', fontFamily: 'Arial, sans-serif' }}>Do you need more tips</h1>
        <h3 style={{ color: 'white', fontFamily: 'Arial, sans-serif' }}>Sign Up free and get the latest tips</h3>
      </div>

      <div className="container mt-3">
        <div className="row">
          <div className="col-12 col-md-8 mx-auto">
            <div className="input-group">
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
                style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0, border: 'none', padding: '10px' }}
                onChange={(e) => setEmail(e.target.value)}
                
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
                style={{ backgroundColor: '#1cb803', color: 'white', borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                onClick={sendEmail}
              >
                Yes,I want
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default MoreTips;

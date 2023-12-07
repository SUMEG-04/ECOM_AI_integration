import React from 'react';
import logo1 from '../../images/logo1.png'
import logo2 from '../../images/logo2.png'
import logo3 from '../../images/logo3.png'
import logo4 from '../../images/logo4.png'
import logo5 from '../../images/logo5.png'
import logo6 from '../../images/logo6.png'
import './Trusted.css'

const Trusted = () => {
  return (
    <div className="trusted-container">
      <p className="tie-ups">Trusted Partners</p>
      <div className="company-info">
      <img src={logo1} alt="notfound" className="company-logo" />
      <img src={logo3} alt="notfound" className="company-logo" />
      <img src={logo4} alt="notfound" className="company-logo" />
      <img src={logo5} alt="notfound" className="company-logo" />
      <img src={logo6} alt="notfound" className="company-logo" />
      </div>
    </div>
  );
};

export default Trusted;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logoImage from './images/backendlogo.png';


function Footer() {
  return (
    <>
      <div className='footer'>
      <img src={logoImage} alt='' width={100} height={28} />
      <p>&nbsp;&nbsp;Copyright © 2022 DSA. Some Rights Reserved.</p>
      </div>
    </>
  );
}
function FooterBackend() {
  return (
    <>
      <div className='footerb'>
      <img src={logoImage} alt='' width={100} height={28} />
      <p>&nbsp;&nbsp;Copyright © 2022 DSA. Some Rights Reserved.</p>
      </div>
    </>
  );
}
export{Footer,FooterBackend}
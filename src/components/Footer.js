import React from 'react';
import './Navbar.css';
import logoImage from './images/logow.svg';


function Footer() {
  return (
    <>
      <div className='footer'>
        <img src={logoImage} alt='' className="footerlogo"/>
        <p>Copyright © 2024 DSA.</p>
        <p>&nbsp;Some Rights Reserved.</p>
      </div>
    </>
  );
}
function FooterBackend() {
  return (
    <>
      <div className='footerb'>
      <img src={logoImage} alt='' className="footerlogo"/>
      <p>&nbsp;&nbsp;Copyright © 2024 DSA. Some Rights Reserved.</p>
      </div>
    </>
  );
}
export{Footer,FooterBackend}
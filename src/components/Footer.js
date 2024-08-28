import React from 'react';
import './Navbar.css';
import logoImage from './images/logow.svg';


function Footer() {
  return (
    <>
      <div className='footer'>
      <img src={logoImage} alt='' width={30} height={30} />
      <p>&nbsp;&nbsp;Copyright © 2024 DSA. Some Rights Reserved.</p>
      </div>
    </>
  );
}
function FooterBackend() {
  return (
    <>
      <div className='footerb'>
      <img src={logoImage} alt='' width={100} height={28} />
      <p>&nbsp;&nbsp;Copyright © 2024 DSA. Some Rights Reserved.</p>
      </div>
    </>
  );
}
export{Footer,FooterBackend}
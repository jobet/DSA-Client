import React from 'react';
import './Navbar.css';
import logoImage from './images/logo.svg';
import { BiCopyright } from "react-icons/bi";


function Footer() {
  return (
    <>
      <div className='footer'>
        <img src={logoImage} alt='' className="footerlogo"/>
       <p>DSA Visual</p>
       <BiCopyright/>
       <p>{(new Date().getFullYear())}</p>
      </div>
    </>
  );
}
function FooterBackend() {
  return (
    <>
      <div className='footer footerb'>
      <img src={logoImage} alt='' className="footerlogo"/>
        <p>DSA Visual</p>
       <BiCopyright/>
       <p>{(new Date().getFullYear())}</p>
      </div>
    </>
  );
}
export{Footer,FooterBackend}
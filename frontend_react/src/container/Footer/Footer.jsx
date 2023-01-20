import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as ReactTooltip from 'react-tooltip';
import {images} from '../../constants';

import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';
import './Footer.scss'

const Footer = () => {

  const [formData, setFormData] = useState({name:'', email:'', message:''});
  const [isFromSubmitted, setIsFromSubmitted] = useState(false);
  const [loding, setLoading] = useState(false);
  const {name, email, message} = formData;

  const handleChangeInput = (e) => {
    const { name , value } = e.target;
    setFormData({ ...formData, [name]: value})
  }
  const handleSubmit = () => {
    setLoading (true);

    const contact = {
      _type: 'contact',
      name: name,
      email: email,
      message: message,
    }

    client.create(contact)
    .then(() => {
      setLoading(false);
      setIsFromSubmitted(true);
    })
  }
  return (
    <>
      <h2 className='head-text'>Take a coffe & chat with me</h2>
      <div className='app__footer-cards'>
        <div className='app__footer-card'>
          <img src={images.email} alt="email" />
            <a href="mailto:hello@diego.com" className='p-text'>hello@diego.com</a>
        </div>
        <div className='app__footer-card'>
          <img src={images.mobile} alt="mobile" />
            <a href="tel: +1 (123) 456 789" className='p-text'>+1 (123) 456 789</a>
        </div>
      </div>
      {!isFromSubmitted ? 
      <div className='app__footer-form app__flex'>
        <div className='app__flex'>
          <input className='p-text' type="text" placeholder='Your name' name="name" value={name} onChange={handleChangeInput}/>
        </div>
        <div className='app__flex'>
          <input className='p-text' type="text" placeholder='Your email' name="email" value={email} onChange={handleChangeInput}/>
        </div>
        <div className='app__flex'>
          <textarea 
            className='p-text' 
            placeholder='Your Message' 
            name="message"
            value={message} 
            onChange={handleChangeInput}
          />
        </div>
          <button className='p-text' onClick={handleSubmit}> {loding ? 'Sending' : 'Send Message' }</button>
      </div>
      : <div>
        <h3 className='head-text'> Thank you for getting in touch</h3>
        </div>
      }
    </>
  )
}

export default AppWrap(
  MotionWrap(Footer , 'app__footer'),
  'footer',
  "app__whitebg"
  );
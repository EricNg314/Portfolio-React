import React from 'react';
import './AboutMe.css';

const AboutMe = () => (
  <div>
    <div className="parallax-100vh">
      <div className="caption">
        <span className='text-light bg-dark h1 p-3 round-corner'>Welcome to my story.</span>
      </div>
    </div>

    <div className="parallax-bg bg-img1">
      <div className='container'>
        <div className='bg-white box-shadow'>
          <h1 className='text-center p-3'>My name is Eric!</h1>
          <h3 className='my-0 p-3'>I graduated with an economics degree and was given an opportunity at FasTrak as an Accountant. Using online resources, I learned to code in Visual Basic Application to automate work. </h3>
        </div>
      </div>
    </div>

    <div className="parallax-bg bg-img1">
      <div className="container">
        <div className="parallax-bg h-250px bg-img2">
        </div>
      </div>
    </div>

    <div className="parallax-bg bg-img1">
      <div className='container'>
        <div className='bg-white box-shadow'>
          <h3 className='p-3 my-0'>As we integrated BAIFA express lanes to the FasTrak program. They came with their own set of rules and financial transactions. I was in charge of updating reports in SAP Crystal and documentation from a finance perspective.</h3>
        </div>
      </div>
    </div>

    <div className="parallax-bg bg-img1">
      <div className="container">
        <div className="parallax-bg h-250px bg-img3">
        </div>
      </div>
    </div>

    <div className="parallax-bg bg-img1">
      <div className='container'>
        <div className='bg-white box-shadow'>
          <h3 className='my-0 p-3'>Something was still missing inside me. I realized I wanted to build applications. Thus I took the leap of faith into UC Berkeley's Coding Bootcamp. After graduating, I am now a Teaching Assistant for their Data Analytics Bootcamp.</h3>
        </div>
      </div>
    </div>

  </div>
);

export default AboutMe





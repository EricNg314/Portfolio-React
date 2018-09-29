import React from 'react';
import './AboutMe.css';

const AboutMe = () => (
  <div>
    <div className="parallax-100vh about_bg-img1">
      <div className="caption">
        <span className='text-light bg-dark h1 p-3 round-corner'>Welcome to my story.</span>
      </div>
    </div>

    <div className="parallax-bg about_bg-img1">
      <div className='container'>
        <div className='bg-white box-shadow'>
          <h1 className='text-center p-3'>My name is Eric!</h1>
          <h4 className='my-0 p-3'>I graduated with an economics degree and was given an opportunity at FasTrak as an Accountant. Using online resources, I learned to code in Visual Basic Application to automate work. </h4>
        </div>
        <div className="parallax-bg h-300px about_bg-img2 bg-size-auto my-3">
        </div>

        <div className='bg-white box-shadow'>
          <h4 className='p-3 my-0'>As we integrated BAIFA express lanes to the FasTrak program. They came with their own set of rules and financial transactions. I was in charge of updating reports in SAP Crystal and documentation from a finance perspective.</h4>
        </div>

        <div className="parallax-bg h-300px about_bg-img3 bg-size-auto my-3">
        </div>
      </div>
    </div>

    <div className="parallax-bg about_bg-img1">
      <div className='container'>
        <div className='bg-white box-shadow'>
          <h4 className='my-0 p-3'>Something was still missing inside me and realized I wanted to build applications. I took the leap of faith into UC Berkeley's Coding Bootcamp. After graduating, I am now a Teaching Assistant for their Data Analytics Bootcamp.</h4>
        </div>
      </div>
    </div>

  </div>
);

export default AboutMe





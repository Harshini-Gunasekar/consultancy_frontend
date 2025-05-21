import React from "react";
import "../styles/about.css";

const About = () => {
  return (
    <div className="about-container">
      <h2 className="about-title">About Us</h2>
      <p className="about-description">
        SRK Readymades is a leading manufacturer and retailer in the clothing industry, offering high-quality apparel for all needs.
      </p>

      {/* Company Information */}
      <div className="info-card">
        <h3>Basic Information</h3>
        <ul>
          <li><strong>Nature of Business:</strong> Manufacturer</li>
          <li><strong>Additional Business:</strong> Retail & Wholesale</li>
          <li><strong>Company CEO:</strong> Kampliampatti Sadhasivam Arun</li>
          <li><strong>Total Employees:</strong> Upto 10 People</li>
          <li><strong>GST Registration Date:</strong> 01-07-2017</li>
          <li><strong>Legal Status:</strong> Proprietorship</li>
          <li><strong>Annual Turnover:</strong> 0 - 40 L</li>
        </ul>
      </div>

      {/* Statutory Profile */}
      <div className="info-card">
        <h3>Statutory Profile</h3>
        <ul>
          <li><strong>Banker:</strong> South Indian Bank</li>
          <li><strong>GST No.:</strong> 33AEBPA2235A1ZO</li>
          <li><strong>GST Partner:</strong> Kampliampatti Sadhasivam Arunkumar</li>
        </ul>
      </div>

      {/* Product Categories */}
      <div className="info-card">
        <h3>Explore Our Categories</h3>
        <ul>
          <li>Temperature Sensor </li>
          <li>Hospital Uniform </li>
          <li>School Uniform</li>
        </ul>
      </div>

      {/* Contact Information */}
      <div className="info-card contact-card">
        <h3>Get in Touch</h3>
        <p><strong>Company:</strong> S.R.K. Readymades</p>
        <p><strong>Address:</strong> 295, Main Road, Erode, Perundurai-638052, Tamil Nadu, India</p>
        <p><strong>Owner:</strong> ARUNKUMAR</p>
      </div>
    </div>
  );
};

export default About;

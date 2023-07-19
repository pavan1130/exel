import React, { useState } from "react";
import Footer from "../Footer";
import { BsArrowRight } from "react-icons/bs";
import "../component/Contact.css";

import contactImage from "../c.png";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <>
      <div className="contact-container">
        <div className="form-content">
          <h2>Contact Us</h2>
          <p>
            We would love to hear from you! Reach out to us with any questions,
            suggestions, or inquiries you may have.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                required
              ></textarea>
            </div>
            <button type="submit">
              Send Message <BsArrowRight />
            </button>
          </form>
        </div>
        <div
          className="contact-container-image"
          style={{
            backgroundImage: `url(${contactImage})`,
          }}
        ></div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;

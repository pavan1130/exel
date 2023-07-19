import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import projectImage1 from "../m.avif";
import projectImage2 from "../u.jpg";
import "../component/Home.css";

const Home = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Here, you can implement the logic to handle the email subscription
    console.log("Subscribed email:", email);
    setEmail("");
  };

  return (
    <div className="home-container">
      <h2>Welcome to Avv Innovation Labs</h2>

      <div className="project-images">
        <div className="project-image">
          <img src={projectImage1} alt="Project 1" />
          <h3>Mentor</h3>
          <p>
            The Mentor App is a revolutionary platform designed to connect
            aspiring individuals with experienced mentors across various fields.
            Whether you're a student, professional, or someone seeking personal
            development, the Mentor App is your one-stop solution to access
            expert guidance and support.
          </p>
        </div>

        <div className="project-image">
          <img src={projectImage2} alt="Project 2" />
          <Link to={"/"}>
            <h3>Update Form</h3>
          </Link>
          <p>
            The Update Form is a user-friendly and efficient tool designed to
            simplify the process of submitting daily task updates and progress
            reports. Whether you are part of a team, a freelancer, or managing
            your projects independently, the Update Form empowers you to stay
            organized and keep stakeholders informed with ease.
          </p>
        </div>
      </div>

      <div className="subscribe-section">
        <h3>Subscribe to our Newsletter</h3>
        <p>Stay updated with our latest projects and news.</p>
        <form onSubmit={handleSubscribe}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <button type="submit">Subscribe</button>
        </form>
      </div>

      {/* Call to Action (CTA) Section */}
      <div className="cta-section">
        <h3>Join Our Team</h3>
        <p>Are you passionate about innovation and technology?</p>
        <Link to="/About" className="cta-button">
          Explore <BsArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default Home;

import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import teamImage from "./t.webp";
import officeImage from "./o.webp";
import technology1Image from "./o.webp";
import technology2Image from "./o.webp";
import technology3Image from "./o.webp";
import technology4Image from "./o.webp";
import "../component/About.css";

export default function About() {
  const technologies = [
    {
      id: 1,
      name: "Technology 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae magna ac mauris luctus fringilla vel nec tortor.",
      image: technology1Image,
    },
    {
      id: 2,
      name: "Technology 2",
      description:
        "Fusce eleifend urna eu volutpat ullamcorper. Sed congue, erat id consectetur posuere, tortor metus tincidunt tellus, sit amet fermentum turpis eros quis purus.",
      image: technology2Image,
    },
    {
      id: 3,
      name: "Technology 3",
      description:
        "Proin ultrices convallis justo, id facilisis dui scelerisque ut. Suspendisse auctor sapien nec lorem volutpat, ac bibendum justo malesuada.",
      image: technology3Image,
    },
    {
      id: 4,
      name: "Technology 4",
      description:
        "Donec eu ultrices neque, eu blandit dolor. Integer a aliquet tellus, non posuere nulla. Sed vestibulum nibh ac velit pretium, nec elementum libero rhoncus.",
      image: technology4Image,
    },
    // Add more technologies here
  ];
  // State to manage the active technology card
  const [activeIndex, setActiveIndex] = useState(0);

  // Ref to access the technology-cards container
  const cardsContainerRef = useRef(null);

  // Function to handle clicking the right arrow button
  const handleNextCard = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % technologies.length);
  };

  // Function to handle clicking the left arrow button
  const handlePrevCard = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? technologies.length - 1 : prevIndex - 1
    );
  };

  // Automatic scrolling effect
  useEffect(() => {
    const interval = setInterval(handleNextCard, 5000); // Auto-scroll every 5 seconds

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  // Effect to update scroll position when activeIndex changes
  useEffect(() => {
    const cardWidth = 320; // Adjust card width according to your design
    const scrollOffset = cardWidth * activeIndex;
    cardsContainerRef.current.style.transform = `translateX(-${scrollOffset}px)`;
  }, [activeIndex]);

  return (
    <div className="about-container">
      <div className="about-heading">
        <h1>About Us</h1>
        <p>
          Welcome to our company! We are a dedicated team of professionals
          passionate about delivering high-quality solutions to our clients. Our
          goal is to exceed expectations and create lasting relationships
          through exceptional service and innovative products.
        </p>
      </div>

      <div className="about-info">
        <div className="about-section">
          <h2>Our Team</h2>
          <img src={teamImage} alt="Team" className="about-image" />
          <p>
            Our diverse team brings together expertise from various fields,
            allowing us to tackle complex challenges with creativity and
            efficiency. We believe that collaboration and a supportive
            environment are the keys to success.
          </p>
        </div>

        <div className="about-section">
          <h2>Our Office</h2>
          <img src={officeImage} alt="Office" className="about-image" />
          <p>
            Our modern and vibrant office provides an inspiring space for
            creativity and innovation. We foster a culture of openness and
            continuous learning, encouraging everyone to contribute their best.
          </p>
        </div>
      </div>

      <div className="about-technology">
        <h2>Our Technology</h2>

        <div className="technology-cards" ref={cardsContainerRef}>
          {technologies.map((tech, index) => (
            <div
              key={tech.id}
              className={`technology-card ${
                index === activeIndex ? "active" : ""
              }`}
            >
              <img src={tech.image} alt={tech.name} />
              <h3>{tech.name}</h3>
              <p>{tech.description}</p>
            </div>
          ))}
        </div>
        <div className="arrow-buttons">
          <button className="arrow-button" onClick={handlePrevCard}>
            &lt;
          </button>
          <button className="arrow-button" onClick={handleNextCard}>
            &gt;
          </button>
        </div>
      </div>
      <div className="about-cta">
        <h2>Join Our Journey</h2>
        <p>
          If you're passionate about making a positive impact and working with
          talented individuals, we'd love to hear from you. Check out our{" "}
          <Link to="/careers">Careers</Link> page for exciting opportunities.
        </p>
      </div>
    </div>
  );
}


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const promotionImages = [
    "/images/women/srk2.png", 
    "/images/women/srk3.jpg",
    "/images/women/srk.jpg",
  ];
  const categories = [
    { img: "images/kids/frock.jpg", title: "Frock" },
    { img: "images/mens/men_hoodie.jpg", title: "Hoodie" },
    { img: "images/women/kurthi.jpg", title: "Kurthi" },
    { img: "images/kids/image.png", title: "Uniform" },
    { img: "images/kids/tshirt6.png", title: "Tshirt" },
    { img: "images/mens/mens_sweater.jpg", title: "Sweater" },
  ];

  const quotes = [
    "Fashion is the armor to survive the reality of everyday life.",
  
    "In the world of fashion, a woman has the power to change everything.",
    "Style is a way to say who you are without having to speak.",
   
  ];

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    } else {
      setShowPopup(true);
    }

    const interval = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % promotionImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleAuthSuccess = () => {
    setShowPopup(false);
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
  };

  return (
    <div className="home-container">
      <div className="main-content">
        {/* Hero Section with Carousel */}
        <section className="hero-section updated-hero">
          <div className="carousel-container">
            <div className="carousel-overlay">
              <img src={promotionImages[currentImage]} alt="Promotion" className="carousel-image" />
            </div>
          </div>
          <div className="hero-content">
            <h1 className="hero-title">
              Discover the Style at <span className="brand-name">SRK Readymades</span>
            </h1>
            <p className="hero-subtitle">Trendy fashion. Quality fabrics. Affordable prices.</p>
            <div className="hero-buttons">
              <Link to="/products">
                <button className="shop-now">Shop Now</button>
              </Link>
              <Link to="/about">
                <button className="learn-more">Learn More</button>
              </Link>
            </div>
          </div>
        </section>

        {/* Product Showcase */}
        <section className="products-container">
          {/* Men's Wear Carousel */}
          <div className="product-card">
            <img src="/images/mens/mens_tshirt.jpg" alt="Men's Wear" className="product-image" />
            <h3>Men's Wear</h3>
            <Link to="/products" className="explore-link">Explore</Link>
          </div>

          {/* Static Cards */}
          <div className="product-card">
            <img src="/images/women/kurthi.jpg" alt="Women's Wear" className="product-image" />
            <h3>Women's Wear</h3>
            <Link to="/products" className="explore-link">Explore</Link>
          </div>
          <div className="product-card">
            <img src="/images/kids/kids_casuals.jpg" alt="Kids Wear" className="product-image" />
            <h3>Kids Wear</h3>
            <Link to="/products" className="explore-link">Explore</Link>
          </div>
        </section>

        {/* Categories Section */}
        <section className="categories" id="Category">
          <div className="home-text">
            <h1>Popular Items</h1>
          </div>
          <div className="categories-content">
            {categories.map((category, index) => {
              
              const lowerTitle = category.title.toLowerCase();
              const path = `/${lowerTitle}`;
              return (
                <Link to="/products" key={index} className="category-item">
                  <div className="row-img">
                    <img src={category.img} alt={category.title} />
                  </div>
                  <h4>{category.title}</h4>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Interesting Quotes Section */}
        <section className="quotes-section">
  <div className="home-text">
    <h1>Fashion Quotes</h1>
  </div>
  <div className="quotes-content">
    {quotes.map((quote, index) => (
      <div key={index} className="quote-box">
        <p>"{quote}"</p>
      </div>
    ))}
  </div>
</section>
        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <h2>@SRK Readymades</h2>
            <p>Phone Number: 8642786575 &nbsp;&nbsp;&nbsp; Mail ID: srkbooking@gmail.com</p>
          </div>
        </footer>
    


      </div>
    </div>
    
  );
  
};

export default Home;

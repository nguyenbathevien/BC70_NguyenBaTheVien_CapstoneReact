import React, { useState, useRef } from "react";
import { Carousel } from "antd";
import { NavLink } from "react-router-dom";

const contentStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "300px",
  color: "#fff",
  textAlign: "center",
  background: "#fff",
};

const CarouselItems = ({ arrProduct }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const totalSlides = arrProduct.length;
  const maxDots = 3;

  const handleChange = (current) => {
    setCurrentIndex(current);
  };

  const startDot = Math.max(0, currentIndex - Math.floor(maxDots / 2));
  const endDot = Math.min(startDot + maxDots, totalSlides);

  return (
    <div className="container">
      <Carousel
        ref={carouselRef}
        dots={false}
        infinite={false}
        arrows
        afterChange={handleChange}
      >
        {arrProduct.map((item) => (
          <div key={item.id} style={contentStyle}>
            <div className="px-3 item-carousel">
              <div className="carousel-right">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="carousel-left">
                <h3>{item.name}</h3>
                <p>{item.shortDescription}</p>
                <NavLink to={`/detail/${item.id}`}>
                  <button className="btn-BuyNow">Buy now</button>
                </NavLink>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
      <div className="dots" style={{ textAlign: "center", marginTop: "10px" }}>
        {Array.from({ length: totalSlides })
          .slice(startDot, endDot)
          .map((_, index) => {
            const dotIndex = startDot + index;
            return (
              <button
                key={dotIndex}
                onClick={() => {
                  setCurrentIndex(dotIndex);
                  carouselRef.current.goTo(dotIndex);
                }}
                style={{
                  backgroundColor:
                    dotIndex === currentIndex ? "#f0ad4e" : "#ccc",
                  border: "none",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  margin: "0 5px",
                  cursor: "pointer",
                }}
              ></button>
            );
          })}
      </div>
    </div>
  );
};

export default CarouselItems;

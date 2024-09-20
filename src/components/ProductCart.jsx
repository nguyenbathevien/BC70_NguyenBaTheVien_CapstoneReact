import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

const ProductCart = (props) => {
  const { item } = props;
  const [isFavorited, setIsFavorited] = useState(false);
  const dispatch = useDispatch();
  const handleHeartClick = (e) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };
  const truncateDescription = (description, wordLimit) => {
    const words = description.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return description;
  };
  return (
    <div className="card cards-header my-3">
      <div className="icon position-relative d-flex justify-content-center align-items-center">
        {isFavorited ? (
          <HeartFilled
            className="position-absolute  heart"
            onClick={handleHeartClick}
          />
        ) : (
          <HeartOutlined
            className="position-absolute  heart"
            onClick={handleHeartClick}
          />
        )}
        <div className="d-flex justify-content-center align-items-center w-50">
          <img className="w-100" src={item.image} alt="Product" />
        </div>
      </div>

      <div className="card-body">
        <h2 className="cart-title" style={{ minHeight: 80 }}>
          {item.name}
        </h2>
        <p className="text-muted text-des">
          {truncateDescription(item.description, 10)}
        </p>
        <div className="d-flex shadow-box">
          <NavLink
            to={`/detail/${item.id}`}
            className="btn btn-buy text-dark btn-success w-50"
            style={{ background: "#9DE167" }}
            onClick={(e) => {
              console.log("id: ", item.id);
            }}
          >
            Buy Now
          </NavLink>
          <div className="product-price text-center w-50  text-dark">
            <p>{item.price}$</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;

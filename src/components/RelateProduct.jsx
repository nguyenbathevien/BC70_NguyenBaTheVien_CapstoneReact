import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const RelateProduct = (props) => {
  const { prodDetail } = props;

  // Tạo trạng thái để lưu trạng thái yêu thích của từng sản phẩm
  const [favoriteStatus, setFavoriteStatus] = useState({});

  const handleHeartClick = (id) => {
    // Cập nhật trạng thái yêu thích cho sản phẩm có id tương ứng
    setFavoriteStatus((prevStatus) => ({
      ...prevStatus,
      [id]: !prevStatus[id], // Đảo ngược trạng thái yêu thích của sản phẩm này
    }));
  };

  const truncateDescription = (description, wordLimit) => {
    const words = description.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return description;
  };

  return (
    <div className="container">
      <h3 className="text-center">- Related Products -</h3>
      <div className="row">
        {Array.isArray(prodDetail.relatedProducts) &&
          prodDetail.relatedProducts.map((relatedProd, index) => (
            <div className="col-md-4 my-3" key={index}>
              <div className="card cards-header">
                <div className="icon position-relative d-flex justify-content-center align-items-center">
                  {/* Kiểm tra trạng thái yêu thích dựa trên id của sản phẩm */}
                  {favoriteStatus[relatedProd.id] ? (
                    <HeartFilled
                      className="position-absolute heart"
                      onClick={() => handleHeartClick(relatedProd.id)}
                    />
                  ) : (
                    <HeartOutlined
                      className="position-absolute heart"
                      onClick={() => handleHeartClick(relatedProd.id)}
                    />
                  )}
                  <div className="d-flex justify-content-center align-items-center w-50">
                    <img
                      className="w-100"
                      src={relatedProd.image}
                      alt="Product"
                    />
                  </div>
                </div>

                <div className="card-body">
                  <h2 className="cart-title" style={{ minHeight: 80 }}>
                    {relatedProd.name}
                  </h2>
                  <p className="text-muted" style={{ fontWeight: 300 }}>
                    {truncateDescription(relatedProd.description, 10)}
                  </p>
                  <div className="d-flex shadow-box">
                    <NavLink
                      to={`/detail/${relatedProd.id}`}
                      className="btn btn-buy text-dark btn-success w-50"
                      style={{ background: "#9DE167" }}
                    >
                      Buy Now
                    </NavLink>
                    <div className="product-price text-center w-50 text-dark">
                      <p>{relatedProd.price}$</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RelateProduct;

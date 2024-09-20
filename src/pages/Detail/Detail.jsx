import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetailByIdActionThunk } from "../../redux/ProductReducer/productsReducer";
import RelateProduct from "../../components/RelateProduct";
import { addProductAction } from "../../redux/ProductReducer/cartReducer";

const Detail = () => {
  const { prodDetail } = useSelector((state) => state.productsReducer);
  const dispatch = useDispatch();
  const { prodID } = useParams(); // Destructuring directly for clarity
  const [quantity, setQuantity] = useState(1);
  const getProductDetail = async () => {
    const action = getProductDetailByIdActionThunk(prodID);
    dispatch(action);
  };
  useEffect(() => {
    getProductDetail();
  }, [{}]);

  const handleQuantityChange = (amount) => {
    setQuantity((prevQuantity) => Math.max(prevQuantity + amount, 1));
  };

  const handleAddToCart = () => {
    try {
      dispatch(addProductAction({ ...prodDetail, quantity }));
      alert(
        `Đã thêm thành công ${quantity} sản phẩm ${prodDetail.name} Vào giỏ hàng.`
      );
      setQuantity(1);
    } catch (err) {
      alert("Thêm thất bại");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row detail-row">
        <div className="col-md-4">
          <img
            src={prodDetail.image}
            alt={prodDetail.name}
            className="img-fluid"
          />
        </div>
        <div className="col-md-8">
          <h2>{prodDetail.name}</h2>
          <p>{prodDetail.description}</p>
          <p className="text-Available">
            <strong>Available sizes:</strong>
          </p>
          <div className="d-flex mb-3">
            {Array.isArray(prodDetail.size) &&
              prodDetail.size.map((size, index) => (
                <div className="me-2" key={index}>
                  <button className="btn btn-size">{size}</button>
                </div>
              ))}
          </div>
          <p className="price mt-3">{prodDetail.price}$</p>
          <div className="quantity-selector mt-3">
            <button
              className="btn btn-quantity me-2"
              onClick={() => handleQuantityChange(1)}
            >
              +
            </button>
            <input
              type="text"
              value={quantity}
              className="form-control d-inline text-center"
              style={{ width: "60px" }}
              readOnly
            />
            <button
              className="btn btn-quantity ms-2"
              onClick={() => handleQuantityChange(-1)}
            >
              -
            </button>
          </div>
          <button className="btn btn-addToCart mt-3" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
      <br />
      <br />
      <RelateProduct prodDetail={prodDetail} />
    </div>
  );
};

export default Detail;

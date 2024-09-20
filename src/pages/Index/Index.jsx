import React, { useEffect } from "react";
import ProductCart from "../../components/ProductCart";
import { useDispatch, useSelector } from "react-redux";
import { getProductApiActionThunk } from "../../redux/ProductReducer/productsReducer";
import CarouselItems from "../../components/CarouselItems";
const Index = () => {
  const { arrProduct } = useSelector((state) => state.productsReducer);
  const dispatch = useDispatch();
  const getAllProduct = async () => {
    const actionThunk = getProductApiActionThunk();
    dispatch(actionThunk);
  };
  useEffect(() => {
    getAllProduct();
  }, []);
  return (
    <div>
      <div>{<CarouselItems arrProduct={arrProduct} />}</div>
      <div className="container-fluid">
        <h3 className="text-resultSearch text-white p-3 my-5">
          Product Feature
        </h3>
        <div className="container">
          <div className="row">
            {arrProduct.map((item) => {
              return (
                <div className="col-4" key={item.id}>
                  <ProductCart item={item} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

import React, { useEffect, useState } from "react";
import ProductCart from "../../components/ProductCart";
import { useSearchParams } from "react-router-dom";
import { http } from "../../util/setting";

const Search = () => {
  const [tuKhoa, setTuKhoa] = useState("");
  const [search, setSearchParam] = useSearchParams();
  const [arrProduct, setArrayProduct] = useState([]);
  const valueKeyword = search.get("k");
  const getProductByKeyword = async () => {
    if (valueKeyword) {
      const res = await http.get(`/Product?keyword=${valueKeyword}`);
      console.log("arrProduct", res.data.content);
      setArrayProduct(res.data.content);
    }
  };
  useEffect(() => {
    getProductByKeyword();
  }, [valueKeyword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    setSearchParam({
      k: tuKhoa,
    });
  };
  const [sortOrder, setSortOrder] = useState("decrease");
  const sortedProducts = [...arrProduct].sort((a, b) => {
    if (sortOrder === "decrease") {
      return a.price - b.price; // Sắp xếp theo giá tăng dần
    } else {
      return b.price - a.price; // Sắp xếp theo giá giảm dần
    }
  });
  return (
    <div>
      <div className="container mt-5 search">
        <p className="text-search">Search</p>
        <form onSubmit={handleSubmit}>
          <div className="search-bar">
            <input
              type="text"
              className="form-control d-inline-block"
              placeholder="product name ...."
              style={{ width: "300px", background: "#e6e0e0" }}
              onInput={(e) => {
                setTuKhoa(e.target.value);
              }}
            />
            <button className="btn-search ms-5">SEARCH</button>
          </div>
        </form>
      </div>
      <div className="mt-4 text-white p-2 text-resultSearch">
        <h3>Result Search</h3>
      </div>
      <div className="container">
        <div className="mt-4">
          <p className="text-search">Price</p>
          <select
            style={{ width: 200 }}
            className="form-select"
            id="priceFilter"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="decrease">Decrease</option>
            <option value="ascending">Ascending</option>
          </select>
        </div>

        <div className="row">
          {sortedProducts.map((item) => {
            return (
              <div className="col-4" key={item.id}>
                <ProductCart item={item} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Search;

import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  GithubOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { deleteCookie, Email, TOKEN, USER_LOGIN } from "../../../util/setting";

const Header = () => {
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cartReducer);
  const { userLogin } = useSelector((state) => state.userReducer);

  const renderLogin = () => {
    if (userLogin) {
      return (
        <>
          <NavLink to="/profile" className="auth-link">
            <img
              src={`https://i.pravatar.cc/?u=${userLogin.email}`}
              width={30}
              alt=""
            />
          </NavLink>
          <NavLink
            to="/login"
            className="auth-link"
            onClick={() => {
              deleteCookie(TOKEN);
              localStorage.removeItem(USER_LOGIN);
              localStorage.removeItem(TOKEN);
              localStorage.removeItem(Email);
              localStorage.removeItem("cart");
              localStorage.removeItem("orderHistory");
              window.location.href = "/login";
            }}
          >
            Log Out
          </NavLink>
        </>
      );
    }
    return (
      <>
        <NavLink to="/login" className="auth-link">
          Login
        </NavLink>
        <NavLink to="/register" className="auth-link">
          Register
        </NavLink>
      </>
    );
  };

  return (
    <div className="header-container">
      <div className="header">
        <div className="header-left">
          <img src="/img/cyber.png" alt="Logo" />
        </div>
        <div className="header-right">
          <div className="search">
            <button className="search-button">
              <NavLink to="/search">
                <SearchOutlined className="search-icon" />
              </NavLink>
            </button>
            <p>Search</p>
          </div>
          <div className="cart">
            <NavLink to="/carts">
              <ShoppingCartOutlined className="cart-icon" />
            </NavLink>
            <span>{cart.length}</span>
          </div>
          <div className="auth-links">{renderLogin()}</div>
        </div>
      </div>

      <div className="header-menu d-flex mx-3 py-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-link text-dark mx-3 active" : "nav-link mx-3"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="#"
          className={({ isActive }) =>
            isActive ? "nav-link text-dark mx-3 active" : "nav-link mx-3"
          }
        >
          Men
        </NavLink>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-link text-dark mx-3 active" : "nav-link mx-3"
          }
        >
          Women
        </NavLink>
        <NavLink
          to="#"
          className={({ isActive }) =>
            isActive ? "nav-link text-dark mx-3 active" : "nav-link mx-3"
          }
        >
          Kid
        </NavLink>
        <NavLink
          to="#"
          className={({ isActive }) =>
            isActive ? "nav-link text-dark mx-3 active" : "nav-link mx-3"
          }
        >
          Sport
        </NavLink>
      </div>
    </div>
  );
};

export default Header;

// Trong component Login
import React, { useState } from "react";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  FacebookFilled,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  loginActionAsync,
  loginActionFBAsync,
} from "../../redux/ProductReducer/userReducer";
import { NavLink, useNavigate } from "react-router-dom";
import FacebookLogin from "react-facebook-login";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const frmLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Email không được để trống"),
      password: Yup.string().required("Email không được để trống"),
    }),
    onSubmit: (value) => {
      const actionthunk = loginActionAsync(value);
      dispatch(actionthunk)
        .then((result) => {
          if (value !== null) alert("Đăng nhập thành công");
          navigate("/profile");
        })
        .catch((err) => {
          alert("Sai email hoặc mật khẩu");
        });
    },
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const responseFacebook = (response) => {
    console.log("Response từ Facebook:", response);
    const actionthunk = loginActionFBAsync(response.accessToken);
    dispatch(actionthunk); // Thêm dispatch ở đây
  };
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center my-4">Login</h1>
          <form onSubmit={frmLogin.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-secondary">
                Email
              </label>
              <div className="input-group">
                <input
                  type="email"
                  className="form-control "
                  name="email"
                  id="email"
                  placeholder="email"
                  onChange={frmLogin.handleChange}
                  value={frmLogin.values.email}
                />
              </div>
              {frmLogin.errors.email && frmLogin.submitCount > 0 ? (
                <div className="form-text text-danger">
                  {frmLogin.errors.email}
                </div>
              ) : null}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="text-secondary form-label">
                Password
              </label>
              <div className="input-group">
                <input
                  type={passwordVisible ? "text" : "password"}
                  className="form-control"
                  name="password"
                  id="password"
                  placeholder="password"
                  onChange={frmLogin.handleChange}
                  value={frmLogin.values.password}
                />
                <span
                  className="input-group-text"
                  onClick={togglePasswordVisibility}
                  style={{ cursor: "pointer" }}
                >
                  {passwordVisible ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
                </span>
              </div>
              {frmLogin.errors.password && frmLogin.submitCount > 0 ? (
                <div className="form-text text-danger">
                  {frmLogin.errors.password}
                </div>
              ) : null}
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <NavLink to="/register" className="text-primary">
                Register now?
              </NavLink>
              <button type="submit" className="btn-login">
                LOGIN
              </button>
            </div>

            <div className="mt-2">
              <FacebookLogin
                appId="2891800824309983"
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook}
                icon={<FacebookFilled />}
                cssClass="fb-login-button"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

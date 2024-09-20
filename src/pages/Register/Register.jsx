import React, { useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { registerActionAsync } from "../../redux/ProductReducer/userReducer";
import { useDispatch, useSelector } from "react-redux";
const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const dispatch = useDispatch();
  const frmRegister = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      phone: "",
      gender: true,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Email không được để trống"),

      password: Yup.string()
        .min(6, "Mật khẩu phải ít nhất 6 ký tự")
        .matches(
          /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/,
          "Mật khẩu phải bao gồm cả chữ và số"
        )
        .required("Password không được để trống"),

      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Mật khẩu xác nhận không khớp")
        .required("Password confirm không được để trống"),

      name: Yup.string().required("Name không được để trống"),

      phone: Yup.string()
        .matches(/^\d{10}$/, "Số điện thoại phải là số và có 10 chữ số")
        .required("Phone không được để trống"),
    }),
    onSubmit: (values) => {
      console.log("Form data", values);
      try {
        const action = registerActionAsync(values);
        dispatch(action);
        alert("dang ky thanh cong");
      } catch (err) {
        console.log("err: ", err);
        alert("dang ky that bai");
      }
    },
  });

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPasswordVisibility = () =>
    setConfirmPasswordVisible(!confirmPasswordVisible);

  return (
    <div className="container">
      <h1 className="text-center my-4">Register</h1>
      <form onSubmit={frmRegister.handleSubmit}>
        <div className="row">
          {/* Cột trái */}
          <div className="custom-col-left">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <div className="input-group">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="email"
                  onChange={frmRegister.handleChange}
                  onBlur={frmRegister.handleBlur}
                  value={frmRegister.values.email}
                />
              </div>
              {frmRegister.touched.email && frmRegister.errors.email && (
                <div className="form-text text-danger">
                  {frmRegister.errors.email}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-group">
                <input
                  type={passwordVisible ? "text" : "password"}
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="password"
                  onChange={frmRegister.handleChange}
                  onBlur={frmRegister.handleBlur}
                  value={frmRegister.values.password}
                />
                <span
                  className="input-group-text"
                  onClick={togglePasswordVisibility}
                  style={{ cursor: "pointer" }}
                >
                  {passwordVisible ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
                </span>
              </div>
              {frmRegister.touched.password && frmRegister.errors.password && (
                <div className="form-text text-danger">
                  {frmRegister.errors.password}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Password confirm
              </label>
              <div className="input-group">
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  className="form-control"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="confirm password"
                  onChange={frmRegister.handleChange}
                  onBlur={frmRegister.handleBlur}
                  value={frmRegister.values.confirmPassword}
                />
                <span
                  className="input-group-text"
                  onClick={toggleConfirmPasswordVisibility}
                  style={{ cursor: "pointer" }}
                >
                  {confirmPasswordVisible ? (
                    <EyeTwoTone />
                  ) : (
                    <EyeInvisibleOutlined />
                  )}
                </span>
              </div>
              {frmRegister.touched.confirmPassword &&
                frmRegister.errors.confirmPassword && (
                  <div className="form-text text-danger">
                    {frmRegister.errors.confirmPassword}
                  </div>
                )}
            </div>
          </div>
          <div className="custom-col-middle"></div>
          {/* Cột phải */}
          <div className="custom-col-right">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="name"
                  onChange={frmRegister.handleChange}
                  onBlur={frmRegister.handleBlur}
                  value={frmRegister.values.name}
                />
              </div>
              {frmRegister.touched.name && frmRegister.errors.name && (
                <div className="form-text text-danger">
                  {frmRegister.errors.name}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  name="phone"
                  placeholder="phone"
                  onChange={frmRegister.handleChange}
                  onBlur={frmRegister.handleBlur}
                  value={frmRegister.values.phone}
                />
              </div>
              {frmRegister.touched.phone && frmRegister.errors.phone && (
                <div className="form-text text-danger">
                  {frmRegister.errors.phone}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label>Gender</label>
              <div>
                <label className="me-3">
                  <input
                    type="radio"
                    name="gender"
                    value="true"
                    checked={frmRegister.values.gender === true}
                    onChange={() => frmRegister.setFieldValue("gender", true)}
                  />{" "}
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="false"
                    checked={frmRegister.values.gender === false}
                    onChange={() => frmRegister.setFieldValue("gender", false)}
                  />{" "}
                  Female
                </label>
              </div>
            </div>

            <div className="mt-4">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;

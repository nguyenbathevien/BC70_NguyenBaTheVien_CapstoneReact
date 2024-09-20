import React, { useEffect } from "react";
import { Tabs, Radio, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { profileActionAsync } from "../../redux/ProductReducer/userReducer";
const { TabPane } = Tabs;

const Profile = () => {
  const { orderHistory } = useSelector((state) => state.cartReducer);
  const { profile } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  console.log(profile);
  const tabItems = [
    {
      label: "Lịch sử đơn hàng",
      key: "1",
      children: (
        <>
          {orderHistory.length > 0 ? (
            orderHistory.map((order, index) => (
              <div key={index} className="mb-3 text-primary">
                + Đơn hàng {index + 1} được đặt vào ngày{" "}
                {new Date().toLocaleDateString()}
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Hình ảnh</th>
                      <th>Tên sản phẩm</th>
                      <th>Giá</th>
                      <th>Số lượng</th>
                      <th>Tổng cộng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>
                          <img src={item.image} alt="product" width={50} />
                        </td>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price * item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))
          ) : (
            <p>Chưa có đơn hàng nào.</p>
          )}
        </>
      ),
    },
    {
      label: "Yêu thích",
      key: "2",
      children: <div>{}</div>,
    },
  ];

  const getProfileApi = async () => {
    const action = profileActionAsync;
    dispatch(action);
  };

  useEffect(() => {
    getProfileApi();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-resultSearch text-white p-3 my-5">Profile</h1>
      <div className="row">
        <div className="col-md-3 text-center">
          <img
            src={profile.avatar}
            style={{ borderRadius: "50%" }}
            className="w-100"
            alt="avatar"
          />
        </div>
        <div className="col-md-9">
          <div className="row mb-3">
            <div className="col-md-6">
              <label>Email</label>
              <input
                type="email"
                defaultValue={profile.email ?? ""}
                className="form-control"
                placeholder="email"
              />
            </div>
            <div className="col-md-6">
              <label>Name</label>
              <input
                type="text"
                defaultValue={profile.name ?? ""}
                className="form-control"
                placeholder="name"
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label>Phone</label>
              <input
                type="text"
                defaultValue={profile.phone ?? ""}
                className="form-control"
                placeholder="phone"
              />
            </div>
            <div className="col-md-6">
              <label>Password</label>
              <input
                type="password"
                defaultValue={profile.password ?? ""}
                className="form-control"
                placeholder="password"
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6 d-flex align-items-center">
              <div className="d-flex align-items-center">
                <label>Giới tính</label>
                <div className="ms-2">
                  <Radio.Group value={profile.gender ? "male" : "female"}>
                    <Radio value="male">Nam</Radio>
                    <Radio value="female">Nữ</Radio>
                  </Radio.Group>
                </div>
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center  justify-content-end">
              <Button className="btn-update">Update</Button>
            </div>
          </div>
        </div>
      </div>
      <Tabs defaultActiveKey="1" className="mt-4" items={tabItems} />
    </div>
  );
};

export default Profile;

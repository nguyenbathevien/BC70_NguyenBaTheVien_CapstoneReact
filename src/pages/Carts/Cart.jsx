import React, { useEffect, useState } from "react";
import { Table, Button, Image, Checkbox, message, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  changeQuantityProductAction,
  removeProductAction,
  submitOrderAction,
} from "../../redux/ProductReducer/cartReducer";
import { useNavigate } from "react-router-dom";
import { profileActionAsync } from "../../redux/ProductReducer/userReducer";

const Cart = () => {
  const navigate = useNavigate();
  const cartStore = useSelector((state) => state.cartReducer.cart);
  const dispatch = useDispatch();
  const [selectedIds, setSelectedIds] = useState([]);

  const handleSelect = (id) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) return prev.filter((item) => item !== id);
      return [...prev, id];
    });
  };

  const handleSelectAll = () => {
    if (selectedIds.length === cartStore.length) {
      // Nếu tất cả đã được chọn, bỏ chọn tất cả
      setSelectedIds([]);
    } else {
      // Chọn tất cả
      const allIds = cartStore.map((item) => item.id);
      setSelectedIds(allIds);
    }
  };

  const handleSummitOrder = () => {
    if (selectedIds.length > 0) {
      message.success("Đặt hàng thành công", 2, () => {
        dispatch(submitOrderAction());
        setSelectedIds([]);
      });
    } else {
      Modal.confirm({
        title: "Giỏ hàng trống",
        content: <p>Vui lòng chọn sản phẩm để thanh toán.</p>,
        okText: "Đi đến trang chủ",
        cancelText: "Hủy",
        onOk() {
          navigate("/");
        },
      });
    }
  };

  const columns = [
    {
      title: (
        <Checkbox
          checked={
            selectedIds.length === cartStore.length && cartStore.length > 0
          }
          onChange={handleSelectAll}
        />
      ),
      dataIndex: "checkbox",
      render: (_, record) => (
        <Checkbox
          checked={selectedIds.includes(record.id)}
          onChange={() => handleSelect(record.id)}
        />
      ),
    },
    {
      title: "id",
      dataIndex: "id",
    },
    {
      title: "img",
      dataIndex: "img",
      render: (value, record) => <Image width={50} src={record.image} />,
    },
    {
      title: "name",
      dataIndex: "name",
    },
    {
      title: "price",
      dataIndex: "price",
    },
    {
      title: "quantity",
      dataIndex: "quantity",
      render: (value, record) => (
        <>
          <button
            className="btn btn-success mx-2"
            onClick={() => {
              dispatch(
                changeQuantityProductAction({
                  id: record.id,
                  quantity: 1,
                })
              );
            }}
          >
            +
          </button>
          <input
            type="number"
            value={value}
            onChange={(e) => {
              const newQuantity = parseInt(e.target.value);
              if (newQuantity >= 1) {
                dispatch(
                  changeQuantityProductAction({
                    id: record.id,
                    quantity: newQuantity - record.quantity,
                  })
                );
              }
            }}
          />
          <button
            className="btn btn-success mx-2"
            onClick={() => {
              dispatch(
                changeQuantityProductAction({
                  id: record.id,
                  quantity: -1,
                })
              );
            }}
          >
            -
          </button>
        </>
      ),
    },
    {
      title: "total",
      dataIndex: "total",
      render: (_, record) => record.price * record.quantity,
    },
    {
      title: "action",
      dataIndex: "action",
      render: (_, record) => (
        <>
          <Button type="primary" style={{ marginRight: 8 }}>
            Edit
          </Button>
          <Button
            type="danger"
            style={{ background: "red", color: "white" }}
            onClick={() => {
              dispatch(removeProductAction(record.id));
            }}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  const getProfileApi = async () => {
    const action = profileActionAsync;
    dispatch(action);
  };

  useEffect(() => {
    getProfileApi();
  }, [dispatch]);

  return (
    <div className="container">
      <h1 className="text-resultSearch text-white p-3 my-5">Cart</h1>
      <div className="cart-table">
        <Table
          dataSource={cartStore}
          columns={columns}
          rowKey={"id"}
          pagination={false}
        />
        <div
          style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}
        >
          <Button
            type="primary"
            className="btn-submitOrder"
            onClick={handleSummitOrder}
          >
            Submit Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

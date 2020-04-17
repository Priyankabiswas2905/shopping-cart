import React, { useEffect, useState } from "react";
import "./CartSummary.css";
import Modal from "../Modal/Modal.js";
import useModal from "../Modal/useModal.js";

const CartSummary = (props) => {
  const { isShowing, toggle } = useModal();

  const [summary, setSummary] = useState({
    total_qty: 0,
    total_cost: 0,
  });

  useEffect(() => {
    let cart = localStorage.getItem("cart_item");
    if (cart) {
      var promise = new Promise((resolve, reject) => {
        var total_qty = 0;
        var total_cost = 0;
        cart = JSON.parse(cart);
        if (cart.length <= 0) {
          reject("No items in cart");
        }
        cart.forEach((product, index) => {
          total_cost += product.mrp * product.cart_qty;
          total_qty += product.cart_qty;
        });
        resolve({
          total_cost: total_cost,
          total_qty: total_qty,
        });
      });

      promise.then(
        (result) => {
          setSummary({
            total_cost: result.total_cost,
            total_qty: result.total_qty,
          });
        },
        function (error) {
          console.log(error, "Reject");
        }
      );
    }
  }, [props]);

  return (
    <div className="items summary">
      <div className="cart-total">
        <span className="title-cart">
          Total Qty: <span>{summary.total_qty}</span>
        </span>
        <span className="title-cart">
          Total Cost: <span>Rs. {summary.total_cost}</span>
        </span>
      </div>
      <div className="cart-btn">
        <button className="add-to-cart" onClick={toggle}>
          Checkout
        </button>
        {summary.total_cost > "0" ? (
          <Modal
            summary={summary.total_cost}
            isShowing={isShowing}
            hide={toggle}
          />
        ) : null}
      </div>
    </div>
  );
};

export default CartSummary;

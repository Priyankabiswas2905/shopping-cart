import React from "react";
import "./App.css";
import ProductList from "../src/container/shoppingCart/shoppingCart";

const cleanCart = () => {
  localStorage.removeItem("cart_item");
  this.setState({
    isClear: true,
  });
};
class App extends React.Component {
  state = {
    isClear: false,
  };

  render() {
    const { isClear } = this.state;
    return (
      <>
        <div className="shopping-cart">
          <div className="title header-pan">Shopping Bag</div>
          <ProductList isClear={isClear} />
        </div>
      </>
    );
  }
}

export default App;

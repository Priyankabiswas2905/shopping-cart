import React, { useState, useEffect, useCallback } from "react";
import Product from "../Products/Products";
import CartSummary from "../../components/CartSummary/CartSummary";

const Index = (props) => {
  const [products, setProducts] = useState([]);
  const [isCartUpdated, setCartUpdate] = useState(true);
  const [is_updated, setIsUpdated] = useState(true);

  const setCartUpdated = useCallback(() => {
    setIsUpdated(is_updated ? false : true, [is_updated]);
  });

  const isCartUpdate = useCallback(() => {
    setCartUpdate(isCartUpdated ? false : true, [isCartUpdated]);
  });

  useEffect(() => {
    fetch("/productList.json")
      .then((res) => res.json())
      .then(
        (result) => {
          if (parseInt(result.status) === 200) {
            setProducts(result.products);
          } else {
            console.log("Could not fetch data");
          }
        },
        (error) => {
          console.log(error, "Error");
        }
      );
  }, [props]);

  return (
    <div>
      {products.length > 0
        ? products.map((product, index) => {
            return (
              <Product
                isCartUpdate={isCartUpdate}
                is_updated={is_updated}
                setCartUpdate={setCartUpdated}
                {...product}
                key={`product-${index}`}
              />
            );
          })
        : ""}
      <CartSummary isCartUpdated={isCartUpdated} />
    </div>
  );
};

export default Index;

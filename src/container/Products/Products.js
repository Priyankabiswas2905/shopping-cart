import React from "react";
import Image from "../../components/ProductImage/ProductImage";
import Description from "../../components/ProductDescription/ProductDescription";
import Price from "../../components/ProductPrice/ProductPrice";
import CartQty from "../../components/CartQuantity/CartQuantity";
import "./Products.css";

const Product = (props) => {
  return (
    <div className="item">
      <Image product_image={props.product_image} product_name={props.product_name}/>
      <Description
        brand_name={props.brand_name}
        product_name={props.product_name}
        quantity={props.quantity}
      />
      <CartQty {...props} />
      <Price price={props.price} mrp={props.mrp} />
    </div>
  );
};

export default Product;

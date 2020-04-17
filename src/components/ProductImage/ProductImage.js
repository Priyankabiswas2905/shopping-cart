import React from "react";
import "./ProductImage.css";

const Image = (props) => {

  return (
    <div className="image">
      <img src={props.product_image} alt={props.product_name} />
    </div>
  );
};

export default Image;

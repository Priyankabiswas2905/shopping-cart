import React from 'react';
import './ProductDescription.css'

const Description = (props) => {

    return (
        <div className="description">
            <span className="brand-name">{props.brand_name}</span>
            <span>{props.product_name}</span>
            <span>{props.quantity} Qty Only available</span>
        </div>
    );
}

export default Description;
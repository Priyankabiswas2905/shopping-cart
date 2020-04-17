import React from 'react';
import './ProductPrice.css'

const Description = (props) => {

    return (
        <div className="total-price">
            <span className="old-value">
                <del>
                <span className="amount">{ `Rs. ${props.price}` } </span>
                </del>
            </span>
            <span  className="new-value">
                <ins>
                <span className="amount">{ `Rs. ${props.mrp}` }</span>
                </ins>
            </span>
        </div>
    );
}

export default Description;
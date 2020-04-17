import React, { useEffect, useState, useRef } from 'react';
import './CartQuantity.css'

const CartQty = (props) => {
    console.log("props: ", props);

    const cartQtyInput = useRef(1);

    const [state, setState] = useState({
        is_exists: false,
        cart_value: 1
    });

    useEffect(() => {

        let cart = localStorage.getItem("cart_item");
        if(cart) {
            cart = JSON.parse(cart);
            cart.forEach((product, index) => {
                if (parseInt(product.product_id) === parseInt(props.product_id)) {
                    setState({cart_value: product.cart_qty, is_exists: true});
                    return false;
                }
            });
        }
    }, [props.product_id]);

    const cartUpdate = async (action) => {

        let cart = localStorage.getItem("cart_item");
        var state_qantity;
        if(action === 'add') {
            let qty = parseInt(cartQtyInput.current.value);
            if(qty +1 > props.quantity) {
                return false;
            }
            state_qantity = qty + 1;
        } else {
            let qty = parseInt(cartQtyInput.current.value);
            if(qty - 1 === 0) {
                if(cart) {
                    cart = JSON.parse(cart);
                    await cart.forEach((product, index) => {
                        if (parseInt(product.product_id) === parseInt(props.product_id)) {
                            
                            cart.splice(index, 1);
                            localStorage.setItem("cart_item", JSON.stringify(cart));
                            setState({...state, is_exists: false});
                            props.isCartUpdate();
                        }
                    });
                }
                return false;
            }
            state_qantity = qty - 1;
        }
        if(cart) {
            cart = JSON.parse(cart);
            cart.forEach((item, index) => {
                if (parseInt(item.product_id) === parseInt(props.product_id)) {
                    cart[index].cart_qty = state_qantity;
                    localStorage.setItem("cart_item", JSON.stringify(cart));
                    props.isCartUpdate();
                    setState({...state, cart_value: state_qantity});
                    return false;
                }
            });
        }
    }

    const addToCart = async () => {

        let item = {
            product_id: props.product_id,
            quantity: props.quantity,
            price: props.price,
            mrp: props.mrp,
            cart_qty: 1
        };
        let cart = localStorage.getItem("cart_item");
        if(cart) {
            cart = JSON.parse(cart);
            let exists = false;
            await cart.forEach((item, index) => {
                if (parseInt(item.product_id) === parseInt(props.product_id)) {
                    exists = true;
                    return false;
                }
            });
            if(!exists) {
                cart.push(item);
                localStorage.setItem("cart_item", JSON.stringify(cart));
                props.isCartUpdate();
                setState({...state, is_exists: true});
            }
            return false;
        }
        cart = [];
        cart.push(item);
        localStorage.setItem("cart_item", JSON.stringify(cart));
        props.isCartUpdate();
        setState({...state, is_exists: true});
    }

    return (
        <div className="quantity">
            {
                state.is_exists ? 
                <div>
                    <button className="plus-btn" type="button" name="button" onClick={ () => cartUpdate('add') }>
                        <img src="/static/plus.svg" alt="" />
                    </button>
                    <input type="text" name="name" value={state.cart_value} ref={cartQtyInput} readOnly/>
                    <button className="minus-btn" type="button" onClick={ () => cartUpdate('minus') } name="button">
                        <img src="/static/minus.svg" alt="" />
                    </button>
                </div> : <button className="add-to-cart" onClick={ addToCart }>Add to Cart</button>
            }
        </div>
    );
}

export default CartQty;
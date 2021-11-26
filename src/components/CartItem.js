import React, { useRef } from "react";
//import PropTypes from "prop-types";
import styles from "../styles/CartItem.module.css";

function CartItem({ product, updateQuantity }) {
    const { category, id, name, price, image, quantity =1 } = product;
    let inputEl = {value:quantity,};
    

    const format = (amount) => {
        const formatter = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        });

        return formatter.format(amount);
    };

    const quantityChangeHandler = (e) => {
        const value = e.target.value;
        updateQuantity(id, value);
    };

    const incrementQuantity = () => {
        inputEl.value = quantity + 1;
        updateQuantity(id, inputEl.value);
    };

    const decrementQuantity = () => {
        inputEl.value = quantity - 1;
        updateQuantity(id, inputEl.value);
    };

    return (
        <div className={styles.cartContent}>
            <img className={styles.cartImage} src={image} alt={name} />
            <div className={styles.cartDetails}>
                <div className={styles.cartCategory}>{category}</div>
                <div className={styles.cartName}>{name}</div>
                <div className={styles.quantityController}>
                    <button
                        onClick={decrementQuantity}
                        className={styles.quantityControlButton}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                        >
                            <path d="M0 10h24v4h-24z" />
                        </svg>
                    </button>
                    <input
                        //ref={inputEl}
                        onChange={quantityChangeHandler}
                        type="number"
                        className={styles.quantityDisplay}
                        value={quantity}
                    />
                    <button
                        onClick={incrementQuantity}
                        className={styles.quantityControlButton}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                        >
                            <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className={styles.cartPrice}>{format(price)}</div>
        </div>
    );
}

//CartItem.propTypes = {};

export default CartItem;

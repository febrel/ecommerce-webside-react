import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

function ProductCard({ product }) {
    // Context
    const { addToCart, cartItems } = useCart();

    // Funciones
    const productInCart = cartItems.find((item) => {
        return item.id === product.id;
    })

    const productQuantityLabel = productInCart ? `(${productInCart.quantity})` : "";

    return (
        <div className="product-card" key={product.id}>
            <img src={product.image} className="product-card-image" alt={product.name} />

            <div className="product-card-content">
                <h3 className="product-card-name">{product.name}</h3>
                <p className="product-card-price">{product.price}</p>

                <div className="product-card-acctions">
                    <Link className="btn btn-secondary" to={`/products/${product.id}`}>View Details</Link>
                    <button className="btn btn-primary" onClick={() => addToCart(product.id)}>Add to Cart {productQuantityLabel}</button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;
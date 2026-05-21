import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../data/products";
import { useCart } from "../contexts/CartContext";

function ProductsDetailsPage() {
    // Variables - Estado
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    // Context
    const { addToCart, cartItems } = useCart();

    useEffect(() => {
        const foundProduct = getProductById(id);

        if (!foundProduct) {
            navigate("/");
            return;
        }

        setProduct(foundProduct);

    }, [id, navigate])


    // Mientras no haya producto, muestra carga
    if (!product) {
        return <div className="container">Loading product...</div>;
    }

    // Funciones
    const productInCart = cartItems.find((item) => {
        return item.id === product.id;
    })

    const productQuantityLabel = productInCart ? `(${productInCart.quantity})` : "";

    return (
        <div className="page">
            <div className="container">
                <div className="product-detail">
                    <div className="product-detail-image">
                        <img src={product.image} alt={product.name} />
                    </div>

                    <div className="product-detail-content">
                        <h1 className="product-detail-name">{product.name}</h1>
                        <p className="product-detail-price">{product.price}</p>
                        <p className="product-detail-description">{product.description}</p>
                        <button className="btn btn-primary" onClick={() => addToCart(product.id)}>Add to Cart {productQuantityLabel}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductsDetailsPage;
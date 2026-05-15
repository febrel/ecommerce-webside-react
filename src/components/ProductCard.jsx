import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ item }) {
    return (
        <div className="product-card" key={item.id}>
            <img src={item.image} className="product-card-image" alt={item.name} />

            <div className="product-card-content">
                <h3 className="product-card-name">{item.name}</h3>
                <p className="product-card-price">{item.price}</p>

                <div className="product-card-acctions">
                    <Link className="btn btn-secondary">View Details</Link>
                    <button className="btn btn-primary">Add to CarT</button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;